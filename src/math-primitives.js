/**
 * src/math-primitives.js — Pure Zero-Float Q16.16, Balanced Ternary & Euclidean Rhythm Math
 * Distilled from Borealiscodes/ndh-game-dev-kit (Social Model 07 + 08).
 */

export const Q16_ONE = 65536;
export const TERNARY_WEIGHTS = Array.of(81, 27, 9, 3, 1);

export function toQ16(num) {
  return Math.round(num * Q16_ONE) | 0;
}

export function formatQ16Hex(q16) {
  const unsigned = q16 >>> 0;
  return "0x" + unsigned.toString(16).padStart(8, "0");
}

// Evaluate 5-trit balanced ternary array where each trit is -1, 0, or +1 (range -121..+121)
export function evalBalancedTernary(trits) {
  let sum = 0;
  for (let i = 0; i < 5; i += 1) {
    const t = trits.at(i) || 0;
    sum += t * TERNARY_WEIGHTS.at(i);
  }
  return sum;
}

export function formatBalancedTernary(trits) {
  return trits.map((t) => (t === 1 ? "+" : t === -1 ? "-" : "0")).join(" ");
}

// Project scalar value in [-121, +121] onto a 5-cell Unicode Braille bar (U+2800..U+28FF)
export function toBrailleBar(value, maxAbs = 121) {
  const levels = Array.of(0x2800, 0x2840, 0x2844, 0x2846, 0x2847, 0x28c7, 0x28e7, 0x28f7, 0x28ff);
  const clamped = Math.max(-maxAbs, Math.min(maxAbs, value));
  const totalEighths = Math.round(((clamped + maxAbs) / (2 * maxAbs)) * 40);
  const cells = Array.of();
  for (let c = 0; c < 5; c += 1) {
    const cellFill = Math.max(0, Math.min(8, totalEighths - c * 8));
    cells.push(String.fromCodePoint(levels.at(cellFill)));
  }
  return cells.join("");
}

// Deterministic Euclidean rhythm generator: distributes k pulses evenly across n steps
export function computeEuclideanPattern(pulses, steps) {
  const n = Math.max(2, Math.min(16, steps | 0));
  const k = Math.max(0, Math.min(n, pulses | 0));
  const pattern = Array.of();
  for (let i = 0; i < n; i += 1) {
    pattern.push(((i * k) % n) < k ? 1 : 0);
  }
  return pattern;
}

export function patternToBraille(pattern) {
  const cells = Array.of();
  for (let i = 0; i < pattern.length; i += 2) {
    const a = pattern.at(i) ? 0x07 : 0x00;
    const b = pattern.at(i + 1) ? 0x38 : 0x00;
    cells.push(String.fromCodePoint(0x2800 + a + b));
  }
  return cells.join("") || "\u2800";
}
