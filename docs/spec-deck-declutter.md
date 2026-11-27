# Spec: declutter the stage II deck (Designer, 27 Nov)
Why: Eduard (CEO): "too many numbers, it is jarring". Source reviewed: DRAFT9 (25 pages, all rendered and looked at), tools/deck/slides.html, deck.css, docs/pitch-stage2.md, research files. Fixed images, untouched: pages 1, 2, 6, 7, 25. All numbers removed from slides live in docs/qa-cheatsheet.md (nothing lost). English only.
Units: build page is 960 x 540 pt (the 1334 x 750 view is the same page at 1.39x). Sizes below are pt on the build page, as in deck.css.

## 1. Diagnosis (page by page; N = visible numerals, estimated)
| Pg | Problem | N |
|---|---|---|
| 3 | Gap: two tiles plus a mono strip with three stats and a sources line; strip is the real message but is tiny | 3 |
| 4 | Four equal tiles, OK; tile text slightly long | 0 |
| 5 | 5 x 5 table, 25 cells of 9 pt text, no focal point | 1 |
| 8 | Three text tiles plus a strip; four numbers repeat page 7 | 9 |
| 9 | Four numbered points plus a strip plus two images: three focal points | 4 |
| 10, 11, 13 | Good image, text list of 3 long bullets; 11 has pay amounts | 4 |
| 12 | Calm. Keep | 1 |
| 14 | Two tiles, eight bullets, small text, "v1 8 lessons" vs "v2 7 lessons" reads as a step back | 8 |
| 15 | Four text tiles of 9 pt text: wall of text | 0 |
| 16 | Business canvas: six tiles, 8 pt text, prices, flat hierarchy | 10 |
| 17 | Three tiles plus target box plus plan line: five blocks, three message quotes | 7 |
| 18 | WORST. Three tiles, a four-line cost list, a calculation row, a strip and a 6-line footnote at 7 pt. | 40 |
| 19 | WORST. Funnel plus a 7 x 4 table plus two footnotes at 7 pt. | 60 |
| 20 | Table, 6 rows x 4 columns, 9 pt | 16 |
| 21 | Table, 6 rows, 9 pt | 5 |
| 22 | Table, 3 x 3, very long cells, 8 pt | 20 |
| 23 | WORST (Eduard: "qr code?"). Three stat cards plus a comparison box plus a phone sentence plus a QR plus sources: five focal points | 18 |
| 24 | Fine, but a footer strip with "93" | 1 |
Rhythm: pages 9, 10, 11, 13 are four screenshot slides in a row with identical layout; pages 16 to 22 are seven dense slides in a row, with no breathing room. Tables on 5, 19, 20, 21, 22. Text under 12 pt on 14, 15, 16, 18, 19, 20, 22.
Three worst: 18, 19, 23. Then 16, 22, 20.
Total numbers on the 20 editable pages: about 210 now, about 25 after this spec.

## 2. Design rules for this deck
1. One idea per slide, one focal element (a hero number or one diagram). Everything else is quieter.
2. Max 3 numbers visible per slide (a year in a sources line and the page counter do not count). The rest goes to the Q&A sheet.
3. Headline = the takeaway, at most 8 words. Body at most 25 words in total.
4. Type scale (pt): headline 44 to 52 (use 48; 40 only for a long headline); hero number 120 to 160 (slide 23 only: 88 for the two secondary numbers); body 22 to 26 (use 24); caption 14 to 16 (use 14; kicker mono 14). Nothing below 14 pt, no footnotes in 7 pt.
5. 8-pt grid: all gaps, paddings and sizes are multiples of 8 (8, 16, 24, 32, 48, 64). Side margin 68 pt (7.1%), top 64, bottom 56.
6. Palette: bg #171513, card #211E1A, line #2E2A24, ink #EDE3D0, muted #A89F8E, tan #D9C3A0. Hero numbers in tan; supporting text ink; captions muted. Orange only for the word or figure "Lumens", violet only for Moon. No new hue, no gradient, no glow. Fonts as now (Instrument Serif headlines like the fixed pages, Inter body, Deck Mono kicker).
7. One tile style: card fill, 0.75 pt line, radius 8 pt, padding 24 pt. One radius everywhere (screenshots included). No tile inside a tile.
8. Diagrams instead of tables: funnel, paired bars, one break-even line, a module row. Plain geometry (rectangles, thin lines), no icons, no emojis. Tables only on page 5 (reduced to cards) and nowhere else.
9. Alignment: everything left-aligned to the same 68 pt edge; hero number baseline aligned with the headline's left edge. Centered only on slide 12 (QR).
10. Rhythm: airy slides (one big element, lots of space) alternate with the 3 allowed denser slides (4, 14, 16). Never two dense slides in a row.
11. Honesty stays on the slide as one short caption (14 pt, muted): "theoretical scenario, not a forecast", "targets, not results", "as far as we found", "estimate". Short, but never dropped.
12. Business canvas (page 16) stays a canvas: the jury lens (docs/teacher/lumio-jury-lens.md, line 48) says use the standard boxes. We keep six grouped tiles, 12 words each, two highlighted.

