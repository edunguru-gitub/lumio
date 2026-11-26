# Lesson audit, v2 (Professor, 26 Nov 2026, freeze Fri 27 Nov 20:00)

Scope: the six modules live in the v2 registry (`v2/modules/math/algebra.js`, `parabola.js`, `pythagoras.js`, `physics/gas.js`, `optics.js`, `projectile.js`), read line by line and run in Chromium (Playwright, `v2/` served locally, EN UI). Rubric: `docs/professor/lesson-rubric.md` (15 items, PASS/FAIL). Ported lessons were compared with `app/lumio.html` (v1, reference only). No app code was edited. Nothing below changes scoring, state or progress keys.

## 0. Summary

| Lesson (card title) | Rubric | Biggest problem |
|---|---|---|
| Algebra (page title "Ink Practice") | 6/15 | Δ hint prints `−2²` for b = −2; wrong answer only reveals the number |
| Parabola | 7/15 | Hint says "slide c up to merge roots", false for a < 0 (the Frown chip shows it); RO says the curve is "above" the axis when it can be below |
| Geometry (= Pythagoras) | 9/15 | Quest text promises "+30 XP"; code pays 10/10/40 Lumens; 3 of the 4 reachable triples are preset buttons |
| Gas & piston | 7/15 | "pressure = hits per area" is wrong (force per area); quest closes with "+25 XP"; heating to 450 K gets no feedback |
| Optics | 1/15 | It is not an optics lesson: a bouncing ball and a spring piston, one gesture, no exercise |
| Projectile motion | 9/15 | Exercise 1 is solved by the first touch; Level 5 miss message reports the student's own guess as "landed at"; "45° always" is false in Level 4's own situation |

Cross-lesson findings (apply to all):
- C1. No v2 lesson has the v1 teaching layer. v1 has `LESSON.<id>.intro` and five `take` bullets per lesson (`app/lumio.html` L1726-1741 for quadratic, geometry and physics; the projectile def at L2312-2314) plus the podcast steps. `grep` of `v2/` for those strings finds nothing. So R1 fails everywhere and R3 depends on one-line reactive hints. Safest big win: port the existing v1 intro and `take` text (already EN and RO, already reviewed) as a closed `<details>` "Summary" under each lab (strip the `<b>` tags; ~20-30 min per lesson). One correction when porting the gas text: v1 says "billions of molecules"; 1 L of gas at 300 K and 1 atm holds n = pV/RT = 101325 · 0.001 / (8.314 · 300) = 0.0406 mol = 2.4 · 10²² molecules (billions of billions). Write "countless molecules" / "nenumărate molecule". `docs/spec-port-wave2.md` already lists this as optional "A-opt".
- C2. Currency word: Algebra, Gas and Pythagoras strings say "XP"; the shell pops "+N Lumens" (`gain()` in `shell.js`) and CLAUDE.md says Lumens. Fix in the strings listed below.
- C3. Tile labels are CSS-uppercased (`.tile small{text-transform:uppercase}`, `v2/css` line 224), so the formula labels read `Δ = B²−4AC`, `HYPOTENUSE C`, `AREA AB/2`. In maths, a, b, c are not A, B, C. Fix: `text-transform:none` on `.tile small` (CSS, one line, ask David) or drop the formula from the label.
- C4. Mobile (unverified, I only ran desktop): Algebra's input uses `inputMode='decimal'`. The iOS decimal keypad has no minus key, and many answers are negative (Δ, x_V, f(1)). Ask Tester to try it on an iPhone; if confirmed, use `inputMode='text'` (the ink pad is the other way in).
- C5. "Your first lesson" is Algebra (`tags:['quiz','first']`, the jury-lens "moment of truth"). It scores 6/15; its two cheapest fixes (hint, feedback) are in section 1.

---

## 1. Algebra (`math/algebra`, manifest "Algebra", page title "Ink Practice")

What it is: rounds of 5 generated questions on f(x) = ax² + bx + c: Δ, x_V, f(0), f(1), larger root. Exact integer answers, ink pad or typing, one hint button, +10 + min(streak,5)·2 Lumens per correct, +20 once for the first finished round.

