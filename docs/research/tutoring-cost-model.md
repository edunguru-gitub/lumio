# Tutoring cost model (normal year vs exam year) and Lumio comparison
Researcher, 27 Nov 2026. Currency RON. Tags: [S] sourced, [D] derived (arithmetic shown), [A] assumption.
**Access note:** in this session every web page fetch failed (hosts not resolvable), so all NEW figures are SNIPPET (search-result summaries, not opened). Figures marked "OPENED (earlier)" were opened in an earlier session and are recorded in docs/research/why-us-and-finance-update.md. No personal data of minors used.

## (a) Sourced inputs
| # | Figure | Value | Year | Source | URL | Status | Confidence |
|---|---|---|---|---|---|---|---|
| 1 | Tutoring spend, families who pay, per child per school year | 6,234 RON | data Sep-Dec 2024, pub. Mar 2025 | Salvati Copiii Romania, national study (683 parents, non-probability online sample) | https://www.salvaticopiii.ro/sites/ro/files/2025-03/cat-dau-parintii-pe-meditatii-costurile-ascunse-ale-educatiei-studiu-national.pdf | OPENED (earlier); re-confirmed by SNIPPET today | Medium: not representative; says nothing on hours |
| 2 | Incidence: parents listing tutoring as a cost | 48% overall; 64% lower-secondary; 66% high school | same | same | same | OPENED (earlier) | Medium |
| 3 | Study text: "about 1,000 RON per month", child usually takes two subjects | 1,000 RON/month | same | same | same | SNIPPET today + OPENED (earlier); unclear per child or per family | Low-medium, do not put on slide |
| 4 | About 1 in 3 pupils (grades V-XII) take tutoring; 300 RON/month average; maths is the subject for over 80% of them | 300 RON/month | data 2019-20, pub. Jun 2021 | IRES + Societatea Academica din Romania, via Edupedu | https://www.edupedu.ro/studiu-matematica-disciplina-la-care-fac-meditatie-cei-mai-multi-elevi-copiii-nu-inteleg-informatiile-primite-la-scoala-spun-parintii-circa-o-treime-dintre-elevii-claselor-v-xii-fac-meditatii-c/amp/ | OPENED (earlier) | Medium; old (about 2.5x price growth since, per #1 vs 2021) |
| 5 | Hourly price, maths or Romanian, Romania | 80-200 RON/h; near top in Bucharest, Cluj, Timisoara | Jul 2026 | bzi.ro article | https://www.bzi.ro/meditatii-sau-lectii-online-ce-aleg-parintii-5539005 | SNIPPET | Low-medium: press, no method |
| 6 | Price guide, gymnasium maths | 75-150 RON/h face to face; 50-80 online | 2026 | brig.ro (price-guide site, commercial) | https://brig.ro/cat-costa/meditatii | SNIPPET | Low: aggregator |
| 7 | Average paid by parents for a maths session of 2 h | 137 RON per 2-h session = 68.5 RON/h [D] | 2025 | Revista Biz citing HomeRun (tutoring platform) | https://www.revistabiz.ro/cererea-pentru-meditatii-a-crescut-cu-30-la-inceputul-acestui-an-scolar/ | SNIPPET | Medium: platform data, named; check wording on the page |
| 8 | Exam-prep maths session, Bucharest | Evaluare Nationala 120-200; BAC up to 250 RON per session (length not seen) | date not shown | bugetul.ro | https://www.bugetul.ro/cat-mai-costa-o-sedinta-de-meditatii-pentru-evaluarea-nationala-sau-bacalaureat-tarifele-cele-mai-mari-sunt-pentru-probe/ | SNIPPET | Low: undated, session length unknown |
| 9 | Student tutors | 50-60 RON/h | undated | bzi.ro | https://www.bzi.ro/preturile-mici-solicitate-de-studenti-pentru-meditatii-au-devenit-tot-mai-atractive-pentru-parinti-cel-mai-frecvent-motiv-este-dezinteresul-profesorilor-de-la-clasa-5461542 | SNIPPET | Low |
| 10 | Teacher quotes during BAC coverage: hour of prep 150-200 RON; all three subjects about 500 RON per week | 150-200 RON/h | 2025 | Edupedu (student quotes) | https://www.edupedu.ro/unii-absolventi-de-liceu-acuza-profesorii-dezinteresati-pentru-ca-au-fost-nevoiti-sa-faca-meditatii-pentru-bacalaureat-la-istorie-nu-am-vazut-o-pe-doamna-profesoara-tot-anul/ | SNIPPET | Low: anecdote. Note: 500/week for 3 subjects implies only about 3 h/week at that price |
| 11 | Illustration: 100 RON per 60 min, 16 sessions a month = 1,600/month | 100 RON/h | 2026 | PlayTech (illustration, not survey) | https://playtech.ro/2026/meditatiile-au-ajuns-un-lux-cat-platesc-parintii-pentru-un-an-de-pregatire-la-evaluarea-nationala-si-bac/ | SNIPPET | Low |
| 12 | School weeks 2025-26 | general 36; grade VIII 35 (ends 12 Jun 2026); grade XII day 34 (ends 5 Jun 2026) | 2025-26 | Ministry of Education order OMEC 3463/2025, via press and a copy of the order | https://www.cngl.eu/wp-content/uploads/2025/09/03_STRUCTURA_AN_SCOLAR_2025-2026_OMEC_3463-2025.pdf | SNIPPET (not opened) | Medium-high: official order, not read directly |
| 13 | Edupedu ads 50-80 RON per 2 h | 25-40 RON/h | about 2018 | Edupedu | https://www.edupedu.ro/olimpic-national-ofer-meditatii-ce-promit-anunturile-de-pe-net-pentru-tarife-intre-50-si-200-de-lei-pe-2-ore/amp/ | OPENED (earlier) | **DISCARDED**: 8 years old, ad listings; all 2025-26 sources are 2 to 4 times higher |