## 3. Per-slide plan (all 25)
Legend: V = visual form. Numbers: kept / to Q&A (Q).

**1 Cover.** FIXED image. Untouched.
**2 Problem.** FIXED. Untouched.

**3 Gap. Redo (airy).** Headline: "Practice should feel like play." V: left half hero **35%** (tan, 140 pt); under it caption "of Romanian students say their own devices distract them in maths lessons. OECD average: 30%." Right half, two lines, 24 pt: "Today: explanation first, practice later." / "With Lumio: try it first, the explanation follows." Caption: "Source: OECD PISA 2022, Romania note." Kept 35, 30. Q: 22% (HBSC), the Projectile hearts line, the Lumens line.

**4 Solution. Simplify (tan page stays).** Headline "Meet Lumio." Lead (24 pt): "A tutor you play with." Four tiles, 8 words each, same style: Experiment: "Hands-on labs in Physics, Math and Life skills." / Level up: "Lumens that never reset, and a monthly Moon rating." (word Lumens in orange, Moon in violet, as now) / Compete: "Challenges and a leaderboard." / Phone as controller: "Sliders and tilt drive the lab." Q: the Lumio.cmd and local-network caveat (kept on 12 and 14), "sample players" (kept on 13).

**5 Competitors. Redo.** Headline "The phone as controller: only Lumio." V: four cards in a row (Lumio tan-outlined, three muted). Card text: Lumio "Hands-on labs. Your phone is the controller." / PhET "Simulations." / Brilliant "Interactive problems." / Khan Academy "Exercises and videos." Under the three rivals, one muted line each: "Phone control: not in public docs." Caption: "As far as we found, from public pages." Q: 61 Romanian sims, Romanian-language row, streaks/points row (script line unchanged: "PhET has simulations, Brilliant has streaks" still true; add to Q&A).

**6 Client.** FIXED. **7 Validation.** FIXED (13, 4 of 5 stay there).

**8 Validation upgrade. Redo (airy).** Headline "Next: one real class." V: hero "**4 weeks**" is wrong focus; use hero text "1 real class" (tan, 120 pt) with caption "4 weeks, two lessons a week, with the teacher." Beneath, three short lines (24 pt, single column): "Done: a student survey and live tests." / "Limit: a small sample, no paying customer yet." / "Rules: parental consent, anonymous codes, data stays on the device." Kept 1, 4 (and "two" as a word). Q: 13, 5, 4 of 5 (already on 7), Student 1 to N, the target schools sentence (on 17).

**9 Big idea. Simplify.** Headline "Learn with your hands." Body 24 pt, two lines: "Your body builds the intuition." / "Every student already owns the controller: no kit, no cost." Image: the existing gas lab + phone screenshot, larger, one caption "Live v2 · laptop lab, phone controller". Remove points 03, 04 and the strip (the competitor claim is on 5). Numbers 0.

**10 App 1. Simplify.** Headline "Start in one tap." Body, two lines: "Seven lessons, English and Romanian." / "Light and Dark." Caption under image as now. Q: lesson names (now on 14), handwriting bullet (on 14 as a kept feature). Kept 7 (as the word "Seven").

**11 App 2. Simplify.** Headline "Experiment, then prove it." Two lines: "Free play: move the sliders, watch the path." / "Levels: five questions, three hearts. The first clear pays Lumens." (Lumens orange.) Q: 10 to 20 Lumens by sparkles, replays pay none, free play pays 0.

