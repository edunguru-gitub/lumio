# Spec: HSIC Stage II, new slides, revised pitch, deck fixes (25 Nov 2026)
Deadline: upload Fri 27 Nov 24:00 (deck max 25 slides, MP4 max 5:00, whole team speaks, tech AND business covered). Grid: docs/teacher/knowledge.md.
Demo stays on v1 (app/lumio.html). Do not show v2.

## Rules for this spec
- Visual language = existing deck: bg #171513, tiles #211E1A, tan #D9C3A0 titles, ink #EDE3D0, Caladea headlines, Inter body, mono caps kicker and mono tile footers. Orange only for Lumens, violet only for Moon. No emojis, no gradients, no icons needed. Footer "LUMIO · NN / 24".
- Every number not found in the repo or the existing deck carries **[ASSUMPTION - Eduard to confirm]**. Do not publish a slide while a tag is open: either Eduard confirms the number or the line is deleted. Never state customers, revenue, interviews or partners we do not have (organizers check; 160 claimed interviews already raised doubt).
- Facts from repo/deck, safe to use: 13 students surveyed; 10 in 13 mostly read or watch; 1 in 7 lose focus under 10 min; 7 in 10 want to try; 4 of 5 testers would use it again; 8 lessons in 4 areas (Physics, Math, Spanish, Life skills); about 3 min and 4 exercises per lesson; EN and RO; 6 themes; v1 is one HTML file (about 0.9 MB); phone link via QR on the local network; plan = free for students, class licence for private schools, premium for parents.
- Deck becomes 24 slides (1 spare under the 25 limit). Do not add more.

## Final deck order (24)
1 Cover · 2 Problem · 3 Gap · 4 Solution · 5 Competitors · 6 Client · 7 Validation · **8 NEW Validation upgrade and pilot** · 9 Big idea · 10-14 The app (1 of 4, 2 of 4, Themes, 3 of 4, 4 of 4) · **15 NEW Tech and AI** · **16 NEW Business Model Canvas** · **17 NEW Value proposition, go-to-market, channels** · **18 NEW Costs and revenue** · **19 NEW KPIs and impact** · 20 Next steps · 21-23 Team · 24 Thank you.

---

## NEW 8 · Validation upgrade (slot: right after old slide 7)
Kicker: VALIDATION · WHAT WE DID, WHAT WE DID NOT
Headline: We tested early. Now we test in a classroom.
Tiles (3):
1. **Done.** Anonymous student survey, 13 responses. 5 students tried the live app, 4 of 5 would use it again next week.
2. **Honest limits.** Small sample, one town. No paying customer yet. Testers were friends of the team. (Remove the last sentence only if untrue: **[ASSUMPTION - Eduard to confirm who the 5 testers were]**)
3. **Pilot plan.** One real class, one school in Suceava, 4 weeks, 2 lessons a week. Measure return rate and lessons finished (see KPI slide). Teacher and parents informed first.
   Class: **[ASSUMPTION - Eduard to confirm: school, teacher, class size, start date. If not agreed by 27 Nov, write "pilot class being agreed", no name]**
Mono footer: PILOT RULES · WRITTEN PARENTAL CONSENT FOR UNDER 18 · NO NAMES COLLECTED · DATA STAYS ON THE DEVICE
(GDPR basis, true today: v1 stores progress in the browser only, no accounts, no server database. Consent form wording to be drafted with the school; per Alexia/Adina: GDPR matters when minors are interviewed.)
Rationale: 5 pts of the validation criterion, and it turns the weakness (13 answers) into a plan.

