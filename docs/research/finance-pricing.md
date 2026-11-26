# Finance and pricing research (HSIC stage II, criterion 5: costs, revenue, KPI, 15 pts)
Researcher, 26 Nov 2026. Branch v2. Read first: CLAUDE.md, docs/teacher/knowledge.md, docs/teacher/lumio-jury-lens.md, docs/spec-stage2-slides.md (slides 18, 19 and the pitch lines on costs).

## 0. How to read this file
Tags on every input: **[S]** SOURCED (value + URL in section 10, accessed 26 Nov 2026), **[D]** DERIVED (arithmetic shown from [S] numbers), **[A]** ASSUMPTION (our choice, reasoning and range given). "not found" = not found, with what we would need.
Currency RON. FX used: 1 EUR = 5.3485 RON, 1 USD = 4.8665 RON (BNR rates of 17 Nov 2026 as shown on curs-valutar-bnr.ro; not read on bnr.ro itself). All prices ex-VAT unless written "incl. VAT".

**Evidence limit (important).** In this session the web-fetch tool and direct downloads were blocked (hosts such as edupedu.ro, salvaticopiii.ro, insse.ro, docs.github.com, rotld.ro, kahoot.com, stripe.com did not resolve). Only the search tool worked. So every [S] figure comes from a search-result excerpt that quotes the page, NOT from me opening the page. Confidence is therefore "medium" at best; items marked **VERIFY** must be opened once by a human before upload (link in section 10). I did not invent any figure; where a source disagreed with another, both are shown.

## 1. Headline for Manager (what the jury will see)
| Item | Recommendation | Basis |
|---|---|---|
| Price per class licence | **1,200 RON per class per year ex-VAT** (range 900 to 1,800). About 55 RON per student per year, about 5.5 RON per student per school-month. | section 2.4 [D]/[A] |
| Pilot fee (so someone pays "at least a leu") | 300 RON per pilot class, one semester | [A], Adina/Stefan advice: a payer beats a promise |
| Parent premium | 100 RON per year ex-VAT (about 120 incl. VAT, 10 RON a month), range 80 to 200 incl. VAT. Immaterial in year 1 (under 5% of revenue); do not sell it as the engine | [A] |
| Break-even | Running costs 511 RON/month = 6,130 RON/year. Each class leaves about 972 RON. **7 classes** cover running costs (about 2 to 3 private schools). With start-up costs inside year 1: 10 classes. | [D] section 4.3 |
| Year 1 (2027) revenue, base | about 7,900 RON (about 1,470 EUR); range 1,800 to 32,400 RON | [D] model |
| Year 1 result, base | about -3,500 RON after 3,000 RON start-up; about -500 RON on running costs only (near break-even) | [D] |
| First quarter (Jan to Mar 2027) | 0 / 1 / 1 paying schools (conservative / base / optimistic); revenue 0 / 300 / 600 RON | [A] |

Honest frame for Eduard: Year 1 is validation, not profit. The business is cheap to run, so it needs few customers, but there is no paying customer today and school sales take months.

## 2. SOURCED prices of comparable products

### 2.1 Abroad and online (price a Romanian family or school could compare with)
| Product | What it is | List price found | In RON | Tag | Notes and confidence |
|---|---|---|---|---|---|
| Khan Academy | Free nonprofit, Romanian site exists | Free. FY to Jun 2025: revenue 117.5 M USD, donations 90.4 M USD, program fees 22.2 M USD; 104.9 M learners 2024-25 | n/a | [S] | Funded by donors, not by users; 990 figures consistent across sources, medium confidence. Romanian site: Khan blog "now available in Romanian" (volunteer-translated) |
| Khanmigo (Khan AI tutor) | Paid add-on, costs real AI usage | Family 4 USD/month or 44 USD/year; district price cut from 60 to 35 USD per student per year (Nov 2023) | 214 RON/year family; 170 RON per student per year district | [S]+[D] | Family price from a secondary site; district price dated 2023. Khan says each interaction costs money paid to its AI provider |
| PhET | Free physics/chem/math simulations, University of Colorado | Free for students and teachers; commercial use needs a licence. Budget about 4 M USD/year (National Academies talk Dec 2023): grants, 0.99 USD app, B2B deals, donations; "soft funding, no base funding" | n/a | [S] | Shows free + grants is fragile; the best-known rival in labs has no paying school customer base |
| Brilliant | Gamified math/science, subscription | Official page sends to the live subscribe page. Third-party: 129.48 USD to 149.99 USD per year; tracker verified 29 Jun 2026: 240 USD per year, 30 USD per month; group plans exist | 630 to 1,168 RON per year | [S]+[D] | Price varies by country and promo; **VERIFY** on brilliant.org/subscribe from Romania |
| Duolingo Super | Language app, freemium | US only: about 83.99 to 119.99 USD per year (third-party). **Romanian price: not found**, needs the in-app shop. Paid subscribers 9.0% of LTM monthly users (Q3 2025 shareholder letter, 11.5 M paid) | about 409 to 584 RON (US price, not Romania) | [S]+[D] | The conversion figure is from the company filing (high confidence); the price is not Romanian |
| Kahoot | Quiz tool for classes | Teacher plan about 19 USD/month billed yearly = 228 USD/year ("One"); EDU tier 12 USD per teacher per month = 144 USD/year; free basic tier; school/district quote-based, third party cites 25-licence minimum | 701 to 1,110 RON per teacher per year | [S]+[D] | Official pages seen only as undated snapshots; **VERIFY** |
| Genially | Interactive presentations | Education plans billed yearly only (official FAQ). Capterra: Pro 15 USD, Master 25 USD per user per month (older TrustRadius: 7.49 / 20.82). No euro price found | n/a | [S] | Conflicting listings; low confidence on numbers, high on "annual only" |
| Labster | Virtual science labs (higher-ed focus) | Entry plan 8.33 (unit unclear) for 10 sims up to 50 students + 500 USD one-time fee; higher tiers quote only | n/a | [S] | Unit unclear; use only as "vendors quote and charge a setup fee" |
| Albert.io | Test-prep platform for schools | 15 USD per student per school year, minimum 50 students | 73 RON per student per year | [S]+[D] | Official pricing page, medium confidence |
| Lab-Aids | Physical science curriculum | Student licence about 1 USD per student per year per unit, max 5 USD for a full-year programme | 5 to 24 RON per student per year | [S]+[D] | Low end of the school-licence band |

