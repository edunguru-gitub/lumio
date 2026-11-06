# Spec: Swiss lab grid (algebra, parabola, pythagoras, gas, optics)
Sources: taste file (matte, one accent, sage ok / rose miss, no solid tan, quiet buttons), v4 Swiss grid. Class names exist in v2/css/tokens.css; this replaces the "open" pass (lines ~113-127). Airy stays: rules, not cards.
## 1. Shared grid
- `.lab`: max-width 1120px, margin 0 auto, padding 48px 24px 96px, 12 col, gap 24px, 8px base (spacing 8/16/24/32/48).
- 1280: label column cols 1-3 (h1 40px Caladea, `.k` mono 11px uppercase muted, letter-spacing .08em); work area cols 4-12. Each block separated by 1px rule var(--line), padding 24px 0.
- 390: one column, label above work, gutter 16px, h1 32px, blocks 24px apart. No cards: `.eq`,`.tile`,`.quest` = no bg, no radius, top rule only.
- Accent `--c` (subject colour) used once per lab: Check outline, slider thumb, active dot. Everything else ink/muted.
## 2. Answer field (`.ans`)
- Structure: mono label `Your answer` (11px, muted, uppercase) above; row = input + Check, gap 16px, align end.
- Input: height 56px; background transparent; border 0; border-bottom 1px solid rgba(237,227,208,.4); radius 0; padding 0 4px; font 500 36px/1 Caladea, tabular-nums; caret-color tan; placeholder `0` at ink 25%, or `?` for text.
- Focus: border-bottom 2px tan (#D9C3A0), no outline ring (rule IS the focus; keep :focus-visible on Check). Label turns tan. Transition 250ms ease-out.
- Min width 160px at 1280 (cols 4-7), full width on 390 with Check below, full width.
- Enter checks. inputmode decimal. Helper under rule, mono 11px muted: `Enter to check`.
- Replaces the invisible borderless input: the visible rule is mandatory in every lab input.
## 3. Hint / Check hierarchy
- Check = primary: flat, transparent, 1px solid tan, radius 12, height 44, padding 0 24px, text tan Inter 500 15px. Hover: bg tan 10%. Active: scale .98. Never filled, no shadow. Sits right of the rule, bottom-aligned.
- Hint = tertiary text link: no border, mono 12px, muted, underline offset 4px, min-height 44px (hit area), placed under the field left-aligned, 16px away. Never next to Check at same weight.
- After round: Check text becomes `New round`, same style.
## 4. Feedback (`.fb`)
- Own line under the field, min-height 24px (no layout jump), Inter 15px, left aligned.
- Correct: text sage #9DBF9E, prefix mono `OK`. Miss: rose #C98B8B, prefix `MISS`, shows right answer. Field rule takes same colour for 1.1s / 1.9s. Colour never alone: always the word plus text. aria-live polite.
- Progress `.dots`: 8px circles, 1px ink-30% outline; ok = sage fill, no = rose fill, cur = ink outline; left-aligned in the label column, mono `2 / 5`.
## 5. Sliders / controls (`.sl`)
- Grid 24px label | 1fr track | 72px readout, row min-height 44px, gap 16px. Label: mono 600 15px ink. Readout: mono 13px, tabular, right aligned, with unit (`300 K`).
- Track: 1px line rgba(237,227,208,.4), no fill bar; thumb 16px circle, bg var(--c), no shadow, 44px touch area via padding. Tick marks: ticks every step under track, 1px x 6px, ink 25%, major every 5th 10px; min/max labels mono 11px muted at track ends.
- Segmented/toggles: text buttons with 1px bottom rule; active = 2px rule in --c.
## 6. Canvas framing
- `.lab-cv`: no card fill (transparent), no radius, 1px hairline top and bottom only; height 360px at 1280, 280px at 390; axis labels mono 11px muted drawn in canvas (x, y, units, origin 0), gridlines ink 8%, axes ink 40%, curve 2px in --c.
- Caption under canvas: mono 11px muted, e.g. `f(x) = ax² + bx + c`.
## 7. Per lab
- Algebra: work area = equation in Caladea 56px (1280) / 36px (390), type hint `.k` below; dots in label col; answer field per §2.
- Parabola: formula Caladea 32px; 3 sliders a,b,c (§5); canvas axes -10..10; vertex readout as 3 mono value rows with top rules (label left, value right, 15px). Accent: steel/sage per subject.
- Pythagoras: canvas left cols 4-8, sliders + big numerals right cols 9-12: `c = 5.00` Caladea 48px; badge becomes mono 12px text `a² + b² = c²` with top rule, no border box.
- Gas: canvas + 2 sliders (T, V); readouts P,V,T as Caladea 40px numerals with mono 11px label above, separated by vertical 1px rules at 1280, top rules at 390. Burner stays tan, never orange.
- Optics: canvas full work width, ray lines 1.5px; draggable handles 16px ring 1px ink + 44px hit; readouts (f, do, di) same big-numeral row as Gas; focal marks as ticks with mono labels `F`.
## 8. Checks (reject if)
- Any input without visible rule; Check/Hint same weight; state by colour only; card fills/radius>12 in labs; accent more than once; touch target < 44px; Lumens orange or Moon purple used.
