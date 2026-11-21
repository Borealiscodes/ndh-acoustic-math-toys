import {
  Q16_ONE,
  TERNARY_WEIGHTS,
  formatQ16Hex,
  evalBalancedTernary,
  formatBalancedTernary,
  toBrailleBar,
  computeEuclideanPattern,
  patternToBraille,
} from "./math-primitives.js";
import { createAcousticToyEngine } from "./acoustic-engine.js";

export function initMathToysApp() {
  const engine = createAcousticToyEngine();

  // Toy 1: Balanced Ternary & Q16.16 Acoustic Scale
  let trits = Array.of(0, 0, 0, 0, 0);
  const tritDeck = document.getElementById("trit-deck");
  const ternaryReadout = document.getElementById("ternary-readout");
  const ternaryBraille = document.getElementById("ternary-braille");
  const ternaryZeroBtn = document.getElementById("btn-ternary-zero");

  const cycleTrit = (idx) => {
    engine.unlock();
    const cur = trits.at(idx);
    const next = cur === 0 ? 1 : cur === 1 ? -1 : 0;
    trits = trits.map((v, i) => (i === idx ? next : v));
    renderTernary(true);
  };

  const renderTernary = (playSound = false) => {
    const val = evalBalancedTernary(trits);
    const q16 = Math.round((val / 121) * Q16_ONE) | 0;
    const braille = toBrailleBar(val, 121);
    const sym = formatBalancedTernary(trits);

    if (tritDeck) {
      tritDeck.innerHTML = "";
      trits.forEach((t, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        const label = t === 1 ? "+1" : t === -1 ? "-1" : "0";
        btn.textContent = "Key " + (idx + 1) + " (×" + TERNARY_WEIGHTS.at(idx) + "): " + label;
        btn.setAttribute("aria-label", "Trit " + (idx + 1) + ", weight " + TERNARY_WEIGHTS.at(idx) + ", value " + label);
        btn.addEventListener("click", () => cycleTrit(idx));
        tritDeck.appendChild(btn);
      });
    }

    if (ternaryBraille) ternaryBraille.textContent = braille;
    if (ternaryReadout) {
      ternaryReadout.textContent =
        "Trits (" + sym + ") = " + val + " (range -121..+121) • Q16.16 Normalized: " + q16 + " (" + formatQ16Hex(q16) + ") • Braille: " + braille;
    }
    if (playSound) engine.playTernaryChord(val);
  };

  ternaryZeroBtn?.addEventListener("click", () => {
    engine.unlock();
    trits = Array.of(0, 0, 0, 0, 0);
    renderTernary(true);
  });

  // Toy 2: Euclidean & Pentatonic Rhythm Mandala
  let pulses = 5;
  let steps = 8;
  let playing = false;
  let stepIdx = 0;
  let timer = null;

  const eucPlayBtn = document.getElementById("btn-euc-play");
  const eucPulseDec = document.getElementById("btn-pulse-dec");
  const eucPulseInc = document.getElementById("btn-pulse-inc");
  const eucStepDec = document.getElementById("btn-step-dec");
  const eucStepInc = document.getElementById("btn-step-inc");
  const eucReadout = document.getElementById("euc-readout");
  const eucBraille = document.getElementById("euc-braille");
  const eucCells = document.getElementById("euc-cells");

  const renderEuclidean = () => {
    pulses = Math.max(0, Math.min(steps, pulses));
    const pat = computeEuclideanPattern(pulses, steps);
    const braille = patternToBraille(pat);
    if (eucBraille) eucBraille.textContent = braille;
    if (eucReadout) {
      eucReadout.textContent = "E(" + pulses + ", " + steps + ") = (" + pat.join(" ") + ") • Braille: " + braille;
    }
    if (eucCells) {
      eucCells.innerHTML = "";
      pat.forEach((bit, idx) => {
        const span = document.createElement("span");
        span.className = "step-pill" + (bit ? " pulse" : "") + (playing && idx === stepIdx ? " active" : "");
        span.textContent = bit ? "●" : "·";
        eucCells.appendChild(span);
      });
    }
  };

  const toggleEuclideanPlay = () => {
    engine.unlock();
    playing = !playing;
    if (eucPlayBtn) eucPlayBtn.textContent = playing ? "⏸ Pause Rhythm (Space)" : "▶ Play Euclidean Rhythm (Space)";
    if (playing) {
      stepIdx = 0;
      timer = window.setInterval(() => {
        const pat = computeEuclideanPattern(pulses, steps);
        const cur = stepIdx % pat.length;
        engine.playEuclideanStep(pat.at(cur) === 1, cur, pat.length);
        renderEuclidean();
        stepIdx = (cur + 1) % pat.length;
      }, 280);
    } else if (timer) {
      window.clearInterval(timer);
      timer = null;
      renderEuclidean();
    }
  };

  eucPlayBtn?.addEventListener("click", toggleEuclideanPlay);
  eucPulseDec?.addEventListener("click", () => { pulses = Math.max(0, pulses - 1); renderEuclidean(); });
Use code with caution.
eucPulseInc?.addEventListener("click", () => { pulses = Math.min(steps, pulses + 1); renderEuclidean(); });
eucStepDec?.addEventListener("click", () => { steps = Math.max(2, steps - 1); renderEuclidean(); });
eucStepInc?.addEventListener("click", () => { steps = Math.min(16, steps + 1); renderEuclidean(); });
window.addEventListener("keydown", (ev) => {
if (Array.of("1", "2", "3", "4", "5").includes(ev.key)) {
cycleTrit(Number(ev.key) - 1);
} else if (ev.key === "0") {
trits = Array.of(0, 0, 0, 0, 0);
renderTernary(true);
} else if (ev.key === " ") {
ev.preventDefault();
toggleEuclideanPlay();
} else if (ev.key === "w" || ev.key === "W") {
pulses = Math.min(steps, pulses + 1);
renderEuclidean();
} else if (ev.key === "s" || ev.key === "S") {
pulses = Math.max(0, pulses - 1);
renderEuclidean();
} else if (ev.key === "d" || ev.key === "D") {
steps = Math.min(16, steps + 1);
renderEuclidean();
} else if (ev.key === "a" || ev.key === "A") {
steps = Math.max(2, steps - 1);
renderEuclidean();
}
});
renderTernary(false);
renderEuclidean();
}
if (typeof document !== "undefined") {
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", initMathToysApp);
} else {
initMathToysApp();
}
}
