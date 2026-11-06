# LUMIO MAP (read this first, never re-read old chats). Update the LOG at the bottom when you finish.
## PARITY RULE: do not change or remove past features unless Eduard asks. Port = same features.
## Where is what
| Need | File |
|---|---|
| Rules, roles, effort | CLAUDE.md |
| Eduard's rules, decisions, history | docs/handoff/README.md (+ competition.md, old-manager-notes.md) |
| Run v2, open items | docs/HANDOFF-claude-code.md |
| Design tokens and look | docs/brief-design-v5.md, docs/skills/lumio-taste |
| Specs (done or in build) | docs/spec-lessons-port.md, spec-video-match.md, spec-terminal-ratings.md, spec-nav-themes.md, spec-lab-swiss.md |
| UX review | docs/review-v2-psych.md |
| Free libs and licences | docs/free-resources.md (branch design-resources) |
| v1 app (reference only) | app/lumio.html (do not edit) |
| v2 app | v2/ (index.html, css/tokens.css, js/*, modules/<subject>/<lesson>.js, fonts/) |
| Team Board source | tools/board/team-board.html (artifact on claude.ai) |
| Original docs | claude.ai Project "eduard proiect lumio app" (claude/*) |
## Agents
david (opus, builds), designer (spec/review), tester (verifies, low/medium), Boyle (psychologist) (jury). Flow: designer -> david -> tester -> psychologist -> manager.
## v2 modules
Shell (static in index.html): physics.js, shell.js (L.build: subjects/planets/rows/cards from manifests; L.boot queue; L.has/L.tabOk), ui.js, galaxy.js, camera.js, modules/registry.js, loader.js (loads every registry file, then runs boot), tabs.js.
Registry v2/modules/registry.js (strict JSON after '='): features [rating, terminal, ranks, ticker, sfx] = js/<id>.js, each registers window.LumioFeatures[id] and is skipped if absent (no rating = no terminal/ranks/ticker; no terminal = no Home tab; no ranks = no Ranks tab). lessons = 'subject/file' (module with manifest {id, subject, subjectName, color, title [EN,RO], order, tags, orbit [a,r]}) or a placeholder object (Coming soon). Subjects in first-seen order; tag 'first' = first-run lesson.
Add a lesson: modules/<subject>/<file>.js + one registry line. Remove: delete the line. Hosted single file: python3 tools/build-hosted.py OUT.html (inlines fonts, css, scripts, all registry files).
Lessons: math/algebra, math/parabola, math/pythagoras (id geometry), physics/optics, physics/gas. Storage keys: lumio2_progress, lumio2_stats, lumio2_view, lumio2_theme, lumio2_lang, lumio2_seed (home layout).
Home layout: shell.js place() seeded per device; galaxy.js G.home() fits all galaxies + labels with margins. ctx.fx (sfx) + ctx.streak() for lessons.
## Blocked / waiting on Eduard
Matter.js licence check at source; Zoom recordings need transcript; Darius OK on Lumi unlock rule; Windows (Rainmeter) 4 questions.
## PARITY GAPS (Tester audit 6 Nov, restore all; Eduard rule)
P1 DONE 6 Nov (sfx.js = sounds/confetti/jump/shake/TTS via ctx.fx). P2 algebra handwriting pad + OCR. P3 phone controller (knob, sliders, tilt, Motion, hybrid; needs relay). Optics has NO v1 source: ask Eduard keep or remove.
## Open (order)
NEXT: module manifests (lesson + feature per file, shell reads them; hosted build lists modules automatically). Tester: removing any module breaks nothing.
Spanish verbs+vocab, podcast, Lumens/Moon+XP, ink practice, settings, sounds/TTS, projectile/linear/interest, friends relay, Lenis/motion, Matter.js.
## LOG (newest first, one line each: date, who, what, commit)
- 2026-11-06 david: tactile + warm Light (spec-tactile-light): raised/inset/press tokens both themes, 1px edges >=3:1, segmented capsules (nav, Galaxy/Tabs, Light/Dark, RO/EN, phone tabbar; L.seg), detent sliders, aurora + warm-glow core + light planets, AA light colours (tools/contrast.py), RO 'Taburi', first-run card ends at first answer, Galaxy/Tabs on phone (saved choice wins), pythagoras +10 every new triple (commit 'v2 tactile light'). Not built: Launch cover (no Launch in v2), ON/OFF switches (no boolean settings in v2)
- 2026-11-06 david: parity P1 (rewards gas 25/pyth 10+30/algebra streak XP, sfx.js sounds+confetti+jump/shake, gas 4th tile+degC+flames/ice/ramp/overpressure flash, alpha/beta, v1 titles, parabola icons+chip colours, Read aloud en-AU) (commit 'v2 parity P1')
- 2026-11-06 david: galaxy home organic seeded layout (74fa6df)
- 2026-11-06 david: v2 modular: manifests + modules/registry.js + LumioFeatures (ranks.js, ticker.js split from terminal), tools/build-hosted.py; visuals pixel-identical, delete-any-file tested (commit 'v2 modular registry')
- 2026-11-06 designer: spec-tactile-light.md (warm Light + tactile system + segmented nav)
- 2026-11-06 manager: handoff pack, MAP, Boyle (psychologist) agent, skills mirrored (0b7a425)
- 2026-11-06 david: Swiss lab grid, visible answer field (184b18d); nav+Light theme in progress
- 2026-11-06 david: terminal + ratings (3a53e70); rating accuracy fix; wordmark (a2e9caf)
- 2026-11-06 david: open design layer (7d99797); video-match galaxy/tabs (c0ade32); 4 lessons ported (7e05470)
