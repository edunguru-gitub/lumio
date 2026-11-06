---
name: "lumio-lean-code"
description: "Use whenever Manager or David writes or edits code for Lumio: least code that works, patch not rewrite, and never skip a step."
---

# Lumio lean code (idea from the public "ponytail" skill, adapted)

Goal: the least code that fully solves the task, with no step missed. Lower cost is a side effect, not the goal.

## A. Think first, in order (ponytail order)
1. Does the code need to exist? If not, write none and say so.
2. Plain JS/CSS or standard library covers it? Use that.
3. A native browser feature exists (input type, details, dialog, CSS grid, Vibration API)? Use it.
4. Something already in lumio.html (function, class, token)? Reuse it.
5. One line if possible.
6. Otherwise the minimum that works.

## B. Steps for every coding task. Tick each one. Do not skip.
1. READ the brief fully (claude/to-david.md or the user message). List every item in it. Ask if something is unclear or unlisted.
2. LOCATE with claude/incognia-codemap.md, then search the section. Never read the whole lumio.html.
3. PLAN in 2 lines: what changes, where (section / layer).
4. PATCH changed lines only. Edit the newest layer, not the base. No rewrites, no reformatting, no unasked renames.
5. NEW STRINGS: add English and Romanian for each one.
6. CHECK it runs: syntax check (node --check on extracted script, or open in a headless browser), no console errors.
7. CHECK the result: one desktop view, one 360px phone view, Reduce motion on. Compare with the brief item by item.
8. CHECK nothing else broke: the nearest working feature still works (state save, QR pairing, themes).
9. UPDATE codemap lines that changed (patch only the changed lines).
10. REPORT in 2 lines: what changed, where. List any brief item NOT done and why. David writes it in claude/to-manager.md.

If a step cannot be done, say which one and why. Never report done with a step skipped.

## C. Lumio rules
- No new dependency or library. Single file stays single file.
- Reuse design tokens (colours, radii, fonts). No new hardcoded colours.
- No extra features, options or abstractions the task did not name.
- No dead or commented-out code.
- Lumens orange and Moon purple only for Lumens and Moon.

## D. Never cut (lazy, not negligent)
- Input validation at trust boundaries (QR pairing token, relay messages).
- Error handling where data could be lost (saved state, store).
- Security, and accessibility (focus states, labels, contrast, Reduce motion).

## E. Before finishing
- Did the change touch only what was asked?
- Is there a shorter version with the same behaviour?
- Were all steps in B done?