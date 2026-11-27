# Spec 1: Binary numbers / Numere binare (Professor, 27 Nov). Read docs/professor/stem-roadmap.md section 4 (common contract C1-C12) first.
Build-ready. No canvas, no engine, no new shared code. Gives the NEW Computer science galaxy its first playable lesson.

## 1 Identity
| Field | Value |
|---|---|
| File | v2/modules/cs/binary.js (copy the structure of math/linear.js, drop the canvas and the quick check) |
| Manifest | {id:'binary', subject:'cs', subjectName:['Computer science','Informatică'], color:'--cs', title:['Binary numbers','Numere binare'], order:1, tags:['lab','quest'], orbit:[0.6,70] (David checks overlap)} |
| Storage | lumio2_binary {v:1, ex:[...]} |
| Registry | features unchanged; lesson line "cs/binary" LAST commit after Tester PASS. BLOCKER: Designer token --cs (roadmap section 3) |
| Build time | 3 h (about 2 h module, 1 h strings and tests) |
| Phone LAB | none: toggles only, no slider (omit ctx.controls; "Absent = no controller") |

## 2 Objective (shown under the title, R1)
EN: I can turn any number from 0 to 255 into 8 bits, and read 8 bits back as a number.
RO: Pot transforma orice număr de la 0 la 255 în 8 biți și pot citi 8 biți ca număr.

## 3 Flow (about 4 minutes)
1. First screen (R2): title, objective line, eight toggle buttons (all 0), tiles. Prompt line: "Switch bits on and off. Watch the Decimal tile." / "Pornește și oprește biți. Urmărește fișa Zecimal." No explanation text yet.
2. After 3 toggles (or when exercise 1 is shown as current, whichever comes first, tiny counter `moves`) the rule card appears (section 5) and the exercise list unlocks as current exercise 1. The reactive sum line already works from toggle 1 ("8 + 4 + 1 = 13").
3. Exercises 1 to 3 (set a number, ramp 5, 13, 100), exercise 4 (typed transfer).
4. Done state: "All 4 exercises done · +15 Lumens bonus" (same string as linear), Continue button (U.cont).

## 4 Lab
- Eight toggle buttons in a row, left to right 128 64 32 16 8 4 2 1 (place values printed ABOVE each button in mono; the button shows "0" or "1" as text, never only colour; aria-pressed; aria-label "bit worth 8, off" / "bitul de valoare 8, oprit"). Space or Enter toggles. Fine pointer 32 px high, coarse 44 (as other labs).
- Tiles (U.tiles): Binary `00001101` (mono, grouped as 0000 1101); Decimal `13`; Bits on `3`; Sum line under the tiles `8 + 4 + 1 = 13` (empty = `0`). Reading is also set as the aria-live status.
- Chips: "Clear" (all off), "+1" (adds 1 to the number, wraps 255 to 0 so the student sees the carry), "Double" is NOT added (keeps the lesson small).
- Start state ST = all bits 0 (value 0). Exercise 1 needs 5, so the start does not solve it (R8). State persists across re-render in ST (not in storage).
- No canvas, so no ResizeObserver or Loop; Reduce motion has nothing to disable (no animation).

## 5 Explanation cards (after the student has acted; formula, units, definitions)
Card A, rule (3 lines):
- EN: A bit is one switch: 0 (off) or 1 (on). Each place is worth double the place on its right: 1, 2, 4, 8, 16, 32, 64, 128. The number is the sum of the places that are on.
- RO: Un bit este un comutator: 0 (oprit) sau 1 (pornit). Fiecare loc valorează dublul locului din dreapta lui: 1, 2, 4, 8, 16, 32, 64, 128. Numărul este suma locurilor pornite.
Card B, worked example (numbers differ from the exercises):
- EN: Show 6. The biggest place that fits is 4: 6 − 4 = 2. The biggest place that fits in 2 is 2: 2 − 2 = 0. So 4 and 2 are on: 00000110.
- RO: Arată 6. Cel mai mare loc care încape este 4: 6 − 4 = 2. Cel mai mare loc care încape în 2 este 2: 2 − 2 = 0. Deci 4 și 2 sunt pornite: 00000110.
Definitions line (once): "byte = 8 bits" / "octet = 8 biți"; "place value = what a switched-on bit adds" / "valoarea locului = ce adaugă un bit pornit". 8 bits show 2⁸ = 256 different values, 0 to 255 (2ⁿ values for n bits; the largest is 2ⁿ − 1).