### 2.2 Romania (consumer and school software)
| Product | What | Price found | Tag | Notes |
|---|---|---|---|---|
| SuperȘcoala | Largest Romanian video-lesson platform, 10,000+ lessons | 69 lei/month or 497 lei/year (Forbes Romania); another article: 29 lei/month per subject; dates of both not shown | [S] | The closest Romanian consumer price anchor; the two figures conflict, VERIFY on superscoala.ro |
| eduKiwi School | Romanian school platform | Launch prices Oct 2023: 79 lei/month; annual 49 lei/month (=588 lei/year); launch promo 29 lei/month, expired | [S] | Company announced over 1.5 M EUR investment; 2023 prices, may have changed |
| BacLive | Live exam prep (Bac, national eval.) | 2,165 lei (one subject) to 5,675 lei (three subjects) | [S] | Shows the price level for premium exam prep; date not shown |
| Kinderpedia | Romanian school/kindergarten management software (B2B) | 61 / 124 / 249 EUR per month per institution (Capterra); starter covers up to 70 students, then 0.90 EUR per extra student per month; G2: from 49 EUR | [S]+[D] | 61 EUR x 12 x 5.3485 = 3,915 RON per school per year. Proves a Romanian school pays four-digit RON per year for software |
| Meditații (private tutoring) | Human tutor | Illustration (PlayTech 2026, not survey): 100 lei per 60 minutes, 16 sessions a month = 1,600 lei/month. Bugetul.ro 2025: 150 to 500 lei per session depending on subject and teacher | [S] | Illustrative press figures; treat as range 100 to 150 lei/hour |
| Romanian edtech with school licences (price lists) | Various | **not found** (no public price list for school class licences). Need: a quote request to 2 vendors | | |

### 2.3 What Romanian parents and schools actually spend
| Fact | Value | Tag | Source note |
|---|---|---|---|
| Parents' extra education spend (meditații, after-school, materials) | about 9,818 lei per child per year (end 2024 data, published Mar 2025) | [S] | Save the Children Romania national study; press summaries; open the PDF to confirm sample size (not read) |
| Share of parents paying for meditații | 48% overall; 35% below 5,000 lei household net income; 65% above 20,000 | [S] | same study |
| Spend of those paying for meditații | 6,234 lei per school year = 519 lei per month | [S]+[D] 6,234 / 12 | same study |
| Private school fees | Iași private liceu: 22,200 lei per year (same article also shows 15,600, treat as 15,600 to 22,200) + 1,000 lei admission; Bucharest 4,000 to 20,000+ EUR a year; Cluj 6,000 to 15,000 EUR; adevarul.ro: registration fee 200 to 1,000 EUR; Suceava: **not found** | [S] | Press, not school price lists. Need: tariff sheets of 3 Suceava private schools |
| Average net wage | 5,717 lei, Sept 2026 (INS via press); annual inflation 6.61% | [S] | Context for what a parent can pay |
| Annual tutoring market, order of magnitude | 0.48 x 631,500 liceu pupils x 6,234 lei = about 1.9 billion lei | [D] | Crude: applies an all-levels share to liceu pupils; use only as "very large" |

### 2.4 Why 1,200 RON per class per year (reasoning, not a fact)
1. **Per student it sits inside the school-licence band.** 1,200 / 22 students = 54.5 RON per student per year [D]. Band found: Lab-Aids 5 to 24 RON, Albert 73 RON, Khanmigo district 170 RON [D from 2.1]. Lumio is cheaper than the AI tutor and the test-prep tool, dearer than a textbook licence: fair for 8 lessons and no track record.
2. **It is tiny against what a private school collects.** One class at the Iași liceu fee: 22,200 x 22 = 488,400 lei per year; with 15,600: 343,200. A 1,200 lei licence is 0.25% to 0.35% of that [D]. Decision should fit the head's own budget, without a committee [A]; Matei warned not to assume "administration decides", so the pilot talks to the teacher and head personally.
3. **It is below Romanian consumer subscriptions** (SuperȘcoala 497 lei, eduKiwi 588 lei per student per year) [S]: a school class of 22 would pay 1,200 in total, not 22 x 497.
4. **Floor.** Variable cost to serve one class is 228 RON valued (78 cash), see 4.3 [D]. At 900 the class still leaves 675. Below 900 break-even needs more than 10 classes.
5. **Parent premium.** 100 RON net (about 120 incl. VAT) = 1.9% of the 6,234 lei yearly tutoring spend and about one tutoring hour [D]. Below SuperȘcoala (497) and Duolingo US (about 409 to 584) because Lumio has fewer lessons.
Range to show the jury: 900 (pilot-year discount) to 1,800 (when Lumio has 15+ lessons and class dashboards); base 1,200.