| # | PASS/FAIL | Evidence |
|---|---|---|
| R1 | FAIL | No objective. h1 `S.title` = "Ink Practice" while the card says "Algebra" and the content is quadratics |
| R2 | PASS | First screen is a question and an input |
| R3 | FAIL | No rule statement after the answer; v1 `take` text not ported (C1) |
| R4 | PASS | `ok=+raw===Q.cur.ans`; answers are integers by construction (`b=-2·a·x`, a=1 for the root question) |
| R5 | PASS | Exact arithmetic, tolerance 0 is correct; accepts "," and "−" |
| R6 | FAIL | After a miss: only `no1` "Not quite. The answer was {ans}" (all 5 question types) |
| R7 | FAIL | One hint level: `h_<kind>` with values substituted; `h_root` is `(x − r₁)(x − r₂) = 0`, no method |
| R8 | FAIL | `genQ` draws each question independently from `['delta','xv','f0','f1','root','delta']`: no order, repeats possible (five f(0) in a row happens); f(0)=c is a read-off, root is the hardest |
| R9 | FAIL | No transfer question |
| R10 | FAIL | Hint for Δ: see below |
| R11 | FAIL | "root", "vertex" never defined; Δ and x_V are defined by the question text itself |
| R12 | FAIL | RO `no1` "Aproape." means "Almost", said even when the answer is far off; title mismatch |
| R13 | PASS | A round is 5 questions, about 2 to 3 minutes |
| R14 | PASS | `<label>`, `aria-live` on feedback, Enter to check, Read aloud; the 5 progress dots are colour-only but "n / 5" and the feedback text carry the meaning |
| R15 | PASS | Reward and round strings match the code |

Factual and wording errors
1. `h_delta` is `Δ = b² − 4·a·c = {b}² − 4·({a})·({c})`. For b < 0 the hint prints `−2² − 4·(−2)·(−2)`. Read literally, −2² = −4, so the hint evaluates to −4 − 16 = −20, but the correct Δ is (−2)² − 4·(−2)·(−2) = 4 − 16 = −12. Seen in the run: "f(x) = −2x² − 2x − 2 => Δ = b² − 4·a·c = −2² − 4·(−2)·(−2)". The same string exists in v1 (L1332), so this is an inherited bug, not a port bug.
2. `h_root` gives no method. For x² − 3x + 2 the useful hint is "r₁ + r₂ = 3, r₁·r₂ = 2".
3. EN praise `ok3` "Sharp." is fine; RO `no1` "Aproape." is misleading (see R12). v1 RO had the same word.
4. Feedback timing: after a miss the next question replaces the feedback after 1.9 s (`ok?1100:1900`). Any longer feedback text needs about 3.5 s.

Feedback/hint weaknesses: the miss message never says which step probably went wrong. The three likeliest slips are cheap to name (sign of b², forgetting the minus in −b/2a, adding instead of subtracting 4ac).

Safe improvements (priority order, each under 1 hour)
1. Fix the Δ hint brackets (string only, 2 min).
   - `h_delta` EN: `Δ = b² − 4·a·c = ({b})² − 4·({a})·({c})`
   - `h_delta` RO: `Δ = b² − 4·a·c = ({b})² − 4·({a})·({c})`
2. Give the root hint a method (string only, 3 min; uses existing `{b}`,`{c}`; a = 1 always here, so "x² + bx + c"):
   - `h_root` EN: `For a = 1: r₁ + r₂ = −({b}) and r₁ · r₂ = {c}. Find two numbers with that sum and product.`
   - `h_root` RO: `Pentru a = 1: r₁ + r₂ = −({b}) și r₁ · r₂ = {c}. Găsește două numere cu această sumă și acest produs.`
3. Honest title and objective (strings 5 min, plus one `U.el('p',t('obj'),'k')` line):
   - `title` EN `Practice: quadratic functions` / RO `Exersare: funcția de gradul II`
   - new `obj` EN `Goal: compute Δ, the vertex, f(0), f(1) and the larger root of f(x) = ax² + bx + c.` / RO `Scop: calculezi Δ, vârful, f(0), f(1) și rădăcina mai mare a funcției f(x) = ax² + bx + c.`
4. Wrong-answer feedback that names the likely slip (tiny code: after `t('no1')` append `t('n_'+q.k)`; also raise the miss delay from 1900 to 3500 ms; no scoring change):
   - `n_delta` EN `Check the signs: b² is never negative, and −4ac changes sign when a or c is negative.` / RO `Verifică semnele: b² nu e niciodată negativ, iar −4ac își schimbă semnul când a sau c e negativ.`
   - `n_xv` EN `Do not forget the minus: x_V = −b / (2a).` / RO `Nu uita minusul: x_V = −b / (2a).`
   - `n_f0` EN `At x = 0 every term with x disappears, so f(0) = c.` / RO `La x = 0 dispar toți termenii cu x, deci f(0) = c.`
   - `n_f1` EN `At x = 1 every power of x is 1, so f(1) = a + b + c. Add them with their signs.` / RO `La x = 1 orice putere a lui x este 1, deci f(1) = a + b + c. Adună-le cu semnele lor.`
   - `n_root` EN `Check your pair: the two roots add up to −b and multiply to c.` / RO `Verifică perechea: suma rădăcinilor este −b, iar produsul lor este c.`
5. Wrong-answer wording (string only, 1 min):
   - `no1` EN `Not quite. The answer was {ans}` (keep) / RO `Nu e corect. Răspunsul era {ans}`

Not safe before freeze (decide after): ordered difficulty per round (generator), a transfer question, `inputMode` (C4).

---

## 2. Parabola (`math/parabola`)

