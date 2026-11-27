# Spec 2: Punnett squares / Pătratul lui Punnett (Professor, 27 Nov). Read docs/professor/stem-roadmap.md section 4 (common contract C1-C12) first.
Build-ready. DOM only (no canvas), no engine. Gives the NEW Biology galaxy its first playable lesson. Trait used: seed shape in peas, round (R, dominant) or wrinkled (r, recessive). Chosen on purpose: shape, not colour, so no colour clash with Moon violet or rose (miss) and meaning is never colour-only.

## 1 Identity
| Field | Value |
|---|---|
| File | v2/modules/biology/punnett.js (structure of math/linear.js) |
| Manifest | {id:'punnett', subject:'biology', subjectName:['Biology','Biologie'], color:'--biology', title:['Punnett squares','Pătratul lui Punnett'], order:1, tags:['lab','quest'], orbit:[1.0,68]} |
| Storage | lumio2_punnett {v:1, ex:[...]} |
| Registry | "biology/punnett" LAST commit after Tester PASS. BLOCKER: Designer token --biology |
| Build time | 4 h (2.5 h lab and grid, 1.5 h exercises, strings, tests) |
| Phone LAB | none (no slider; chips and buttons only) |

## 2 Objective (R1)
EN: I can predict the chances of round and wrinkled offspring from the parents' genotypes, using a Punnett square.
RO: Pot prezice șansele de descendenți cu semințe rotunde sau zbârcite din genotipurile părinților, folosind un pătrat Punnett.

## 3 Flow (about 4 minutes)
1. First screen (R2): two parent pickers and the 2 x 2 square already filled for the start cross Rr x Rr. Prompt: "Change a parent. Watch the four boxes." / "Schimbă un părinte. Urmărește cele patru căsuțe." No rule text yet.
2. After 3 changes (counter `moves`) or when exercise 1 is shown, the rule cards appear and exercise 1 becomes current.
3. Exercises 1 and 2 (lab, build a cross), 3 (typed, apply a percentage to a count), 4 (choice, reverse inference, transfer).
4. Done: "All 4 exercises done · +15 Lumens bonus", Continue.

## 4 Lab
- Two pickers, "Parent 1" and "Parent 2", each a 3-way radio group (role radiogroup, native buttons, aria-checked): RR, Rr, rr. Under each: "makes gametes R and R" / "R and r" / "r and r" (text). Default Rr and Rr. Labels: RR "round, two R" (homozygous dominant), Rr "round, carries r" (heterozygous), rr "wrinkled" (homozygous recessive).
- Square: a 3 x 3 grid (hairline, mono). Top row = Parent 1 gametes, left column = Parent 2 gametes, four cells = offspring genotype written capital first (Rr never rR) plus the word "round" or "wrinkled" under it (words, not colour; the cell of a wrinkled child also has a 2 px ink left rule). Grid is a real table with headers (th scope) for screen readers.
- Tiles (U.tiles): "RR : Rr : rr" as counts of the 4 boxes, e.g. 1 : 2 : 1; "Round" 75 %; "Wrinkled" 25 %. Percent = boxes / 4 x 100 (exactly 0, 25, 50, 75, 100).
- Button "Grow 20 offspring" / "Crește 20 de descendenți": each child takes one random gamete from each parent (Math.random), shows "Sample of 20: 14 round, 6 wrinkled" and the note "A sample changes each time: the chances are not a promise." / "Un eșantion se schimbă de fiecare dată: șansele nu sunt o promisiune." Counts always sum to 20; impossible types never appear (RR x RR never gives wrinkled). Reduce motion: no animation anyway.
- State ST = {p1:'Rr', p2:'Rr', moves:0, hn:0, sample:null}; persists across re-render. Start state: Rr x Rr = 25 % wrinkled, so exercise 1 (0 % wrinkled) is not solved (R8).

## 5 Explanation cards (after acting)
Card A, rule:
- EN: Every parent has two copies (alleles) of a gene and gives one, at random, to each child. R is dominant: round shows if at least one R is present. r is recessive: wrinkled shows only with rr. Dominant does not mean "more common" or "stronger", only "shows with one copy".
- RO: Fiecare părinte are două copii (alele) ale unei gene și dă câte una, la întâmplare, fiecărui descendent. R este dominantă: semințele rotunde apar dacă există cel puțin un R. r este recesivă: semințele zbârcite apar doar la rr. Dominant nu înseamnă „mai frecvent” sau „mai puternic”, ci doar „se vede cu o singură copie”.
Card B, formula and units: chance of a box = ¼ = 25 %. Chance of rr = ½ x ½ = ¼ for Rr x Rr (each parent must give r, ½ each). Words: genotype = the letters a plant has; phenotype = what you see (round or wrinkled); gamete = the one allele a parent gives; homozygous = two equal letters, heterozygous = two different letters.
- RO: genotip = literele pe care le are planta; fenotip = ce se vede (rotund sau zbârcit); gamet = alela pe care o dă părintele; homozigot = două litere egale, heterozigot = două litere diferite. Șansa unei căsuțe = ¼ = 25 %.
Model note (R10): "Simplified model: one gene, complete dominance, random pairing. Real families show chances, not exact counts." / "Model simplificat: o singură genă, dominanță completă, împerechere la întâmplare. Familiile reale arată șanse, nu numere exacte."
Worked example (not an exercise cross): "Rr x RR: boxes RR, Rr, RR, Rr. Nothing is rr, so 0 % wrinkled." / "Rr x RR: căsuțe RR, Rr, RR, Rr. Niciuna nu e rr, deci 0 % zbârcite."

