# Spec: premium pass (Designer, 26 Nov). Docs only, no code. David builds; Tester screenshots; Designer reviews.
Design read: persistent chrome + home world, high school students, quiet luxury. Dials: variance medium, motion low, density low. Inputs: Eduard's two screenshots, docs/skills/lumio-taste, spec-tactile-light.md, spec-nav-themes.md, v2/css/tokens.css, galaxy.js, camera.js, shell.js (place, G.home). PARITY: every control stays (Link, Home/Subjects/Ranks/Settings, Galaxy/Tabs, Light/Dark, RO/EN, Back, minus, plus). Only size, proportion, spacing, motion, depth change. Tokens and colours untouched.

## 0. Key measurement (read first)
Both screenshots are 1.5x scaled. Header image height ~145 px = 96 CSS px (tokens.css L93 `#bar{height:96px}`); capsules 66 px = 44 CSS (L579 `min-width:700px` sets 44); text 20-22 px = 13-14 CSS x 1.5. Image width 1909 = about 1273 CSS px, so Eduard's laptop (likely Windows 150%) sits in the 1100-1279 band. Every number below is CSS px; test at DPR 1 and 1.5. The 44 px rule is applied by WIDTH (>=700), so a laptop mouse gets phone-size targets. Root cause: size is keyed to width, not pointer type.

## 1. Diagnosis: 10 tells of "made by AI"
1. Touch sizing on a mouse device: 44 px capsules, 96 px header, 64 px wordmark (a 96 px logo row eats 11% of a 900 px viewport).
2. Same capsule on everything: nav, Galaxy/Tabs, Light/Dark, RO/EN, Link, Back, zoom all share one height, radius, raised thumb and edge. Nothing is primary.
3. Equal visual weight: wordmark is the loudest element, bigger than the content; settings-like toggles (theme, language) as prominent as navigation.
4. Four boxed groups in a row with 12-16 px gaps and different widths: reads as a toolbar of pills, no grouping logic (nav centre, utilities right).
5. Chrome is raised and shadowed everywhere (L325): neumorphic keys on utility controls. Taste says raised only for primary action and thumb.
6. Galaxy controls: three 44 px raised keys (Back, minus, plus) at bottom right, always full strength, text "Back" instead of icon-first, compete with the scene.
7. Generic centring: the seeded layout reserves max-size galaxy footprints (R=210k) inside a roughly square region (2A x 1.5A), then fits it by HEIGHT. On a wide screen the cluster spans about 25-35% of width (screenshot 2: about 430 of 1827 px). Galaxies are drawn at R about 120k (progress 0) while 210k is reserved.
8. Flat world: one static star layer (120 specks, screen space, no parallax), a faint gradient, no vignette; all galaxies same brightness; no depth cue.
9. Type has no scale: labels at 22 / 12 / 13 / 14 / 15 / 17 / 20 / 64 px with no ratio; hierarchy by size only, no tracking, no weight steps, galaxy names the same weight as everything.
10. Motion and states uniform: all transitions .16-.3 s, same easing, 2 px press on every key, camera easeInOutCubic 600 ms identical for every distance; focus ring and hover differ by control; hover shown on touch-size targets.
11. (extra) Header band is a separate solid slab above the scene, so the app reads as a website with a game inside, not a world.

## 2. PHASE 1: safe polish (CSS and constants only, no behaviour change, about 2 h)
Implement as ONE appended block at the end of tokens.css, labelled `/* premium pass P1 */`, so it reverts by deleting the block. Do not edit older rules. Use `@media (pointer:fine)` and `@media (pointer:coarse)`, NOT width, for control sizes. Width queries stay only for layout (wrap, hide crumb).

### 2.1 Scales (new tokens, add to :root of the block)
- Spacing (8-pt, half step 4): 4, 8, 16, 24, 32, 48, 64. Already --s1..--s5; add --s0:4px. No other gaps in chrome.
- Type scale (Inter UI unless noted; Caladea for wordmark, headings, big numerals): 11 caption (mono or Inter 500, tracking .08em), 12 label, 13 control (fine), 15 body and control (coarse), 17 subhead, 22 title (Caladea), 32 display (Caladea), 40 hero numeral. Weights only 400, 500, 600. Line-height 1.2 for 22+, 1.5 body.
- Radius unchanged 8/12/20; capsule radius = height/2.
- Hairline: 1px solid var(--line); on DPR >=2 allow .5px via `@media (min-resolution:2dppx)`. Edges of controls use --line, not --edge, for utility controls.

