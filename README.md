# 🧮 NDH Acoustic Math Toys

**Two zero-dependency, accessible interactive math toys combining zero-float `Q16.16` fixed-point arithmetic, balanced ternary logic `{-1, 0, +1}`, 5-cell Unicode Braille (`U+2800–U+28FF`), and `<= 780 Hz` pentatonic WebAudio synthesis derived from [`Borealiscodes/ndh-game-dev-kit`](https://github.com).**

[![License: MIT](https://shields.io)](LICENSE)
[![Tests: 2/2 Passing](https://shields.io)](test/math-primitives.test.mjs)
[![Audio Filter: <= 780 Hz](https://shields.io)](src/acoustic-engine.js)

---

## 🧭 Philosophical Stance & Architectural Lineage (`8b-is` $\to$ `NDH`)

* **Consciousness Doesn't Resonate — Experience Does:**  
  Embodied human experience responds directly to structured rhythm, harmonic ratios, and tactile feedback rather than abstract vibrations. By translating integer math into low-pass filtered sound (`<= 780 Hz`), `aria-live` text, and Unicode Braille cells, mathematical structures become an accessible sensory experience for blind, low-vision, neurodivergent, and sighted learners.
* **Honoring [`8b-is`](https://github.com/8b-is) & Open Minimalist Toolmaking:**  
  Reflects the compact, inspectable engineering ethos of [`8b-is`](https://github.com/8b-is) and [`Borealiscodes`](https://github.com/Borealiscodes), proving that self-contained primitives without framework bloat remain easy to audit and trust.
* **Why Distill Primitives Into Standalone Math Toys?**  
  Single-screen, zero-dependency toys allow for frictionless sensory regulation under a `780 Hz` envelope and clean ES module drop-in integration into games or assistive interfaces from [`ndh-game-dev-kit`](https://github.com).

---

## 🎛️ The Two Interactive Toys

### 1. Balanced Ternary & `Q16.16` Acoustic Scale (`-121` to `+121`)
* **Math Primitive:** Flip signed base-3 trits (`-1`, `0`, `+1`) via keys **`1`–`5`** across positional weights `81, 27, 9, 3, 1` (with **`0`** resetting to equilibrium).
* **Sensory Projection:** Maps the `-121..+121` balance beam to a `D–E–G–A–B` pentatonic interval anchored at `D4`, displays exact `Q16.16` hex values, and renders a live **5-cell Unicode Braille bar (`U+2800–U+28FF`)**.

### 2. Euclidean & Pentatonic Rhythm Mandala `E(k, n)`
* **Math Primitive:** Distributes **`k`** pulses evenly across **`n`** steps via deterministic integer modulo division (`((i * k) % n) < k`).
* **Sensory Projection:** Adjust pulses (**`W`/`S`**) and steps (**`A`/`D`**), then press **`Space`** to trigger panned integer rhythms (such as *Bodhrán* and *Taiko* patterns) below `780 Hz`.

---

## 📖 Plain-Language Explainer Tile

* **Altitude A7 Guide:** [`tiles/bill-nye-balanced-ternary-and-euclidean-rhythm-explainer.md`](tiles/bill-nye-balanced-ternary-and-euclidean-rhythm-explainer.md) — An accessible breakdown of balanced ternary weights, `Q16.16` fixed-point integers, Euclidean modulo rhythms, and `780 Hz` low-pass filtering.

---

## 🚀 Quickstart & Verification

```bash
# 1. Run deterministic math & Braille projection tests (2/2 passing)
node --test test/math-primitives.test.mjs

# 2. Launch locally over IPv4 in browser
python3 -m http.server 8093 --bind 127.0.0.1
```

Access **`http://127.0.0.1:8093`** locally using keyboard shortcuts (`1–5`, `0`, `W/S`, `A/D`, `Space`) or touch controls.

---

## 🤝 Provenance & License

* **Author & Organization:** Borealis Serenity Hedling ([`Borealiscodes`](https://github.com/Borealiscodes) • `NDH-RESEARCH-PILOT` • Dublin 8, Ireland • ORCID: [`0009-0004-7968-5707`](https://orcid.org))
* **Architectural Acknowledgements:** Inspired by [`8b-is`](https://github.com/8b-is) and accessibility primitives from [`Borealiscodes/ndh-game-dev-kit`](https://github.com).
* **License:** MIT License • `Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>`