## 3. Market size: students, classes, private schools (Romania)
| Item | Value | Tag | Source note |
|---|---|---|---|
| High-school (liceal) pupils 2025/2026 | 631,500 | [S] | INS figure reported by Edupedu; INS release itself not opened, VERIFY |
| Share of high school in the school population 2024/2025 | 17.3% of 3.485 M pupils and students (3.485 M includes universities) | [S] | INS via alba24; gives about 603,000 [D], consistent with 631,500 |
| Preuniversity pupils 2025/2026 | 2,937,800; 94.4% in public units, 5.6% private | [S] | INS via Edupedu |
| Private share, about 6% (10 years ago over 3%); private units almost tripled from 700 (2015); private units 35% of county school units (was 18%) | | [S] | Romania Education Alliance, 28 Oct 2025; exact 2025 unit count cut off in the excerpt |
| Private schools with legal personality, Jan 2024 | 1,056, of which 600 pre-school | [S] | SIIIR-based report (FDSC); so about 456 non-preschool units [D] |
| Private high schools (licee) | "about 100" | [S] weak | ProTV article, undated. **Not found:** official count of private licee and their pupils. Need: Ministry "Raport stare învățământ preuniversitar 2024-2025" or INS Tempo table |
| Suceava county private units | 21 private preuniversity units out of 746 total (2023/24), all levels | [S] | ISJ Suceava press notes (exact file not identified); number of private licee in Suceava: not found |
| Class size, liceu | Law: average 22 (min 15, max 26); 9th grade 26 in 2025/26 and 28 in 2026/27 (theoretical and technological) | [S] | Edupedu; I use 22 in the model (conservative) |

**Derived addressable size (order of magnitude).**
- If private liceu pupils are 3% to 6% of 631,500 [A: no liceu-specific share found] = 18,945 to 37,890 pupils; / 25 per class = 758 to 1,516 classes [D].
- Cross-check: about 100 private licee x 4 to 8 classes each [A] = 400 to 800 classes. Use **about 400 to 1,500 classes, centre about 800**.
- At 1,200 RON this is 0.5 to 1.8 million RON a year (about 90,000 to 340,000 EUR) if every private liceu class bought: a ceiling, not a forecast [D].
- State schools (about 631,500 / 25 = 25,000 classes [D]) are the larger market but depend on public budgets and procurement: not modelled, mention only as "later".
- Other buyers not counted: tutoring centres and after-school programmes (families spend heavily on meditații, 2.3), no count found.

## 4. Cost lines
### 4.1 Real cost lines with sources
| Line | Value | In RON | Tag | Source and note |
|---|---|---|---|---|
| Hosting today: GitHub Pages | 0. Limits: published site max 1 GB; soft bandwidth 100 GB per month. At 0.9 MB per load, 100 GB = about 113,000 full loads a month | 0 | [S]+[D] 100 x 1024 / 0.9 | docs.github.com. **Risk:** docs say Pages is not meant for running an online business, e-commerce or SaaS (wording seen in a forum quote of the docs; **VERIFY** the English page). A paid licence product should move off Pages |
| Alternative static hosting | Cloudflare Pages/Workers free: static files free and unlimited; Functions/Workers 100,000 requests/day free; paid plan 5 USD/month | 0 to 24 | [S]+[D] 5 x 4.8665 | Cloudflare docs |
| Small server or phone relay (needed for hosted phone-as-controller, spec says "hosted relay is next") | Hetzner small ARM server (CAX11 class): 4.49 to 6.49 EUR per month depending on source after April/June 2026 price changes (sources disagree) | 24 to 35 | [S]+[D] x 5.3485 | Not confirmed on hetzner.com. **Budget 35 RON/month** (top of range) |
| Domain .ro | RoTLD direct: 12 EUR + VAT per year (2018 notice); wholesale 6 EUR; resellers show 9 to 31 EUR | about 78 incl. VAT | [S]+[D] 12 x 1.21 x 5.3485 | 2018 notice, current price **VERIFY** on rotld.ro |
| Domain .com | about 10.46 USD per year at cost (Cloudflare Registrar; one source says Verisign raises wholesale by about 0.7 USD) | about 51 | [S]+[D] | Aggregators, medium confidence |
| Domains budget used | both .ro and .com | **130 per year** (10.8 per month) | [D] 78 + 51 = 129 | |
| Accounting (needed once a company invoices) | Bono online package 219 lei + VAT per month (payroll, balance, VAT returns); general range 200 to 900 lei/month; small micro-company without staff realistic 200 to 400 | **265 per month incl. VAT** | [S]+[D] 219 x 1.21 | Bono guide updated Jul 2026. If the company is VAT-registered the VAT is deductible (219) |
| AI tools used to BUILD the app (Claude agents etc.) | **Eduard states the real subscription.** Placeholder 200 RON/month | 200 | [A] | Range 100 to 500. Not a cost to serve; it is a cost to build. Keep it in, a jury will ask |
| Start-up one-time (company formation, privacy/consent paperwork reviewed by a lawyer, pilot printing, brand check) | **not found** as prices. Placeholder 3,000 RON, range 2,000 to 5,000 | 3,000 | [A] | Need: one quote from a notary/online incorporation service and one lawyer for the consent form |
| Payment processing, card payments from parents | Stripe Romania: 1.5% + 1 RON per EEA card payment (cited from stripe.com/en-ro page via a Romanian guide; third parties disagree on non-EEA cards: 2.5% or 1.5%) | 1.5% + 1 | [S] | **VERIFY** on stripe.com. School licences paid by bank transfer on invoice: 0% [A] |
| VAT | Standard rate 21% since 1 Aug 2025 (Law 141/2025), single reduced rate 11% | | [S] | Which rate applies to a software licence sold to a school: **not found**; assume 21%. Whether an education exemption helps a software vendor: ask the accountant |
| Turnover tax, micro-company | 1% single rate from 2026 (OUG 89/2025 per Bono), ceiling 100,000 EUR | 1% of revenue | [S] | One main source plus startupcafe; **VERIFY** |
| VAT registration threshold | 395,000 lei reported by one source (OG 22/2025), another ties it to 100,000 EUR | | [S] conflicting | At our revenue we would be below either: prices below can be treated as final (upside 21%, not counted) |