## 6 Exercises (C3 format; exact match, no tolerance for integers)
| # | Kind | Text EN / RO | Check | Verified answer |
|---|---|---|---|---|
| 1 | lab | Show the number 5. / Arată numărul 5. | value === 5 | 4 + 1 = 5, bits 00000101 (the only pattern) |
| 2 | lab | Show the number 13. / Arată numărul 13. | value === 13 | 8 + 4 + 1 = 13, 00001101 |
| 3 | lab | Show the number 100. / Arată numărul 100. | value === 100 | 64 + 32 + 4 = 100, 01100100 |
| 4 | type (transfer, new context) | Use only the four right-hand bits (8, 4, 2, 1). What is the largest number they can show? / Folosește doar cei patru biți din dreapta (8, 4, 2, 1). Care este cel mai mare număr pe care îl pot arăta? | typed integer === 15 (accepts "15"; Enter) | 8 + 4 + 2 + 1 = 15 = 2⁴ − 1 |
Unambiguous: each binary pattern gives one number and each number one pattern (R4). The typed field does NOT print the accepted value (it would give the answer away); it prints "A whole number" / "Un număr întreg".
Difficulty ramp (R8): 5 uses two places, 13 three places, 100 needs a large place chosen by subtraction, 4 asks the reverse reasoning in a smaller system.

## 7 Misconception feedback (react(), C4; at least 2 per lab exercise, 3 for the typed one)
| Exercise | Trigger | EN | RO |
|---|---|---|---|
| 1 | the 16 place is on and value is 16 (student counted "the 5th bit") | That bit is worth 16, not 5. Places are worth 1, 2, 4, 8, 16: each is double the one before. | Bitul acela valorează 16, nu 5. Locurile valorează 1, 2, 4, 8, 16: fiecare e dublul celui dinainte. |
| 1-3 | value > target | The total is {v}, more than {t}. Switch off the biggest place that is too large. | Totalul este {v}, mai mult de {t}. Oprește cel mai mare loc care e prea mare. |
| 1-3 | 0 < value < target | The total is {v}. You still need {d} more: which place is worth {d} or less? | Totalul este {v}. Mai ai nevoie de {d}: care loc valorează {d} sau mai puțin? |
| 3 | the 128 place is on | 128 is bigger than 100, so it must stay off. | 128 este mai mare decât 100, deci trebuie să rămână oprit. |
| 4 | typed 16 | 16 counts the patterns (0 to 15 is 16 values), but the largest number is 15. | 16 numără combinațiile (de la 0 la 15 sunt 16 valori), dar cel mai mare număr este 15. |
| 4 | typed 8 | 8 is only the biggest place. Add all four places that are on: 8 + 4 + 2 + 1. | 8 este doar cel mai mare loc. Adună toate cele patru locuri pornite: 8 + 4 + 2 + 1. |
| 4 | typed 1111 (pattern, not number) | 1111 is the pattern. As a number it is 8 + 4 + 2 + 1. Type that sum. | 1111 este șablonul. Ca număr este 8 + 4 + 2 + 1. Scrie suma. |
| 4 | fallback | Not quite. Switch on the four right bits in the lab and read the Decimal tile. | Nu chiar. Pornește cei patru biți din dreapta în laborator și citește fișa Zecimal. |

