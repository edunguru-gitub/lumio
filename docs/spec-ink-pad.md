# Spec: ink pad + recognition (parity gap P2) - 7 Nov
Source: app/lumio.html (reference only): class Ink ~l.1772, REC ~l.1462, initPractice l.1508, initInkOpts l.1974, CSS .pad/.qbox/.recog l.58-67, 183-188. Target: v2/modules/math/algebra.js lab. No code here.

## OCR (decision)
- v1 uses NO library. REC is hand-written template matching in the file: renders digits 0-9 (and "1" variants) from 8 system fonts into 16x16 grids, then segments ink by column gaps and matches each glyph by dot-product; minus = wide flat stroke, point = tiny blob. Output {text, conf}. Digits, minus, decimal point only.
- Licence: our own code, none to check. Network: none. Fully offline.
- v2: port REC and Ink verbatim into one new shell-free helper v2/js/ink.js (window.LumioInk, registered like a feature in registry.js, skipped if absent -> typing-only fallback). Not lazy-loaded from a CDN. Lazy-build only the templates on first pen-up (as v1 does: build() on first run).
- Patch: v1 lists 'Patrick Hand' in the template fonts; v2 does not ship it, so it falls back silently. Keep the list, no new font.

## Features to keep (all of v1)
Pen and eraser, undo (pop last stroke), clear, 4 colours (auto + 3), 3 sizes S3/M6/L10 (default M), pressure width, coalesced pointer events, touch-action none, status line "Pen - size M - n strokes", hint text in empty pad, recognition 650 ms after last pen-up, recognised value in an editable field with confidence %, Check reads that field, hint, new question and Next clear the pad and the field. Write/Type toggle (v1 iotog) kept: choice persisted (add key lumio2_io).

## Where in algebra.js
In render(): between the .eq line and the existing .fld. New block .ink above the field:
1. .ink pad (canvas, height min(34vh,260px), full lesson width, rules lines like notebook) with Write/Type segmented control top-right.
2. .ink-tools row under it: Pen, Eraser, Undo, Clear, colour dots, size dots, status.
3. Existing .fld stays untouched: its input #ans-in IS the "read as" field. Ink writes into it (value, with "-" as the v1 text, shown as "−" by the existing check()). Label "Your answer" stays; add confidence as small muted mono text right of the input. Check button, Enter, hint, read-aloud, scoring unchanged.
- Type mode: pad collapses to 0 height, the input is the answer as today (v2 default look). Ink mode: input still visible and editable. Typing always works in both modes.
- next()/round(): also call ink.clear() and reset confidence. Pad never auto-checks.
- Not in algebra: the v1 ghost canvas is only the Spanish trace; it is out of scope here (note for the Spanish port).

## Style (v2 tokens only)
- Pad surface: var(--card) with --inset shadow (tactile pressed-in paper), 1px var(--line), radius var(--r2); ruled lines = var(--line) at 40%. Hint text: Caladea italic, var(--muted). No dashed borders, no 3px outlines, no offset shadows.
- Buttons Pen/Eraser/Undo/Clear: existing v2 quiet button, --raise, --press on active tool, text Inter. Clear is not red-filled.
- Pen "auto" = var(--ink) (so it flips Light/Dark; v1 --pen). Colour swatches: ink, --bad, --good, --tan; selected = 2px ring var(--tan) + check mark (not colour alone). Eraser is destination-out, theme independent.
- Orange/purple not used (reserved Lumens/Moon). Mono for the confidence value. Both Light and Dark from tokens; canvas redraw on theme change so existing "auto" strokes recolour.
- Focus-visible rings, 44 px touch targets on phone, buttons wrap on 390 px. Reduce motion: no animation anyway.
- Mockup (HTML/PNG) after build review, per designer-review.

## Parity check for Tester
Draw 12, -3, 2.5, 0 in Light and Dark: value, confidence, edit, Check, undo/clear/eraser, colours/sizes, tab switch and theme switch keep strokes, typing-only still passes, no network request.

## Question for Eduard
v1 colour swatches are red/green/amber. Amber = orange family (reserved for Lumens). OK to swap amber for tan (same 4 swatches, count kept)?