### 4.2 Optional hint tutor and read-aloud: cost per 1,000 active users per month
Inputs [A]: 20 hints per user per month, each hint 800 tokens in and 150 out, spoken answer 400 characters. Prices [S] from secondary pages (Anthropic page itself not opened, **VERIFY**).
| Part | Price | Per 1,000 users per month | Tag |
|---|---|---|---|
| Hint text, small Claude model "Haiku 5.5" | 0.10 USD in / 0.50 USD out per million tokens (released Oct 2026) | 20 x (800 x 0.10 + 150 x 0.50) / 1,000,000 x 1,000 = 3.10 USD = **15 RON** | [D] |
| Same, older "Haiku 4.5" | 1 USD / 5 USD per million | 31 USD = **151 RON** | [D] |
| Read-aloud with the browser's built-in voice (what v1 uses today) | 0 | **0 RON** | [S] spec slide 15 |
| Cloud voice, Google standard | 4 M characters free, then 4 USD per million | 8 M characters, 4 M billed = 16 USD = **78 RON** | [S]+[D] |
| Cloud voice, Google Neural2 | 1 M free, then 16 USD per million | 7 M billed x 16 = 112 USD = **545 RON** | [S]+[D] |
Model uses **0.25 RON per active learner per month**, covering the expensive mix "Haiku 4.5 + Google standard" (151 + 78 = 229 RON per 1,000) [D]. Cheapest mix (Haiku 5.5 + browser voice) is 15 RON per 1,000, 16 times lower. Lumio v1 has no cloud AI today (slide 15); this is a plan. Sending a minor's text to a cloud AI needs parental consent and a privacy check (**VERIFY with a lawyer**, not researched here).

### 4.3 Unit economics per class (cost to serve)
Model constants: 22 students per class [S law average], onboarding and support 3 hours per class per year x 50 RON per hour = 150 RON [A, valued time; team time is not charged in cash], AI and voice 22 x 0.25 x 12 = 66 RON [D], micro-tax 1% [S].
| Per class per year | Conservative 900 | Base 1,200 | Optimistic 1,800 |
|---|---|---|---|
| Price (ex-VAT) | 900 | 1,200 | 1,800 |
| Price per student per year | 40.9 | 54.5 | 81.8 |
| Micro-tax 1% | 9 | 12 | 18 |
| AI and voice (cash) | 66 | 66 | 66 |
| Support time (valued, not cash) | 150 | 150 | 150 |
| **Cost to serve, cash** | 75 | 78 | 84 |
| **Cost to serve, valued** | 225 | 228 | 234 |
| **Contribution per class, valued** | **675** | **972** | **1,566** |
| Fixed running cost per year (relay 35 + domains 10.8 + accounting 265 + AI build tools 200 = 510.8 per month x 12) | 6,130 | 6,130 | 6,130 |
| **Break-even, classes needed (6,130 / contribution)** | 9.1, so **10** | 6.3, so **7** | 3.9, so **4** |
| Break-even incl. 3,000 start-up in one year | 14 | 10 | 6 |
Gross margin on a class (valued): 675/900 = 75%, 972/1,200 = 81%, 1,566/1,800 = 87% [D].
Biggest fixed lines: accounting 265 and AI build tools 200 are 91% of the 511. Lever: form the company only when the first school signs a letter of intent (saves 265 per month before that) [A, not in the model, so the model is conservative].

## 5. Financial model, three scenarios (Year 1 = Jan to Dec 2027; first quarter = Jan to Mar 2027)
Method: cash basis. A school licence is invoiced and paid up front when signed. Class licences follow the school year, so full-price signings are placed in September 2027 (month 9); the pilot semester is Jan to Jun. Parent premium opens in September 2027. Sales cycles for K-12 buyers are typically 6 to 11 months for the largest share of buyers (EdWeek survey as cited by a vendor blog, [S] weak), which is why no full-price class is placed before September.

### 5.1 Inputs
| Input | Conservative | Base | Optimistic | Tag and reasoning |
|---|---|---|---|---|
| Price per class per year (ex-VAT) | 900 | 1,200 | 1,800 | [A] section 2.4 |
| Pilot fee per class (Jan to Jun) | 0 (free pilot) | 300 | 300 | [A] a symbolic payer, advice Z19 |
| Pilot classes in Q1 | 1 free | 1 paid | 2 paid | [A] slide 17 plan: pilot by Dec 2026 |
| Schools paying a full licence by Dec 2027 | 1 | 2 | 4 | [A] plan: 3 schools approached by Mar 2027, 1 paying by Jun 2027; pilot to paid conversion 48% with documented outcomes, 17% without (HolonIQ via a vendor blog, [S] weak) |
| Paying classes by Dec 2027 | 2 | 6 | 16 | [A] 2, 3 and 4 classes per school |
| Customers (schools), average ticket per school per year | 1 school, 1,800 | 2 schools, 3,600 (+300 pilot) | 4 schools, 7,200 (+600 pilot) | [D] classes per school x price |
| Free outside active learners by Dec 2027 (teacher links, word of mouth) | 150 | 600 | 2,500 | [A] no data yet: 13 survey answers, 5 testers |
| Free to parent premium | 1% | 2% | 4% | [S] freemium median 2.1% (RevenueCat, cross-category), Duolingo 9.0% best-in-class; [A] choice |
| Premium net price per year | 100 | 100 | 100 | [A] |
| Cost lines | as 4.1 | as 4.1 | as 4.1 | fixed 511 RON/month, start-up 3,000 in Q1, AI/voice 0.25 RON per active learner per month, support 150 per full-price class |

