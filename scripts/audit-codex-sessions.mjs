#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DEFAULTS = {
  sessionsDir: path.join(os.homedir(), ".codex", "sessions"),
  cwdSubstring: "designpayasia/site",
  hugeTotal: 2_000_000,
  hugeTurn: 500_000,
  retryThreshold: 3,
  top: 12,
  strict: false,
};

function parseArgs(argv) {
  const options = { ...DEFAULTS };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--strict") {
      options.strict = true;
      continue;
    }

    if (arg === "--help") {
      printHelp();
      process.exit(0);
    }

    const [key, inlineValue] = arg.split("=", 2);
    const nextValue = inlineValue ?? argv[index + 1];

    if (key === "--sessions-dir") {
      options.sessionsDir = path.resolve(nextValue);
      if (inlineValue == null) index += 1;
      continue;
    }

    if (key === "--cwd-substring") {
      options.cwdSubstring = nextValue;
      if (inlineValue == null) index += 1;
      continue;
    }

    if (key === "--huge-total") {
      options.hugeTotal = Number(nextValue);
      if (inlineValue == null) index += 1;
      continue;
    }

    if (key === "--huge-turn") {
      options.hugeTurn = Number(nextValue);
      if (inlineValue == null) index += 1;
      continue;
    }

    if (key === "--retry-threshold") {
      options.retryThreshold = Number(nextValue);
      if (inlineValue == null) index += 1;
      continue;
    }

    if (key === "--top") {
      options.top = Number(nextValue);
      if (inlineValue == null) index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function printHelp() {
  console.log(`Usage: node ./scripts/audit-codex-sessions.mjs [options]

Options:
  --sessions-dir <path>      Override the Codex sessions directory
  --cwd-substring <text>     Filter sessions to files containing this cwd text
  --huge-total <number>      Flag sessions at or above this total token count
  --huge-turn <number>       Flag sessions at or above this per-turn token count
  --retry-threshold <n>      Flag repeated command retries at or above this count
  --top <n>                  Show the top N flagged sessions
  --strict                   Exit non-zero when findings are present
  --help                     Show this help
`);
}

function walkFiles(rootDir) {
  const files = [];
  const queue = [rootDir];

  while (queue.length > 0) {
    const current = queue.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(fullPath);
      } else if (entry.isFile() && fullPath.endsWith(".jsonl")) {
        files.push(fullPath);
      }
    }
  }

  return files.sort();
}

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function compactCommand(command) {
  return command.replace(/\s+/g, " ").trim().slice(0, 120);
}

