# How Can Three Numbers (-1, 0, +1) and Simple Division Build Music You Can Feel in Braille?

**Plain-Language Explainer Tile (Altitude A7)**  
**Companion Software:** `Borealiscodes/ndh-acoustic-math-toys` (`commit f4bd0fd`)  
**Author:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • Dublin 8, Ireland)  
**Date:** November 21, 2026  

---

## Toy 1: What Is Balanced Ternary—and Why Does It Love Symmetry?

Almost every computer you have ever used thinks in **binary**—just two switches: **`0`** (off) and **`1`** (on). To represent negative numbers in binary, computers have to add extra sign-bit tricks.

**Balanced Ternary** uses **three** states instead of two:
* **`-1`** (pull left / minus)
* **`0`** (quiet center / equilibrium)
* **`+1`** (push right / plus)

### Why Powers of 3 (`81, 27, 9, 3, 1`) Are Like a Balance Scale
Imagine an old-fashioned brass balance scale with five special weights: **`1g, 3g, 9g, 27g, and 81g`**.
* You can put any weight on the **left pan** (`-1`), leave it **on the table** (`0`), or put it on the **right pan** (`+1`).
* With just those five switches (`Keys 1–5`), you can hit **every single whole number from `-121` all the way to `+121`** (`81 + 27 + 9 + 3 + 1 = 121`)—with **`0` sitting dead-center in total equilibrium**!
* When you flip a trit in Toy 1, your browser maps that position on the balance beam to a gentle two-note chord on the **`D–E–G–A–B` pentatonic scale** (panned slightly left for the `D4` anchor and slightly right for the moving note) and updates a **5-cell Unicode Braille bar (`U+2800–U+28FF`)** so you can read the balance both by ear and by touch!

### What Is `Q16.16` Fixed-Point Math?
Ordinary decimal numbers (`0.3333333...`) can round differently on different phones or laptops. **`Q16.16` fixed-point math** avoids decimal drift by multiplying every number by **`65,536` (`2^16`)** and storing it as a rock-solid whole integer—displayed in clean hexadecimal like `0x00000000` at equilibrium!

---

## Toy 2: How Does One Division Formula Invent World Rhythms? (`E(k, n)`)

Suppose you have **`n = 8` drumbeats** in a measure, and you want to space **`k = 3` drum hits** as evenly as possible—without lumpy clusters.

In 2004, computer scientist Godfried Toussaint noticed that spacing `k` hits evenly across `n` steps uses the **exact same math** Euclid wrote over 2,300 years ago to find the greatest common divisor of two numbers!

### The Modulo Shortcut (`(i * k) % n < k`)
Instead of complicated loops, Toy 2 checks every step `i` (`0, 1, 2, ...`) with one tiny remainder calculation:
1. Multiply the step number `i` by the number of pulses `k`.
2. Divide by total steps `n` and look at the **remainder (`%`)**.
3. If that remainder is smaller than `k`, **hit the drum (`●`)**; otherwise, **leave a quiet breath (`·`)**!

Try these real-world patterns in Toy 2 right now:
* **`E(3, 8)`** = `[1 0 0 1 0 0 1 0]` → The classic Cuban *tresillo* and Celtic slip-jig pulse.
* **`E(5, 8)`** = `[1 0 1 0 1 1 0 1]` → The traditional *cinquillo* heartbeat.
* **`E(6, 15)`** = `[1 0 0 1 0 1 0 0 1 0 1 0 0 1 0]` → A rolling 15-step cycle where step `0` rings a warm `D3` *bodhrán* / *taiko* downbeat plus an `A4` pentatonic chime!

---

## Why Everything Runs Under `780 Hz`

Just like our Zen sanctuaries, every tone in **NDH Acoustic Math Toys** passes through a **`780 Hz` low-pass filter** with gentle fade-in and fade-out envelopes—keeping the bass warm, the treble soft on neurodivergent ears, and every mathematical pattern immediately legible by sound, Braille, and `aria-live` text!

---

**Provenance & License:**  
`Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>` • Creative Commons Attribution 4.0 International (`CC-BY-4.0`) / MIT License.