### 5.2 Results, Year 1 and first quarter side by side (RON)
| Output | Conservative | Base | Optimistic |
|---|---|---|---|
| **Q1: paying customers (schools)** | 0 | 1 | 1 |
| **Q1: revenue** | 0 | 300 | 600 |
| **Q1: costs** (3 x 511 running + 3,000 start-up + variable) | 4,563 | 4,664 | 5,072 |
| **Q1: result** | -4,563 | -4,364 | -4,472 |
| Year 1: paying schools / paying classes | 1 / 2 | 2 / 6 (+1 pilot) | 4 / 16 (+2 pilot) |
| Year 1: school licence and pilot revenue | 1,800 | 7,500 | 29,400 |
| Year 1: parent premium revenue (about 2 / 12 / 100 subscribers in Dec) | 45 | 356 | 2,970 |
| **Year 1: total revenue** | **1,845** (345 EUR) | **7,856** (1,469 EUR) | **32,370** (6,052 EUR) |
| Year 1: variable cost (AI and voice, support, tax, fees) | 633 | 2,229 | 7,697 |
| Year 1: fixed running cost | 6,130 | 6,130 | 6,130 |
| Year 1: start-up | 3,000 | 3,000 | 3,000 |
| **Year 1: total cost** | 9,763 | 11,359 | 16,827 |
| **Year 1: result** | **-7,919** | **-3,503** | **+15,542** |
| Year 1 result on running costs only (before start-up) | -4,919 | -503 | +18,542 |
| Year 1 gross margin (revenue less variable cost) | 66% | 72% | 76% |
| Cumulative cash break-even month (incl. start-up) | not within 24 months | about month 21 (Sep 2028), see note | month 9 (Sep 2027) |
Note on base break-even month [D, extra assumptions]: year 2 renews 4 of 6 classes (70% renewal [A], no public benchmark found) and adds 4 new classes in Sep 2028 = 8 x 1,200 = 9,600; cumulative position at Aug 2028 about -7,800, Sep 2028 lands about 0. Premium income about 100 RON a month in 2028. Treat as "autumn 2028, borderline".
Worst case (no customer at all): loss about 9,100 RON in Year 1 (3,000 + 6,130). Forming the company only after a first signed letter would cut 265 RON per month of that.
Scale check: paying one person an average net wage (5,717 RON x 12 = 68,604) plus fixed costs needs about (68,604 + 6,130) / 972 = 77 classes, about 25 schools [D]. That is year 3+ and shows the real ambition: first prove 7 classes, then 77.

### 5.3 Acquisition cost and lifetime value (assumption-based, show as logic not as result)
| Item | Value | Tag |
|---|---|---|
| Cost to win one paying school | 10 approach meetings x 180 RON (3 hours + travel) + 3 pilots x 400 RON (8 hours) = 3,000; 2 schools won; = **1,500 RON per school, 500 per class** (3 classes per school) | [A]/[D] |
| Pilot to paid | 1 in 3 approached start a pilot; 2 in 3 pilots convert (HolonIQ via vendor: 48% with documented outcomes) | [A], benchmark [S] weak |
| Lifetime of a class | renewal 70% gives 1 / (1 - 0.7) = 3.3 years; contribution 972 x 3.3 = 3,240 RON; ratio to acquisition 3,240 / 500 = **6.5**; at 50% renewal 3.9 | [A]/[D]; rule of thumb above 3 is sustainable (vendor blogs, [S] weak) |
| Payback of acquisition | 500 / 972 = about 0.5 year per class | [D] |
| Paid ads for parents | Education click cost about 0.58 to 0.70 USD (Meta, benchmark tools, conflicting) = 2.8 to 3.4 RON. If 20% of clicks become active learners [A]: about 15 to 17 RON per learner; at 2% premium conversion: **about 750 to 850 RON per premium subscriber against a 100 RON price**. Conclusion: no paid ads for premium; use teacher links and word of mouth | [S]+[D] |
| Romania-specific ad costs | **not found**; need a 50 RON test campaign | |