function analyzeSession(filePath, rawText, options) {
  const lines = rawText.split("\n");
  const commandCounts = new Map();
  const models = new Set();
  const cwds = new Set();
  const totals = [];
  const lastTurns = [];

  let cliVersion = "";
  let jsonErrors = 0;
  let commandParseErrors = 0;

  for (const line of lines) {
    if (!line.trim()) continue;

    const entry = safeJsonParse(line);
    if (!entry) {
      jsonErrors += 1;
      continue;
    }

    const payload = entry.payload ?? {};

    if (entry.type === "session_meta") {
      cliVersion = payload.cli_version ?? cliVersion;
      const cwd = payload.cwd;
      if (cwd) cwds.add(cwd);
      continue;
    }

    if (entry.type === "turn_context") {
      if (payload.cwd) cwds.add(payload.cwd);
      if (payload.model) models.add(payload.model);
      continue;
    }

    if (entry.type === "event_msg" && payload.type === "token_count") {
      const total = payload.info?.total_token_usage?.total_tokens;
      const last = payload.info?.last_token_usage?.total_tokens;
      if (Number.isFinite(total)) totals.push(total);
      if (Number.isFinite(last)) lastTurns.push(last);
      continue;
    }

    if (entry.type === "response_item" && payload.type === "function_call" && payload.name === "exec_command") {
      const args = safeJsonParse(payload.arguments);
      if (!args?.cmd) {
        commandParseErrors += 1;
        continue;
      }

      const normalized = compactCommand(args.cmd);
      commandCounts.set(normalized, (commandCounts.get(normalized) ?? 0) + 1);
    }
  }

  const repeatedCommands = [...commandCounts.entries()]
    .filter(([, count]) => count >= options.retryThreshold)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));

  const maxTotal = totals.length > 0 ? Math.max(...totals) : 0;
  const maxLastTurn = lastTurns.length > 0 ? Math.max(...lastTurns) : 0;
  const compressedHits = (rawText.match(/compressed to/g) ?? []).length;
  const retrieveHits = (rawText.match(/Retrieve more: hash=/g) ?? []).length;
  const truncatedHits = (rawText.match(/truncated/g) ?? []).length;

  const flags = [];
  if (compressedHits > 0 || retrieveHits > 0) flags.push("compression");
  if (truncatedHits > 0) flags.push("truncation");
  if (maxTotal >= options.hugeTotal) flags.push("huge-total");
  if (maxLastTurn >= options.hugeTurn) flags.push("huge-turn");
  if (repeatedCommands.length > 0) flags.push("retries");
  if (commandParseErrors > 0) flags.push("cmd-parse");

  const score =
    (compressedHits > 0 ? 4 : 0) +
    (retrieveHits > 0 ? 3 : 0) +
    (maxTotal >= options.hugeTotal ? 3 : 0) +
    (maxLastTurn >= options.hugeTurn ? 2 : 0) +
    (repeatedCommands.length > 0 ? 2 : 0) +
    (truncatedHits > 0 ? 1 : 0) +
    (commandParseErrors > 0 ? 1 : 0);

  return {
    filePath,
    cliVersion,
    cwds: [...cwds],
    models: [...models],
    compressedHits,
    retrieveHits,
    truncatedHits,
    commandParseErrors,
    jsonErrors,
    repeatedCommands,
    maxTotal,
    maxLastTurn,
    flags,
    score,
  };
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function describeSession(session) {
  const details = [
    `score=${session.score}`,
    `flags=${session.flags.join(",") || "none"}`,
    `total=${formatNumber(session.maxTotal)}`,
    `turn=${formatNumber(session.maxLastTurn)}`,
    `compressed=${session.compressedHits}`,
    `retrieve=${session.retrieveHits}`,
    `truncated=${session.truncatedHits}`,
    `cmdParse=${session.commandParseErrors}`,
    `cli=${session.cliVersion || "unknown"}`,
    `model=${session.models[session.models.length - 1] || "unknown"}`,
  ];

  return `${session.filePath}\n  ${details.join(" | ")}`;
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(options.sessionsDir)) {
    throw new Error(`Sessions directory not found: ${options.sessionsDir}`);
  }

  const files = walkFiles(options.sessionsDir);
  const filtered = [];

  for (const filePath of files) {
    const rawText = fs.readFileSync(filePath, "utf8");
    if (options.cwdSubstring && !rawText.includes(options.cwdSubstring)) continue;
    filtered.push(analyzeSession(filePath, rawText, options));
  }

  filtered.sort((left, right) => {
    return (
      right.score - left.score ||
      right.maxTotal - left.maxTotal ||
      left.filePath.localeCompare(right.filePath)
    );
  });

  const flagged = filtered.filter((session) => session.flags.length > 0);
  const compressionCount = flagged.filter((session) => session.flags.includes("compression")).length;
  const hugeTotalCount = flagged.filter((session) => session.flags.includes("huge-total")).length;
  const hugeTurnCount = flagged.filter((session) => session.flags.includes("huge-turn")).length;
  const retryCount = flagged.filter((session) => session.flags.includes("retries")).length;
  const parseCount = flagged.filter((session) => session.flags.includes("cmd-parse")).length;

  console.log("Codex Session Audit");
  console.log(`sessionsDir: ${options.sessionsDir}`);
  console.log(`cwdSubstring: ${options.cwdSubstring || "(none)"}`);
  console.log(`scanned: ${formatNumber(files.length)} | matched: ${formatNumber(filtered.length)} | flagged: ${formatNumber(flagged.length)}`);
  console.log(
    `thresholds: hugeTotal=${formatNumber(options.hugeTotal)} hugeTurn=${formatNumber(options.hugeTurn)} retryThreshold=${formatNumber(options.retryThreshold)}`,
  );
  console.log(
    `findings: compression=${formatNumber(compressionCount)} hugeTotal=${formatNumber(hugeTotalCount)} hugeTurn=${formatNumber(hugeTurnCount)} retries=${formatNumber(retryCount)} cmdParse=${formatNumber(parseCount)}`,
  );

  if (flagged.length === 0) {
    console.log("No flagged sessions.");
    return;
  }

  console.log("");
  console.log(`Top ${Math.min(options.top, flagged.length)} flagged sessions:`);

  for (const session of flagged.slice(0, options.top)) {
    console.log("");
    console.log(describeSession(session));

    if (session.repeatedCommands.length > 0) {
      const topRepeated = session.repeatedCommands
        .slice(0, 3)
        .map(([command, count]) => `${count}x ${command}`)
        .join(" || ");
      console.log(`  repeated: ${topRepeated}`);
    }
  }

  if (options.strict) {
    process.exitCode = 1;
  }
}

main();
