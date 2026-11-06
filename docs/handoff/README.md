# LUMIO MASTER HANDOFF (Manager v3, Claude Code ready). 6 Nov 2026
Read this first, then CLAUDE.md. Everything the earlier Managers learned is here or in the files listed at the end.

## Who
Lumio = gamified tutor for high-school students (competition entry, High School Innovation Challenge 2026; submitted 5 Nov, result pending). User = Eduard Ungureanu (works on his father Florin's Claude account). Team: Eduard, Darius (team leader, very busy, gave Eduard full agency for now), Stefan. Eduard talks Romanian. Eduard is the CEO-type decision maker and now the consultant: Claude does the heavy lifting.

## How Eduard wants you to work (standing rules)
1 ADHD mode always: first a short yes/no answer if he asked a question, then only numbered steps, no summary at the end. Elaborate only when he asks or the matter is important or irreversible. 2 Very short replies, no "understood", no filler. 3 Manager (you) is the ONLY one he talks to; David (builder), Designer, Tester, Boyle (psychologist) are subagents. 4 Ask before changing anything unlisted; announce changes to foundations (name, sections, stack, themes) first as "CHANGE NOTICE: what -> what to update". The dashboard/board: ask before changing the design, but edit data silently (he said: don't tell me what you edit on the board). 5 Warn him if a task repeats an earlier one. 6 Tell him every time you change an agent's effort: "EFFORT: low->high, reason". Pick the lowest effort that works, tokens first. 7 Do NOT remind him about token usage (he reads it in the dashboard); he types session/week % into the board when asked. 8 No emojis, EXCEPT the full-agreement signal: when you FULLY agree with something he says, reply "jurrrrr" + 5 swords + 5 shields + 5 castles + "aparam cetateaaaa" + 5 Moroccan flags (only full agreement). 9 Never fabricate (no invented names in rankings, sources, numbers). 10 Never enter passwords; never join/comment/post publicly for him. 11 Do not recap project state unprompted. 12 Before design work: scan free animation libraries and free website designs (licence-checked), shortlist, discuss with the Designer, then present. 13 Team audit: if an agent has no purpose, tell him; then merge/remove/add. Priority is process efficiency. 14 When he says "council": run a Council of Nine (9 voices, 3 yes 3 no 3 neutral, real splits and dissent, never unanimous), say so when used. 15 Reminder he asked for: when you can view Instagram reels (you can via his signed-in Chrome), remind him to go through his saved videos and see what can become skills.

## Team and flow
Designer spec -> David builds -> Tester verifies -> Boyle (psychologist) reviews -> Manager reports. Agents live in .claude/agents (david opus, designer sonnet, tester sonnet, boyle sonnet) with skills in docs/skills (david-build, lumio-lean-code, designer-review, lumio-taste, tester-verify, psychologist-review, lumio-map, adhd-mode, skill-router). Effort policy in CLAUDE.md. Commit trailers: Co-Authored-By + Claude-Session lines.

## Product decisions (Eduard)
- Name Lumio (was Incognia). Wordmark Caladea, 64px top-left, tan sparkle replacing the dot of the i.
- Design language: Quiet luxury + Swiss grid + Aurora, Matte default (Glass is a separate optional look, chrome only), neumorphism only as control depth. Rejected: Maximalism. Tokens in docs/brief-design-v5.md. Lumens #FF6A13 only for Lumens (low-key), Moon #A78BFA only for Moon. Subject colours: Physics steel, Math sage, Spanish rose, Life skills tan. Fonts Caladea + Inter, mono for values.
- No slogans or quotes in the app (at most "Continue learning"). Rating symbol = Lumio sparkle (tan earned, outline empty), not stars. Progress bar per subject "4 of 12".
- Gamification: Lumens = lifetime XP (never reset), Moon = monthly Elo rating (base 1000). Missions in levels 1-5 grouped in "Lumi" worlds unlocked by sparkles (Darius must OK). Physical-feeling buttons/switches; haptics optional extra (iPhone 16 Pro cannot vibrate from Safari; shown only as planned).
- Galaxy view: subject = galaxy, lesson = planet, galaxy grows with progress, dust rotates very slowly, zoom feels like Google Maps (left click in, right click out, wheel; no pinch). Phone = Tabs only with a decorative galaxy. Ignore weak laptops (they use Tabs). Continue button = outline in the subject colour (solid tan disliked).
- v2 architecture: permanent shell (galaxy, camera, zoom) + one lazy-loaded module per lesson. Physics: own engine plus Matter.js (check MIT LICENSE from source); spring physics on piston and ball.
- Nav (6 Nov): tabs Home | Subjects | Ranks; always-visible toggles Galaxy/Tabs, Light/Dark, RO/EN; Terminal (Bloomberg style) home with FIFA-style per-lesson rating cards (0-99 from real play), player card, ticker, rankings. Ranks: only real data, "Add friends" empty state.
- Open feel: wide margins, borderless text controls, hairlines. But inputs MUST be visible (Swiss lab design, docs/spec-lab-swiss.md).
- Ideas kept: Apple foldable (fold) layout inspiration; near-miss feedback; unlock themes with Lumens; light streaks; Lenis smooth scroll (check licence); Dribbble/Instagram references he sent (Forme storefront openness, Neurotrace grid + mono labels, Sovra glow).
- Voice: Australian English TTS voice wanted back (v1 had it); other accents dropped. Languages EN + RO (test ă â î ș ț).

## State of the code
v1 = app/lumio.html (+ app/Lumio.cmd, untouched, v5.27, 4155 lines: Lumens/Moon, themes x6, ink practice, podcast, ranks, settings, TTS, phone connect). v2 = v2/ on branch v2 (see docs/HANDOFF-claude-code.md for run instructions and open items). Specs: docs/spec-*.md, review: docs/review-v2-psych.md, free resources: docs/free-resources.md (branch design-resources).

## Team Board (claude.ai artifact, private)
Source tools/board/team-board.html. Needs claude.ai Artifact tool + its database (collections agents, todos, questions, config, usage, files, messages, health). URLs: board https://claude.ai/artifact/JCZzBTjUTsE2QJXUoM6AWg ; v2 hosted app https://claude.ai/artifact/DcEUxLoiDF2fDKo8K2mMkU ; deck https://claude.ai/artifact/UCH5FmW5g7t7kgUxJdtWm6 ; style gallery https://claude.ai/artifact/2nra1wpaJFqs43evKbMqiv ; design board https://claude.ai/artifact/PAmxQuV6BkSMq36tYbFREo . Eduard reads and writes messages and answers questions there.

## Competition
See docs/handoff/competition.md. Stage II 2-29 Nov, semifinal 5 min pitch + 5 min Q&A, final week 1-4 Dec, Grand Final 5 Dec URA Campus Bucharest. Re-check https://liceeni-ura.igodemy.ai/structura-programului/ for results.

## Personal side project (separate from Lumio)
Eduard Windows dashboard / Rainmeter desktop galaxy launcher: his own project, hidden behind a Settings toggle on the board; 4 questions waiting for him.

## Still open
Spanish verbs + vocab, podcast mode, Lumens/Moon + XP, ink practice, settings, sounds/TTS, projectile/linear/interest lessons, friends (needs hosted relay; v1 friends are local network only), Matter.js, fonts for the v1 launcher (Lumio.cmd still names Instrument Serif), Zoom recordings (3 and 5 Nov: needs transcript or file, never use the passwords in his message), Darius question (unlock at 9 of 15 sparkles?), update claude/lumio-todo.md in the Project.

## Files in this folder and elsewhere
docs/handoff/competition.md, docs/handoff/old-manager-notes.md (v1 Manager rules, deck/video history, kit), docs/brief-design-v5.md, docs/HANDOFF-claude-code.md, CLAUDE.md, docs/skills/*. The claude.ai Project "eduard proiect lumio app" still holds the original docs (claude/to-david.md, to-manager.md, manager-hold.md, handoff-manager3.md, incognia-kit.md, pitch-script.md, shots-*.md, lumio-todo.md, incognia-codemap.md).

## Skills (auto-loaded in Claude Code)
.claude/skills/* mirrors docs/skills/* (adhd-mode, skill-router, lumio-taste, lumio-lean-code, lumio-map, david-build, designer-review, tester-verify, psychologist-review). Edit both when you change one. Agents: .claude/agents/{david,designer,tester,boyle}.md.
