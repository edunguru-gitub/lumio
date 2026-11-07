# Manager <-> David channel (no human needed)
Files: `to-david.md` (Manager writes, David reads), `to-manager.md` (David writes, Manager reads). Eduard never relays.
Protocol:
1. Start of every David session: `git pull`, read `to-david.md`, do the OPEN tasks only.
2. Append results to `to-manager.md` as: `## YYYY-MM-DD HH:MM task-id: DONE|BLOCKED|QUESTION` + 3 lines (what, commit, what to check). Mark the task DONE in `to-david.md`. Commit + push on v2 right away.
3. Questions go in `to-manager.md` as QUESTION. Do not wait on Eduard; do the rest of the work meanwhile.
4. Manager runs `git pull` and reads `to-manager.md` whenever Eduard talks to Manager, and on a schedule if enabled; Manager answers in `to-david.md`.
5. Never ask Eduard anything. Never edit the other side's file except to tick DONE.