What it is: sliders a (−5..5, step 0.5), b (−10..10), c (−8..8); 4 preset chips; tiles for Δ, vertex, roots, axis; one quest "make Δ = 0 (a ≠ 0)" (+20 Lumens once).

| # | PASS/FAIL | Evidence |
|---|---|---|
| R1 | FAIL | Only a quest; no objective |
| R2 | PASS | Sliders first |
| R3 | FAIL | Δ formula is in a tile label; vertex and root formulas are never stated (v1 `take`, C1) |
| R4 | PASS | `L.quest=a!==0&&D===0` |
| R5 | PASS | a is a multiple of 0.5, so 4ac is an integer; `D===0` is exact in floating point |
| R6 | PASS | Reactive hints per state: `h_pos`, `h_zero`, `h_neg`, `h_line` (the a = 0 trap) and the a-sign line |
| R7 | FAIL | No ladder; the quest has no stepwise help |
| R8 | FAIL | One quest |
| R9 | FAIL | No transfer question |
| R10 | FAIL | `h_pos` false for a < 0; RO `h_neg` false for a < 0 |
| R11 | FAIL | "roots", "vertex", "Frown" never defined |
| R12 | FAIL | RO `h_neg` "deasupra"; chip "Frown"/"Tristă" is a face, not a concept; "fă Δ = 0" is stiff |
| R13 | PASS | Quest takes about a minute; free exploration extends it |
| R14 | PASS | Sliders and chips are real controls; quest and hint are `aria-live`; tiles repeat canvas values as text |
| R15 | PASS | Quest +20 matches `ctx.award(20)` and nothing claims a number |

Factual errors (with calculation)
1. `h_pos`: "Slide c up and watch the roots merge." True only for a > 0. Δ = b² − 4ac. For a < 0, raising c raises Δ. Example, the Frown chip: a = −1, b = 2, c = 3 gives Δ = 4 + 12 = 16 and roots −1 and 3 (the run shows this hint with that preset). Setting c = 4 gives Δ = 20, roots 1 ± √5 = −1.24 and 3.24: they move apart. To merge them c must go down, to c = −1 (Δ = 4 − 4 = 0).
2. RO `h_neg`: "Parabola plutește deasupra axei Ox." For a < 0 and Δ < 0 the whole curve is below the axis. Example a = −1, b = 0, c = −1: f(x) = −x² − 1 ≤ −1 for all x. (The EN "floats away" is correct.)
3. `h_zero` "Perfect square": fine only for a = 1 (for a = 2: 2(x − x_V)²), and "perfect square" is not defined.

Safe improvements
1. `h_pos` (string, 2 min)
   - EN `The curve cuts the x-axis twice. Change c until Δ reaches 0 and watch the two roots merge.`
   - RO `Curba taie axa Ox de două ori. Schimbă c până când Δ devine 0 și vezi cum se unesc cele două rădăcini.`
2. `h_neg` (string, 2 min)
   - EN `The parabola never touches the x-axis. No real roots.`
   - RO `Parabola nu atinge axa Ox. Fără rădăcini reale.`
3. Quest with a method hint, and an explanation on completion (strings, 5 min):
   - `quest` EN `Quest: make Δ = 0 (a ≠ 0). Hint: Δ = b² − 4ac, so b² must equal 4ac.` / RO `Misiune: obține Δ = 0 (a ≠ 0). Indiciu: Δ = b² − 4ac, deci b² trebuie să fie egal cu 4ac.`
   - `quest_done` EN `Quest complete: Δ = 0 means one double root, and the vertex sits on the x-axis.` / RO `Misiune îndeplinită: Δ = 0 înseamnă o rădăcină dublă, iar vârful stă pe axa Ox.`
4. `h_zero` (string, 2 min)
   - EN `Δ = 0: the two roots merge into one (a double root) and the vertex touches the x-axis.`
   - RO `Δ = 0: cele două rădăcini se unesc într-una singură (rădăcină dublă), iar vârful atinge axa Ox.`
5. Labels (strings 5 min + C3): `p_frown` EN `Frown (a < 0)` / RO `Tristă (a < 0)`; `axis` EN `Axis of symmetry` / RO `Axa de simetrie`; objective `obj` EN `Goal: see how a, b and c change the graph, the roots and the vertex of f(x) = ax² + bx + c.` / RO `Scop: vezi cum a, b și c schimbă graficul, rădăcinile și vârful funcției f(x) = ax² + bx + c.`

---

## 3. Geometry card = Pythagoras (`math/pythagoras`, id `geometry`)

What it is: drag or slide legs a, b (1..12, step 0.5); squares drawn on the sides; c = √(a² + b²); tiles for hypotenuse, area, perimeter, angles; quest "find 3 different Pythagorean triples" (10 + 10 + 40 Lumens).

