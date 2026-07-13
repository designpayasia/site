import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const browserPath =
  process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = process.env.SHOT_BASE_URL ?? 'http://127.0.0.1:4321';
const outputDir = path.resolve(process.cwd(), 'screenshots');
const widths = [1280, 768, 360];
const viewportHeights = {
  1280: 3600,
  768: 4200,
  360: 5200,
};
const routes = [
  '/',
  '/reports',
  '/reports/2024',
  '/reports/2023',
  '/about',
  '/contribute',
  '/ops',
  '/docs',
  '/docs/annual-cycle',
  '/docs/architecture',
  '/docs/edit-report',
  '/docs/publish',
  '/docs/succession',
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const slugForRoute = (route) => {
  if (route === '/') return 'index';
  return route.replace(/^\/|\/$/g, '').replace(/\//g, '-');
};

class CdpConnection {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.socket = null;
    this.nextId = 0;
    this.pending = new Map();
    this.listeners = new Set();
  }

  async open() {
    await new Promise((resolve, reject) => {
      const socket = new WebSocket(this.wsUrl);
      this.socket = socket;

      socket.addEventListener('open', () => resolve());
      socket.addEventListener('error', (event) => reject(event.error ?? new Error('WebSocket error')));
      socket.addEventListener('message', (event) => {
        const message = JSON.parse(String(event.data));

        if (typeof message.id === 'number') {
          const pending = this.pending.get(message.id);
          if (!pending) return;
          this.pending.delete(message.id);
          if (message.error) {
            pending.reject(new Error(message.error.message));
            return;
          }
          pending.resolve(message.result ?? {});
          return;
        }

        for (const listener of this.listeners) listener(message);
      });
      socket.addEventListener('close', () => {
        for (const pending of this.pending.values()) pending.reject(new Error('CDP socket closed'));
        this.pending.clear();
      });
    });
  }

  close() {
    this.socket?.close();
  }

  onEvent(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  once(match, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        off();
        reject(new Error('Timed out waiting for CDP event'));
      }, timeoutMs);

      const off = this.onEvent((message) => {
        if (!match(message)) return;
        clearTimeout(timeout);
        off();
        resolve(message);
      });
    });
  }

  send(method, params = {}, sessionId) {
    const id = ++this.nextId;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;

    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket?.send(JSON.stringify(payload));
    });
  }
}

const launchBrowser = async () => {
  const userDataDir = await mkdtemp(path.join(os.tmpdir(), 'dpa-shot-'));
  const debugPort = 9322 + Math.floor(Math.random() * 200);
  const chrome = spawn(
    browserPath,
    [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--remote-debugging-address=127.0.0.1',
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    {
      stdio: ['ignore', 'ignore', 'pipe'],
    },
  );

  let lastStderr = '';
  chrome.stderr.on('data', (chunk) => {
    lastStderr += chunk.toString();
  });

  const cleanup = async () => {
    if (chrome.exitCode === null) {
      chrome.kill('SIGTERM');
      await Promise.race([
        new Promise((resolve) => chrome.once('exit', resolve)),
        delay(2000),
      ]);
    }

    await rm(userDataDir, {
      recursive: true,
      force: true,
      maxRetries: 3,
      retryDelay: 100,
    });
  };

  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (response.ok) {
        const { webSocketDebuggerUrl } = await response.json();
        if (!webSocketDebuggerUrl) throw new Error('Missing webSocketDebuggerUrl');
        return { chrome, cleanup, webSocketDebuggerUrl };
      }
    } catch {
      if (chrome.exitCode !== null) break;
    }
    await delay(250);
  }

  await cleanup();
  throw new Error(`Chrome did not expose a DevTools endpoint.\n${lastStderr.trim()}`);
};

const evaluateJson = async (cdp, sessionId, expression) => {
  const { result } = await cdp.send(
    'Runtime.evaluate',
    {
      expression,
      awaitPromise: true,
      returnByValue: true,
    },
    sessionId,
  );

  return JSON.parse(result.value);
};

