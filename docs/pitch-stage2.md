# Lumio pitch, HSIC stage II (print this)
Upload by Fri 27 Nov 24:00. Video max 5:00 (never over 4:55), target about 4:05. Whole team speaks. Demo footage = v1 (app/lumio.html), never v2.
Source: docs/spec-stage2-slides.md, plus Manager updates (stage II = improvement on stage I, "new since round 1") and docs/teacher/lumio-jury-lens.md.
Speak about 130 words a minute. Slide numbers = the 24-slide deck. Lines in [brackets] are ASSUMPTION: say the real number Eduard confirms, or cut the line. Never say a number that is not on the slide.

| Time | Slide / shot | Who | Say | ~Sec |
|---|---|---|---|---|
| 0:00 | Film | none | Phone slides Temperature, laptop gauge climbs. | 8 |
| 0:08 | 1 Cover | Eduard | Hi, we are Eduard, Darius and Stefan, team Flow from Suceava. Lumio is a tutor for high school students where you learn by doing: short labs you control with your phone. | 12 |
| 0:20 | 2+3 Problem and gap | Eduard | We asked 13 students how they learn. Ten in thirteen mostly read or watch. One in seven loses focus in ten minutes, and when stuck, nothing tells them what to try next. We flip it: try first, understand after. | 18 |
| 0:38 | 4 Solution | Stefan | Lumio is a tutor you play with. Every lesson is a hands-on lab, scored in Lumens. | 8 |
| 0:46 | 5 Competitors | Darius | PhET has simulations, Brilliant has streaks, Khan has reach. As far as we found, none lets your phone control the experiment. | 9 |
| 0:55 | 6+7+8 Client, validation, pilot | Darius | The student uses Lumio for free; the school and parents pay. Seven in ten students want to try it; four of five testers would use it again. It is a small sample, so next we run a four week pilot in a real class, with parental consent. | 20 |
| 1:15 | 9 Big idea + film | Stefan | Here the phone is the controller. I slide the temperature and the experiment heats up. I tilt, and the piston moves. Every student already owns the controller, so no kit, no cost. | 20 |
| 1:35 | LIVE v1: lesson + EN/RO | Stefan | A lesson takes three minutes, in English or Romanian. | 8 |
| 1:43 | LIVE v1: Levels | Stefan | In Levels you calculate. Range equals speed squared times sine two angle over g. Type the answer, fire: correct gives hearts, a star and Lumens. A miss costs a heart. | 24 |
| 2:07 | LIVE v1: Themes, Home, Ranks | Eduard | Six themes. Lumens never reset, and challenges feed a monthly Moon rating, so there is always something to climb. | 12 |
| 2:19 | 15 Tech and AI | Stefan | The app is one light file: it runs offline, the phone joins by QR on the local network. Handwriting recognition is our own code, not AI. AI helped us build: a team of Claude agents wrote and tested the code, and we review and decide everything. No student data leaves the device. | 22 |
| 2:41 | 15 New since round 1 | Stefan | Since round one we rebuilt the base: every lesson is now its own module, so adding a lesson is one file. Five lessons already run on it, each checked against the old version. | 12 |
| 2:53 | 16+17 Canvas and go to market | Darius | The school is the client, the student is the user. Students learn free; private schools pay a class licence, parents can add premium. Students and parents we reach on social media and through teachers; schools directly, with a warm introduction and a free pilot. Who adopts it in a school, we will validate in the pilot. | 22 |
| 3:15 | 18 Costs and revenue | Eduard | Costs are low: hosting and tools, [__ RON a month]. In the first quarter, [__] classes times [__ RON] is [__ RON], minus [__ RON] to serve them. We break even at [__] classes. | 15 |
| 3:30 | 19 KPIs | Darius | We measure learning and business: weekly learners, lessons finished, retention, a before-and-after quiz, plus cost per user, free-to-paid and margin. Our pilot target: [__] percent come back. | 13 |
| 3:43 | 20 Next | Eduard | Next: more labs and the pilot class. | 4 |
| 3:47 | 21 Team | Eduard | I lead design and the app. | 3 |
| 3:50 | 22 Team | Darius | I lead the team, the survey and outreach. | 3 |
| 3:53 | 23 Team | Stefan | I lead the technical side and the debugging. | 3 |
| 3:56 | 24 Close + ask | Eduard | Our ask: if you are a teacher or a school, give us one class for a four week pilot. Learn by doing. Rank by growing. Thank you. | 9 |

Total about 4:05. Slack about 50 s. Use it for (a) 15 s more on the Levels demo, or (b) the longer phone film. Cut order if long: Themes line, Ranks, rivals.
Speaker balance: Eduard 7 blocks, Darius 5, Stefan 6. Everyone speaks at least 3 times.
Opening answers who, what, problem and for whom (Matei); the close says what we want (Matei); AI is shown as help, not magic (Stefan Iarca, Toni Ionescu).

## Say / never say
- Say "as far as we found" for competitors. Say "targets", never "results". Say "local network", never "no install".
- Never call handwriting recognition AI. Never claim a customer, partner, sponsor or a decision maker we have not met.
- Ranks use sample players: "sample players, no real users yet".
- v2 is the new foundation; Spanish, podcast, Lumens, Moon and settings are still only in v1.

## If Stefan is unavailable
Voice-only is fine (face not mandatory; app demo and graphics allowed). Options, best first:
1. Stefan records only his lines (Solution, Big idea, demo, Tech and AI, New since round 1, team) as a voice memo or separate clip; we edit them in. Same script.
2. If he cannot record at all: Eduard takes Solution, Big idea + live demo, Tech and AI and New since round 1; Darius keeps rivals, validation, business, KPIs and adds the Themes line. Stefan's team slide stays, with his line as on-screen text: "Stefan, lead technical and debugging". On the cover say: "Hi, we are Eduard and Darius, with Stefan, our technical lead, team Flow from Suceava."
Risk: "whole team speaks, each role visible" is 6 of 100 points; a silent member likely loses part of it [ASSUMPTION: amount not published]. Eduard asks Alexia in writing whether a member may appear without speaking, and asks Stefan now if he can record before 27 Nov (consent needed for minors on camera).

## Before upload (Eduard)
Confirm or cut every [bracket] above and every ASSUMPTION tag in the deck, then run the FINAL export (it refuses while a tag is open): `node tools/deck/build.js <original.pdf> <out.pdf> --final`.