| # | PASS/FAIL | Evidence |
|---|---|---|
| R1 | FAIL | No objective. Card title "Geometry", lab title "Right Triangle Lab" |
| R2 | PASS | Drag first |
| R3 | PASS | `gh_gen` states the rule, `fo` shows e.g. 3² + 4² = 25 → c = 5 live |
| R4 | PASS | A triple = integer a, b, c |
| R5 | PASS | `Math.hypot` is exact for 3-4, 6-8, 5-12, 9-12 (checked: 5, 10, 13, 15); half-steps (1.5, 2 → 2.5) correctly fail |
| R6 | FAIL | Non-triples all get the same `gh_gen`; no targeted message |
| R7 | FAIL | No ladder |
| R8 | FAIL | One quest; 3 of the 4 reachable triples are chip presets |
| R9 | FAIL | No transfer question (the student never has to compute) |
| R10 | PASS | Formulas, area, angles checked: α = atan(4/3) = 53.1°, β = 36.9°, 8-15-17 is a triple (64 + 225 = 289) |
| R11 | PASS | Hypotenuse is labelled c, triple is defined in `triple` |
| R12 | PASS | EN and RO read naturally ("Ipotenuza", "Catete egale") |
| R13 | PASS | About 2 to 3 minutes |
| R14 | PASS | Sliders are the keyboard path for the canvas drag; tri outline is thicker and a badge states the triple |
| R15 | FAIL | `qg_done` says "+30 XP"; code awards `ctx.award(third?40:10)` = 10 + 10 + 40 = 60 Lumens in total |

Facts
- Legs are limited to 12, so only four triples exist in this lab: 3-4-5, 6-8-10, 5-12-13, 9-12-15. The v1 `take` text mentions 8-15-17, which this lab can never show (15 > 12). The quest asks for 3: three presets do it.
- `qg_done` "+30 XP": v1 text meaning "+30 bonus"; v2 pays 40 on the third triple and shows "+40 Lumens" in the same moment.

Safe improvements
1. `qg_done` (string, 1 min): EN `Quest complete: 3 different triples found` / RO `Misiune îndeplinită: ai găsit 3 triplete diferite`.
2. Make the quest require thinking, not clicking (string, 3 min): `qg` EN `Quest: find 3 different Pythagorean triples ({n}/3). The preset buttons show some; can you find one that is not there?` / RO `Misiune: găsește 3 triplete pitagorice diferite ({n}/3). Butoanele prestabilite arată câteva; găsești unul care nu e printre ele?` (Scoring unchanged: any three count. Only 9-12-15 is off the buttons.)
3. A hint ladder step inside the existing `triple` hint (string, 3 min): EN `Pythagorean triple: all sides are whole numbers. Multiply all three sides by 2 or 3: is it still a triple?` / RO `Triplet pitagoric: toate laturile sunt numere întregi. Înmulțește toate cele trei laturi cu 2 sau 3: mai e triplet?`
4. Titles and labels (strings 5 min; C3 for case): manifest title `['Right triangles','Triunghi dreptunghic']` (id stays `geometry`); tile `area` EN `Triangle area` / RO `Aria triunghiului`; objective `obj` EN `Goal: see that a² + b² = c² in every right triangle, and find triangles whose sides are whole numbers.` / RO `Scop: vezi că a² + b² = c² în orice triunghi dreptunghic și găsește triunghiuri cu laturile numere întregi.`
5. `gh_45` (string, 2 min): EN `Equal legs → a 45° isosceles right triangle, so c = a·√2.` / RO `Catete egale → triunghi dreptunghic isoscel de 45°, deci c = a·√2.` (check: a = b = 1 gives c = 1.41)

---

## 4. Gas & piston (`physics/gas`)

What it is: sliders T (200..500 K), V (0.3..1.2 L), N (10..50); 5 presets; particle animation; gauge 0-10 atm; P = (N/30)(T/300)/V atm; quest "reach 3 atm without heating above 300 K" (+25 Lumens once).

| # | PASS/FAIL | Evidence |
|---|---|---|
| R1 | FAIL | No objective |
| R2 | PASS | Sliders first |
| R3 | PASS | `phh_hot`, `phh_sq`, `phh_gen` state the cause-effect rules |
| R4 | PASS | `Pr>=3 && T<=300`; reachable: V = 0.3, N = 30 gives 3.33; V = 0.4, N = 40 gives 3.33 |
| R5 | PASS | Continuous model, threshold clear |
| R6 | FAIL | The likeliest wrong approach (heat to 450 K and squeeze to V = 0.5 L: P = 1.5 / 0.5 = 3.0 is reached but not accepted, and heating alone cannot reach 3 atm: T = 500 K, N = 50, V = 1 L gives only 2.78) gets no message; at T > 400 the hint even praises heating |
| R7 | FAIL | No ladder |
| R8 | FAIL | One quest |
| R9 | FAIL | No transfer question |
| R10 | FAIL | `phh_gen` "pressure = hits per area" |
| R11 | FAIL | N, n, R are on screen and never defined; "PV = nRT" is drawn with no link to the displayed numbers |
| R12 | PASS | EN and RO read naturally ("Suprapresiune", "Comprimă") |
| R13 | PASS | About 2 to 3 minutes |
| R14 | PASS | Reduce motion respected (`rm`), sliders, numeric readouts repeat the gauge |
| R15 | FAIL | `q_done` says "+25 XP"; "Boyle would be proud" is wrong when the student used N, not V |

