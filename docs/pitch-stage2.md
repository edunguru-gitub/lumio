# Lumio pitch, HSIC stage II (print this)
Upload by Fri 27 Nov 24:00. Video max 5:00 (never over 4:55); this script is 4:46 at 130 words a minute. Whole team speaks and appears on camera. Demo footage = v1 (app/lumio.html), never v2.
Source: docs/spec-stage2-slides.md, Manager fix list of 25 Nov (Tester and Boyle reviews), docs/teacher/lumio-jury-lens.md.
Slide numbers = the 25-slide deck (HSIC maximum). Seconds = spoken words at 130 a minute, rounded up, plus time for the shot. ASSUMPTION placeholders: say the real number Eduard confirms, or cut the sentence. Never say a number that is not on the slide.

| Time | Slide / shot | Who | Say | ~Sec |
|---|---|---|---|---|
| 0:00 | Film | none | Phone slides Temperature, laptop gauge climbs. | 8 |
| 0:08 | 1 Cover, all three on camera | Eduard | Hi, we are Eduard, Darius and Stefan, team Flow from Suceava. Since stage I, we rebuilt Lumio on a new base and planned a classroom pilot. Lumio is a tutor for high school students: short labs you control with your phone. | 20 |
| 0:28 | 2+3 Problem and gap | Eduard | We asked 13 students how they learn. Ten in thirteen mostly read or watch. One in seven loses focus in ten minutes, and when stuck, nothing tells them what to try next. We flip it: try first, understand after. | 18 |
| 0:46 | 4 Solution | Stefan | Lumio is a tutor you play with. Every lesson is a hands-on lab, scored in Lumens. | 8 |
| 0:54 | 5 Competitors | Darius | PhET has simulations, Brilliant has streaks, Khan has reach. As far as we found, none lets your phone control the experiment. | 10 |
| 1:04 | 6+7+8 Client, validation, pilot | Darius | The student uses Lumio for free; the school and parents pay. Seven in ten students want to try it; four of five testers would use it again. It is a small sample, so next we run a four week pilot in one real class, with parental consent and anonymous codes. | 24 |
| 1:28 | 9 Big idea + film | Stefan | Here the phone is the controller. I slide the temperature and the experiment heats up. I tilt, and the piston moves. Every student already owns the controller, so no kit, no cost. | 16 |
| 1:44 | 10-11 The app, then LIVE v1 lesson + EN/RO | Stefan | A lesson takes three minutes and four exercises, in English or Romanian. | 7 |
| 1:51 | 11 Projectile, then LIVE v1 Levels | Stefan | In Levels you calculate. Range equals speed squared times sine two angle over g. Type the answer, fire: correct gives hearts, a star and Lumens. A miss costs a heart. | 18 |
| 2:09 | 12-14 Themes, phone, compete, then LIVE v1 Themes, Home, Ranks | Eduard | Six themes. Lumens never reset, and challenges feed a monthly Moon rating, so there is always something to climb. | 10 |
| 2:19 | 15 How it works, since stage I | Stefan | What works today is v1: one light file that runs offline, eight lessons, and handwriting recognition we wrote ourselves, template matching, not AI. The phone joins by QR code on the local network. Since stage I we built v2: every lesson is its own module, and it is live on the web with five lessons. | 26 |
| 2:45 | 16 AI and data | Stefan | There is no AI inside the app today, only the browser's read-aloud voice. AI helps us build: Claude agents write and test the code, and a human reviews every change. Progress stays in the browser on the device. A hint tutor is a plan, only with parental consent. | 23 |
| 3:08 | 17+18 Canvas and go to market | Darius | The school is the client, the student is the user. Students learn free; private schools pay a class licence, parents can add premium. We reach students and parents on social media and through teachers; schools directly, with a warm introduction and free pilot. | 20 |
| 3:28 | 19 Costs and revenue | Eduard | Running Lumio is cheap: the web page costs nothing today; tools, a domain and a relay come to about [ASSUMPTION: monthly total] RON a month. A class licence is [ASSUMPTION: price] RON a year. Yearly cost divided by the licence price: we break even at [ASSUMPTION: number] classes; every class after that is margin. | 25 |
| 3:53 | 20 KPIs | Darius | In the pilot, the teacher keeps anonymous codes, Student 1 to N, on paper; app data stays on each device. Each week the teacher reports active students, lessons finished and who came back. A five-question quiz, before and after, shows what they learned. For the business: user acquisition cost and free-to-paid conversion. Our target: [ASSUMPTION: percent] percent come back. | 28 |
| 4:21 | 21 Next | Eduard | Next: more labs and the pilot class. | 4 |
| 4:25 | 22 Team, on camera | Eduard | I lead design and the app. | 3 |
| 4:28 | 23 Team, on camera | Darius | I lead the team, the survey and outreach. | 4 |
| 4:32 | 24 Team, on camera | Stefan | I lead the technical side and the debugging. | 4 |
| 4:36 | 25 Close + ask (ask is on the slide) | Eduard | Our ask: if you are a teacher or a school, give us one class for a four week pilot. Learn by doing. Rank by growing. Thank you. | 13 |

Total 4:49 with the film (4:41 of speech blocks); limit 4:55. No slack: if a block runs long, cut in this order: Themes line, the rivals line, the last KPI sentence.
Speaker balance: Eduard 7 blocks, Stefan 7, Darius 5. Each of the three speaks at least 3 times and appears on camera (cover, own team slide).
Opening answers who, what and since stage I in the first 20 s (Matei); the close says what we want (Matei); AI is shown as help, not magic (Stefan Iarca, Toni Ionescu).
Voice-only variant for Stefan removed (25 Nov): Eduard confirmed all three appear and speak.

## Say / never say
- Say "as far as we found" for competitors. Say "targets", never "results". Say "local network", never "no install". Say "user acquisition cost", same as slide 20. Say "stage I", never "round one".
- Say "handwriting recognition (template matching, not AI)"; never call it AI. Never claim a customer, partner, sponsor or a decision maker we have not met.
- Ranks on slide 14 use sample players: "sample players, no real users yet".
- v2 already awards Lumens and shows Moon and Ranks; Spanish, Levels, podcast, Challenge and settings are still only in v1. Recheck git log origin/v2 before recording and only claim what is there.
- Data today: progress in the browser on the device (localStorage); the phone relay is Lumio.cmd on the laptop, local network only; the hosted web page has tab sync only. Class dashboard, parent updates and a hosted relay are plans.

## Before upload (Eduard)
Confirm or cut every ASSUMPTION placeholder above and every ASSUMPTION or TO VERIFY tag in the deck, then run the FINAL export: `node tools/deck/build.js <original.pdf> <out.pdf> --final`. It refuses, and writes nothing, while a tag, a double underscore or a square bracket is left on any page or in this file, and prints where.
