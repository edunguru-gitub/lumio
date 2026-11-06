# Spec: Terminal screen + FIFA-style ratings (v2)

Design read: progress terminal, students, quiet luxury. Dials: variance medium, motion low, density medium (data, but airy: 8-48 scale, hairlines, no boxes). One accent per area. No emojis. Source: docs/skills/lumio-taste, v2/css/tokens.css (last layer: borderless, --s1..--s5 = 8/16/24/32/48).

## 1. Screen (view `terminal`, new default; toggle Terminal | Galaxy | Tabs; phone: Terminal | Tabs)
`#term` = absolute inset 0, overflow auto, bg var(--bg). Data in `--mono`, tabular-nums; labels Inter 12/500 uppercase muted, letter-spacing .06em.
- 1280: padding 48px 80px (same gutter as #ghead); inner max-width 1120, grid 12 cols, gap 24.
  - Cols 1-4 player card 320x440. Cols 5-12: row A meters (Lumens, Moon, Streak, Days left) as 4 hairline tiles (border-top 1px --line, padding-top 8px, gap 24); row B rankings table (margin-top 48); row C lesson cards grid, 4 per row, 200x280, gap 24, grouped by subject (margin-top 48).
  - Ticker: sticky bottom, height 40, border-top 1px --line, bg var(--bg), padding 0 80px, mono 13px muted, newest gain first, static (no marquee), max 5 items, overflow hidden with ellipsis.
- 390: padding 24px 16px 96px (tabbar 64 + gap); one column, gap 24. Player card full width 358x200 (horizontal layout, see 2). Meters 2x2 grid gap 16/24. Rankings rows height 56. Lesson cards 2 per row 167x232 gap 24. Ticker not sticky: a list under meters, 5 rows of 40.
- Section titles Caladea 28 (390: 24); big overall numeral Caladea 400 (card 96px; lesson card 56px; at 390 player card 72px).

## 2. Card anatomy (FIFA look, matte)
Radius 20, bg var(--card), 1px --line, no gradient, no shadow. Tier shown by edge, never by new colours: <60 line only; 60-79 tan 1px border; 80+ subject colour 1px border + 10% subject tint. Tier is never the only signal (number printed).
- Top-left: overall numeral (Caladea). Under it: 3-letter code (PHY, MAT, SPA, LIF; lesson card uses lesson name abbreviation, ex. OPT) in Inter 12 uppercase.
- Top-right: Lumio sparkle x3 (taste: sparkles, not stars) = round(rating/33), tan filled/outline.
- Centre (lesson card): small subject-colour planet mark (reuse L.Galaxy.mini). Player card: monogram circle 96 (initial, Caladea) until avatar exists.
- Name: player = Display name (default "You"; editable later) Caladea 24; lesson = L.n(l.name).
- Bottom: 3 mini stats in 3 columns, hairline top: PRG (progress), QST (quests), ACC (accuracy), each label 11 muted + mono value 0-99. Player card shows the 4 subject averages instead (PHY MAT SPA LIF).
- States: unrated lesson shows "--" and "Not started" (no zero); locked (no mod) shows "Coming soon", opacity 1, muted text; empty player (nothing rated) shows "--" and "Start a lesson". Focusable, Enter opens the lesson.
- Lumens/Moon: only in meters. Lumens tile: number in #FF6A13, small. Moon tile: number in #A78BFA, small, with phase icon (v1 moonPhase ~3922). Nothing else orange/violet.

## 3. Rating formula (per lesson, 0-99, integer, all real data)
P = progress 0..1 (L.getP). Q = quests done / quests total (module reports total). A = accuracy = correct / (correct + wrong), only first attempt per question counts as correct; every retry after a wrong answer counts as wrong.
`rating = round(99 * (0.50*P + 0.30*Q + 0.20*A))`. Weights favour finishing; A needs >=5 attempts else A is treated as 0.5 (no luck-based 99). Lesson with P=0 and 0 attempts is unrated. 99 only with P=1, Q=1, A=1.
Player overall = round(mean of rated lessons' ratings); show "n of 14 rated" beside it. Subject average = mean of its rated lessons (unrated excluded, not zero). Ranks use overall.
Lumens (v1 addXP ~1418, correct answer = 10 + min(streak,5)*2): v2 keeps it, lifetime, never resets. Moon (v1 monthly Elo, moonLoad ~3917): needs Challenges, which v2 lacks, so tile shows 1000 base, "No challenges yet", days left = daysLeft() (v1 ~3913). Streak = consecutive correct answers (v1 bumpStreak 1419); best streak kept. Daily streak not used.

## 4. Data model (minimal extra state)
Keep `lumio2_progress` untouched. New key `lumio2_stats` (one JSON, versioned):
`{v:1, lum:0, streak:0, best:0, les:{"math/parabola":{qd:0,qt:0,ok:0,bad:0,ts:0}}, log:[{ts,k,lum,d}]}`
qd/qt quests done/total; ok = first-try correct; bad = wrong + retries; ts last activity; log capped at 20 entries (ticker source: lesson key, Lumens gained, rating delta d). All writes in try/catch; render works with empty/blocked storage.
Friend rows: none stored.

## 5. Rankings (no invented names)
Table: rank, name, Overall, Lumens, this week (+/- from log, last 7 days). Only the "You" row is real. Friends: v1 friend codes (LUM-XXXX, LAN, ~3932) only identify peers, stats travel over the local network, and the v1 sync code (exportCode ~2005) holds name+xp, not v2 ratings; so v2 cannot supply friends. Empty state under You: "Add friends" (muted text + outline button, disabled with title "Coming soon"). Optional phase 2: paste a friend's "card code" (base64 of name, overall, lumens, ts) shown as a dated snapshot.

## 6. Hooks into shell.js
- New files after tabs.js: js/rating.js (L.stats load/save, L.rate(key), L.overall(), L.award(n)), js/terminal.js (renders #term, subscribes with L.on). Add `<section id="term">` in index.html; terminal styles appended at end of tokens.css (override layer, same pattern).
- shell.js: add 'terminal' to st.view/L.setView, default `st.view='terminal'`; toggle gets a third button (data-v="terminal", L.S.terminal); chrome(): body[data-view=terminal] hides #stage,#tabs. Tab bar: Home -> terminal.
- ctx (shell.js ~line 55) gains `ctx.report({qd,qt,ok,bad})` and `ctx.award(n)`; modules call them, done() stays. emit('progress') already fires on setP; add emit('stats') so galaxy ignores it.
- Rating card on lesson finish: after done(), 1.2 s toast-free: the lesson card number counts up (opacity/transform only, reduce-motion = instant).

## 7. Build order (David, MEDIUM; each step tested before next)
1. rating.js + lumio2_stats + formula (console-testable).
2. ctx.report/award; wire the 2 shipped modules (optics, gas) first.
3. #term shell: view toggle, layout at 1280/390, empty states.
4. Player card, then lesson cards.
5. Meters (Lumens, Moon base, streak, days left), ranking table with You + Add friends.
6. Ticker. 7. Wire remaining modules as they land. Tester: 1280 and 390, empty storage, blocked storage, reduce motion, ro text.