const captureRoute = async (cdp, route, width) => {
  const url = new URL(route, baseUrl).toString();
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const errors = [];

  const off = cdp.onEvent((message) => {
    if (message.sessionId !== sessionId) return;

    if (message.method === 'Runtime.consoleAPICalled') {
      if (message.params.type !== 'error') return;
      const text = message.params.args
        .map((arg) => arg.value ?? arg.description ?? arg.type)
        .filter(Boolean)
        .join(' ');
      errors.push(`console.error: ${text}`);
      return;
    }

    if (message.method === 'Runtime.exceptionThrown') {
      const details = message.params.exceptionDetails;
      const text = details.exception?.description ?? details.text ?? 'Unhandled exception';
      errors.push(`exception: ${text}`);
      return;
    }

    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
      errors.push(`log.error: ${message.params.entry.text}`);
      return;
    }

    if (message.method === 'Network.loadingFailed' && !message.params.canceled) {
      errors.push(`network: ${message.params.errorText} ${message.params.requestId}`);
    }
  });

  try {
    await Promise.all([
      cdp.send('Page.enable', {}, sessionId),
      cdp.send('Runtime.enable', {}, sessionId),
      cdp.send('Log.enable', {}, sessionId),
      cdp.send('Network.enable', {}, sessionId),
    ]);

    await cdp.send(
      'Emulation.setDeviceMetricsOverride',
      {
        width,
        height: viewportHeights[width],
        deviceScaleFactor: 1,
        mobile: width <= 360,
      },
      sessionId,
    );
    await cdp.send('Emulation.setEmulatedMedia', { media: 'screen' }, sessionId);

    const loaded = cdp.once(
      (message) => message.sessionId === sessionId && message.method === 'Page.loadEventFired',
      30000,
    );

    await cdp.send('Page.navigate', { url }, sessionId);
    await loaded;
    await cdp.send(
      'Runtime.evaluate',
      {
        expression: 'document.fonts ? document.fonts.ready.then(() => true) : true',
        awaitPromise: true,
      },
      sessionId,
    );
    await delay(1800);

    const pageState = await evaluateJson(
      cdp,
      sessionId,
      `JSON.stringify({
        title: document.title,
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      })`,
    );

    const screenshotPath = path.join(outputDir, `${slugForRoute(route)}-${width}.png`);
    const { data } = await cdp.send(
      'Page.captureScreenshot',
      {
        format: 'png',
        fromSurface: true,
      },
      sessionId,
    );

    await writeFile(screenshotPath, Buffer.from(data, 'base64'));

    return {
      route,
      width,
      screenshotPath,
      title: pageState.title,
      hasHorizontalOverflow: pageState.hasHorizontalOverflow,
      scrollWidth: pageState.scrollWidth,
      innerWidth: pageState.innerWidth,
      errors,
    };
  } finally {
    off();
    await cdp.send('Target.closeTarget', { targetId }).catch(() => {});
  }
};

const main = async () => {
  await mkdir(outputDir, { recursive: true });

  const { cleanup, webSocketDebuggerUrl } = await launchBrowser();
  const cdp = new CdpConnection(webSocketDebuggerUrl);
  await cdp.open();

  try {
    const results = [];
    const reportPath = path.join(outputDir, 'report.json');
    for (const route of routes) {
      for (const width of widths) {
        console.log(`Capturing ${route} @ ${width}...`);
        const result = await captureRoute(cdp, route, width);
        results.push(result);
        await writeFile(reportPath, `${JSON.stringify(results, null, 2)}\n`);
        console.log(
          `${route} @ ${width}: ${result.hasHorizontalOverflow ? 'overflow' : 'ok'}${
            result.errors.length > 0 ? ` (${result.errors.length} errors)` : ''
          }`,
        );
      }
    }

    const totalScreenshots = results.length;
    const overflowRoutes = results.filter((result) => result.hasHorizontalOverflow);
    const errorRoutes = results.filter((result) => result.errors.length > 0);

    console.log(`\nSaved ${totalScreenshots} screenshots to ${outputDir}`);
    console.log(`Report: ${reportPath}`);
    console.log(`Overflow flags: ${overflowRoutes.length}`);
    console.log(`Console/network error flags: ${errorRoutes.length}`);
  } finally {
    cdp.close();
    await cleanup();
  }
};

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