**12 Try Lumio now. Keep.** Keep layout and QR. Cut the "Seven lessons" caption line; keep only "The phone controller needs Lumio.cmd on a laptop on the same network." (14 pt muted). This is the ONLY QR on the middle slides (Manager decision). Numbers 0.

**13 App 4 Ranks. Simplify.** Headline "Compete and level up." Two lines: "Lumens never reset. A monthly Moon rating runs from New Moon to Blue Moon." / "Win a challenge, and your Moon rises." Caption above image stays: "Sample players · no real users yet." Numbers 0.

**14 How it works. Redo (diagram).** Headline "Rebuilt in modules. Live on the web." V: one wide rounded bar labelled "Shell: galaxies, camera, zoom" with seven equal small squares under it, labelled with the lesson names at 14 pt (algebra, parabola, linear functions, Pythagoras, gas, projectile, compound interest). Caption right: "A new lesson is one new file." Under, one line 22 pt: "Live: edunguru-gitub.github.io/lumio". Muted caption: "Kept from stage I: handwriting, phone controller, Levels, Lumens, Moon ranks. Not in v2 yet: Spanish, podcast mode, 6 colour themes." Kept 7. Q: v1 facts (8 lessons, 4 subjects, 0.9 MB, 6 themes, check date 26 Nov, web page syncs two tabs only, handwriting is template matching not AI).

**15 AI and data. Simplify (airy).** Headline "Built with AI, not sold as AI." Two columns, no tiles lines inside: left "In the product: none, except the browser's read-aloud voice." Right "In how we build it: Claude agents write and check the code; a human reviews every change." Caption: "Progress stays in the browser on the device. A hint tutor is a plan, only with parental consent." Q: localStorage, relay, dashboards are plans, handwriting not AI, tester checks every port. Numbers 0.

**16 Business model. Simplify (dense slide 1 of 3).** Headline "Free to learn. Private schools pay." Keep six tiles, grid unchanged, text 16 to 18 pt, max 12 words each: Partners and activities: "Schools for the pilot, no signed partners yet. AI-assisted build." / Value (tan): "Hands-on labs, EN and RO. Your phone controls the experiment, as far as we found." / Channels: "Students: social media and teachers. Schools: direct contact, then a pilot." / Segments: "Uses: students, grades 9 to 12. Pays: private high schools. Later: parents." / Costs: "Small and fixed: accountant, tools, server, domains." / Revenue (tan): "Setup fee 1,500 RON once, plus 1,200 RON per class a year. Students free." Strip dropped (caption "The school pays, the student uses"). Kept 1,500, 1,200 (and 9 to 12 as a range: count as one). Q: 341, 800 to 2,500, 900 to 1,800, 100 a month, pilot 300 commitment fee not revenue, parents' premium phase 2, no sponsors.

**17 Go to market. Redo.** Headline "Private high schools first." V: one large tile left (two thirds): "Launch platform: private high schools in Romania." / "Target schools: Transylvania College (Cluj-Napoca), PREMS (Brasov)." / "A target segment, not a relationship: no school has agreed to anything yet." Right third, two muted tiles: "Students: free, via teachers and social media." / "Parents: phase 2, via the teacher." Caption: "Pilot class by Dec 2026 is a target." Kept 0 numbers (Dec 2026 is a date). Q: messages, 300 RON fee, 50 schools in 2027, first subscriptions Sep 2027, "three more under review". NOTE: the "three more under review" line leaves the slide; script does not say it.

**18 Costs. Redo (hero + paired bars, airy).** Headline "5 classes cover our running costs." V: hero **5** (tan, 160 pt) with the words "classes to break even" (24 pt) beside it. Below, one paired bar (two thin horizontal bars, same scale): bar A "Fixed costs a year: 4,092 RON" (muted fill); bar B built from five equal blocks "One class leaves us 972 RON a year", five blocks together just pass bar A. Caption: "Running costs only. Start-up cost is extra." Kept 5, 4,092, 972. Q: 341 a month and its four parts, 1,200 price, 228 cost to serve, 4.2, 3,000 start-up, 7,092 / 972 = 7.3, 8 classes, per-school 5,100, tax, prices sources.