Checks (done)
- Calibration: P = 1 atm at N = 30, T = 300 K, V = 1 L. Real gas at those p, T, V: n = 0.0406 mol (2.4 · 10²² molecules). So the unit "atm" is honest only as a scaled toy model: N = 30 means "30 model particles", not 30 molecules. The screen says nothing about that.
- The animation really follows kinetic theory: speed ∝ √T (`sp0=.55·√(T/300)`). Measured piston hits per second over 7 s: V = 1.2 L gives 6.4, 1.0 L gives 7.9, 0.4 L gives 19.6. That matches hits ∝ 1/V (expected 7.9 · 2.5 = 19.8). The displayed pressure however is the formula, not the count; the screen does not say so.
- Boyle holds at the preset: V = 1 → 0.4 at constant T, N gives P = 2.5, P·V = 1.0 (constant).
- T tile: 300 K = 27 °C (300 − 273.15 = 26.85) correct.

Safe improvements
1. Feedback for the likeliest wrong approach (strings + tiny code: if `Pr>=3 && T>300` show this text in the quest line instead of the plain quest text; quest state unchanged):
   - `q_hot` EN `P is 3 atm or more, but T is above 300 K: that is heating. Squeeze the piston or add gas instead.`
   - `q_hot` RO `P e de cel puțin 3 atm, dar T e peste 300 K: asta înseamnă încălzire. Comprimă pistonul sau adaugă gaz.`
2. `q_done` (string, 2 min)
   - EN `Quest complete: 3 atm without heating above 300 K. A smaller V or a larger N both raise P.`
   - RO `Misiune îndeplinită: 3 atm fără încălzire peste 300 K. Un V mai mic sau un N mai mare ridică presiunea.`
3. `phh_gen` (string, 3 min): defines N and fixes the physics.
   - EN `Molecules bounce off the piston: pressure is the force of the hits per unit of area. Change T (temperature), V (volume) or N (number of particles) and watch the gauge.`
   - RO `Moleculele lovesc pistonul: presiunea este forța loviturilor pe unitatea de arie. Schimbă T (temperatura), V (volumul) sau N (numărul de particule) și urmărește manometrul.`
4. Disclose the model (string + one `U.el('p',t('model'),'cap')` line, 10 min):
   - `model` EN `Simplified model: P is calculated as 1 atm × (N / 30) × (T / 300 K) ÷ V (V in litres). The moving dots only illustrate the hits. n in PV = nRT is the amount of gas in moles.`
   - `model` RO `Model simplificat: P se calculează ca 1 atm × (N / 30) × (T / 300 K) ÷ V (V în litri). Punctele în mișcare ilustrează doar loviturile. n din PV = nRT este cantitatea de gaz în moli.`
5. `phh_sq` (string, 2 min)
   - EN `Less room → more hits per second → pressure rises. At constant T and N, P · V stays the same (Boyle).`
   - RO `Mai puțin loc → mai multe lovituri pe secundă → presiunea crește. La T și N constante, P · V rămâne constant (Boyle).`

---

## 5. Optics (`physics/optics`)

What it is: `optics.js` is the template module from `docs/spec-lessons-port.md` ("Pattern: copy v2/modules/physics/optics.js"): a ball bouncing in a box and a spring piston. You pull the spring by pointer; past half its length the quest completes (+20 Lumens). It is listed first in the Physics galaxy (`order:1`). There is no v1 equivalent (`grep -i optic app/lumio.html` is empty).

| # | PASS/FAIL | Evidence |
|---|---|---|
| R1 | FAIL | None |
| R2 | PASS | Act first |
| R3 | FAIL | Nothing is explained |
| R4 | FAIL | One gesture, no question |
| R5 | FAIL | `pull>pis.len*.5`, no science |
| R6 | FAIL | None |
| R7 | FAIL | None |
| R8 | FAIL | None |
| R9 | FAIL | None |
| R10 | FAIL | No formula or unit is shown |
| R11 | FAIL | None |
| R12 | FAIL | Canvas `aria-label` "Bouncing ball and spring piston" is EN only |
| R13 | FAIL | About 20 seconds |
| R14 | FAIL | The spring can only be pulled with a pointer; no keyboard path; no `aria-live` text except the quest |
| R15 | FAIL | Title "Optics" / "Optică"; content is mechanics (spring, restitution e = 0.8) |