## 6. KPI table with realistic targets
| KPI | Definition | Benchmark found | Pilot / Year 1 target | Tag |
|---|---|---|---|---|
| Cost to acquire a paying school | spend (time x 50 RON + travel) / schools signed | none public; vendor blogs only (LTV:CAC 3 to 5 is "good") | at most 1,500 RON per school; ratio to lifetime value at least 3 | [A] |
| Cost to acquire a free active learner | cost / learners active in week 2 | education app installs are expensive on paid channels (see 5.3) | at most 2 RON, i.e. organic/teacher links only | [A] |
| Pilot to paid | pilot classes that pay for the next school year | 48% with documented outcomes, 17% without (vendor-cited HolonIQ) | 1 of 2 pilot schools; outcomes sheet ready | [A]/[S] weak |
| Free to premium | premium subscribers / active free learners | freemium median 2.1% (RevenueCat); Duolingo 9.0% of yearly users | 2% (range 1 to 3) | [S]/[A] |
| Retention in class | share of pilot class active again next week | no public benchmark for classroom use | 60% (slide 19) | [A] |
| Retention, self-serve | share active on day 30 | education apps about 2% on day 30 (Business of Apps), all apps about 6% | 3 to 5% | [S]/[A] |
| Retention, paid | school renewal; parent annual subscription kept | annual subscribers kept after 1 year: 28% freemium apps; 36% for low-priced apps (RevenueCat) | school renewal at least 70% (no benchmark found); parents 30 to 35% | [S]/[A] |
| Gross margin | (revenue - variable cost to serve) / revenue | none public for Romanian edtech | at least 70% (model: 66, 72, 76) | [D]/[A] |
| Running break-even | paying classes / 7 | | 7 classes by end of school year 2027/28 | [D] |
| Learning impact | before/after 5-question quiz, same class | none found | +20% score (slide 19, ASSUMPTION) | [A] |
Rule: targets are labelled targets; nothing here is a result.

## 7. Jury Q&A sheet (money questions, short honest English answers)
1. **How many customers in the first quarter?** None paying yet. Plan for Jan to Mar 2027: one pilot class of about 22 students, paying a symbolic 300 RON, so one paying school in the base case. In the conservative case the pilot is free and the first quarter has zero customers. We do not claim sales that do not exist.
2. **What is the average ticket?** Per school per year about 3,600 RON ex-VAT in the base case (3 classes x 1,200), range 1,800 to 7,200. Per class 1,200 RON, about 55 RON per student per year.
3. **What is your revenue?** Year 1 (2027), base case about 7,900 RON (about 1,470 EUR); range 1,800 to 32,400 RON. Nearly all from school licences; parent premium is under 5%. It is small on purpose: year 1 proves that schools pay.
4. **What does it cost you to serve a class?** About 78 RON a year in cash (AI hints, voice, tax) and about 228 RON if we value our own support time at 50 RON an hour. Margin per class about 81% in the base case. Because the app is one static file, a new student costs almost nothing.
5. **When do you break even?** Running costs are about 511 RON a month, 6,130 a year. A class leaves about 972 RON, so 7 classes cover running costs, about 2 to 3 private schools. Including about 3,000 RON of start-up we need 10 classes. In our base case we are close at the end of 2027 and break even around autumn 2028.
6. **Why would a school pay if PhET and Khan are free?** Free tools give simulations and videos. The school pays for what free tools do not give a class: guided 3-minute hands-on labs in Romanian and English, the phone as controller, a class progress view and a person who helps the teacher. Kahoot and Khanmigo show the same pattern: free core, schools pay for class tools. As far as we found, none lets the phone control the experiment.
7. **Why this price?** 1,200 RON per class is about 55 RON per student, between textbook-style licences (5 to 24 RON) and tools such as Albert (73 RON) or Khanmigo for schools (170 RON). A private school collects about 340,000 to 490,000 RON in fees from one class a year, so the licence is about one third of one percent. Parents: 100 RON a year is under one hour of tutoring.
8. **Who pays for the free students? Sponsors?** Class licences. One free learner costs at most 0.25 RON a month even with AI hints, so 1,000 free learners cost at most 3,000 RON a year, the price of 2.5 class licences. We do not count sponsors as revenue.
9. **How do you reach schools and what does a customer cost?** Face to face, with a free or symbolic pilot first and a warm introduction. Estimated 1,500 RON of our time and travel per school that signs (10 meetings, 3 pilots, 2 wins, an assumption we will measure). We do not buy ads for parents: at normal click prices a premium subscriber would cost 750 RON to win and pay 100.
10. **Are your conversion and retention targets realistic?** They are tied to public benchmarks: 2% free-to-premium (median for freemium apps is 2.1%; Duolingo reaches 9% after years), 3 to 5% on day 30 for self-serve (education apps average about 2%), 60% weekly return in a class because the teacher brings them back. School renewal 70% is our assumption; we found no public benchmark.
11. **Who owns the company and who gets paid?** We are under 18, so an adult (parent) must be the legal founder or administrator of a normal company; a special company type for 16 to 18 year olds was proposed in 2025 and we have not confirmed it became law. Team time is not charged in the model. Paying one average salary would need about 77 classes, so that is a later stage.
12. **What is the biggest risk and what is plan B?** No paying customer yet, and schools take 6 to 11 months to decide. If no school signs by September 2027 we keep the pilot class free, approach tutoring centres, and the maximum we lose in year 1 is about 9,100 RON; we can cut it by forming the company only after a first signed letter. Second risk: free GitHub Pages is not meant for a paid service, so we move to free static hosting plus a small relay server of about 35 RON a month.