## 6 Exercises
| # | Kind | Text EN / RO | Check | Verified answer |
|---|---|---|---|---|
| 1 | lab | Choose two parents so that ALL the offspring are round. Several crosses work; the lab accepts all of them. / Alege doi părinți astfel încât TOȚI descendenții să fie rotunzi. Merg mai multe încrucișări; laboratorul le acceptă pe toate. | wrinkled% === 0 | accepted: RR x RR, RR x Rr, Rr x RR, RR x rr, rr x RR (any cross with a RR parent). Rr x rr gives 50 %, rr x rr 100 %, Rr x Rr 25 % wrinkled: all rejected |
| 2 | lab | Choose a cross where exactly half of the offspring are wrinkled. / Alege o încrucișare în care exact jumătate din descendenți sunt zbârciți. | wrinkled% === 50 | Rr x rr or rr x Rr: boxes Rr, Rr, rr, rr = 2 of 4 |
| 3 | type | Two Rr plants are crossed and give 80 offspring. How many do you expect to be wrinkled? / Doi indivizi Rr sunt încrucișați și dau 80 de descendenți. Câți te aștepți să fie zbârciți? | integer 20; field prints "Expected number of plants" | 25 % x 80 = 0.25 x 80 = 20 |
| 4 | choice (transfer) | Two round plants have a wrinkled child. Which crosses could they be? Pick one / Doi indivizi cu semințe rotunde au un descendent zbârcit. Ce încrucișare e posibilă? | 3 buttons: RR x RR / RR x Rr / Rr x Rr; correct = Rr x Rr | child rr needs r from each parent, so both are Rr (both round, so neither rr) |
Ramp (R8): exercise 1 any easy cross, exercise 2 one specific kind, exercise 3 applies a percentage to a number, exercise 4 reasons backwards. Exercise 3 is not solved by reading the tile (the tile gives 25 %, the student still computes 20).
For exercise 4 the lab can be used to test each option (set the cross and look for rr).

## 7 Misconception feedback (react(); lab 2 or more, typed 3 plus fallback, choice 1 per wrong option)
| Exercise | Trigger | EN | RO |
|---|---|---|---|
| 1 | wrinkled% > 0 and not 100 | {w} % of the offspring are wrinkled. A wrinkled child is rr: it needs an r from EACH parent. Make one parent unable to give r. | {w} % din descendenți sunt zbârciți. Un descendent zbârcit este rr: are nevoie de r de la FIECARE părinte. Fă ca un părinte să nu poată da r. |
| 1 | both parents rr | rr x rr can only make wrinkled seeds: there is no R to show round. | rr x rr dă doar semințe zbârcite: nu există R care să arate semințe rotunde. |
| 2 | wrinkled% = 25 | Rr x Rr gives 1 box in 4 (25 %). You need two boxes: one parent must always give r. | Rr x Rr dă 1 căsuță din 4 (25 %). Ai nevoie de două căsuțe: un părinte trebuie să dea mereu r. |
| 2 | wrinkled% = 100 | Every child is wrinkled, you need some round ones. Change one parent so it can give R. | Toți descendenții sunt zbârciți, trebuie să existe și unii rotunzi. Schimbă un părinte ca să poată da R. |
| 2 | wrinkled% = 0 | No box is rr yet. A wrinkled child needs an r from each parent. | Nicio căsuță nu e încă rr. Un descendent zbârcit are nevoie de r de la fiecare părinte. |
| 3 | typed 60 | 60 is the round plants (75 %). The question asks for the wrinkled ones. | 60 sunt plantele rotunde (75 %). Întrebarea cere plantele zbârcite. |
| 3 | typed 40 | 40 would be 50 %, which is Rr x rr. For Rr x Rr, look at how many boxes in 4 are rr. | 40 ar fi 50 %, adică Rr x rr. Pentru Rr x Rr, vezi câte căsuțe din 4 sunt rr. |
| 3 | typed 25 | 25 is the percentage. 25 % of 80 is how many plants? | 25 este procentul. Cât înseamnă 25 % din 80 de plante? |
| 3 | fallback | Not quite. Find the share of wrinkled boxes, then take that share of 80. | Nu chiar. Află ce parte din căsuțe e zbârcită, apoi ia acea parte din 80. |
| 4 | RR x RR | RR can only give R, so no child can be rr. | RR dă doar R, deci niciun descendent nu poate fi rr. |
| 4 | RR x Rr | The RR parent always gives R, so no child is rr. A wrinkled child needs r from BOTH parents. | Părintele RR dă mereu R, deci niciun descendent nu e rr. Un descendent zbârcit are nevoie de r de la AMBII părinți. |
| 4 | correct | Right: both parents are Rr (round, but they carry r). A quarter of their children are wrinkled. | Corect: ambii părinți sunt Rr (rotunzi, dar poartă r). O pătrime din descendenți sunt zbârciți. |
Generic (all lab exercises, no trigger): hint level asked.

