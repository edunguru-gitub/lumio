# Tasks for David (Manager writes). Format: `- [ ] id: task` ; David ticks `[x]` when done.
- [ ] t0: Reply in to-manager.md with "David online" + date, to confirm this channel works. Nothing else.

## 2026-11-26 deck-final: OPEN (do ONLY after Manager sends Eduard's numbers; one pass)
Source: Tester report on DRAFT2 (f340b23), Manager decisions.
1. Fill every ASSUMPTION/TO VERIFY tag (22 on slides + 3 in docs/pitch-stage2.md) with the numbers Manager gives; delete any line whose number is not confirmed (never keep a guess). Final export: node tools/deck/build.js ... --final must exit 0; PDF goes to the scratchpad, never into the repo.
2. [x] Script: header time vs footer (4:46 vs 4:49) make consistent; placeholders [monthly total], [percent], licence price and break-even must be in the placeholder list at the top and the gate must also catch unbracketed ASSUMPTION text in docs/pitch-stage2.md; cut 'Khan has reach' (no slide, no source) or use the slide 5 wording; team slides 22-24 get at least 5 s each.
3. [x] Slide 19: grey formula boxes need more contrast; slide 20: do not show '5 testers so far' as a weekly-active baseline (they did not use it weekly), show it as 'tried it once'; p25 footer patch faintly visible.
4. [x] (draft3; neutral photo pending, initials used) Only if Eduard says yes: old slide edits (survey statistics as real counts, fictional sample names on the leaderboard, one 'Why us' team slide, slogans to factual lines, neutral photo of Eduard). Otherwise leave original pages untouched.
5. [x] Costs slide: year 1 vs first quarter, as Manager says. Keep the deck at max 25 pages, footers NN / total.

## 2026-11-26 wave2-fixes: OPEN (start only when Manager says Eduard decided)
From Tester report on item C (cf2dd16):
1. Gas h1 breaks mid-word at 1200 px ('Thermodynami / cs Lab', overflow-wrap:anywhere in a 250px column): fix without touching the canvas gap.
2. RO with no Romanian voice installed shows the same 'Vocea română nu este instalată' twice: show once.
3. Lesson header at 700-1000 px takes 3 rows (RO/EN wraps alone): tidy to 2 rows if possible without hiding anything else.
4. ONLY IF Manager relays that Eduard said NO: restore the Galaxy/Tabs toggle inside lessons (and the crumb at 700-1279) exactly as in b846c02 while keeping the 4th Settings tab reachable. Parity rule: that hiding was not approved.
5. Only if Eduard says yes: hide the inert phone controller in Levels at 390 px (answer field was 1.5 screens down).
Self-check before ONE push; never push before the final post-rebase re-run.

## 2026-11-26 moon-tiers: OPEN (start only after your current wave2-fixes + QR task is pushed)
Manager decision: build docs/spec-moon-tiers.md (Designer proposal, 6 tiers New Moon..Blue Moon, thresholds 0/1015/1050/1100/1160/1250). Differences from the spec: do NOT replace the existing v1/v2 moon-day icon (parity); show the tier as TEXT next to the number on the Home Moon tile, Ranks rows (tier headline, place secondary) and the Challenge result ('New rank: {name}' only on a rise, never on a drop); optional small SVG tier badge only if it does not replace the day icon. Reset copy 'New month. Last month: {name}.' with no loss words. Names in ONE constant table EN/RO so Eduard can edit. Engine unchanged. Same live-safety rules (single push after post-rebase re-run, registry-safe), own checks counted honestly, then Tester.