**19 Theoretical X. Redo (one funnel).** Headline "A theoretical two schools in year one." V: funnel of three descending bars in one column (widths proportional): "50 private high schools contacted" / "6 start a pilot" / "2 pay" (the 2 in tan, 48 pt; others ink). Right side caption box, no table: "A theoretical scenario, not a forecast. No paying client yet." and "Base case: close to break-even in year one (an estimate)." Kept 50, 6, 2. Q: about 100 schools, 12%, one in three, range 1 to 4, three scenarios, revenue, costs, results, first-quarter table, risk of cold outreach (0.2% to 1%), pilot fee credit.

**20 KPIs. Redo (three targets).** Headline "We measure learning, not clicks." V: three tiles in a row, each with a hero figure (tan, 88 pt) and a 22 pt label: "60%" / "of the class active each week" ; "+20%" / "quiz score, before and after" ; "1 in 3" / "pilots turn into paying schools". Caption: "Targets, not results. Teachers report with anonymous codes." Kept 3. Q: the other three metrics (lessons completed 2 a week, return rate, user acquisition cost at most 1,500 RON a school), baselines (5 testers, 4 of 5), definitions.

**21 Limits. Redo (airy list).** Headline "Limits today, and our answer." V: four rows, two columns, no grid lines, 22 pt, a thin line between rows: "Seven lessons, by design." -> "Next ones come from pilot feedback." / "Small validation, no paying client yet." -> "One real class first, with a quiz before and after." / "Phone link: local network only." -> "A hosted relay is planned." / "AI hint tutor: a plan, not built." -> "Hints, not answers, with parental consent." Caption: "Few lessons on purpose: each is a lab where you change a value and watch the answer move." Numbers 0 (Seven as a word). Q: 13 and 5, 35 RON relay, Sep 2027, learning gain not measured.

**22 Next steps. Redo (three-step path).** Headline "From one class to many schools." V: three tiles joined by a thin line with arrows (plain geometry): "1 Private schools. Now: pilots, then paying schools." / "2 After the first customers. More subjects, parents' premium, public schools through grants." / "3 Scale. Many schools." Caption: "The prototype works. Next, we prove it in classrooms." Kept 0 (phase numbers are labels). Q: all entry conditions (3 paying schools, 70% renew, 60% active, NPS +30 from 10 teachers, 10 schools, hire at about 75 classes, 900 to 1,800 pricing).

**23 Why Lumio. Redo (three big numbers; QR REMOVED).** Headline "Cheaper than a tutor." Layout: left column, two stacked secondary numbers in ink (88 pt): "5,250 RON" with label "a year of maths tutoring, one hour a week (our quoted rate)"; "15,000 RON" with label "a BAC year, three subjects (our estimate)". Right, hero in tan (120 pt): "About 55 RON" with label "Lumio, per student per year". Caption, one honest line (14 pt): "Lumio complements a tutor, it does not replace one." Optional second caption (Manager allows, cut first if crowded): "Families who pay spend 6,234 RON per child a year on tutoring (Save the Children Romania, 2025)." Removed: three stat cards, "35% vs 30%" (now on slide 3), comparison box, phone sentence, QR, sources block. Kept 5,250, 15,000, 55. Q: formula 150 x 1 x 35, 1,200 / 22, ratios 95x and 273x, exam-year hours (100 h assumed), 6,234, 1 in 3 at 300 RON, 35% vs 30%, sources and what is not verified.
SLOT NOTE: the exam-year figure 15,000 is from docs/research/tutoring-cost-model.md (Researcher, base case: 100 assumed hours x 150 RON). It is an assumption and the sources were snippets, not opened. It must carry the word "estimate" on the slide. If Researcher revises it, change only this slot: [EXAM-YEAR FIGURE: 15,000 RON, estimate, from tutoring-cost-model.md].

**24 Team. Simplify.** Headline "Team Flow, Suceava and Oradea." Three tiles as now (initial circle, name, one role line 22 pt): "Design and the app" / "Team lead, survey and outreach" / "Technical side and debugging". Remove the footers inside tiles and the "93 points" strip (it goes to Q&A; true but not needed). Numbers 0.

**25 Close.** FIXED. Untouched. (Manager: a small QR here is not possible, it is a fixed image.)

