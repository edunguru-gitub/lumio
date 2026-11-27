# Spec 3: Build an atom / Construiește un atom (Professor, 27 Nov). Read docs/professor/stem-roadmap.md section 4 (common contract C1-C12) first.
Build-ready. Canvas plus sliders (gas.js pattern, but static: no Loop needed). Gives the NEW Chemistry galaxy its first playable lesson. Scope: the first 20 elements only, simplified shell model.

## 1 Identity
| Field | Value |
|---|---|
| File | v2/modules/chemistry/atom.js (structure of math/linear.js for exercises, physics/gas.js for sliders, canvas, ctx.controls) |
| Manifest | {id:'atom', subject:'chemistry', subjectName:['Chemistry','Chimie'], color:'--chemistry', title:['Build an atom','Construiește un atom'], order:1, tags:['lab','quest'], orbit:[0.4,72]} |
| Storage | lumio2_atom {v:1, ex:[...]} |
| Registry | "chemistry/atom" LAST commit after Tester PASS. BLOCKER: Designer token --chemistry |
| Build time | 5 h (1 h element table and strings, 2 h canvas, 2 h exercises, feedback, tests) |
| Phone LAB | yes: {knob:'Z', sliders:['N','e'], tilt:['Z','N'], params: Z 1-20 step 1 "Protons"/"Protoni", N 0-24 step 1 "Neutrons"/"Neutroni", e 0-20 step 1 "Electrons"/"Electroni"}, ro() = "Z = 8 · A = 16 · charge 0" |

## 2 Objective (R1)
EN: I can name an element from its protons, and work out an atom's mass number and its charge.
RO: Pot numi un element după protonii lui și pot afla numărul de masă și sarcina unui atom.

## 3 Flow (about 4.5 minutes)
1. First screen (R2): canvas with a neutral hydrogen atom and three sliders (Z, N, e). Prompt: "Move a slider. Watch the atom and the tiles." / "Mișcă un slider. Urmărește atomul și fișele." No rule text.
2. After 4 slider moves (counter `moves`) or when exercise 1 is current, the rule cards appear.
3. Exercises 1 to 3 on the lab (neutral atom, ion, full outer shell), exercise 4 typed (charge from numbers).
4. Done string "All 4 exercises done · +15 Lumens bonus", Continue.

## 4 Lab
- Sliders (U.slider): Z "Protons p⁺" 1 to 20 step 1; N "Neutrons n" 0 to 24 step 1; e "Electrons e⁻" 0 to 20 step 1. Plain integers. Start ST = {Z:1, N:0, e:1} (hydrogen-1, neutral).
- Canvas (U.canvas, 300 high at 1273, 240 at 390), redrawn on change and on resize (no Loop, no animation, so Reduce motion needs nothing). Draw: nucleus in the centre as a cluster (sunflower layout: dot i at radius c·√i, angle i·2.4 rad); proton = filled dot in the subject colour with "+" when the dot radius >= 5 px; neutron = open ring in ink (shape differs, so colour is not the only signal). Four faint shell rings (token --line) for capacities 2, 8, 8, 2; electrons = small ink dots with "−" when large enough, evenly spaced on their shell, filled in order shell 1 (max 2), shell 2 (max 8), shell 3 (max 8), shell 4 (max 2). Dot radius shrinks with the count (R_dot = min(7, nucleusRadius / (1.2 √(Z+N)))).
- Canvas aria-label updated every change: "Atom with 8 protons, 8 neutrons and 8 electrons in shells 2, 6." / "Atom cu 8 protoni, 8 neutroni și 8 electroni în straturile 2, 6."
- Tiles (U.tiles): Element (name + symbol from Z, below); Mass number A = Z + N; Charge = Z − e shown as 0, +1, −2 with the word neutral / positive ion / negative ion (EN) and neutru / ion pozitiv / ion negativ (RO); Outer electrons = number of electrons in the highest occupied shell (0 if none); Shells "2, 6" as text.
- Formula line (mono): `A = Z + N` and `charge = Z − e`.
- Element table (Z: symbol, EN, RO): 1 H Hydrogen Hidrogen; 2 He Helium Heliu; 3 Li Lithium Litiu; 4 Be Beryllium Beriliu; 5 B Boron Bor; 6 C Carbon Carbon; 7 N Nitrogen Azot; 8 O Oxygen Oxigen; 9 F Fluorine Fluor; 10 Ne Neon Neon; 11 Na Sodium Sodiu; 12 Mg Magnesium Magneziu; 13 Al Aluminium Aluminiu; 14 Si Silicon Siliciu; 15 P Phosphorus Fosfor; 16 S Sulfur Sulf; 17 Cl Chlorine Clor; 18 Ar Argon Argon; 19 K Potassium Potasiu; 20 Ca Calcium Calciu. (Spelling: Aluminium and Sulfur, as in school English.)
- Model note on screen (R10): "Simplified model: for the first 20 elements electrons fill shells of 2, 8, 8 and then 2. Real shells are more subtle (shell 3 can hold 18)." / "Model simplificat: pentru primele 20 de elemente, electronii umplu straturi de 2, 8, 8 și apoi 2. Straturile reale sunt mai complicate (stratul 3 poate avea 18)."
- Start does not solve exercise 1 (needs Z = 8) (R8).