## 8. Explicație pentru Eduard (română, simplu, o pagină)
**Ideea în trei fraze.** Elevii folosesc gratuit. Cine plătește este școala (clientul), pe clasă, iar părinții pot cumpăra opțional premium. Costurile sunt mici, deci avem nevoie de puțini clienți.
**Prețul.** 1.200 lei pe clasă pe an, fără TVA. O clasă are cam 22 de elevi, deci ies aproape 55 lei pe elev pe an, cam 5,5 lei pe lună de școală. Este mult sub ce plătesc părinții pe meditații (aproape 520 lei pe lună pentru cei care fac meditații, studiul Salvați Copiii) și sub abonamentele pentru elevi (SuperȘcoala 497 lei pe an). La o școală privată cu taxă de 15.000–22.000 lei pe an, o clasă aduce peste 340.000 lei, iar licența noastră e cam 0,3% din asta. Pentru pilot cerem simbolic 300 lei pe clasă, ca să avem un client care plătește „măcar un leu".
**Costurile.** Pe lună: server mic pentru telefon-controler 35 lei, domenii 11 lei, contabil 265 lei, unelte AI pentru construit 200 lei (aici punem noi suma reală). Total aproape 511 lei pe lună, 6.130 lei pe an. Pornirea (firmă, hârtii GDPR, avocat): aproximativ 3.000 lei, estimare, trebuie ofertă. Pe fiecare clasă mai plătim cam 78 lei în bani (voce, AI, impozit) sau 228 lei dacă ne punem și timpul la 50 lei pe oră.
**Calculul de rentabilitate.** O clasă lasă 1.200 – 228 = cam 972 lei. Cheltuieli fixe pe an: 6.130 lei. 6.130 / 972 = 6,3, deci **7 clase** (2–3 școli). Cu cele 3.000 lei de pornire: 10 clase.
**Trei scenarii pentru 2027.** Prudent: 1 școală, 2 clase, venit cam 1.800 lei, pierdem aproape 8.000. De bază: 2 școli, 6 clase, venit cam 7.900 lei, aproape pe zero la costuri curente, minus 3.500 cu pornirea. Optimist: 4 școli, 16 clase, venit cam 32.000 lei, plus 15.500. Primul trimestru: 0, 1 sau 1 client care plătește.
**Ce să spui sincer.** Nu avem încă niciun client care plătește. Anul 1 este despre dovadă, nu despre profit. Premium pentru părinți aduce sub 5% în primul an: nu-l prezentăm ca motor. Sponsorii nu se numără ca venit.
**Ce poate strica totul și ce rezolvi.** (1) Școlile decid greu, 6–11 luni: de aceea pilotul începe acum. (2) Hosting gratuit pe GitHub Pages nu e pentru servicii plătite: mutăm pe hosting static gratuit plus server mic. (3) Voi sunteți minori: firma trebuie înființată de un adult (părinte); verificați cu un contabil sau avocat. (4) AI-ul pentru indicii costă puțin (15–150 lei la 1.000 de elevi pe lună), dar cere acord părintesc.
**Ce trebuie să hotărăști tu:** prețul (1.200? 900–1.800), taxa de pilot (300?), cine este adultul pentru firmă, costul real al abonamentelor AI, dacă spui „plan" pentru tutorele AI.

## 9. What is missing, and what to verify before upload (all VERIFY items need a human to open the link)
1. Official count and pupils of private licee in Romania and in Suceava: not found (Ministry state report 2024-2025 or INS Tempo).
2. Price lists of 3 Suceava private schools (to confirm that 1,200 per class is a small share of tuition).
3. Brilliant, Kahoot, Duolingo (Romania) live prices; SuperȘcoala and eduKiwi current prices.
4. GitHub Pages commercial-use wording (English docs), RoTLD current .ro price, Stripe Romania page, Anthropic pricing page.
5. VAT rate for software licences sold to schools, VAT registration threshold, micro-tax 1%, how a minor-led team can invoice: accountant or lawyer, one conversation.
6. Salvați Copiii study PDF (sample size, liceu-specific tutoring spend).
7. One real quote for start-up costs (3,000 RON is a placeholder) and Eduard's real AI-tool subscription (200 RON placeholder).
8. Education-impact benchmark: none found; stay with "target +20%, measured on the pilot".
9. Missing mentor material: Stefan Iarca's empty cost Excel (see knowledge.md); if it arrives, copy the input list above into it.