Decision for Eduard (via Manager), before the freeze, because the jury opens the public site:
- A (recommended, 1 min): remove `"physics/optics"` from `v2/modules/registry.js`. Physics then shows Gas, Projectile and two "Coming soon". It is a v2-only demo, not a v1 feature, but the PARITY RULE says earlier v2 work goes only on his word.
- B (10 min): keep it, honest name. Manifest title `['Bounce & spring','Ricoșeu și arc']`, objective `obj` EN `Goal: see that a stretched spring stores energy and gives it back as motion.` / RO `Scop: vezi că un arc întins păstrează energie și o dă înapoi ca mișcare.`, `Q[1]` EN `Quest complete: the spring gave back the energy you stored (E = ½·k·x²).` / RO `Misiune îndeplinită: arcul a returnat energia pe care ai stocat-o (E = ½·k·x²).`, canvas `aria-label` RO `Minge care sare și piston cu arc`. Still 4/15; present it as a demo, not a lesson.
- Do not count it in "number of lessons".

---

## 6. Projectile motion (`physics/projectile`)

What it is: Free play (θ 10..80°, v 5..30 m/s, tiles for range, max height, flight time, vx · vy, 4 ordered exercises, +10 each, +15 bonus) and Levels (5 numeric problems, 3 hearts each, 3 hints + formula + worked example, 1 to 3 sparkles, Lumens 10/15/20 on first clear; progress key `lumio2_proj`).

| # | PASS/FAIL | Evidence |
|---|---|---|
| R1 | FAIL | No objective sentence (Levels pose questions, but no "you will be able to") |
| R2 | PASS | Free play first, Levels second |
| R3 | PASS | Levels show the formula `f` and a worked example; hints state R, H formulas |
| R4 | PASS | One answer, or the two angles in Level 3 ("Either answer counts"); exercise 4 accepts 44-46° (R(44°) = 40.750 m, R(45°) = 40.775 m, a flat maximum) |
| R5 | FAIL | ±3 % on the answer is up to ±6 % on the result (see below) |
| R6 | FAIL | Miss feedback only reports a distance; Level 5's is wrong |
| R7 | PASS | `hn` 3 levels + formula + worked example, hint use lowers the sparkles |
| R8 | FAIL | Exercise 1 solved by the first touch; Level 5 easier than Levels 3 and 4; Levels 1 and 2 are the same problem |
| R9 | PASS | Level 3 inverts the question (angle), Level 4 adds a platform, Level 5 predicts R |
| R10 | FAIL | g = 9.81 in free play, 9.8 in Levels; "45° always" |
| R11 | FAIL | "vx · vy" tile never defined |
| R12 | PASS | EN and RO natural; minor items below |
| R13 | PASS | Free play 4 exercises about 3 to 4 minutes; Levels are optional extras |
| R14 | PASS | Hearts have `role="img"` + label, `aria-current` on level, form label, `role="status"`, Reduce motion |
| R15 | PASS | "+10 Lumens" and bonus strings match `ctx.award` |

Verified by running: first θ keypress (45 → 46°) wrote `{"ex":[0]}` to `lumio2_proj`, i.e. exercise 1 was credited at the very first touch. Levels with the correct answers (19.8, 24.25, 66.35, 18.78) pass, sparkles and Lumens as designed.