## 5 Explanation cards (after acting)
Card A, rule:
- EN: The nucleus holds protons (+) and neutrons (no charge). The number of protons Z decides the element. Electrons (−) orbit in shells. Mass number A = Z + N. Charge = Z − e: equal means neutral, fewer electrons means a positive ion, more electrons means a negative ion.
- RO: Nucleul conține protoni (+) și neutroni (fără sarcină). Numărul de protoni Z stabilește elementul. Electronii (−) se află în straturi. Numărul de masă A = Z + N. Sarcina = Z − e: egale înseamnă neutru, mai puțini electroni înseamnă ion pozitiv, mai mulți electroni înseamnă ion negativ.
Card B, words (each defined once): ion = an atom with a charge because it lost or gained electrons / ion = atom cu sarcină, pentru că a pierdut sau a primit electroni; mass number = protons plus neutrons / număr de masă = protoni plus neutroni; isotopes = atoms of one element with different N / izotopi = atomi ai aceluiași element cu N diferit; outer shell = the highest shell that holds electrons / stratul exterior = cel mai înalt strat care conține electroni. Charge unit: the charge of one proton (1 elementary charge).
Worked example (not an exercise): "Magnesium: 12 protons, 12 neutrons. A = 12 + 12 = 24. Neutral: 12 electrons in shells 2, 8, 2. If it loses 2 electrons: charge = 12 − 10 = +2, shells 2, 8." / "Magneziu: 12 protoni, 12 neutroni. A = 12 + 12 = 24. Neutru: 12 electroni în straturile 2, 8, 2. Dacă pierde 2 electroni: sarcina = 12 − 10 = +2, straturile 2, 8."

## 6 Exercises
| # | Kind | Text EN / RO | Check | Verified answer |
|---|---|---|---|---|
| 1 | lab | Build a neutral oxygen atom. Any number of neutrons is fine. / Construiește un atom neutru de oxigen. Orice număr de neutroni e bun. | Z === 8 and e === 8 | oxygen has Z = 8; neutral e = 8; N any 0-24 (isotopes) |
| 2 | lab | Make a sodium ion with charge +1. Any number of neutrons is fine. / Fă un ion de sodiu cu sarcina +1. Orice număr de neutroni e bun. | Z === 11 and e === 10 | sodium Z = 11; charge 11 − 10 = +1; shells 2, 8 |
| 3 | lab | Build a NEUTRAL atom whose outer shell holds 8 electrons. Two answers exist; either counts. / Construiește un atom NEUTRU al cărui strat exterior are 8 electroni. Există două răspunsuri; oricare e bun. | e === Z and outer === 8 | Ne (Z = 10, shells 2, 8) or Ar (Z = 18, shells 2, 8, 8). No other neutral atom with Z ≤ 20 has outer = 8 |
| 4 | type (transfer, no dials given) | An atom has 17 protons, 18 neutrons and 18 electrons. What is its charge? Type a whole number with its sign. / Un atom are 17 protoni, 18 neutroni și 18 electroni. Care este sarcina lui? Scrie un număr întreg cu semn. | parsed integer === −1 (num(): "-1", "−1", "–1" accepted; "+1" and "1" are wrong) | 17 − 18 = −1 (this is the chloride ion; A = 17 + 18 = 35 is NOT the charge) |
Ramp: build by finding the element (1), change electrons but not protons (2), combine two conditions and see that two answers exist (3), compute with no lab (4). Exercise 4 is solvable without touching the lab; the lab can be used to check it.

