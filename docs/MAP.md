# LUMIO MAP (read this first, never re-read old chats). Update the LOG at the bottom when you finish.
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
david (opus, builds), designer (spec/review), tester (verifies, low/medium), psychologist (jury). Flow: designer -> david -> tester -> psychologist -> manager.
## v2 modules
shell.js (views, ctx, nav), galaxy.js, camera.js, tabs.js, terminal.js, rating.js (lumio2_stats), loader.js, ui.js, physics.js. Lessons: math/parabola, math/algebra, math/pythagoras, physics/gas, physics/optics. Storage keys: lumio2_progress, lumio2_stats, lumio2_view, lumio2_theme, lumio2_lang.
## Blocked / waiting on Eduard
Matter.js licence check at source; Zoom recordings need transcript; Darius OK on Lumi unlock rule; Windows (Rainmeter) 4 questions.
## Open (order)
Spanish verbs+vocab, podcast, Lumens/Moon+XP, ink practice, settings, sounds/TTS, projectile/linear/interest, friends relay, Lenis/motion, Matter.js.
## LOG (newest first, one line each: date, who, what, commit)
- 2026-11-06 manager: handoff pack, MAP, psychologist agent, skills mirrored (0b7a425)
- 2026-11-06 david: Swiss lab grid, visible answer field (184b18d); nav+Light theme in progress
- 2026-11-06 david: terminal + ratings (3a53e70); rating accuracy fix; wordmark (a2e9caf)
- 2026-11-06 david: open design layer (7d99797); video-match galaxy/tabs (c0ade32); 4 lessons ported (7e05470)
