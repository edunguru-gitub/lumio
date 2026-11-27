# Spec: Light calm (Designer, 27 Nov). Docs only, no code. David builds after the HSIC upload (Sat 28 Nov 14:00).
Brief (Eduard): "make the light mode less jarring to the eyes and have more synergy with the galaxy colours". Input: Eduard screenshot of Light galaxy view (stage cream radial gradients, near-white header, galaxies muted blue / taupe / rose / green). Sources read: v2/css/tokens.css (Light blocks lines 276-283 and 307-321), v2/js/galaxy.js, docs/spec-tactile-light.md, docs/spec-premium-pass.md, docs/spec-moon-tiers.md. Contrast numbers computed with tools/contrast.py (WCAG relative luminance).
Rules kept: Lumens orange only for Lumens, Moon violet only for Moon, Caladea + Inter, Dark theme untouched, nothing removed (parity).

## 1. Diagnosis (why Light feels harsh), with numbers
Relative luminance (Y, 0 to 1). Lower and closer together = calmer.
1. Header band #F6F0E6 Y .876 sits on stage #EFE6D6 Y .798: a bright strip across the top of a mid field. The eye adapts to the stage, then the band glares. Ratio header/stage 1.09 looks small, but the band is also the only large near-white area, and it has the neutral cream hue while the stage carries tinted washes: it reads as a separate "paper" layer, not part of the world.
2. Pure white: raised controls start at #FFFFFF (--raise-bg top) and cards are #FFFBF4 (Y .968). On a Y .80 stage they are the brightest points on screen, so every button and card flashes. Inner highlight rgba(255,255,255,.9) adds a second white edge.
3. Ink vs bg: #2B2018 on stage = 12.8:1. Not a failure, but a near-black on a bright field maximises glare (halation) for long reading. 10 to 11.5:1 is still AAA and noticeably softer.
4. Galaxy dust and sky: dust specks are 0.6 to 1.3 px at alpha .15 to .70 in subject colours (already darkened for Light). On a bright field a small, low-alpha dark dot averages to grey: the galaxies read as "grey dust", not luminous. Sky stars use ink #2B2018 at alpha up to .6, size 1.5 px: they read as dirt specks, brighter and heavier than the galaxy arms, which competes with them.
5. Core glow is warm-light on a warm-light field (core #FFECC8 on #EFE6D6): almost no contrast, so the galaxy has no light source. Light on light cannot glow; the field must sit lower for a glow to read.
6. Stage washes: three fixed radial blobs (tan, brown, steel blue) unrelated to where the galaxies are or what colour they are. Only the tan one is near a galaxy; steel blue at top-right has no galaxy under it. No synergy: the background does not echo the subject hues.
7. Shadows: neutral dark-brown rgba(43,32,24,.18/.20) plus a 1px contact at .20 and an inner bottom lip .10. On cream these look dirty grey and make every control heavy.
8. No vignette: edges are as bright as the centre, so there is no resting place for the eye.

## 2. Calmer Light palette (exact values)
Principle: lower overall Y by about 12 points (stage .798 to .700), tint every surface with the stage hue (warm sand, a touch of olive), no pure white anywhere, header slightly lighter than the stage only by 1.06:1, ink softened but AAA.
Everything below is the Light theme only. Both Light blocks must change identically (the prefers-color-scheme:light block and [data-theme=light]).

| Token | Before | After | Y after | Note |
|---|---|---|---|---|
| --bg (page, header band) | #F6F0E6 | #E8DFCC | .743 | header no longer near-white |
| stage base (inside --stage) | #EFE6D6 | #E3D9C5 | .700 | darkest large area, galaxies sit here |
| --bg-hi | #FBF7EF | #EDE5D2 | .78 | top-left light source of #stage |
| --card | #FFFBF4 | #EFE8D7 | .810 | no white card |
| --raise-bg | #FFFFFF to #F3EADB | #F5EEDF to #E9DFCB | .86 / .74 | gradient top-left light, still lifts |
| --inset-bg | #E8DDCA | #DDD3BE | .66 | answer field, bars |
| --line (decor, 1.6:1 allowed) | #D3C5AE | #C4B79C | .50 | hairlines |
| --edge (control edge, needs 3:1) | #8F7E62 | #7F6F54 | .17 | 3.48 on stage, 3.68 header, 3.99 card |
| --locked | #8F7E62 | #7F6F54 | - | same, 3:1 kept |
| --glow | #EBDCC0 | #D9CBAE | - | corner wash |
| --ink | #2B2018 | #2B2018 (keep) | - | AAA on all surfaces (11.3 to 13.0) |
| --muted | #5E5242 | #54483A | - | darker by one step because bg fell; 6.3 on stage |
| --tan / --life | #816034 | #725430 | - | 4.96 on stage |
| --physics | #2F6B7D | #28606F | - | 4.9 on stage, 4.5 on inset |
| --math | #447046 | #3A6240 | - | 5.0 |
| --spanish | #9E4E56 | #8F444C | - | 4.8 |
| --good | #2B724D | #246846 | - | 4.8 |
| --bad | #BA353A | #A82D32 | - | 4.9 |
| --hint-orange | #8A4B00 | #82460A | - | 5.3 |
| --lumens-text (Lumens only) | #B04400 | #9E3A00 | - | 4.9 stage, 5.6 card. Orange rule intact |
| --moon-text (Moon only) | #6A4BD0 | #5F40C4 | - | 5.0 stage, 5.7 card. Violet rule intact |
| --core-glow | #FFFBF4 | #FFF3D6 | - | JS core, warm not white |
| --sky | #2B2018 | #6B5A44 | - | taupe stars, not ink |
| --sky-a | 1.6 | 1.1 | - | with size 1.5 px kept in JS until phase B |
| --planet-sh | rgba(43,32,24,.25) | rgba(74,56,30,.20) | - | warm umber |
| --planet-edge | rgba(43,32,24,.35) | rgba(74,56,30,.40) | - | edge stays visible |

Shadows (Light), before to after:
- --raise before: inset 0 1px 0 rgba(255,255,255,.9), inset 0 -2px 0 rgba(43,32,24,.10), 0 3px 6px rgba(43,32,24,.18), 0 1px 1px rgba(43,32,24,.20).
- --raise after: inset 0 1px 0 rgba(255,248,232,.55), inset 0 -2px 0 rgba(74,56,30,.08), 0 2px 5px rgba(74,56,30,.14), 0 1px 1px rgba(74,56,30,.12).
- --press before: inset 0 2px 4px rgba(43,32,24,.22), 0 1px 1px rgba(43,32,24,.2). After: inset 0 2px 4px rgba(74,56,30,.18), 0 1px 1px rgba(74,56,30,.12).
- --inset before: inset 0 2px 4px rgba(43,32,24,.22), inset 0 -1px 0 rgba(255,255,255,.8). After: inset 0 2px 4px rgba(74,56,30,.16), inset 0 -1px 0 rgba(255,248,232,.5).

Luminance summary: stage .798 to .700 (-12%), header .876 to .743, card .968 to .810, brightest raised point .97 to .86, ink on stage 12.8 to 11.3, header vs stage ratio 1.09 to 1.06, max screen Y .97 to .86.

### 2.1 Contrast table (computed, WCAG)
Text >= 4.5, UI edge >= 3. Surfaces: stage #E3D9C5 / header #E8DFCC / card #EFE8D7 / inset #DDD3BE.
- ink #2B2018: 11.3 / 12.0 / 13.0 / 10.7
- muted #54483A: 6.3 / 6.7 / 7.3 / 6.0
- tan #725430: 5.0 / 5.2 / 5.7 / 4.7
- physics #28606F: about 4.9 / 5.2 / 5.6 / 4.5 (verify final hex with tools/contrast.py before merge)
- math #3A6240: 5.0 / 5.3 / 5.7 / 4.7
- spanish #8F444C: 4.8 / 5.1 / 5.6 / 4.6
- good #246846: 4.8 / 5.0 / 5.5 / 4.5
- bad #A82D32: 4.9 / 5.1 / 5.6 / 4.6
- lumens-text #9E3A00: 4.9 / 5.2 / 5.6 / 4.6
- moon-text #5F40C4: 5.0 / 5.3 / 5.7 / 4.7
- edge and locked #7F6F54: 3.5 / 3.7 / 4.0 / 3.3 (UI edges, pass 3:1)
- decor line #C4B79C: about 1.5 (decorative only; controls always use --edge)
Rule: text on the inset surface only ink, muted, tan, subject colours (all >= 4.5 there).

### 2.2 Moon tiers, Light ramp (consistent with docs/spec-moon-tiers.md addendum)
The ramp keeps its hexes (soft to deep, tier name always shown): New Moon #5E4983, Crescent #573C86, First Quarter #503088, Gibbous #492489, Full Moon #431A89, Blue Moon #3C0F8A. Re-verified on the new card #EFE8D7: 6.2 / 7.2 / 8.1 / 9.1 / 9.8 / 10.6; on the new stage: 5.4 to 9.2. All pass 4.5. The neutral Moon token (--moon-text #5F40C4) stays visually between New Moon and First Quarter in saturation and lighter than the ramp, so it still reads as "default Moon, not a tier". Blue Moon soft glow: rgba(60,15,138,.18) 0 0 10px (Light), no extra hue. No violet outside Moon, no orange outside Lumens.

## 3. Stage that picks up the galaxy hues
Home layout (from Eduard's screenshot, 1912x740 stage): Physics top-left of centre (41% x, 24% y), Life skills top-right of it (57%, 36%), Spanish bottom-left (43%, 70%), Math bottom-right (59%, 70%).
Subject glow hues (fills at low alpha only; text colours stay the AA values above): Physics steel #7FB0C0, Math sage #9DBF9E, Spanish rose #C98B8B, Life tan #D9C3A0.

### 3.1 CSS-only version (safe, in --stage, Light only)
Layer order, top to bottom:
1. Vignette: radial ellipse 75% 70% at 50% 45%, transparent 55%, rgba(110,88,56,.14) 100%. Warm umber, never black.
2. Physics wash: radial 24% 28% at 41% 24%, rgba(127,176,192,.26), transparent.
3. Life wash: radial 24% 28% at 57% 36%, rgba(217,195,160,.34), transparent.
4. Spanish wash: radial 22% 26% at 43% 70%, rgba(201,139,139,.22), transparent.
5. Math wash: radial 22% 26% at 59% 70%, rgba(157,191,158,.24), transparent.
6. Light source: radial circle at 30% 0%, #EDE5D2 (--bg-hi) to transparent 55%.
7. Base #E3D9C5.
Replaces the old tan / brown / blue blobs. Limits: positions are screen-space guesses of the home framing (1273x716 and 1920x1080 are close; at 390 the galaxy view is decorative so washes act as soft colour fields). When the camera zooms into a galaxy the washes do not follow: acceptable, alpha is low. Banding: keep alpha steps small, add 1px noise only if banding is visible in screenshots (premium pass already allows it).
Header band: --bg #E8DFCC with border-bottom 1px --line, no extra gradient. Optional: a 6% mix of the active tab's subject hue is NOT proposed (keeps chrome neutral).

### 3.2 JS version (accurate, phase B, galaxy.js draw only)
Per galaxy, drawn before the dust, in world space so it follows the camera:
- Halo: radial gradient radius 1.35 x rd, squashed y .5, rotated by the galaxy tilt, subject hue (the glow hues above) at alpha .30 at the centre to 0 at the edge, globalCompositeOperation multiply (hue deepens the field instead of greying it). Reset to source-over after.
- Core: keep the warm core gradient but raise inner alpha: stops #FFF3D6 at .95, rgba(217,160,90,.55) at 35%, 0 at 70%; drawn with source-over so it is lighter than the multiplied halo around it. This light-centre-in-coloured-field contrast is what makes the galaxy read as luminous.
- Dust: size x1.35 (0.8 to 1.75 px), alpha range .30 to .85 (was .15 to .70), subject colour as is; draw in two passes: all specks with multiply at the base alpha, then the 15% largest specks with source-over at +.15 alpha as highlights. Result: saturated arms, a few bright points, no grey average.
- Sky stars: size 1.2 px, colour --sky taupe (CSS token), alpha max .35; skip stars that fall inside a galaxy halo radius (avoids specks on the arms).
- Near / far fade: keep the existing 1-.7f fade; halo scales with the same a.
- Performance: 4 gradients per frame, same cost class as the core gradient. Keep dust loop unchanged in count (N=650). Reduce motion unaffected (rotation already off).
Dark theme: all of 3.2 behind `if(C.coreA)` (existing Light flag), Dark path untouched.

## 4. Hover and active glow per subject
- Galaxy canvas hover (JS): planet hover ring stays (alpha .8) and adds a soft halo radius 2.2 x pr, subject colour at .30 to 0, multiply. Current planet: halo at .18 constant. Home level: hovered galaxy halo alpha .30 to .42 over 160 ms ease-out (no bounce, no extra motion elsewhere).
- Subject label button (.glab) hover: text colour stays ink; 1px underline in the subject colour (CSS, uses --c if set, otherwise tan).
- Cards and rows with --c (.ccard, lesson rows): hover border-color var(--c) (exists) plus box-shadow 0 0 0 3px color-mix(in srgb, var(--c) 16%, transparent) in Light. Active (pressed) keeps the tactile press shadow.
- Focus ring: 2px --ink at 1px offset, unchanged. Hover only with a real mouse (hover:hover).
- Moon and Lumens never use these glows (their own colours only on their own elements).

## 5. What ships where
CSS-only, safe, no behaviour change (phase A): every row in the section 2 token table, shadows (--raise, --press, --inset), --stage layers (section 3.1), subject hover box-shadow (section 4), --sky and --sky-a. All inside the two Light blocks of v2/css/tokens.css plus one Light-only hover rule. Dark blocks untouched. Note --sky-a 1.1 only lowers alpha; the 1.5 px size and 1.6 factor branch (`C.skyA>1`) in galaxy.js still applies until phase B; if the sky looks too big after phase A, ship phase B sky size first.
JS, galaxy rendering (phase B, galaxy.js draw and spiral, Light branch only): halo, core alpha, dust size and alpha, two-pass dust, sky size, canvas hover halo. Reads new tokens via the existing read() (add --halo-a if a tunable alpha is wanted; default constants are fine).
Staging: nothing before the HSIC upload (Sat 28 Nov 14:00; freeze already set in docs/spec-premium-pass.md section 5). Then phase A in the premium-pass CSS window (one commit, can be reverted by reverting the token block). Phase B with premium phase 2 (galaxy constants), Tester screenshots between A and B so Eduard can approve each separately. Rollback: restore the previous token values from this table's "Before" column.
Open for Eduard (via Manager): (1) accept that Light overall is darker and warmer, about 12% lower luminance? (2) per-galaxy hue halos on the canvas (phase B) yes or no.

## 6. Screenshot plan (Tester, Light, before and after from the same commit pair)
Sizes: 1273x716 and 390x844 (390 is Tabs only; galaxy view is decorative behind the title).
1. Galaxy home, 1273x716, idle (before / after).
2. Galaxy home with hover on Physics label (after only).
3. Galaxy zoomed into Physics, planets visible, one planet hovered (after).
4. Home tab, 1273x716 and 390 (cards, Continue, Lumens and Moon numbers).
5. One lesson open (Optics or the first Math lesson), with an answer field focused (inset surface, edge, focus ring).
6. Ranks, with Moon tier names (Light ramp, all six if data allows).
7. Settings with Light selected (toggle pills, header).
8. Dark galaxy home 1273x716 once, to prove Dark unchanged (pixel-identical to before).
Measure from the PNGs: mean Y of the header band and of the stage; log both next to the targets (header .743 +/- .01, stage .700 +/- .02).

## 7. Acceptance checklist (Designer review)
1. Header band is tinted sand (#E8DFCC), not near-white; header/stage ratio <= 1.07.
2. No pure white (#FFF) anywhere in Light; brightest surface <= Y .86.
3. Every text token >= 4.5:1 on stage, header, card and (where used) inset; every control edge >= 3:1; table recomputed with tools/contrast.py on the final hex.
4. Each galaxy sits in a wash of its own hue; Physics reads steel, Math sage, Spanish rose, Life tan; no new colours, no purple or pink gradient, no orange.
5. Galaxy arms read as saturated colour with a lighter warm core, not grey dust (squint test, and compare mean saturation of dust area before and after).
6. Sky stars are quieter than the galaxy arms; none sits on an arm.
7. Vignette visible but light (edges at most about 8% darker than centre), no banding.
8. Shadows warm umber, no grey smudge under buttons; pressed state still clearly different.
9. Hover and active show the subject hue per subject; Lumens orange only on Lumens, Moon violet only on Moon (grep both in the diff).
10. Moon tier Light ramp readable on the new card, tier name always present.
11. Dark theme pixel-identical; Glass and Matte modes still work; Reduce motion unchanged; focus ring visible.
12. Parity: nothing removed or renamed (tokens, buttons, labels, galaxy rendering features); Tester v1-vs-v2 parity check passes.
13. Phone 390: no horizontal scroll, header and tabbar legible, tap targets unchanged.