## 7 Misconception feedback (react(); lab 2 or more messages each, typed 4 plus fallback)
| Exercise | Trigger | EN | RO |
|---|---|---|---|
| 1 | Z ≠ 8 | This is {name}. The element is set by the protons only. Change Z until the Element tile says Oxygen. | Acesta este {name}. Elementul este stabilit doar de protoni. Schimbă Z până când fișa Element arată Oxigen. |
| 1 | Z = 8 and e ≠ 8 | Oxygen, but the charge is {c}. A neutral atom has as many electrons as protons. | Oxigen, dar sarcina este {c}. Un atom neutru are tot atâția electroni câți protoni. |
| 2 | charge = +1 and Z ≠ 11 | The charge is +1, but you changed the element: this is {name}. An ion forms by losing electrons; Z never changes. | Sarcina este +1, dar ai schimbat elementul: acesta este {name}. Un ion se formează prin pierdere de electroni; Z nu se schimbă niciodată. |
| 2 | Z = 11 and e = 11 | Neutral sodium. Remove one electron to make the charge +1. | Sodiu neutru. Scoate un electron ca sarcina să devină +1. |
| 2 | Z = 11 and e > 11 | The electrons outnumber the protons: that is a negative ion. A positive ion has fewer electrons. | Electronii sunt mai mulți decât protonii: acesta este un ion negativ. Un ion pozitiv are mai puțini electroni. |
| 2 | Z ≠ 11 and not the +1 case | Find sodium first: the Element tile must say Sodium. | Găsește mai întâi sodiul: fișa Element trebuie să arate Sodiu. |
| 3 | outer = 8 and charge ≠ 0 | The outer shell is full, but the atom has a charge ({c}): it is an ion. Make electrons equal protons. | Stratul exterior este plin, dar atomul are sarcină ({c}): este un ion. Egalează electronii cu protonii. |
| 3 | neutral and outer = 7 or 1 | The outer shell has {k} electrons. {name} is {d} electron away from a full shell of 8 (it will form an ion). | Stratul exterior are {k} electroni. {name} se află la {d} electron de un strat plin cu 8 (va forma un ion). |
| 3 | neutral otherwise | The outer shell has {k} electrons, not 8. Watch the Outer electrons tile as Z changes. | Stratul exterior are {k} electroni, nu 8. Urmărește fișa Electroni exteriori pe măsură ce schimbi Z. |
| 4 | typed +1 or 1 | Electrons are negative. Here there is one more electron than protons, so the charge is negative. | Electronii sunt negativi. Aici este un electron în plus față de protoni, deci sarcina este negativă. |
| 4 | typed 35 | 35 is the mass number A = 17 + 18. The charge compares protons and electrons. | 35 este numărul de masă A = 17 + 18. Sarcina compară protonii cu electronii. |
| 4 | typed 0 | Neutral needs 17 electrons. This atom has 18. | Neutru ar însemna 17 electroni. Acest atom are 18. |
| 4 | typed 18 or 17 | That is a count of particles. The charge is protons minus electrons. | Acesta este un număr de particule. Sarcina este protoni minus electroni. |
| 4 | fallback | Not quite. Use charge = Z − e. | Nu chiar. Folosește sarcina = Z − e. |
({c} = signed charge such as −2; {d} = 1; {k} = outer count. RO terms: strat, ion, sarcină, număr de masă.)

## 8 Hint ladder (C5; level 3 is a worked step on other numbers)
| # | 1 nudge | 2 method | 3 worked step |
|---|---|---|---|
| 1 | One slider changes the element name. Which one? | Only the protons Z decide the element. Then make the electrons equal Z. | Example: neutral nitrogen is Z = 7 with 7 electrons; the neutrons can be anything. |
| 2 | A positive ion has fewer electrons than protons. | Find sodium with the Element tile, keep Z, then remove electrons until the charge is +1. | Example: Mg²⁺ has 12 protons and 10 electrons: 12 − 10 = +2. |
| 3 | Watch the Outer electrons tile while you change Z. | Neutral means e = Z. Which Z gives 8 in the outer shell? | Example: neutral fluorine, Z = 9, has shells 2, 7: one short of 8. |
| 4 | The charge compares protons with electrons. | Charge = Z − e. | Example: 12 protons and 10 electrons: 12 − 10 = +2. |