### 2.2 Header (#bar)
| Item | Before (CSS px) | After fine | After coarse |
|---|---|---|---|
| Bar height | 96 (wrap min 96 at 700-1279) | 56 | 56 (phone <700: 52 + safe-area-inset-top) |
| Bar padding x | 16 | 24 | 16 |
| Bottom border | none/hairline mix | 1px --line, full width | same |
| Wordmark | 64 | 30 (range 28-32); sparkle scales in em | 22 |
| Nav capsule height | 44 | 32 (thumb 26) | 44 (thumb 38) |
| Nav text | 13/500 | 13/500, active 600 | 15/500 |
| Nav item padding x | 14 | 16 | 16 |
| Utility capsules (Galaxy/Tabs, Light/Dark, RO/EN) | 44 | 28 (thumb 22) | 44 |
| Utility text | 13 | 12/500, active 600 | 14 |
| Link (#plink) | 44 raised | 28, ghost (transparent, 1px --line, dot kept) | 44 |
| Gap between utility groups | 12 | 8 | 8 |
- Layout: CSS grid `1fr auto 1fr` so the nav is truly centred on the window: left = wordmark (+ Back and crumb on lesson levels), centre = nav, right = Link, Galaxy/Tabs, Light/Dark, RO/EN with 8 px gaps and a 1px x 16px --line separator between Link and the toggles. Order is unchanged.
- Hierarchy: only the NAV keeps the raised sliding thumb (existing --raise-bg, edge --tan). Utility groups get a FLAT thumb: background color-mix(in srgb,var(--ink) 8%,transparent), no shadow, no tan edge, well = transparent with 1px --line. Result: one primary control, rest quiet.
- Optical alignment: wordmark baseline aligned with nav text baseline (translateY of 1-2 px on .word, measure on screenshot); sparkle stays tan. Wordmark letter-spacing -0.01em.
- Hit slop: fine-pointer capsules stay 28-32 visually; add `::after{inset:-6px 0}` so the vertical hit zone is 40 px. Fine-pointer tap on touch laptops still works.
- Hover (only `(hover:hover) and (pointer:fine)`): text colour muted to ink, 120 ms; flat thumb to 12%. No travel, no brightness filter.
- Pressed: scale .97 on the label, 90 ms ease-out down, 160 ms up; the raised-key translateY(2px) remains only for primary buttons (Continue, check) and the nav thumb.
- Widths 700-1279: the wrap rule (L586, min-height 96) must NOT trigger at fine pointer with the new sizes. Check budget: at 1024 the bar must fit one row: wordmark 120 + nav ~330 + utilities ~330 + paddings 48 = about 830 under 1024. Below 900 hide crumb (as now); below 760 allow wrap to two rows (nav drops under, 40 px row).
- Phone 390: unchanged structure (bottom tabbar), only sizes: wordmark 22, groups 44 coarse.

### 2.3 Galaxy controls (Back / minus / plus, #ctl)
| Item | Before | After fine | After coarse |
|---|---|---|---|
| Key size | Back 44x96 wide, minus/plus 44x44 raised | 32x32 icons; Back 32 high, chevron icon + "Back" text 12/500 (text kept, since it is a label for a11y and parity) | 44x44 |
| Style | raised key, always full | ghost: transparent, 1px --line at 60% opacity, radius 16; icon ink at 55% | same with 44 |
| Idle opacity | 1 | .55 for the group; 1 on hover or focus-within or while camera moves | 1 |
| Position | right/bottom 32 | right 24, bottom 24 (plus env(safe-area-inset-*)), gap 8 | 16, safe-area |
| Hover | brightness 1.03 | bg 8% ink, border --line full, 120 ms | none |
| Press | translateY 2 | scale .94, 90 ms | scale .94 |
| Icons | text minus / plus | 1.5px stroke SVG or the existing glyphs at 16 px, optical centring (check that minus sits on the centre line) | 20 px |
- Back keeps its role (#cback) and the disabled state at .35.
- Hint text (#hint): 13/400 muted, bottom 72 (was 20 px at bottom 40).

### 2.4 Focus, hover, press, states (all controls)
- Focus: `:focus-visible` only, 2px solid var(--tan), outline-offset 2px, radius follows control; never removed. Same on every control (no per-control variants).
- Disabled .35 opacity, no hover. Active (selected) always shown by weight 600 plus thumb, not colour alone.
- Hover only with a real mouse; press feedback on pointer down for all.
- Transition tokens: --ease: cubic-bezier(.2,.8,.2,1); --dur-1:120ms (colour/opacity), --dur-2:200ms (thumb slide, 280 for the nav thumb), --dur-3:320ms (panels). No bounce, damping 1.0. Reduced motion: all durations 0, thumb jumps.
- Anything >350 ms in chrome is a bug except the camera.

### 2.5 Before/after check numbers at 1273 CSS (1909 px at 150%)
Header 96 -> 56 CSS (145 -> 84 px in the screenshot); wordmark 64 -> 30 (96 -> 45 px); nav capsule 44 -> 32 (66 -> 48 px); utility capsule 44 -> 28 (66 -> 42 px); Back/minus/plus 44 -> 32 (66 -> 48 px).

## 3. PHASE 2: immersive world (constants in galaxy.js, shell.js place(), camera.js; small code)
### 3.1 Spread and framing (home level)
- Cause: place() works in world units with a roughly square area, G.home() then fits it to H. Fix 1 (aspect stretch): after place(), stretch x only by kx = clamp((0.74*W) / (bboxW*z0), 1, 2.4) where bboxW,z0 come from the first fit pass. Stretching x never makes footprints overlap. Store base x as s.x0, set s.x = s.x0*kx on resize, keep the seed untouched, so the layout stays organic and per-device.
- Fix 2 (honest footprint): fit with R = 170*k instead of 210*k (drawn size at progress 0 is about 120k, full 210k). Overflow at full growth is absorbed by margins; no overlap because placement still uses 210.
- Fix 3 (margins): mx = max(48, 0.06*W), my = max(56, 0.08*H); label room 62/z stays.
- Target: galaxy bounding box covers 70-80% of canvas width and 65-75% of height; no galaxy centre within 12% of any edge; the centre 30% of the canvas is not the only occupied area. Minimum on-screen galaxy diameter at home 0.14*min(W,H) (about 126 px at 900 px high; now about 120 px at 428 px high i.e. similar scale in a bigger viewport). Test with seeds 7, 21, 99 and 3, 4, 5 subjects (BAC subject coming: 5 galaxies must still work).
- Phone (<700, coarse): no change; galaxy decorative only.

### 3.2 Depth
- Per-galaxy depth d from the same seeded stream (after existing draws, so layout does not change): d in {0.82, 1.0, 1.18} assigned by y rank (upper = farther). Brightness alpha x(0.75 + 0.25*d), dust speck size x d, label size x(0.92 + 0.08*d). Core glow radius x d. No change to hit areas beyond G.rad.
- Star field: 3 layers in screen space, count = area/9000 split 55/30/15 percent. Size 0.8 / 1.1 / 1.6 px, alpha .12-.35 / .15-.45 / .2-.55. Parallax by camera: layer offset = -(cam.x, cam.y)*z*f with f = 0.02 / 0.05 / 0.10 (back to front), wrapped modulo W/H. Drift: 0.4 / 0.8 / 1.6 px/s horizontal. No twinkle. Reduced motion or hidden tab: no drift and no parallax (static). Max 150 stars total at 1440x900.
- Nebula: 2 radial gradients on #stage (CSS, no canvas cost): tan rgba(217,195,160,.07) at 30% 20%, size 55%; steel rgba(127,176,192,.05) at 80% 75%, size 45%. No orange, no violet. Light theme: tan .10, steel .06 using existing tokens through color-mix.
- Vignette: #stage::after radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,.38) 100%) dark; rgba(43,32,24,.10) light; pointer-events none; under the controls.
- Slow drift of dust rotation already one turn per 240 s: keep. Planets and labels stay still (taste).
- Header over the world (optional, ask Eduard): at fine pointers the #stage extends under a 56 px transparent header with a bottom hairline and chrome-only backdrop blur 12 px in Glass mode only; Matte header stays solid --bg. Default: keep solid.

### 3.3 Labels and hover
- Galaxy label: name Inter 12/600, uppercase, letter-spacing .16em (ctx.letterSpacing where supported, else 0), colour ink; lesson count below: Inter 11/500 muted, tabular numerals "0 / 5", 8 px under name. Offsets: name at s.y + R*.6 + 28, count + 18 more (screen px). Caladea stays for the wordmark and lesson titles. Romanian diacritics uppercase checked (Ș Ț Ă Â Î).
- Hover (fine pointer, home level): hovered galaxy core glow x1.15, dust alpha +.15, label colour to full ink, others dim to .7; animated value lerped over 200 ms ease; cursor pointer (exists). No hover on coarse.
- Selected galaxy at galaxy level: unchanged.

### 3.4 Camera
- Replace easeInOutCubic 600 ms with ease-out (1-(1-p)^4, near critical damping, no overshoot). Duration = clamp(420, 520 + 140*|ln(zTarget/zFrom)|, 900) ms. Interruptible: new target starts from the current on-screen value (already so). Reduced motion: 260 ms fade (exists).
- Wheel step stays 150 ms debounce / 800 ms lock; nothing else changes. Zoom toward cursor is already in focus() logic; no change.
- Do not animate on every resize; single re-frame on resize debounced 120 ms.

## 4. Acceptance checklist (Designer review, per screenshot)
1. Header 56 px at fine pointers, 1 row from 900 px up; wordmark 28-32; capsules 28-32; text 12-13; hairline bottom.
2. Nav is the only raised control; utilities flat. Hierarchy visible in a squint test (blur the image: wordmark, nav, then utilities).
3. Back/minus/plus 32 px at .55 idle, bottom-right inset 24; 44 on touch (pointer:coarse) via devtools emulation.
4. Spacing only from 4/8/16/24/32/48; type only from the scale; no new hex in the block.
5. Focus ring visible on every control by Tab, both themes; contrast text 4.5, edges 3.
6. Home: galaxies span 70-80% width; none within 12% of an edge; labels not clipped or overlapping at 1024; still seeded and stable across reload.
7. Depth: three star layers parallax on zoom; vignette visible but not heavy; no orange or violet appears (Lumens/Moon rule); no banding in gradient.
8. Motion: all chrome transitions 120-320 ms, no bounce; camera 420-900 ms ease-out; reduced motion fades; hidden tab pauses; 60 fps at 1440x900 (Chrome performance, no frame over 20 ms during zoom).
9. Parity: Tester v1-vs-v2 check: every control present, Galaxy/Tabs, Light/Dark and RO/EN persist, Back works, zoom works, state not reset by theme change.
10. Light theme: no black core, labels AA, vignette light variant, nebula warm.
Screenshot plan: Dark and Light x 1909, 1440, 1024, 390 (each at DPR 1; plus 1909 at DPR 1.5 to reproduce Eduard's view) x views Home, Subjects/Galaxy (home level), Galaxy inside one subject, header crop at 2x. Name `design/shots/premium-{before|after}-{w}-{dark|light}-{view}.png`. Before set taken now from origin/v2 head (commit a29ee12) so the comparison is honest. Tester produces, Designer signs APPROVE or REJECT with the exact deviation.

## 5. Staging (freeze Fri 27 Nov 20:00; every push to v2 deploys publicly)
Rule: nothing ships unless Tester has run the 4-width x 2-theme screenshot pass the same day, and the revert is one commit.
- Ship BEFORE freeze only if Tester passes by Fri 15:00, else wait: (a) #ctl Back/minus/plus ghost 32 px with pointer:fine/coarse (self-contained, no wrap risk); (b) wordmark 64 -> 30 and bar 96 -> 56 at pointer:fine; (c) focus ring unification (additive); (d) type/spacing tokens added but not yet consumed.
- Risky, wait for Sat 28 Nov to Thu 3 Dec: nav grid centring and utility flat style (wrap and 700-1279 layout), Link/capsule resize at widths 700-1279, hover/press changes, all of Phase 2 (stretch layout, depth, stars, labels, camera ease). Order: P1 header, P1 controls polish, P2 framing (biggest visible win), P2 depth/stars/vignette, P2 labels/hover, P2 camera. Freeze again before Grand Final Sat 5 Dec; last Phase 2 merge by Thu 3 Dec, nothing after.
- If the stage II upload needs a screenshot of the app, take it before any push on Friday.

## 6. Phone app carry-over
Same tokens, scales and rules: 8-pt grid, type scale 11-40, hairlines, one primary control per screen, quiet ghost utilities. `pointer:coarse` values become the phone defaults: targets 44, text 15, bar 52 + safe-area-inset-top, bottom tabbar 56 + safe-area-inset-bottom, controls inset 16 plus safe area, thumb zone for the primary action. Chrome blur only in Glass; Reduce Motion and Reduce Transparency respected. Springs map to the same --ease and 200-350 ms durations (critical damping, no overshoot for chrome; overshoot only for physics objects). Galaxy stays decorative behind the title (taste); star layers and vignette are reusable as the phone background at 1 layer to save battery. No hover states.

## 7. Open questions for Eduard (via Manager)
1. Is the laptop at Windows 150% scale (screenshot 1909 px = about 1273 CSS)? We test both DPR 1 and 1.5 anyway.
2. Header over the world (transparent, Glass blur only) or keep the solid slab? Default solid.
3. Galaxy names in small caps Inter (proposed) or keep Caladea 22? Default small caps.
4. May the home framing fit at 170k instead of max size (galaxies fill more screen, slight margin overflow only at full growth)? Default yes.
5. Ship the safe items (a to c in section 5) before Friday 20:00 or wait until Saturday? Designer default: wait unless Tester is free Friday before 15:00.
