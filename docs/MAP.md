# LUMIO MAP (read this first, never re-read old chats). Update the LOG at the bottom when you finish.
## PARITY RULE: do not change or remove past features unless Eduard asks. Port = same features.
## Where is what
| Need | File |
|---|---|
| Rules, roles, effort | CLAUDE.md |
| Eduard's rules, decisions, history | docs/handoff/README.md (+ competition.md, old-manager-notes.md) |
| Run v2, open items | docs/HANDOFF-claude-code.md |
| Design tokens and look | docs/brief-design-v5.md, docs/skills/lumio-taste |
| Specs (done or in build) | docs/spec-lessons-port.md, spec-video-match.md, spec-terminal-ratings.md, spec-nav-themes.md, spec-lab-swiss.md, spec-port-wave2.md (projectile, Moon/Challenge/Ranks, Settings, polish; deadline plan) |
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
Registry v2/modules/registry.js (strict JSON after '='): features [rating, terminal, ranks, moon, challenge, ticker, sfx, ink, qr, phone] = js/<id>.js, each registers window.LumioFeatures[id] and is skipped if absent (no rating = no terminal/ranks/ticker; no terminal = no Home tab; no ranks = no Ranks tab). lessons = 'subject/file' (module with manifest {id, subject, subjectName, color, title [EN,RO], order, tags, orbit [a,r]}) or a placeholder object (Coming soon). Subjects in first-seen order; tag 'first' = first-run lesson.
Add a lesson: modules/<subject>/<file>.js + one registry line. Remove: delete the line. Hosted single file: python3 tools/build-hosted.py OUT.html (inlines fonts, css, scripts, all registry files).
Lessons: math/algebra, math/parabola, math/pythagoras (id geometry), physics/optics, physics/gas, physics/projectile. Storage keys: lumio2_proj (projectile exercises + level sparkles), lumio2_progress, lumio2_stats, lumio2_moon (Moon Elo), lumio2_chal (active Challenge), lumio2_view, lumio2_theme, lumio2_lang, lumio2_seed (home layout), lumio2_io (algebra Write/Type), lumio2_phone (phone layout/tabsync/dock).
Home layout: shell.js place() seeded per device; galaxy.js G.home() fits all galaxies + labels with margins. ctx.fx (sfx) + ctx.streak() for lessons.
## Blocked / waiting on Eduard
Matter.js licence check at source; Zoom recordings need transcript; Darius OK on Lumi unlock rule; Windows (Rainmeter) 4 questions.
## PARITY GAPS (Tester audit 6 Nov, restore all; Eduard rule)
P1 DONE 6 Nov (sfx.js = sounds/confetti/jump/shake/TTS via ctx.fx). P2 DONE 7 Nov (ink.js = v1 Ink pad + REC offline OCR in algebra; amber swatch -> tan). P3 DONE 7 Nov (phone.js = v1 controller knob/sliders/tilt/Motion/Center, Desktop/Hybrid/Phone layouts, BroadcastChannel + Lumio.cmd LAN relay, Connect dialog + QR via qr.js; lessons pass ctx.controls(def)). Optics has NO v1 source: ask Eduard keep or remove.
## Open (order)
NEXT: module manifests (lesson + feature per file, shell reads them; hosted build lists modules automatically). Tester: removing any module breaks nothing.
Spanish verbs+vocab, podcast, Lumens/Moon+XP, ink practice, settings, sounds/TTS, projectile/linear/interest, friends relay, Lenis/motion, Matter.js.
## LOG (newest first, one line each: date, who, what, commit)
- 2026-11-26 manager: removed team photos/videos from the repo tree for privacy (Eduard approved): reference/david-presentation.pdf, reference/david-lumio-video.mp4, design/video/lumio-update-video.mp4 (history still holds them; full purge only on Eduard request). Keep local copies; docs that cite the update video are now historical
- 2026-11-26 david: wave2 C Settings: js/settings.js (lumio2_settings: name, sound + volume, read aloud + voice + speed, tests, export v3 / import v3 + v1 v:2 codes with confirm, reset Lumens/best/streak, phone link), 4th nav tab, U.sw; sfx.js reads it (+F.auto, used by algebra); polish: lesson header 3->2 rows at 390, Galaxy/Tabs hidden in lessons, narrow desktops wrap (no side scroll), h1 32 + Back nowrap, 44px capsules, Link word + name, Home Ranks preview 3+ rows (P7), rating.js NaN guard (commits 'v2 wave2 C: Settings ... not registered yet', 'v2 register settings')
- 2026-11-26 david: wave2 B: js/moon.js (v1 monthly Moon Elo lumio2_moon, Lumens milestones, 6 Sample players in one constant, Lumens chip in lessons), js/challenge.js (v1 Challenge sheet/card/end, lumio2_chal, opponent tick 6.5 s, dev panel Ctrl+Shift+D seed/reset/end), ranks.js leaderboard (week/month, Friends Coming soon), terminal.js Lumens/Moon tiles + explainers, U.dialog, L.toast, streak celebration moved to rating.js report() (commits 'v2 wave2 B: Moon Elo, Challenge, leaderboard, Home meters (not registered yet)', 'v2 register moon + challenge')
- 2026-11-26 david: wave2 A projectile lab: modules/physics/projectile.js (v1 Free play 4 exercises + 5 Levels, hearts, sparkles, Lumens 10/15/20, Show me how, phone LAB row, lumio2_proj), U.gridMap/U.mdot, .proj CSS layer, phone.js lab string, registry line last (commits 'v2 projectile lab module', 'v2 register projectile')
- 2026-11-25 david: stage II deck fixes after Tester + Boyle review: 25 pages (Tech split into 15 How it works / 16 AI and data), new slides at >=13pt body / >=10pt mono, BMC 6 boxes, one break-even scenario with ASSUMPTION tags, KPIs 6 rows + pilot data rule (anonymous codes, teacher sheet), ask stamped on slide 25 (tagged for Eduard), gate also fails on __ / brackets in pages and script, tools/deck/check.py (count, footers, pixel diff); script 4:49, Stefan variant removed (commit 'stage2 deck fixes after review')
- 2026-11-25 teacher: docs/teacher/zoom-summary.md (RO chronological summary of 4 Zoom sessions, all actions by criterion, missing sessions, conflicts) + knowledge.md corrections (commit 'teacher: zoom summary')
- 2026-11-25 designer: spec-port-wave2.md (A projectile lab, B Lumens/Moon/Challenge/Ranks, C Settings, D-F deferred, 10-item polish, 10 questions) + design/wave2-projectile-levels mockup (commit 'spec port wave2')
- 2026-11-25 david: stage II deck tooling tools/deck (6 new slides HTML, overlays renumber 18 old pages to NN / 24 + spec text edits, merge.py, --final refuses open ASSUMPTION/TO VERIFY tags) + docs/pitch-stage2.md; PDFs only in scratchpad, not in repo (commit 'stage2 deck tooling and slides')
- 2026-11-25 teacher: mentor advice by grid criterion + 15-item jury checklist in docs/teacher/knowledge.md; docs/teacher/lumio-jury-lens.md (4 Zoom transcripts) (commit 'teacher: mentor advice from zoom')
- 2026-11-09 manager: HSIC preselection result: Lumio QUALIFIED (team Flow, Suceava, rank 18 of 30, 93 pts); semifinal pitch next (docs/handoff/competition.md)
- 2026-11-07 david: parity P3 phone controller (spec-phone-controller): js/phone.js feature (v1 Ctl knob/sliders/tilt/Motion/Center, Hybrid dock side/float, Phone mode under lab canvas, Link pill + Connect dialog with layout/Live tab/QR/steps/copy/other IP/Quit, BC 'incognia-sync' + Lumio.cmd relay unchanged) + js/qr.js (v1 offline QR); shell ctx.controls; gas/parabola/pythagoras pass v1 LAB tables (commit 'v2 parity P3 phone controller')
- 2026-11-07 david: ink pad 4th swatch tan -> steel --physics (Eduard approved; ring/check unchanged, CSS untouched) (commit 'v2 ink swatch steel')
- 2026-11-07 manager: P2 ink pad verified by tester (PASS all 5); ruled lines now ink 14% (visible in Dark) (commit 'v2 ink lines dark')
- 2026-11-07 david: parity P2 ink pad (spec-ink-pad): new js/ink.js feature (v1 Ink + REC verbatim, pen/eraser/undo/clear, 4 swatches auto/bad/good/tan, S/M/L, status, conf %, Write/Type saved lumio2_io) mounted in algebra above #ans-in; skipped if absent (typing only) (commit 'v2 parity P2 ink pad')
- 2026-11-06 david: bug 'kicked out of next exercise': global Backspace shortcut (shell.js) left the lesson when focus was on the Check button/body after an answer; Backspace now only goes out above lesson level (Escape unchanged); regression tools/test-lesson-stay.py (all 5 lessons) (commit 'v2 fix lesson kick-out')
- 2026-11-06 david: tactile + warm Light (spec-tactile-light): raised/inset/press tokens both themes, 1px edges >=3:1, segmented capsules (nav, Galaxy/Tabs, Light/Dark, RO/EN, phone tabbar; L.seg), detent sliders, aurora + warm-glow core + light planets, AA light colours (tools/contrast.py), RO 'Taburi', first-run card ends at first answer, Galaxy/Tabs on phone (saved choice wins), pythagoras +10 every new triple (commit 'v2 tactile light'). Not built: Launch cover (no Launch in v2), ON/OFF switches (no boolean settings in v2)
- 2026-11-06 david: parity P1 (rewards gas 25/pyth 10+30/algebra streak XP, sfx.js sounds+confetti+jump/shake, gas 4th tile+degC+flames/ice/ramp/overpressure flash, alpha/beta, v1 titles, parabola icons+chip colours, Read aloud en-AU) (commit 'v2 parity P1')
- 2026-11-06 david: galaxy home organic seeded layout (74fa6df)
- 2026-11-06 david: v2 modular: manifests + modules/registry.js + LumioFeatures (ranks.js, ticker.js split from terminal), tools/build-hosted.py; visuals pixel-identical, delete-any-file tested (commit 'v2 modular registry')
- 2026-11-06 designer: spec-tactile-light.md (warm Light + tactile system + segmented nav)
- 2026-11-06 manager: handoff pack, MAP, Boyle (psychologist) agent, skills mirrored (0b7a425)
- 2026-11-06 david: Swiss lab grid, visible answer field (184b18d); nav+Light theme in progress
- 2026-11-06 david: terminal + ratings (3a53e70); rating accuracy fix; wordmark (a2e9caf)
- 2026-11-06 david: open design layer (7d99797); video-match galaxy/tabs (c0ade32); 4 lessons ported (7e05470)
- 2026-11-06 david: v1 parity fixes: algebra shake, geometry +30 XP, gas Overpressure! + hint-orange (piston rate calc identical to v1, not a bug)