## 9 Lumens and quest
Common contract C2: 4 x 10 + 15 = 55 Lumens once; ctx.report({qt:4}); no Moon. Typed miss: fx.bad, ctx.report({bad:1}).

## 10 Overview data (C9, inert)
mins 4, ex 4. Intro: "Every atom has a nucleus of protons and neutrons with electrons around it. The protons tell you which element it is." / "Orice atom are un nucleu de protoni și neutroni, cu electroni în jur. Protonii îți spun ce element este." Takeaways (5):
1 The number of protons Z decides the element. / Numărul de protoni Z stabilește elementul.
2 Neutrons have no charge: they change the mass, not the element. / Neutronii nu au sarcină: schimbă masa, nu elementul.
3 Mass number A = protons + neutrons. / Numărul de masă A = protoni + neutroni.
4 Charge = protons − electrons: 0 is neutral, positive means electrons lost, negative means electrons gained. / Sarcina = protoni − electroni: 0 e neutru, pozitiv înseamnă electroni pierduți, negativ electroni primiți.
5 In the first 20 elements the shells fill 2, 8, 8, then 2 (simplified), and the outer shell shapes how the atom reacts. / La primele 20 de elemente straturile se umplu 2, 8, 8, apoi 2 (simplificat), iar stratul exterior influențează cum reacționează atomul.

## 11 Implementation notes for David
Reuse: U.slider, U.canvas (fit()), U.tiles, U.cont, U.col tokens, ctx.controls (gas.js call shape), linear.js exercise list, hint button, num(), react table. New: element table (20 rows, about 25 lines), shell fill function `shells(e)` (about 6 lines: caps [2,8,8,2]), sunflower nucleus (about 12 lines), shells/electrons (about 12 lines), react() (about 20 lines). About 200 lines. `draw()` redraws on every slider event and on the canvas ResizeObserver (U.canvas already does). No Loop, no Emitter. Singular/plural: use "1 electron" / "2 electrons", RO "1 electron" / "2 electroni".

## 12 Acceptance checklist (Tester)
T-common plus:
1 Independent recomputation: O Z = 8; Na Z = 11, Na⁺ e = 10 shells 2, 8; Ne shells 2, 8 outer 8; Ar shells 2, 8, 8 outer 8; Mg 12 p, 12 n: A = 24, Mg²⁺ charge = 12 − 10 = +2; Cl 17 p 18 n 18 e: A = 35, charge −1; F Z = 9 neutral shells 2, 7 outer 7; K Z = 19 shells 2, 8, 8, 1; Ca Z = 20 shells 2, 8, 8, 2.
2 Element tile for all 20 values of Z matches the table (EN and RO), changes with Z only, never with N or e.
3 Exercise 1 passes for Z = 8, e = 8 and every N (0, 8, 24); Z = 8, e = 9 does not. Exercise 2 passes only for Z = 11, e = 10; Z = 12, e = 11 (charge +1 but Mg) shows the "you changed the element" message. Exercise 3 passes for Z = e = 10 and Z = e = 18 only; Z = e = 2 (He, outer 2), Z = e = 9, Z = 18 with e = 17 do not; Cl⁻ (Z = 17, e = 18) shows the "ion" message.
4 Exercise 4: "-1", "−1", "–1" pass; "+1", "1", "35", "0", "18", empty behave as in the table; "−1.0" passes.
5 Phone controller: Z, N, e values move the lab (ctx.controls), within ranges.
6 Canvas: no overlap of dots at Z = 20, N = 24 at 390 px wide; shells readable; remove subject colour (devtools) and protons vs neutrons are still distinguishable (filled dot with + vs open ring); electrons shown beyond 2 shells at e = 20.
7 aria-label of the canvas changes with the sliders; tiles are read in order.
8 Lumens 10, 10, 10, 10 + 15 once; reload no double pay; blocked storage works from memory.
9 Overlap of the chemistry galaxy in the home view; delete the registry line = nothing breaks.
Teacher check: grade (VII-VIII), terms (număr atomic Z, număr de masă A, strat electronic, ion), and whether to say "sarcină" or "sarcină electrică" first.