Factual and tolerance checks
1. Exercise 1 "Land beyond 40 m" is solved at the start state: v = 20, θ = 45°: R = v²/g = 400/9.81 = 40.77 m > 40. The hint "Try v above 21 m/s" is also wrong: at 45° the threshold is v > √(40 · 9.81) = 19.8 m/s. A student gets +10 Lumens and "learns" nothing.
2. Exercise 2: H > 15 m needs v·sin θ > √(2 · 9.81 · 15) = 17.2 m/s. At v = 20 that is θ > 59.1°. The hint "a high angle puts more speed into going up" is correct but incomplete (raising v works too).
3. Exercise 3 (R in 29..31): v = 17, θ = 45° gives 29.46 m, so integer sliders can hit it. OK.
4. Exercise 4: R is flat near the peak, 40.75 (44°) vs 40.77 (45°); the tile shows 1 decimal (40.7 / 40.8 / 40.7), so the peak is visible only as a 0.1 m bump. Comparing 40°, 45°, 50° (40.2 / 40.8 / 40.2) is a clearer task for the hint.
5. Level tolerance is ±3 % of the answer (`Math.abs(x-a)<=Math.abs(a)*.03`). Because R ∝ v², ±3 % on v is ±6 % on R: Level 1 accepts v from 19.21 to 20.39 m/s, i.e. R from 37.6 to 42.4 m for a target at 40 m (2.4 m off). Level 3 accepts 66.35° ± 1.99°, R from 28.0 to 31.8 m for a target at 30 m. The student sees "Hit!" while the drawn ball lands visibly past or short of the marker. The tolerance is reasonable for hand calculation; it is just never explained.
6. Level 5 miss message: `lv_miss` "Missed: landed at {x} m" is filled with `predict` (the student's own guess, e.g. 80 m) because `LV.res.x=predict!=null?predict:path.X`. The ball actually lands at 900/9.8 = 91.8 m. Observed: guess 80 → "Missed: landed at 80 m".
7. Level 4: when the guess is too low, `lvShotPath` ends the path at height h = 5 m at x = 15.6 m (v = 15, 45°: disc = 112.5 − 98 = 14.5, x = 15.6). No platform exists at x = 15.6; the ball would really continue to the ground at 225/9.8 = 23.0 m. "Missed: landed at 15.6 m" is false. It should say where it crossed the platform height.
8. Level 5 text "Rule: 45° always gives the longest throw" is false in general and contradicted by Level 4: from a 5 m platform the best angle is below 45°. True statement: from level ground, at the same speed, 45° gives the longest range (v1 `take` wording).
9. "Put the target there" in Level 5 is unclear: the student types a number; nothing is placed.
10. g: free play uses 9.81, Levels use 9.8 (and display "g = 9.8 m/s²"). Difference 0.1 %, far below the 3 % tolerance, so no answer flips; it is a consistency and honesty point. Do not change values; label 9.8 as rounded.

Safe improvements
1. Free-play hints for exercises 1, 2, 4 (strings, 10 min):
   - ex 1 EN `More speed means more range. At 45°, v = 20 m/s or more already lands beyond 40 m (R = v² / g).` / RO `Mai multă viteză înseamnă bătaie mai mare. La 45°, orice v de 20 m/s sau mai mult aterizează peste 40 m (R = v² / g).`
   - ex 2 EN `Only the upward part of the speed, v · sin θ, lifts the ball. Raise θ or v.` / RO `Doar partea de viteză îndreptată în sus, v · sin θ, ridică mingea. Mărește θ sau v.`
   - ex 4 EN `Set v to 20, then try 40°, 45° and 50° and compare R. The largest R marks the answer (R changes very little near the peak).` / RO `Pune v la 20, apoi încearcă 40°, 45° și 50° și compară R. Cel mai mare R indică răspunsul (lângă maxim, R se schimbă foarte puțin).`
   - Optional state decision for Eduard, not a copy change: start `ST.v` at 15 instead of 20 so exercise 1 is a real task.
2. Level 5 question (string, 3 min):
   - EN `At the same speed, from level ground, 45° gives the longest throw. At 30 m/s, how far does the ball land? Type the distance: the shot will show where it really lands.`
   - RO `La aceeași viteză, de pe teren plat, 45° dă cea mai lungă aruncare. La 30 m/s, cât de departe aterizează mingea? Scrie distanța: lansarea arată unde aterizează de fapt.`
3. Honest miss messages (strings + tiny code to pick the key by `Lv.ask==='R'` / `Lv.h`; 20 min, no scoring change):
   - `lv_miss_r` (Level 5) EN `Not quite: you said {x} m (dashed line). Compare it with where the ball really lands.` / RO `Nu chiar: ai spus {x} m (linia punctată). Compară cu locul în care aterizează de fapt mingea.`
   - `lv_miss_h` (Level 4) EN `Missed: at the platform's height the ball was {x} m away. Check your numbers.` / RO `Ratat: la înălțimea platformei mingea era la {x} m. Verifică-ți calculele.`
4. Say what counts as a hit (string + `lg.textContent` append, 10 min):
   - `tol` EN `A hit means within 3 % of the exact answer.` / RO `Un răspuns corect înseamnă o eroare de cel mult 3 % față de valoarea exactă.`
5. Directional miss feedback for Levels 1, 2, 4, 5 (strings + about 4 lines, 25 min; the data `path.X` and `Lv.R` already exist):
   - `lv_short` EN `Too short: it landed {d} m before the target. More speed.` / RO `Prea scurt: a aterizat cu {d} m înaintea țintei. Mai multă viteză.`
   - `lv_long` EN `Too far: it landed {d} m past the target. Less speed.` / RO `Prea departe: a aterizat cu {d} m după țintă. Mai puțină viteză.`
   - (Level 3 has two valid angles, so keep the plain message there.)

Small RO/EN items (optional): RO ex 2 `Urcă peste 15 m` → `Urcă la o înălțime maximă de peste 15 m`; tile `vx · vy` → `vx · vy (m/s)`; Level 3 `lv_miss` is fine.

---

## 7. Evidence for the jury (what we can truthfully say today)

Counted from the shipped v2 code and a run in Chromium (26 Nov):

| Lesson | Exercises / quests | Hints | Feedback types | Hearts, levels |
|---|---|---|---|---|
| Algebra | rounds of 5 generated questions (5 kinds), unlimited rounds | 1 per question (formula with the numbers filled in) | 3 praise strings, 1 miss string, round score, streak bonus | none |
| Parabola | 1 quest, 4 presets | 4 live state hints + direction hint | live tiles (Δ, vertex, roots, axis), quest done | none |
| Geometry | 1 quest (3 triples), 4 presets | 3 live state hints | live formula and tiles, triple badge, quest done | none |
| Gas | 1 quest, 5 presets | 4 live state hints | live gauge, tiles, overpressure warning, quest done | none |
| Optics | 1 gesture (a physics-engine demo, not an optics lesson) | 0 | quest done | none |
| Projectile | 4 free-play exercises + 5 level problems | free play: 1 per exercise; Levels: 3 hints + formula + worked example per level | hit / miss (with landing distance) / out of hearts, 1 to 3 sparkles | 3 hearts per level, 5 levels |

We CAN say:
- Five interactive lessons (three Math, two Physics) are live and run offline in EN and RO; each is a lab where the student changes a value and sees the result at once.
- The Projectile lesson is built in depth: 4 exercises, 5 problems with 3 hearts each, a 3-step hint ladder, a formula and a worked example per level, 1-3 sparkle ratings, keyboard and screen-reader support.
- Every lesson reports quests and answers into the Lumens and rating system (`ctx.report`, `ctx.award`).
- A written 15-point rubric exists and every lesson has been audited against it (this document); the audit found specific errors and the fixes are listed.

We CANNOT say:
- Any measured learning gain, retention, or improvement in grades. No pre/post test or class pilot has been run. Never write "proven".
- "Every lesson has 4 exercises" (the jury-lens sentence "about 3 min and 4 exercises each" for v1): in the code only Projectile (and v1's Linear and Compound interest) has 4 exercises; Parabola, Geometry and Gas have one quest, Algebra is a rotating practice. Ask Teacher/Manager to correct that sentence before the pitch.
- "About 3 minutes per lesson" as a measured time: it is my estimate from reading, not a timing with students.
- Eight lessons (that was v1). v2 ships five lessons plus one demo; Spanish and Life skills have no live lesson, and nine other planets show "Coming soon".
- That the lessons are error-free: this audit found factual or wording errors in all six (sections 1-6); until the safe fixes ship, do not say "reviewed for accuracy".

Pitch wording, "we chose depth over breadth" (three sentences, all true today):
1. EN: "We built few lessons on purpose: each one is a hands-on lab where you change a value and see the answer move, not a page to read." RO: "Am construit puține lecții, intenționat: fiecare e un laborator în care schimbi o valoare și vezi răspunsul mișcându-se, nu o pagină de citit."
2. EN: "Our deepest lesson, Projectile motion, has four free-play exercises, five levels with three hearts each, a three-step hint ladder, a formula and a worked example." RO: "Cea mai adâncă lecție, Mișcarea proiectilului, are patru exerciții libere, cinci niveluri cu trei inimi fiecare, trei indicii, o formulă și un exemplu rezolvat."
3. EN: "We have not yet measured learning gain; our next step is a consented class pilot with a short test before and after." RO: "Încă nu am măsurat progresul în învățare; următorul pas este un pilot într-o clasă, cu acord, cu un test scurt înainte și după."
Do not pair sentence 1 or 2 with the number "eight lessons" or with a visible "Optics" planet unless option A or B in section 5 is done. If the jury sees nine "Coming soon" planets, say "five finished lessons; the rest of the galaxy is our roadmap".

---

## 8. Two NEW lessons for after the competition (spec only, not now)

1. LINEAR FUNCTIONS (Math, reuse v1 module `linear` and its LPTS and text from `app/lumio.html` L2337+). Objective: "I can read the slope m and the intercept b from a line, and write y = mx + b from two points."
2. Ex 1 (predict first): "Which line is steeper, m = 2 or m = −3?" Answer m = −3 (larger |m|); then drag m to check. Ex 2: "Pass through (0, 3)": b = 3 exactly (v1 exercise 1).
3. Ex 3 (reasoning): "Make a line parallel to y = 2x + 1 that passes through (0, −2)": m = 2, b = −2. Ex 4 (transfer): "A taxi costs 3 lei plus 2 lei per km. Which line?": m = 2, b = 3; cost at 7 km = 17 lei. Feedback per miss: m and b swapped, sign of m wrong.
4. SPANISH -AR VERBS (Spanish, reuse v1 `VERBS`/`END`/`SP`, `app/lumio.html` L1576). Objective: "I can conjugate any regular -ar verb in the present tense for all six persons."
5. Ex 1 (place endings): "nosotros ___ (hablar)" → hablamos. Ex 2: "tú ___ (cantar)" → cantas; miss message names the ending that belongs to the person typed ("-as goes with tú").
6. Ex 3 (transfer, verb never seen in the lab): "ellos ___ (comprar)" → compran. Ex 4 (trap): "vosotros ___ (estudiar)" → estudiáis; the accent is part of the ending (feedback says so, and that vosotros is used mainly in Spain). Tolerance: exact string; a missing accent gets its own message, not a plain miss.
