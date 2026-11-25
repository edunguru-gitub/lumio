# Lumio jury lens (stage II, 25 Nov 2026)
How to read this: "Jury wants" = what mentors said in the 4 Zoom transcripts, with source code and time (codes and speaker roles are in docs/teacher/knowledge.md, section "Mentor advice by grid criterion"). "Lumio should show" = only facts already in docs/MAP.md, docs/spec-stage2-slides.md or the deck. Anything marked EDUARD needs a real value from him; never publish an invented number, customer or partner.
Limits: transcripts are auto-generated and noisy. Missing from the files: Strategy masterclass after min 25, the 17 Nov costs and KPI part, the 24 Nov pitch masterclass. Mentors never stated the 100-point grid, and it is not recorded whether they judge. The official grid in knowledge.md wins.

Facts we can safely use: 13 students surveyed; 10 in 13 mostly read or watch; 1 in 7 lose focus under 10 min; 7 in 10 want to try; 4 of 5 testers would use it again; 8 lessons in 4 areas in v1 (about 3 min and 4 exercises each); EN and RO; 6 themes; v1 = one HTML file (about 0.9 MB), no account, progress stays on the device; phone as controller via QR on the local network (needs Lumio.cmd with Node.js in v1); handwriting recognition = own template matching, not machine learning; read-aloud voice; plan = free for students, class licence for private schools, premium for parents; Lumens never reset, monthly Moon rating (ranks use sample players); v2 = permanent shell plus one module per lesson, registry file, 5 lessons ported, parity checked by Tester; no paying customer, no signed partner.

## 1 Problem, client, validation (15)
Jury wants
- Customer and consumer named separately ("customer is the school, consumer is the student") and how the end user actually gets the app. Daniel, ST 00:16:17 to 00:19:34.
- Evidence of the loop: persona, problems written from interviews, prototype taken back to the same people, changes made after feedback. Kaustav, QA 00:11:22 to 00:13:18 and 00:31:22.
- A competitor comparison including indirect alternatives, ending in "why would they switch". Daniel, QA 00:16:59 to 00:21:24.
- Believable evidence: inflated interview counts raised doubt; GDPR for minors; sensitive parts of screenshots may be erased. Adina and Alexia, Z19 00:40:58 and 00:53:42.
- One problem solved well, not several. Stefan, Z19 00:48:55 (partly inaudible).
Lumio should show
- The survey as it is: 13 responses, the 10 in 13 and 1 in 7 findings, and the stated limits (small sample, one town, friends as testers if true; EDUARD confirms who the 5 testers were).
- "Student" as consumer, "private school" and "parent" as payers, in one line on the client slide.
- Competitor slide with indirect alternatives (reading notes, videos, other apps) and the honest wording "not in public docs".
- Pilot plan with consent for under-18, marked as a plan until a class is agreed (EDUARD: school, teacher, dates). No claim of customers.
- The single problem sentence: students read or watch, lose focus, and nothing tells them what to try next (spec slide 2).

## 2 Solution and innovation (15)
Jury wants
- One clear USP plus extra value, stated against named alternatives. Daniel, QA 00:22:34 and ST 00:16:17 to 00:19:34 (value-proposition sentence with "unlike").
- Innovation may be in the experience and configuration, not only in new tech. Daniel, QA 01:05:37 (screen only partly narrated).
- Evidence that the product changed after feedback (MVP then iterate). Daniel, QA 00:43:25 to 00:46:21.
- Something that makes the customer like it early, the "moment of truth". Kaustav, QA 00:40:07 to 00:42:48.
Lumio should show
- The USP the repo supports: phone as controller of the lab (no kit needed), 3-minute hands-on lessons, Lumens and Moon rating, EN and RO. Say "as far as we found" for competitors.
- The first lab a student meets (the lesson tagged "first" in the v2 registry) as the moment of truth, in the demo footage.
- Honest iteration story: v1 shipped and scored in stage I; v2 modular shell is the new foundation (MAP.md); say what changed because of tester feedback only if it is in docs/review-v2-psych.md or tester notes (check before claiming).
- Demo stays v1; present v2 as the foundation, not as a finished product.

## 3 Technical solution and AI (15)
Jury wants
- What already works today versus plans; realistic build. Stefan, Z17 00:13:14 to 00:17:06 (proof = it is in use); grid says "what already works".
- AI as an assistant that is explainable and does not replace the human; honest about errors. Stefan, Z17 00:13:14 to 00:17:06; Toni Ionescu (teacher), Z19 00:51:29 and 00:54:09 ("nothing is 100 percent").
- Existing technology reused instead of rebuilt. Daniel, ST 00:22:27.
- Not recorded: how deep the jury goes on technology.
Lumio should show
- One-file offline app, no account, data on the device; modular v2 (add a lesson = one file plus one registry line; delete a line and nothing breaks, tested).
- Phone controller with QR on the local network, and the honest caveat that v1 needs the local launcher.
- AI used honestly: read-aloud voice (browser built-in), AI agents used to BUILD and test the code with the team deciding; handwriting recognition named as template matching, not AI. Hint tutor only as a labelled plan (EDUARD confirms).
- Parity check v1 versus v2 after each port (Tester) as evidence of realistic build.

