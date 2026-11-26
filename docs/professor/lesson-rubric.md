# Lumio lesson rubric (Professor, 26 Nov 2026)

Purpose: decide in under 10 minutes, by reading the lesson module (and opening it once), whether a Lumio lesson is good. 15 items, each strictly PASS or FAIL. A lesson passes an item only if the evidence is visible in the shipped code or UI; "planned" or "in v1 only" is FAIL. Content that is absent counts as FAIL (nothing is "not applicable"), except where an item says so.

How to score: write one line of evidence per item (string key, file:line, or what you saw when you ran it). Report `n/15`.
Tiers for the pitch (our own convention, not a standard): 12-15 = "complete", 8-11 = "solid lab, needs teaching layer", 0-7 = "demo, do not present as a lesson".

## A. Teaching design

| # | Item (PASS when...) | How to check |
|---|---|---|
| R1 | One learning objective, in a student's words, is visible in the lesson ("You will be able to..."). A quest title ("make Δ = 0") is a task, not an objective. | Look for one sentence under the title. |
| R2 | The student acts first (moves a slider, predicts, answers) before any explanation is shown. | The first screen has a control, not text to read. |
| R3 | After acting, the rule is stated in one or two sentences with its formula and units (a short summary or reactive hint that names the rule). | Find the string that states the rule. |
| R4 | Every exercise has one unambiguous correct answer, or the accepted set is stated on screen (e.g. "either answer counts"). | Read each exercise and its `ok`/`ans` code. |
| R5 | The numeric tolerance matches the science and the visible result: an accepted answer must not look wrong on screen. | Propagate the tolerance to the displayed quantity (e.g. R ∝ v², so ±3 % on v is ±6 % on R). |
| R6 | A wrong answer or a wrong approach gets feedback that targets the likely misconception, not only "try again" or the bare answer. At least one targeted message per exercise type. | List the strings shown after a miss. |
| R7 | Hint ladder of at least 3 steps (nudge, method, worked step), reachable by the student on demand. | Count the hint levels in code. |
| R8 | Difficulty ramp: at least 3 clearly different difficulty steps in order, and no exercise is already solved by the start state. | Run it and check the first exercise against the default values. |
| R9 | At least one transfer question: the same idea in a new context (new variable, new situation, reversed question). | Find the exercise that is not a repeat. |

## B. Correctness and language

| # | Item (PASS when...) | How to check |
|---|---|---|
| R10 | Formulas and units are shown and correct. g is 9.8 or 9.81, one value, stated. A simplified model says it is simplified. No statement is false in general (e.g. "always", "billions"). | Recompute 2 numbers by hand per lesson. |
| R11 | Every symbol and technical word a student meets is defined once in the lesson (N, n, R, vx, root, vertex...). | List symbols on screen; find a definition for each. |
| R12 | Natural Romanian and English, same meaning in both, one word per concept (Lumens, never XP), correct diacritics. | Read both languages side by side. |

## C. Fit and access

| # | Item (PASS when...) | How to check |
|---|---|---|
| R13 | The core path takes 3 to 5 minutes (count steps; optional extras may be longer). | Count exercises x ~40 s + reading. |
| R14 | Accessible: every control works by keyboard, labels and `aria-live` feedback exist, meaning is never colour-only, Reduce motion is respected, text is in tokens with enough contrast. | Tab through it; check `aria-*`, `prefers-reduced-motion`. |
| R15 | Every number and promise in the UI matches what the code does (reward amounts, counts, quest wording, lesson title vs content). | Compare each string with the `award()`/`report()` call it describes. |

## Evidence rules for the jury
- A claim is "demonstrated" only if it is one of these 15 checks and was run or read (this file, `docs/professor/lesson-audit.md`).
- "Learning gain", "retention", "students liked it" are NOT demonstrated until we have data (pre/post test, consent for under-18). Never write "proven".
- Prefer measurable phrases: "each level has 3 hints, a formula and a worked example", not "excellent feedback".

## Improvement rules (safe before a freeze)
Safe = copy, hints, feedback strings, labels, tolerance wording. Not safe = scoring, state, generators, thresholds, registry. A change that needs one line of code to choose between two strings is listed as "tiny code" and still must not change awards, progress keys or state shape. PARITY RULE applies: wording may improve, v1 or earlier v2 features are never removed without Eduard.