## 8 Hint ladder (3 levels, C5; level 3 is a worked step on a different cross)
| # | 1 nudge | 2 method | 3 worked step |
|---|---|---|---|
| 1 | A wrinkled child is rr. It needs r from both parents. | If a parent is RR it can only give R. What does that do to every box? | Example: Rr x Rr gives RR, Rr, Rr, rr. One box is rr, so some are wrinkled. For 0 % no box may be rr. |
| 2 | Half wrinkled means 2 of the 4 boxes are rr. | One parent must give r every time. The other must give r half the time. | Example: Rr x RR gives RR, Rr, RR, Rr: 0 of 4 are rr = 0 %. Count the rr boxes of your cross the same way. |
| 3 | First find the share of wrinkled boxes in Rr x Rr. Set it in the lab. | Then take that share of 80: 80 x share. | Example: 200 plants and 10 % wrinkled: 200 x 0.10 = 20 plants. |
| 4 | A wrinkled child is rr: an r came from each parent. | Which of the three crosses has an r in BOTH parents? | Example: a child rr can come from Rr x Rr or Rr x rr. Here both parents are round, so neither is rr. |
(RO: copy the structure; keys: alelă, genotip, fenotip, căsuță, rotund, zbârcit, șansă.)

## 9 Lumens and quest
Common contract C2: 4 x 10 + 15 = 55 Lumens once; ctx.report({qt:4}); no Moon. Exercise 4 wrong option: fx.bad, ctx.report({bad:1}).

## 10 Overview data (C9, inert)
mins 4, ex 4. Intro: "Plants pass one copy of each gene to every child. A Punnett square shows the chances." / "Plantele dau fiecărui descendent câte o copie din fiecare genă. Pătratul Punnett arată șansele." Takeaways (5):
1 Each parent gives one of its two alleles, at random. / Fiecare părinte dă una din cele două alele ale sale, la întâmplare.
2 Dominant (R) shows with one copy; recessive (r) shows only with two. / Dominanta (R) se vede cu o copie; recesiva (r) doar cu două.
3 Each of the four boxes has a chance of ¼ = 25 %. / Fiecare din cele patru căsuțe are șansa ¼ = 25 %.
4 Rr x Rr gives 3 round for every 1 wrinkled on average (75 % and 25 %). / Rr x Rr dă în medie 3 rotunzi la 1 zbârcit (75 % și 25 %).
5 A ratio is a chance for each child, not an exact count in a family. / Un raport este o șansă pentru fiecare descendent, nu un număr exact într-o familie.

## 11 Implementation notes for David
Reuse: U.el, U.tiles, U.cont, linear.js load/save/exercise list/hint button/num(), ctx.report / award / fx. New: pairs table `G={RR:['R','R'],Rr:['R','r'],rr:['r','r']}`, box genotype = sorted capital first, `wrinkled% = boxes with 'rr' x 25`, grid builder (about 25 lines), sample button (about 8 lines), react() table, 3 answer buttons for exercise 4. About 150 lines. No canvas, no Loop.

## 12 Acceptance checklist (Tester)
T-common plus:
1 Recompute: Rr x Rr = RR, Rr, Rr, rr = 1:2:1, 75 % round, 25 % wrinkled; Rr x rr = Rr, Rr, rr, rr = 50 %; Rr x RR = 0 %; rr x rr = 100 %; RR x rr = Rr in all 4 boxes = 0 % wrinkled; 25 % of 80 = 20.
2 Start is Rr x Rr (exercise 1 not solved). Try all 9 parent pairs for exercise 1: exactly the 5 with an RR parent plus order variants pass (RR x RR, RR x Rr, Rr x RR, RR x rr, rr x RR).
3 Exercise 2 passes only for Rr x rr and rr x Rr; all other 7 pairs do not.
4 Exercise 3: 20, "20.0", "20,0" pass; 60, 40, 25, 80, 5 show their message; empty does nothing.
5 Exercise 4: only Rr x Rr passes; each wrong button shows its message and costs no Lumens.
6 "Grow 20 offspring": 10 clicks per cross; counts sum to 20; RR x RR never wrinkled, rr x rr never round; the note is shown.
7 Genotype strings never show "rR". Table headers present for screen readers. Not colour-only: remove the --biology tint (devtools) and every cell is still readable.
8 Lumens 10, 10, 10, 10 + 15 once; reload no double pay.
9 Overlap of the biology galaxy in the home view; delete the registry line = nothing breaks.
Teacher check: Romanian terms (alelă, genotip, fenotip, homozigot, heterozigot, gamet) and the grade; seed shape round/wrinkled as the school example.