Eurostat/INSSE household education spending: **not found** (hosts not reachable). Needed: INSSE household budget survey (HBS) "education" line, to cross-check #1.

## Darius 5,250 RON (CORRECTED by Manager, 27 Nov)
5,250 = **1 h/week x 150 RON/h x 35 weeks** [D]: 1 x 150 x 35 = 5,250. 150 RON/h is Darius's own experience (our own quoted rate; date, city, tutor type not recorded: **ask Darius**, one line). My earlier guess 2 x 75 x 35 gives the same total but is superseded.
**What sources say about 150 RON/h:** typical sourced face-to-face rate is 75-150 (#6), 80-200 (#5), platform average 68.5 (#7), student tutors 50-60 (#9); top or exam-specialist rates 150-250 (#8, #10). So 150 is at the TOP of the typical band and the LOW end of the specialist band: plausible, consistent with #5, #6, #8, #10, but **not the typical price**; the typical sourced price is about 70-100. The slide therefore calls 150 "our own quoted rate", not "the Romanian average".

## Rates and hours chosen
| Input | Low | Base | High | Reasoning |
|---|---|---|---|---|
| RON per hour | 75 [S] typical (#6 floor, #7 about 69, #5 floor 80) | 150 = Darius's own quoted rate [own experience]; inside #5, #6, #10 | 200 [S] top/specialist (#5 ceiling, #8, #10) | |
| Hours per week, maths, normal year | 1 | 1 | 1 | [A] taken from Darius (1 h/week); no source gives hours |
| School weeks | 34 | 35 | 36 | [S] #12 (XII / VIII / general) |

## (b) Scenarios
**Normal year, maths only = hours/week x RON/h x weeks**
| | Hours/wk | RON/h | Weeks | Total RON |
|---|---|---|---|---|
| Low (sourced typical) | 1 | 75 | 34 | 1 x 75 x 34 = **2,550** |
| Base (own quote) | 1 | 150 | 35 | 1 x 150 x 35 = **5,250** |
| High (specialist) | 1 | 200 | 36 | 1 x 200 x 36 = **7,200** |

**Exam year, BAC (grade 12): maths + Romanian + one more (informatics or biology).** 34 class weeks, split [A] into 26 regular + 8 intensive weeks before the written exams (mock exams, extra sessions). ALL extra hours are ASSUMPTIONS (no source gives hours); sensitivity: x0.5 to x1.5 hours.
| Subject | Regular h/wk x 26 | Intensive h/wk x 8 | Hours |
|---|---|---|---|
| Maths | 1 x 26 = 26 | 2 x 8 = 16 | 42 |
| Romanian | 0.5 x 26 = 13 | 2 x 8 = 16 | 29 |
| Third subject | 0.5 x 26 = 13 | 2 x 8 = 16 | 29 |
| **Total** | | | **100 h** |
Reasoning [A]: maths keeps the normal 1 h/week and doubles near the exam; other subjects start at half an hour (one hour every second week), then 2 h/week for 8 weeks. Intensive weeks add 8 x (2+2+2) = 48 h vs 26+13+13 = 52 regular h.
| Scenario | Hours | RON/h | Total RON |
|---|---|---|---|
| Low (typical rate) | 100 | 75 | 100 x 75 = **7,500** |
| Base (own quote) | 100 | 150 | 100 x 150 = **15,000** (maths part 42 x 150 = 6,300) |
| High (specialist) | 100 | 200 | 100 x 200 = **20,000** |
| Hours sensitivity at base rate | 50 / 150 | 150 | 7,500 / 22,500 |
Grade 8 (Evaluare Nationala, maths + Romanian, 35 weeks = 27 regular + 8 intensive), base: maths 27 + 16 = 43 h; Romanian 13.5 + 16 = 29.5 h; 72.5 h x 150 = **10,875 RON** [D, A].

**Reality checks:** (1) Survey #1: 6,234 RON per child per year, usually two subjects, so about 3,100 per subject [D]. Our base maths-only 5,250 is above that: it describes a family paying a quoted-rate tutor weekly, not the average payer; the low case 2,550 matches the survey per subject (#4: 300 x 10 months = 3,000, older). (2) Exam base 15,000 is 2.4x the survey average; no source gives exam-year spend per family: **not found**.

## (c) Comparison
Lumio: 1,200 RON per class per year / 22 students = 54.5, taken as **55 RON per student per year** [D; price and class size are our assumptions; 15 to 30 students gives 80 to 40]. Parent premium (100 RON/year, phase 2, not in base plan) shown separately.
| Comparison | Tutor RON | Lumio 55: % of tutor | Times cheaper (tutor / 55) |
|---|---|---|---|
| Normal year low (typical rate) | 2,550 | 55/2,550 = 2.2% | 2,550/55 = 46x |
| **Normal year base (own quote)** | 5,250 | 55/5,250 = 1.05% | **95x** |
| Normal year high | 7,200 | 0.76% | 131x |
| Survey average (#1) | 6,234 | 0.88% | 113x |
| Exam year low | 7,500 | 0.73% | 136x |
| **Exam year base** | 15,000 | 0.37% | **273x** |
| Exam year high | 20,000 | 0.28% | 364x |
| With parent premium (55 not added; parents pay 100) normal base / exam base | 5,250 / 15,000 | 1.9% / 0.67% | 52x / 150x |

Per hour: tutor 150 RON/h (own quote) or 75 (typical). Lumio at 1 h/week x 35 weeks = 35 h: 55/35 = **1.57 RON per student-hour** [D; use hours are an assumption]. 1.57/150 = 1.05% (96x cheaper); vs typical 75: 2.1% (48x).
**Honest framing:** a tutor is 1:1, adapts live, explains. Lumio is a practice complement, not a replacement. The ratio compares prices, not equal service. Effect of Lumio on grades: **not found, not claimed**. Even the most cautious case (typical rate, 2,550) leaves Lumio at about 2%, so the message holds if 150 is challenged.

## (d) Slide 23 text (English, body 68 words, title "Why Lumio")
A maths tutor quoted to us costs 150 RON an hour: 5,250 RON for one hour a week over a school year, about 15,000 RON for three BAC subjects (our estimate). Press reports 75 to 200 RON. Families who pay spend 6,234 RON per child yearly (Save the Children Romania, 2025). Lumio: about 55 RON per student, roughly 1% of that. A tutor teaches 1:1; Lumio adds practice.
Three key numbers: 5,250 RON, 15,000 RON (estimate), 55 RON.

## (e) Q&A answer
"Is Lumio a replacement for a tutor?" No. A tutor works one to one; Lumio is practice between lessons. We compare prices only: a maths tutor quoted at 150 RON an hour costs about 5,250 RON for one hour a week over 35 weeks, while a school licence is about 55 RON per student per year. We do not claim equal results.

## (f) Not verified
1. All new web pages unopened (SNIPPET); open #5, #7, #8, #12 before the stage. 2. 150 RON/h is Darius's own experience, not a sourced average: record date, city, tutor type. 3. Hours per week: no source; all hours are assumptions. 4. Exam-year spend per family: not found. 5. Eurostat/INSSE household education spending: not found. 6. Rate sources are press/aggregators, partly undated. 7. Class size 22 and 1,200 RON are ours; no paying customer yet. 8. Survey #1 not representative; IRES data 2019-20.
