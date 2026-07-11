/**
 * Shared count-up behaviour (handoff §1c).
 *
 * Contract: any element carrying `data-countup` is a count-up target.
 * - `data-countup-value` — the final display string (numeric part animated,
 *   any prefix/suffix such as "SGD " or "%"/"pp" is preserved verbatim).
 * - `data-countup-duration` — optional ms, default 1500, clamped 1200–1800.
 *
 * Animation starts when the element scrolls into view (matches BigStat.astro's
 * IntersectionObserver-driven feel), eases out (cubic), and snaps to the exact
 * final string on completion so trailing formatting (commas, decimals) is
 * never lost to floating-point drift.
 *
 * `prefers-reduced-motion: reduce` renders the final value immediately, no
 * animation, no observer.
 *
 * Usage: `import '../scripts/countup';` for the auto-init side effect, or
 * `import { initCountUp } from '../scripts/countup';` to scope/re-run manually
 * (e.g. after client-side DOM insertion).
 */

const DEFAULT_DURATION = 1500;
const MIN_DURATION = 1200;
const MAX_DURATION = 1800;

interface ParsedValue {
  prefix: string;
  numeric: number;
  decimals: number;
  suffix: string;
}

function parseValue(raw: string): ParsedValue | null {
  const match = raw.trim().match(/^([^0-9]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) {
    return null;
  }

  const prefix = match[1] ?? '';
  const numberPart = match[2];
  const suffix = match[3] ?? '';
  const numeric = Number.parseFloat(numberPart.replace(/,/g, ''));
  const decimals = numberPart.includes('.') ? (numberPart.split('.')[1]?.length ?? 0) : 0;

  if (Number.isNaN(numeric)) {
    return null;
  }

  return { prefix, numeric, decimals, suffix };
}

function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function resolveDuration(el: HTMLElement): number {
  const raw = Number.parseInt(el.dataset.countupDuration ?? '', 10);
  if (Number.isNaN(raw)) {
    return DEFAULT_DURATION;
  }
  return Math.min(MAX_DURATION, Math.max(MIN_DURATION, raw));
}

function animateElement(el: HTMLElement, prefersReducedMotion: boolean): void {
  const finalText = el.dataset.countupValue ?? el.textContent ?? '';
  const parsed = parseValue(finalText);

  if (!parsed || prefersReducedMotion) {
    el.textContent = finalText;
    return;
  }

  const { prefix, numeric, decimals, suffix } = parsed;
  const duration = resolveDuration(el);
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    const current = numeric * eased;

    el.textContent = `${prefix}${formatNumber(current, decimals)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      // Snap to the exact authored string so formatting quirks never drift.
      el.textContent = finalText;
    }
  };

  requestAnimationFrame(tick);
}

// Elements already queued (or animated) by any initCountUp() call — each call
// creates its own IntersectionObserver, so dedupe must live at module level.
const claimed = new WeakSet<Element>();

/**
 * Scans `root` for `[data-countup]` elements and wires each to animate once
 * it scrolls into view. Safe to call more than once — elements already claimed
 * by a previous call are skipped via the module-level `claimed` WeakSet.
 */
export function initCountUp(root: ParentNode = document): void {
  if (typeof window === 'undefined') {
    return;
  }

  const elements = root.querySelectorAll<HTMLElement>('[data-countup]');
  if (elements.length === 0) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    elements.forEach((el) => {
      if (claimed.has(el)) {
        return;
      }
      claimed.add(el);
      animateElement(el, true);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        animateElement(entry.target as HTMLElement, false);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );

  elements.forEach((el) => {
    if (claimed.has(el)) {
      return;
    }
    claimed.add(el);
    observer.observe(el);
  });
}

function autoInit(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initCountUp());
  } else {
    initCountUp();
  }
}

if (typeof document !== 'undefined') {
  autoInit();
}
