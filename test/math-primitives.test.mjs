import test from "node:test";
import assert from "node:assert/strict";
import {
  evalBalancedTernary,
  toBrailleBar,
  computeEuclideanPattern,
} from "../src/math-primitives.js";

test("1. Balanced ternary evaluates (-121..+121) and projects 5-cell Braille", () => {
  assert.equal(evalBalancedTernary(Array.of(0, 0, 0, 0, 0)), 0);
  assert.equal(evalBalancedTernary(Array.of(1, 1, 1, 1, 1)), 121);
  assert.equal(evalBalancedTernary(Array.of(-1, -1, -1, -1, -1)), -121);
  assert.equal(toBrailleBar(0).length, 5);
});

test("2. Euclidean rhythm generator distributes pulses evenly", () => {
  assert.deepEqual(computeEuclideanPattern(3, 8), Array.of(1, 0, 0, 1, 0, 0, 1, 0));
  assert.deepEqual(computeEuclideanPattern(5, 8), Array.of(1, 0, 1, 0, 1, 1, 0, 1));
});