## 8 Hint ladder (C5, 3 levels; level 3 is a worked step with other numbers)
| # | 1 nudge | 2 method | 3 worked step |
|---|---|---|---|
| 1 | Each bit adds its place value when it is on. | Take the biggest place that fits in 5, subtract, repeat. | Example with 6: 4 fits, 6 − 4 = 2; 2 fits, 2 − 2 = 0. So 4 and 2 are on. |
| 2 | Start from the biggest place that is not above 13. | 13: 8 fits, 13 − 8 = 5; then 5 → 4 fits, remainder 1. | Example with 11: 8 fits, 11 − 8 = 3; 2 fits, 3 − 2 = 1; 1 fits. 8 + 2 + 1. |
| 3 | The first place to test is 64 (is 128 too big?). | Subtract again after each place you choose. | Example with 72: 64 fits, 72 − 64 = 8; 8 fits. So 64 and 8 are on. |
| 4 | Switch on the four right bits and read the Decimal tile. | Add 8 + 4 + 2 + 1. | Example with 3 bits (4, 2, 1): 4 + 2 + 1 = 7, which is 2³ − 1. |
(RO strings: David copies the EN structure; Professor reviews them at the Tester stage. Key RO terms: loc, valoare, bit pornit / oprit, rest.)

## 9 Lumens and quest
Common contract C2: 4 exercises x 10 + 15 bonus = 55 Lumens, first completion only. ctx.report({qt:4}). No Moon.

## 10 Overview data (C9, inert)
mins 4, ex 4. Intro EN/RO = the objective plus "Computers store everything as 0 and 1." / "Calculatoarele păstrează totul ca 0 și 1." Takeaways (5):
1 A bit is a switch: 0 is off, 1 is on. / Un bit e un comutator: 0 înseamnă oprit, 1 pornit.
2 Each place is worth double the one on its right: 1, 2, 4, 8, 16, 32, 64, 128. / Fiecare loc valorează dublul celui din dreapta lui: 1, 2, 4, 8, 16, 32, 64, 128.
3 The number is the sum of the places that are on: 00001101 = 8 + 4 + 1 = 13. / Numărul este suma locurilor pornite: 00001101 = 8 + 4 + 1 = 13.
4 To write a number, take the biggest place that fits, subtract, repeat. / Ca să scrii un număr, ia cel mai mare loc care încape, scade, repetă.
5 n bits show 2ⁿ values, from 0 to 2ⁿ − 1: 8 bits show 0 to 255. / n biți arată 2ⁿ valori, de la 0 la 2ⁿ − 1: 8 biți arată de la 0 la 255.

## 11 Implementation notes for David
Reuse: U.el, U.tiles, U.chips, U.cont, ctx.report / award / fx.ok / fx.bad / fx.burst, the linear.js load/save/exercise-list/hint code, num() (linear.js, copy). New code: the bit-toggle row (about 15 lines), sum line, react() table, typed field. No canvas. Keep `ST={bits:[0,0,0,0,0,0,0,0],moves:0,hn:0}`. Strings in an S table like linear.js. Estimated about 120 lines.
Rubric self-check: R1 objective line; R2 controls first; R3 card A names rule; R4 unique; R5 integers, no tolerance; R6 8 messages; R7 4x3 hints; R8 ramp; R9 exercise 4; R10 no false claim (2ⁿ values); R11 bit, place, byte defined; R13 about 4 min; R14 text 0/1 plus aria; R15 55 Lumens string equals code.

## 12 Acceptance checklist (Tester)
T-common (roadmap section 4) plus:
1 Verified numbers recomputed independently: 5 = 00000101; 13 = 00001101; 100 = 01100100; 15 = 1111; 8 bits = 0..255 (2⁸ = 256 values).
2 Start value is 0; no exercise solved by the start; "+1" at 255 wraps to 0 and the Binary tile reads 00000000.
3 Exercise 1: set bits for 5 only. Setting 16 shows the "worth 16, not 5" message. Value 7 (> 5) shows the over message; value 3 shows "You still need 2 more".
4 Exercise 4: type 15 passes; 16, 8, 1111, 4, empty: each gives its message or the fallback; empty does nothing; "15 " with a space and "15.0" pass (num()); "15,0" passes in RO.
5 Lumens: 10, 10, 10, 10 + 15 = 55 once; reload and redo = no award; blocked storage = lesson works from memory.
6 Keyboard: Tab through 8 bits (visible focus), Space toggles, Enter in the typed field submits.
7 Contrast of the 0/1 text in Light and Dark with the --cs token (tools/contrast.py); labels do not rely on colour.
8 Overlap check of the new cs galaxy with the other 4 in the home view at 1273 and 390.
