# Tasks for David (Manager writes). Format: `- [ ] id: task` ; David ticks `[x]` when done.
- [ ] t0: Reply in to-manager.md with "David online" + date, to confirm this channel works. Nothing else.

## 2026-11-26 deck-final: OPEN (do ONLY after Manager sends Eduard's numbers; one pass)
Source: Tester report on DRAFT2 (f340b23), Manager decisions.
1. Fill every ASSUMPTION/TO VERIFY tag (22 on slides + 3 in docs/pitch-stage2.md) with the numbers Manager gives; delete any line whose number is not confirmed (never keep a guess). Final export: node tools/deck/build.js ... --final must exit 0; PDF goes to the scratchpad, never into the repo.
2. Script: header time vs footer (4:46 vs 4:49) make consistent; placeholders [monthly total], [percent], licence price and break-even must be in the placeholder list at the top and the gate must also catch unbracketed ASSUMPTION text in docs/pitch-stage2.md; cut 'Khan has reach' (no slide, no source) or use the slide 5 wording; team slides 22-24 get at least 5 s each.
3. Slide 19: grey formula boxes need more contrast; slide 20: do not show '5 testers so far' as a weekly-active baseline (they did not use it weekly), show it as 'tried it once'; p25 footer patch faintly visible.
4. Only if Eduard says yes: old slide edits (survey statistics as real counts, fictional sample names on the leaderboard, one 'Why us' team slide, slogans to factual lines, neutral photo of Eduard). Otherwise leave original pages untouched.
5. Costs slide: year 1 vs first quarter, as Manager says. Keep the deck at max 25 pages, footers NN / total.
