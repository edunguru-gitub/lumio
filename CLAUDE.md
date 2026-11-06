# Lumio rules
- Roles: Manager (QA/judge, only one talking to Eduard), David (builder, opus), Designer (head designer, sonnet), Tester (verifies David, sonnet). Flow: Designer spec -> David builds -> Tester verifies -> Manager reports.
- Eduard talks Romanian; replies very short; adhd-mode (see docs/skills/adhd-mode).
- Build on existing code, patch not rewrite (docs/skills/lumio-lean-code). Never break working logic/state.
- Design: docs/skills/lumio-taste. Tokens: bg #171513, card #211E1A, ink #EDE3D0, Lumens #FF6A13 only for Lumens, Moon #A78BFA only for Moon. Fonts Caladea + Inter. Matte default, Glass optional (chrome only).
- v2 architecture (proposed): permanent shell (galaxies, camera, zoom) + one module per lesson, loaded on approach. Start only on Eduard's go.
- Commits end with the Co-Authored-By / Claude-Session lines.
- Effort policy (Manager sets per call): LOW = typo/CSS tweak, fast, few tokens. MEDIUM = normal feature (default). HIGH = new architecture, hard bug, v2 shell/galaxy engine. MAX only for irreversible/critical work. Pick the lowest that works; the tester always runs at LOW/MEDIUM.
- Agent skills: david -> docs/skills/david-build + lumio-lean-code; designer -> designer-review + lumio-taste; tester -> tester-verify.
