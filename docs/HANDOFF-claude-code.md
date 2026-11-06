# Handoff to Claude Code (local), 6 Nov 2026
Open this repo folder in Claude Code. CLAUDE.md, .claude/agents (david, designer, tester) and docs/skills load automatically. Work on branch v2 (git checkout v2).
Run v2: `cd v2 && python -m http.server 8080` then open http://localhost:8080 (or any static server).
## Done on v2
5 lessons ported (optics, gas, algebra, parabola, geometry/pythagoras), Terminal home with per-lesson ratings (rating.js, lumio2_stats), galaxy + tabs matching the update video, open design layer, Caladea+Inter bundled (v2/fonts), wordmark with sparkle.
## In progress when handed off
Nav tabs Home|Subjects|Ranks, header toggles Galaxy/Tabs, Light/Dark, RO/EN, Light theme, Swiss lab design (answer field visible), psychologist fixes. See docs/spec-nav-themes.md, docs/spec-lab-swiss.md, docs/review-v2-psych.md.
## Open items
1 Spanish verbs + vocab. 2 Podcast mode (v1 page-podcast, Pod ~1545). 3 Lumens/Moon + XP, Ranks with real friends. 4 Ink practice. 5 Settings (voice, name, import/export). 6 Sounds/TTS. 7 Projectile, linear, interest lessons. 8 Matter.js (check MIT LICENSE) for physics. 9 Lenis smooth scroll (check licence). 10 Top text nav + Glass look (optional).
## Rules
Eduard talks Romanian, replies very short (adhd-mode). Ask before changing anything unlisted. Orange only Lumens, violet only Moon. No emojis. Do not invent ranking names. Design: docs/brief-design-v5.md, docs/skills/lumio-taste.
## Team Board
tools/board/team-board.html is the board source (artifact with db collections agents, todos, questions, config, usage, files, messages, health). It lives on claude.ai as an artifact; Claude Code sessions that have the Artifact tool can update it by publishing to the same URL. Without it, the board stays in claude.ai chat Manager.