## 4. Script changes (docs/pitch-stage2.md; rule: never say a number that is not on the slide)
Unchanged: blocks 1 to 17 and 19 to 22 except as listed. Speakers unchanged. Total goes from 4:47 to about 4:38.
- Slide 18 (Eduard, 18 s -> about 10 s): "Running Lumio costs 4,092 lei a year. Each class leaves us 972 after the cost of serving it. So 5 classes cover our running costs."
- Slide 19 (Eduard, 22 s -> about 17 s): "No paying client yet. This is a theoretical scenario, not a forecast; what matters is the method. We contact 50 private high schools; 6 start a pilot, 2 pay. In the base case, close to break-even in year one."
- Slide 20 (Darius, 15 s, same length): "Each week the teacher reports who was active. A short quiz, before and after, shows what they learned. Our targets: sixty percent of the class active each week, and one pilot in three turning into a paying school." (Said numbers: 60%, one in three, all on the slide.)
- Slide 23 (Eduard, 15 s -> about 18 s): "Why Lumio? A maths tutor at our quoted rate costs 5,250 lei a year; a BAC year, about 15,000, our estimate. Lumio costs a school about 55 lei per student. It complements a tutor, it does not replace one."
- Slide 16+17 (Darius): unchanged; the setup fee and subscription are on slide 16.
Also update the Q&A one-liners: break-even "8 with the start-up", X range and the benchmark risk now live in docs/qa-cheatsheet.md.

## 5. Constraints check
25 pages, 5 fixed pages untouched, nothing added that is not in the research files (the only unopened-source figure is 15,000, flagged as an estimate; Manager and Researcher decide whether it stays). English only. Open flags for Manager: (a) fixed pages 2, 6, 7 use orange mono footers and numerals, against the taste file (orange only for Lumens); we cannot touch them, it is a known deviation; (b) "close to break-even" on slide 19 is -588 on 10,200 (-5%): true but soft; Researcher may confirm the wording; (c) slide 16 stays a canvas on purpose (jury lens).

## 6. Build note for David (patch, do not rewrite; edit only tools/deck/slides.html sections and deck.css)
Sections to change by id: s08, s15 (how it works, page 14), s16 (AI, page 15), s17 (canvas, page 16), s18 (GTM, page 17), s19 (costs, page 18), s19b (X, page 19), s20 (KPI), limits, next, team (Why Lumio, page 23), crew (team, page 24), gap, sol, comp, idea, app1, app2, try, app4. Leave the five fixed pages out. Order of pages does not change.
Global edits in deck.css: .slide padding 64pt 68pt 56pt 68pt; tile radius 8pt, padding 24pt; h1 48pt; .tile p 22pt; remove 7 to 13 pt text sizes.
New classes (small set):
- .hero: Instrument Serif, 160pt, line-height 1, color tan; .hero.m = 120pt; .hero.s = 88pt (slides 20 and 23). .hero small (unit "RON", "classes") = Inter 24pt, muted.
- .cap: Inter 14pt, line-height 1.5, muted, max 60 characters per line; .cap.tan = tan (honesty line).
- .pair: container for the paired bars on 18: .pair .bar (height 24pt, radius 4pt, background var(--line)), .pair .bar.fix (muted) and .pair .bar.cls made of five .blk children (flex 1, gap 4pt, background var(--tan), the five together slightly wider than .fix).
- .funnel: column on 19: .funnel .step (height 56pt, background var(--card), border line), widths set inline as 100%, 56%, 24% of 50, 6, 2 (hero step in tan border); labels 22pt.
- .mods: row on 14: .mods .shell (full-width bar) and .mods .mod (seven equal squares, 14pt label).
- .row3 (three equal tiles on 20) and .path (three tiles joined by a 1pt line on 22) reuse .tile.
Remove: .calc, .scn, .fun, .kpi, .lim, .bmc small text sizes, .src footnotes, the qr image in section team, and the strips that duplicate captions. build.js keeps working: data-shot images stay on 9, 10, 11, 12, 13 (qr.png only on slide 12). After build run the FINAL refusal check (no tags, no brackets, no open placeholder; the slot note above is NOT put on the slide). Tester: check each rule in section 2 (max 3 numbers, nothing under 14 pt, margin 68 pt) and that every removed number is in docs/qa-cheatsheet.md.
