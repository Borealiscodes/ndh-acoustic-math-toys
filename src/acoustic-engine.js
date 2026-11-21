/**
 * src/acoustic-engine.js — <= 780 Hz Low-Pass Filtered Pentatonic & Percussion Engine
 */
const DEGAB_SCALE = Array.of(146.83, 164.81, 196.00, 220.00, 246.94, 293.66, 329.63, 392.00, 440.00, 493.88, 587.33);

export function createAcousticToyEngine() {
  let ctx = null;
  let filter = null;
  let gain = null;

  const ensure = () => {
    if (!ctx && typeof window !== "undefined") {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
      filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(780, ctx.currentTime);
      gain = ctx.createGain();
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      filter.connect(gain);
      gain.connect(ctx.destination);
    }
    if (ctx && ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const tone = (freq, type, peak, attack, release, pan = 0) => {
    const c = ensure();
    if (!c) return;
    const now = c.currentTime;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(peak, now + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, now + attack + release);
    if (typeof c.createStereoPanner === "function") {
      const p = c.createStereoPanner();
      p.pan.setValueAtTime(pan, now);
      osc.connect(g);
      g.connect(p);
      p.connect(filter);
    } else {
      osc.connect(g);
      g.connect(filter);
    }
    osc.start(now);
    osc.stop(now + attack + release + 0.04);
  };

  return {
    unlock: () => ensure(),
    playTernaryChord: (scalarValue) => {
      const norm = (scalarValue + 121) / 242;
      const idx = Math.max(0, Math.min(DEGAB_SCALE.length - 1, Math.round(norm * (DEGAB_SCALE.length - 1))));
      tone(293.66, "sine", 0.05, 0.04, 0.9, -0.35);
      tone(DEGAB_SCALE.at(idx), "triangle", 0.065, 0.04, 1.0, 0.35);
    },
    playEuclideanStep: (isPulse, stepIndex, totalSteps) => {
      const pan = totalSteps > 1 ? (stepIndex / (totalSteps - 1)) * 1.2 - 0.6 : 0;
      if (isPulse) {
        tone(stepIndex === 0 ? 146.83 : 98.0, "sine", stepIndex === 0 ? 0.11 : 0.08, 0.015, 0.32, pan);
        if (stepIndex === 0) tone(440.0, "sine", 0.045, 0.02, 0.45, pan);
      } else {
        tone(293.66, "sine", 0.018, 0.01, 0.12, pan);
      }
    },
  };
}