## 10. Source register (accessed 26 Nov 2026; page text not opened unless stated, see section 0)
Market and Romania
- INS high-school pupils 2025/26 (631,500): https://www.edupedu.ro/populatia-scolara-a-inregistrat-in-2025-2026-cea-mai-mare-crestere-din-ultimii-cinci-ani-sustinuta-de-un-spor-puternic-in-invatamantul-liceal-scade-in-schimb-numarul-absolventilor-mai-ales-la-nive/
- INS public/private split 2025/26: https://www.edupedu.ro/gradul-de-cuprindere-in-invatamant-a-populatiei-scolare-a-fost-de-doar-724-in-anul-scolar-2025-2026-in-conditiile-cresterii-numarului-de-elevi/
- INS 2024/25 (17.3% high school): https://alba24.ro/ins-numarul-elevilor-si-studentilor-inmatriculati-a-crescut-in-anul-scolar-universitar-2024-2025-1086894.html
- Romania Education Alliance, private share: https://agerpres.ro/comunicate/2025/10/28/comunicat-de-presa---romania-education-alliance--1497659
- Private licee "about 100" (undated): https://stirileprotv.ro/stiri/social/liceele-private-o-rampa-de-lansare-pentru-universitatile-din-strainatate.html
- ISJ Suceava press notes (21 private units): https://isj.sv.edu.ro/images/Docs/evenimente/comunicate_de_prese/2023/ (exact file not identified)
- Class size: https://www.edupedu.ro/oficial-numarul-elevilor-din-clasele-de-a-ix-a-creste-la-28-in-liceele-teoretice-si-tehnologice-din-anul-scolar-2026-2027-fata-de-26-si-24-in-acest-an-scolar/
- Parents' spend (Salvați Copiii, Mar 2025): https://www.salvaticopiii.ro/sites/ro/files/2025-03/cat-dau-parintii-pe-meditatii-costurile-ascunse-ale-educatiei-studiu-national.pdf and press: https://www.economica.net/?p=819687
- Tutoring prices: https://playtech.ro/2026/meditatiile-o-a-doua-scoala-platita-de-parinti-cat-ajunge-sa-coste-pregatirea-unui-elev-intr-un-singur-an/ and https://www.bugetul.ro/meditatiile-o-afacere-tot-mai-infloritoare-in-romania-parintii-din-tara-noastra-platesc-lunar-sume-uriase-pentru-instruirea-copiilor/
- Private school fees: https://www.bzi.ro/educatie-privata-in-iasi-cat-ii-costa-pe-parinti-sa-isi-trimita-copiii-la-scolile-si-gradinitele-particulare-5348863 ; https://playtech.ro/2026/cat-a-ajuns-sa-coste-scoala-privata-in-romania-in-2026-harta-taxelor-din-marile-orase/ ; https://adevarul.ro/stiri-interne/educatie/harta-taxelor-scolare-in-2026-cat-costa-fuga-de-2522231.html
- Wage and inflation Sep 2026: https://financialintelligence.ro/salariul-mediu-net-a-ajuns-la-5-717-lei-in-septembrie-ins-salariul-real-a-scazut-pentru-a-15-a-luna-consecutiv-in-ritm-anual/
- FX: https://www.curs-valutar-bnr.ro/curs-valutar-17-noiembrie-2026
Competitors
- Brilliant: https://brilliant.org/help/pricing-and-plans/how-much-does-brilliant-premium-cost/ ; tracker https://recurdash.com/subscription-pricing/brilliant
- Kahoot: https://kahoot.com/schools/plans/?lang=nb ; https://kahoot.com/teachers/plans
- Genially: https://genially.com/plans/education ; https://www.capterra.com/p/146861/Genially/pricing/
- Duolingo: https://www.sec.gov/Archives/edgar/data/1562088/000162828025049514/q3fy25duolingo9-30x25share.htm ; price (US, third-party) https://www.thepricer.org/how-much-does-super-duolingo-cost/
- Khan Academy finances and Khanmigo: https://fourweekmba.com/how-does-khan-academy-make-money/ ; https://thejournal.com/articles/2023/11/16/khan-academy-cuts-district-price-of-khanmigo-ai-teaching-assistant.aspx ; Romanian site https://blog.khanacademy.org/khan-academy-is-now-available-in-romanian/
- PhET: https://phet.colorado.edu/en/about ; budget talk https://www.nationalacademies.org/event/docs/DF125B151DD3F1C0E3B455C7D97AA9C15DC02A3487A8?noSaveAs=1 ; impact report https://phet.colorado.edu/publications/PhET_Impact_Report_2025.pdf
- Labster https://www.labster.com/es/precios ; Albert https://www.albert.io/pricing-schools ; Lab-Aids https://www.lab-aids.com/how-are-licenses-sold-and-distributed
- SuperȘcoala (Forbes RO): https://www.forbes.ro/?p=408042 ; eduKiwi launch: https://outsourcing-today.ro/?p=9693 ; BacLive: https://financiarul.ro/actualitate/a-fost-lansata-prima-platforma-de-pregatire-live-la-distanta-pentru-bacalaureat-baclive/ ; Kinderpedia: https://www.capterra.com/p/174857/KINDERPEDIA/pricing/
Costs, tax, legal
- GitHub Pages limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits ; commercial-use discussion https://github.com/orgs/community/discussions/74742
- Cloudflare Workers/Pages: https://developers.cloudflare.com/workers/platform/pricing/
- Hetzner: https://www.bitdoze.com/hetzner-cloud-cost-optimized-plans/ ; https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/
- RoTLD: https://rotld.ro/portal/mc05022018.html/ ; .com at cost: https://www.whtop.com/plans/cloudflare.com/135912
- Claude small-model prices (secondary): https://www.vktr.com/ai-platforms/anthropic-cuts-smallmodel-pricing-90-with-claude-haiku-55/ ; https://docs.kanaries.net/articles/haiku-pricing
- Google Text-to-Speech: https://cloud.google.com/text-to-speech/pricing
- Stripe Romania (via guide): https://pronetdesign.ro/en/blog/online-payment-processors-romania-2026/ ; https://support.stripe.com/questions/pricing-updates-for-businesses-based-in-the-european-economic-area-(eea)
- VAT 21%: https://www.economica.net/?p=850799 ; https://globaltaxnews.ey.com/news/2025-1622
- Micro-company: https://bono.ro/blog/plafon-microintreprindere-schimbari-fata-de-2024-si-impozit-pentru-microintreprinderi-in-2025 ; https://financiarul.ro/companii/100-000-de-euro-este-plafonul-micro-in-2026-cum-se-verifica/
- Accounting price: https://bono.ro/blog/pret-contabilitate-srl
- Minors and companies: https://e-juridic.manager.ro/articole/minorul-poate-deveni-comerciant-sau-asociat-al-unei-societati-comerciale-in-ce-conditii-6593.html ; SRL-FE proposal https://www.digi24.ro/stiri/economie/liceeni-intre-16-si-18-ani-isi-vor-putea-deschide-firme-de-exercitiu-prevede-un-proiect-depus-in-parlament-3186071
Benchmarks
- RevenueCat: https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026 ; https://www.revenuecat.com/sosa-26-insights ; education retention https://www.businessofapps.com/?p=98187
- K-12 sales cycle and pilot conversion (vendor blogs, weak): https://www.saashero.net/strategy/edtech-go-to-market-strategy/ ; https://pulserevops.com/go-to-market-playbooks/gp0026
- Ad costs: https://influee.co/ro/blog/facebook-ads-benchmarks ; https://www.superads.ai/facebook-ads-costs/cost-per-app-install/education