## NEW 15 · Tech and AI (slot: after the app slides, before business)
Kicker: HOW IT WORKS
Headline: Light and offline. Built with AI, not sold as AI.
Left column, tiles "How it works":
- **Modular.** A permanent shell (galaxies, camera, zoom) plus one small module per lesson. Add a lesson = add one file and one registry line. v2 in progress, v1 is what you see in the demo.
- **Runs offline.** The whole app is one HTML file (about 0.9 MB). No account, no cloud. Progress stays on the device.
- **Phone as controller.** Phone and laptop connect with a QR code on the local network. Sliders and tilt (gyroscope) drive the lab live. Hosted relay (no local server) is next.
- **Handwriting recognition built in-house.** Write a number with your finger, the app reads it. Our own template matching, no external service, works offline. Digits only today.
Right column, tile "AI, honestly" (two halves):
- **In the product today:** read-aloud voice (the browser's built-in text-to-speech). No cloud AI, no student data leaves the device.
- **In how we built it:** a team of Claude agents (builder, designer, tester, reviewer) wrote and checked the code; the three of us set the goals, review every result and decide. Tested against the original version for feature parity.
- **Next, where AI adds value:** a hint tutor that tells a stuck student what to try next (answers problem 3 on slide 2). Only with parental consent. **[ASSUMPTION - Eduard to confirm we state this as a plan]**
Mono footer: WHAT WORKS TODAY: 8 LESSONS · PHONE CONTROL · OCR · EN/RO
Honesty note: handwriting recognition is classical template matching, not machine learning; do not call it AI on the slide or in speech. Offline caveat: phone link needs the local-network launcher (Lumio.cmd, needs Node.js) in v1; say "local network", never "no install".

## NEW 16 · Business Model Canvas (one slide)
Kicker: BUSINESS MODEL
Headline: Free to learn. Schools and parents pay.
Standard 9-box canvas as tiles (dense but readable, 5 columns x 3 rows as in the classic layout; Revenue and Costs on the bottom row; Value proposition centre, tan-filled tile like deck slide 3 "With Lumio"):
- **Customer segments:** high school students (grades 9 to 12, first); parents of under-18s; private schools.
- **Value proposition:** learn by doing: 3 minute hands-on labs, instant feedback, phone as controller, EN and RO.
- **Channels:** teachers and school admins (direct), student word of mouth, school Instagram/TikTok, parent groups. [see slide 17]
- **Customer relationships:** free self-serve for students; onboarding call and class dashboard for schools; progress ring and updates for parents.
- **Revenue streams:** class licence (schools), premium (parents). Students free.
- **Key resources:** the app and lesson modules; the team; AI-assisted build pipeline.
- **Key activities:** build lessons, pilot with classes, teacher feedback loop.
- **Key partners:** teachers and school administration (pilot); no signed partners yet. Hosting provider. **[ASSUMPTION - Eduard to confirm no partner is named]**
- **Cost structure:** hosting and relay, domain, AI tooling, lesson content time, school support. [see slide 18]
Rationale: Matei Dumitrescu: the buyer is the school administration; the canvas shows that while students use it free. This slide is a direct 10-point sub-criterion; keep it as ONE slide, nine boxes.

## NEW 17 · Value proposition, go-to-market, channels
Kicker: GO TO MARKET
Headline: Start where we can reach: Suceava, then Romania.
Three tiles, one per audience, each with "message" and "channel":
- **Students.** Message: "Try it, don't read it. 3 minutes, on your phone." Channel: school Instagram and TikTok clips (the ad cut), class challenge links.
- **Parents.** Message: "Short sessions, visible progress." Channel: parent WhatsApp groups via the teacher, progress ring screenshot.
- **Private schools.** Message: "Hands-on practice your students enjoy; you see class progress." Channel: direct meeting with the school administration (the decision maker), free pilot first, then the licence.
Bottom strip (mono): STEP 1 PILOT ONE CLASS · STEP 2 ONE SCHOOL · STEP 3 SCHOOL NETWORK
Targets (all **[ASSUMPTION - Eduard to confirm]**): pilot 1 class by end of Dec 2026; 3 private schools approached by Mar 2027; 1 paying class licence by Jun 2027.
Rationale: organizers said social works for B2C but not B2B (Stefan Iarca); so students and parents get social, schools get a face-to-face meeting. Matches the two criteria (message + channels, 10 pts).

## NEW 18 · Costs and revenue
Kicker: COSTS AND REVENUE
Headline: Cheap to run. Paid by schools and parents.
Left tile "Start-up costs (one time)": domain and brand check; hosting setup; consent and privacy paperwork; pilot printing. Total **[ASSUMPTION - Eduard to confirm: __ RON]**. Team time not charged.
Middle tile "Running costs (monthly)": hosting and phone relay **[__ RON/month, ASSUMPTION]**; AI tooling used for building **[__ RON/month, ASSUMPTION; Eduard states the real subscription]**; domain **[ASSUMPTION]**. Note: the app is one static file, so each extra student costs almost nothing. (True technically; the dollar figure still needs Eduard.)
Right tile "Revenue": Students: free. Private schools: class licence **[ASSUMPTION - price per class per year: __ RON]**. Parents: premium **[ASSUMPTION - __ RON/month]**.
Bottom strip: BREAK-EVEN: **[ASSUMPTION: __ class licences cover running costs; Eduard/Darius compute from the three figures above]**
Sustainability line: "Free tier keeps students; schools pay for the class view; costs stay flat as users grow."
Do NOT show a revenue forecast unless Eduard provides the basis; show break-even only. Show the formula, not made-up money.

## NEW 19 · KPIs and impact
Kicker: KPIs AND IMPACT
Headline: We measure learning, not just clicks.
Table (metric | how we measure | baseline | pilot target):
| Weekly active learners | distinct devices a week | 5 testers so far | **[ASSUMPTION: 20 in a class of __]** |
| Lessons completed per learner | lessons finished / week | not measured | **[ASSUMPTION: 3]** |
| Return rate | share who come back next week | 4 of 5 said they would | **[ASSUMPTION: 60%]** |
| Test-to-use | of those who try it once, share who finish a lesson | not measured | **[ASSUMPTION: 70%]** |
| Education impact | before/after 5-question quiz on the pilot topic, same class | not measured | **[ASSUMPTION: +20% score]** |
Footer: MEASURED ON THE PILOT CLASS · SAME CLASS, BEFORE AND AFTER · NO PERSONAL DATA
Rationale: only the baselines we really have (5 testers, 4 of 5) are filled. Targets are labelled targets, not results. Honest wording: "targets", never "results".
Technical note for David (not a slide): v1 keeps stats in localStorage only. Ask Manager whether a minimal anonymous counter or a manual teacher sheet is used for the pilot; until decided the slide says "measured by the pilot".

---

## Existing slides: small edits
- Slide 6 tile "POSSIBLE PARTNERS" -> "NO PARTNERS YET, PILOT NEXT" (matches honest validation).
- Slide 20 (old 13) Next steps: third tile footer "NEXT: REAL CLASSROOMS" -> "PILOT: 1 CLASS, 4 WEEKS" if the pilot is confirmed, else leave.
- Cover: add team name and place: "Team Flow · Suceava" (rank list uses "Flow", Suceava). Check with Eduard that the name is correct for the deck.

## Revised pitch script, 5:00 limit, target about 4:00 (English)
Speaks about 130 words/min. Cold-open film 8 s has no speech. Order = deck order. Stefan lines marked S.
| Time | Slide / shot | Who | Say | ~Sec |
|---|---|---|---|---|
| 0:00 | Film | none | Phone slides Temperature, laptop gauge climbs. | 8 |
| 0:08 | 1 Cover | Eduard | Hi, we are Eduard, Darius and Stefan, team Flow, and this is Lumio. Light up how you learn. | 7 |
| 0:15 | 2+3 Problem and gap | Eduard | We asked 13 students how they learn. Ten in thirteen mostly read or watch. One in seven loses focus in ten minutes, and when stuck, nothing tells them what to try next. Explanations come first, experiments rarely. We flip it: try first, understand after. | 22 |
| 0:37 | 4 Solution | Stefan | Lumio is a tutor you play with. Every lesson is a hands-on lab, scored in Lumens. | 8 |
| 0:45 | 5 Competitors | Darius | PhET has simulations, Brilliant has streaks, Khan has reach. As far as we found, none lets your phone control the experiment. | 9 |
| 0:54 | 6+7+8 Client, validation, pilot | Darius | Our users are students; parents and private schools pay. Seven in ten students want to try it; four of five testers would use it again. It is a small sample, so next we run a four week pilot in a real class, with parental consent. | 20 |
| 1:14 | 9 Big idea + film | Stefan | Here the phone is the controller. I slide the temperature and the experiment heats up. I tilt, and the piston moves. Every student already owns the controller, so no kit, no cost. | 20 |
| 1:34 | LIVE v1: lesson + EN/RO | Stefan | A lesson takes three minutes, in English or Romanian. | 8 |
| 1:42 | LIVE v1: Levels | Stefan | In Levels you calculate. Range equals speed squared times sine two angle over g. Type the answer, fire: correct gives hearts, a star and Lumens. A miss costs a heart. | 24 |
| 2:06 | LIVE v1: Themes, Home, Ranks | Eduard | Six themes. Lumens never reset, and challenges feed a monthly Moon rating, so there is always something to climb. | 12 |
| 2:18 | 15 Tech and AI | Stefan | The app is one light file: it runs offline, the phone joins by QR on the local network. Handwriting recognition is our own code. The app was built and tested by a team of Claude agents, and we review and decide everything. No student data leaves the device. | 22 |
| 2:40 | 16+17 Canvas and go to market | Darius | Students learn free. Private schools pay a class licence; parents can add premium. We reach students and parents through social media and teachers, and schools through the administration, starting with a free pilot in Suceava. | 22 |
| 3:02 | 18 Costs and revenue | Eduard | Our costs are low: hosting and tools, [__ RON a month ASSUMPTION]. One class licence at [__ RON ASSUMPTION] covers them after [__ ASSUMPTION] classes. | 14 |
| 3:16 | 19 KPIs | Darius | We measure weekly learners, lessons finished, return rate, and a before-and-after quiz on the pilot class. Our target: [__ ASSUMPTION] percent return. | 12 |
| 3:28 | 20 Next | Eduard | Next: more labs, and the pilot class. If you are a teacher or a school, we would like to run it with you. | 9 |
| 3:37 | 21 Team | Eduard | I lead design and the app. | 3 |
| 3:40 | 22 Team | Darius | I lead the team, the survey and outreach. | 3 |
| 3:43 | 23 Team | Stefan | I lead the technical side and the debugging. | 3 |
| 3:46 | 24 Close | Eduard | Learn by doing. Rank by growing. Thank you. | 5 |
Total about 3:51 of speech and film; leaves 1:00+ slack. Use the slack for: (a) hold 15 s on the live demo of Levels, (b) keep the full 15 to 20 s phone film from the original cut, or (c) a one-line ask at the end ("we want a classroom for the pilot", Matei). Never exceed 4:55: over limits = may be ineligible. Cut order if long: themes (6 s), Ranks, rivals.
Cuts vs old script: team bios 5 s each (kept 3 s lines), rivals 22 s to 9 s, themes 15 s to 4 s (inside the Home line), Big Idea 30 s to 20 s, "Confirm Stefan's line" resolved: use the line above, Eduard checks it is accurate.
Speaker balance: Eduard 7 blocks, Darius 5, Stefan 6. All three speak at least 3 times.

### Variant if Stefan is unavailable
Voice-only is fine (face not mandatory; app demo and graphics allowed). Options, best first:
1. Stefan records only his 3 lines and the Tech and AI slide by voice memo or in a separate clip; we edit them in. Same script, no penalty.
2. If he cannot record at all: Eduard takes Solution, Big idea + live demo and Tech and AI; Darius keeps rivals, validation, business, KPIs and adds the Themes line. Stefan's team slide stays in the deck, with the line shown as on-screen text: "Stefan, lead technical and debugging". Say it on the cover: "Hi, we are Eduard and Darius, with Stefan, our technical lead."
Penalty risk: the grid scores "whole team speaks, each role visible" at 6 of 100 points, and the brief says the whole team speaks; a silent member is a likely partial loss on those 6 and, per the rules, over-limit videos may be flagged ineligible. [ASSUMPTION: loss amount not published, unknown.] Action: Eduard asks Alexia in writing today whether a member may appear without speaking. Eduard also asks Stefan now whether he can record before 27 Nov, since consent for minors is needed on camera.

## Deck fix list (existing 18 slides)
1. Numbering: slides 2-7 say "/17", slides 8-13 say "/18", slide 14 "Next steps" is labelled 13 (duplicate with the Compete slide 13), team slides say 14-16 of 17, thanks has none. Renumber all to "NN / 24" in the final order above. Team and The app kickers ("1 OF 3", "1 OF 4") are fine.
2. Competitor table "Not found": replace with "Not in public docs" (cells: Phone as a controller x3). Add footer: "BASED ON PUBLIC PAGES, CHECKED [DATE - Eduard to confirm]". Say "as far as we found" in speech, same as the slide.
3. Competitor table colour: Lumio column "Yes" is orange; orange is for Lumens only. Make "Yes" tan. Same for the orange numerals 13 and 4 of 5 on Validation and the mono footers on Problem/Client/Next tiles: use tan. (Existing look, Eduard approved? If he wants orange kept, leave it, but it breaks the taste file.)
4. Slide 7 "Seven in ten want to try it": add "(13 responses)" in the headline footer line; already in the strip, keep it.
5. Slide 13 (Ranks): demo players are labelled "Sample"; keep that label visible, jury may ask. Be ready: "sample players, no real users yet".
6. Slide 5 row "Lessons under 5 minutes" vs app "3 min": consistent, no change.
7. Slide 13 screenshot note: add "Sample data" tag, or crop out names of real people (Eduard, Stefan, Darius appear as players).

## Open items for Eduard (numbers and confirmations)
Pilot school, teacher, class size, dates; who the 5 testers were; start-up cost total; monthly hosting, domain, AI subscription; class licence price; parent premium price; break-even count; KPI targets (5 values on slide 19); GTM dates on slide 17; competitor check date; team name "Flow" on cover; whether to present the AI hint tutor as a plan; written answer from Alexia on a silent team member; consent forms for under-18 on camera.