## 4 Business and communication (20)
Jury wants
- A business model that says who pays and why at this price, with a way past the "no money" barrier (freemium, school as cluster). Daniel, QA 00:08:45 to 00:11:22.
- Business Model Canvas: not taught in the files; the mentor frame is customers and stakeholders, market and route to market, business model, delivery and adoption, risk and MVP. Daniel, ST 00:16:17 to 00:19:34. Use the standard 9 boxes from spec slide 16.
- Channels matched to audience: social media for B2C, direct outreach and a warm introduction for B2B; the message must be specific. Stefan, Z17 00:21:59 to 00:25:34; Daniel, QA 00:21:24; Matei, Z19 00:27:39 to 00:29:01.
- "What is in it for you" for each audience; sponsors are not revenue. Matei, Z19 00:14:32 to 00:18:20 and 00:22:50 to 00:25:22; Adina, Z19 00:43:48.
- Students' purchasing power comes from parents: price accordingly. Daniel, ST 00:20:36 to 00:22:08.
Lumio should show
- Canvas where Revenue = class licence plus parent premium, students free, matching the plan in the repo. Key partners: none signed.
- Three audiences, three messages and channels (spec slide 17): students and parents via social and teachers, private schools via a face-to-face meeting and free pilot first. Treat "school administration decides" as unconfirmed (see Conflicts C1 in knowledge.md); say "we will find who decides".
- Why a school pays (class progress view) and why a parent pays (visible progress); why students stay free (reach). EDUARD gives prices.
- Roles of the three team members in one line (strength first, as Kaustav advised), QA 00:23:44 to 00:26:51.

## 5 Costs, revenue, KPI (15)
Jury wants
- Plain arithmetic: customers x ticket, minus cost to serve and admin, showing the margin or return needed and a break-even. Daniel, ST 00:23:47 to 00:25:25. Jurors may ask for first-quarter customers and average ticket.
- Realistic running cost, avoiding expensive manual work. Daniel, ST 00:22:27.
- A way to pay for free users (investor or sponsor subsidy was the mentor answer). Matei, Z19 00:05:20. No rule given for limiting a costly free tier.
- KPIs a B2C mentor lists: cost to acquire a user, free-to-paid conversion, retention (how long they stay), revenue per month x months, margin, profit and loss in Excel. Matei, Z19 00:56:10.
- Closest thing to a paying customer beats a letter of intent. Stefan, Z19 00:45:05.
- Education-impact KPI: no mentor advice in the files (not recorded).
Lumio should show
- Cost lines already identified in spec slide 18 (hosting and relay, domain, AI tooling, lesson time, school support) with real figures from EDUARD; "team time not charged" if true.
- The honest structural fact: one static file means extra students add almost no cost (spec slide 18 says true technically; the money figure needs EDUARD).
- Break-even as a formula with three EDUARD inputs (licence price, monthly cost, number of classes), no forecast, no guaranteed growth.
- KPI table from spec slide 19: weekly active learners, lessons per learner, return rate, test-to-use, plus a before/after quiz for education impact. Add cost per acquired user and free-to-paid share if the team agrees; baselines only where real (5 testers, 4 of 5). Targets labelled targets.
- A mock Excel built from Stefan Iarca's empty structure if it arrives via Adina (check WhatsApp), numbers by EDUARD.

## 6 Pitch and presentation (20)
Jury wants
- Clarity: who you are, what you do, problem, for whom, what you want from the listener at the end. Matei, Z19 00:19:41 to 00:20:41.
- Short and structured elevator logic: customer, product, AI, education, MVP in about 90 seconds to 2 minutes. Daniel and Kaustav, ST 00:05:54 and 00:08:39.
- Humility and honest limits, no arrogance. Matei, Z19 00:27:39 to 00:29:01.
- A story and frameworks, not a feature list. Daniel, QA 00:05:35 to 00:06:59 (garbled); Kaustav's story style, QA 00:31:40.
- Numbers ready for Q&A (first quarter, ticket, revenue, cost). Daniel, ST 00:23:47 to 00:25:25.
- Whole team speaks, roles visible, 25 slides, 5 minutes: official page only (no mentor spoke about it).
Lumio should show
- Opening line that answers who, what, problem, for whom (spec script, slides 1 to 4, before the demo).
- A closing ask: "we want a classroom for the pilot" (spec script, Matei advice in knowledge.md).
- Three speakers, each at least three lines, roles named on the team slides (spec speaker balance); script about 3:51 of 5:00.
- Slide numbers fixed to "NN / 24"; no open ASSUMPTION tag at upload.
- Prepare a one-page Q&A card for the final: survey facts, tester facts, limits, price logic, cost logic, the "no paying customer yet, pilot next" sentence.
