# Spec: tactile motion and feedback (Designer, 26 Nov). Docs only, no code. David builds after Sat 28 Nov 14:00; Tester verifies; Designer reviews.
Ask (Eduard, 17): "make the app feel TACTILE, like Apple, if it makes sense". Design read: high school students, quiet luxury, dials: motion low to medium (raised from low only for press, slide and camera), variance low, density low.
Builds on: spec-tactile-light (raised / inset / press tokens, already in tokens.css L302-343), spec-premium-pass (Phase 2 motion), spec-port-wave3 (Settings). Sources read: tokens.css, sfx.js (tone(), tick, pop), camera.js (K.go easeInOutCubic 600 ms, wheel = one level), settings.js (sfx, vol; no haptics yet).
Sources NOT used: no Apple code or text copied; principles are generic (direct manipulation, feedback, continuity).

## 0. Conflict to settle first (Manager asks Eduard)
Taste file (stated): "UI motion eased, no bounce"; "UI chrome never bounces"; UI springs damping 1.0. Eduard now says "springs like Apple". Resolution proposed: Apple's UI springs are mostly critically damped (no visible overshoot) with a fast start and soft landing. So: chrome uses spring-LIKE curves with ZERO overshoot (feels alive, obeys taste). Overshoot (max 4 percent) is allowed ONLY on the sliding thumb and toggle knob, and only if Eduard says yes (question Q1). Physics objects keep real springs (unchanged rule).

## 1 What "Apple tactile" means in a web app
Does make sense (do):
1. Direct manipulation: the thing under the finger moves 1:1 (drag, slider thumb, camera pan), no delay, then releases with its velocity.
2. Immediate feedback: visible change within 100 ms of touch-down (not touch-up). Target 1 frame (16 ms) for the state change, 80-120 ms for the animation.
3. Springs with damping, not linear or ease-in-out: fast start, long soft tail (see tokens). Same curve family everywhere.
4. Depth change on press: raised becomes inset (existing --raise to --press), lift on hover for cards.
5. Momentum and rubber band: camera and scroll lists keep velocity after release and decelerate; at an edge they resist (about 30 percent of the pull) and return. In the browser: native scroll already does both on iOS Safari and Android; do not re-implement page scroll. Custom only for the galaxy camera and drag items.
6. One timing language: 3 durations, 3 curves, used by every control. Inconsistency feels cheap, more than a missing effect.
7. Haptics and sound as optional layers on top of motion, never the only signal.
Does NOT make sense (do not do):
- Faking native: no fake iOS bounce on the whole page, no fake blur-sheet, no fake system haptic sounds, no "taptic" claims in the UI or pitch.
- Vibration on iPhone: iOS Safari has no Vibration API (navigator.vibrate is undefined). Honest matrix:
| Platform | Haptics | What we do |
|---|---|---|
| Android Chrome / Edge / Samsung | navigator.vibrate(ms), works after a user gesture | real ticks, 8-12 ms |
| iPhone / iPad Safari and all iOS browsers | none via API | motion + sound only. An undocumented Safari 17.4+ trick (label on an input type=checkbox switch) can buzz; NOT verified on our devices, may break any release, so: not in v1 of the module, test later on a real iPhone, behind a flag, never promised |
| Laptop / desktop | none (some trackpads click by themselves) | motion + sound |
| Reduce motion on | no haptics for decoration; keep haptics for confirm only (slider detent, correct answer) | |
- Heavy 3D tilt, parallax over 4 px, glow pulses, bounce on every tap, anything that moves things users see all day (taste: "very frequent elements are not animated").
- Claim to jury: "tactile feel", not "Apple feel". We say what works where; this is also the honest-limits line (Ethos).

## 2 Motion and feedback tokens (add as one block at the end of tokens.css, labelled /* tactile motion */, reverts by deleting)
Durations: --d1 120 ms (press release, hover, tick), --d2 200 ms (segment slide, toggle, tooltip, toast out), --d3 320 ms (shared-element zoom, sheet, toast in). Down-press 80 ms. Exits 20 percent faster than entries (taste).
Curves (all zero overshoot; names in words, David fixes the exact numbers on device):
- --ease-out: cubic-bezier(.2,.8,.2,1) = soft landing, default for user actions (about spring damping 1.0, fast start).
- --ease-spring: cubic-bezier(.3,1.0,.3,1) = slightly longer tail, for thumbs and knobs (and, only if Q1 yes, 1.04 overshoot variant cubic-bezier(.3,1.3,.4,1)).
- --ease-in: cubic-bezier(.4,0,1,1) = exits only.
JS spring only where CSS cannot (needs velocity or interruption): galaxy camera inertia, drag release, counter roll. One small helper (stiffness 300, damping ratio 1.0, mass 1, fixed 1/120 s step) shared by those three; no library.
Press feedback per control (all begin on pointerdown, never on click):
| Control | Rest | Pressed (80 ms ease-out) | Release (120-200 ms ease-spring) |
|---|---|---|---|
| Capsule segment (nav, Galaxy/List, Light/Dark, RO/EN) | flat | label scale .97 + well inset shadow deepens (--press) | back; thumb slides to the new segment in 200 ms ease-spring |
| Primary button (Continue, Check, Launch) | raised | translateY 2 px (Launch 5) + --press, scale .98 | back in 160 ms; outline-in-subject-colour stays (taste) |
| Card (Home cards, lesson rows) | hairline | hover (mouse only): lift 2 px + shadow soft, 120 ms. Press: back to 0 + scale .985 | opens on release, not on press |
| Chip / small key | raised | translateY 2 px, --press | 120 ms |
| Slider and knob thumb | 24 px | thumb grows to 28 px (scale 1.15), track inset deepens; value label above | tick at each detent (sound -26 dB, vibrate 8 ms on Android); on release thumb snaps to nearest notch in 120 ms |
| Tab segment indicator | thumb under active | none on the thumb; label press .97 | thumb translateX to the new segment 200 ms ease-spring, thumb width follows if segments differ, interruptible (starts from current position) |
| Toggle switch | knob left/right | knob widens 24 to 28 px while held | knob travels 28 px in 160 ms ease-spring; state text On / Off changes with it; position + text, not colour alone |
| Icon key (zoom + / -, Back) | ghost | scale .94 | 120 ms |
Hover (only (hover:hover) and (pointer:fine)): text muted to ink 120 ms, flat thumb 8 to 12 percent, card lift 2 px. No hover on touch.
Focus (all, keyboard): 2 px accent ring + 2 px offset, appears instantly (0 ms), never animated, never removed (existing :focus-visible).
Disabled: opacity .35 (existing), no press, no hover, cursor default, aria-disabled; a disabled control gives NO sound and NO haptic.
Sound (extends sfx.js, same tone() oscillator style, no samples, all via existing Settings Sounds + volume):
- segmented control "pressed": sine 900 to 700 Hz, 30 ms, gain .06 (about -24 dB before the master volume V). One sound for all segmented controls.
- toggle: softer, sine 600 Hz, 40 ms, gain .035 (about -29 dB), a second 800 Hz at 30 ms on ON, 500 Hz on OFF (pitch, not just volume, tells On from Off).
- slider tick: existing F.tick (1600 Hz, 30 ms, .05). Primary press: existing F.pop is too loud for chrome; use the segment sound at gain .05.
- Rule: at most one UI sound per 60 ms (debounce); none on hover; none for Reduce motion? Sound is not motion: Reduce motion does NOT mute sound, Settings does. Reward sounds (ok, streak) unchanged.
Haptics (new, Settings):
- Settings > Audio and voice gets "Haptics" toggle next to "Sound effects" (new string, EN + RO: "Haptics" / "Vibrații"). Default ON where supported (feature test: typeof navigator.vibrate === 'function'); where not supported the row is shown disabled with muted line "Not available on this device" / "Indisponibil pe acest dispozitiv" (honest, no hiding). Stored as haptics:true in lumio2_settings (v:1, new optional key, old saves load fine, parity safe).
- Patterns (ms): tick 8, confirm 12, correct 15, wrong 10-30-10, never over 40 ms total for UI. Fire only from a user gesture; none while the tab is hidden; one per 60 ms.
- Module v2/js/haptics.js registered as a feature (LumioFeatures.haptics), skipped if the file is absent, exposes L.fx.haptic(name); callers use L.fx.haptic && L.fx.haptic('tick'), so removing the file changes nothing.
Reduce motion (prefers-reduced-motion and the future Settings override): see section 4.

## 3 Per screen
1. Home: CTA "Continue learning" = primary button row above (press 2 px, outline subject colour). Home cards: hover lift 2 px (mouse), press .985, open on release; stagger NOT used (no entrance parade). Lumens counter: roll-up digits (translateY of a digit column, 320 ms ease-out, only when value rises, mono font, max 600 ms for large jumps; no roll on first load). Hearts: shake 3 cycles 4 px, 360 ms, plus text/icon change (not motion alone).
2. Segmented controls (nav, Galaxy/List, Light/Dark, RO/EN): sliding thumb already exists in CSS (L343, 200 ms ease-out); change to --ease-spring, add pointerdown label .97 and well inset, add segment sound. Keyboard arrows move the thumb the same way. Thumb is interruptible (CSS transition from current transform).
3. Galaxy camera (code): keep one level per gesture (taste). Add: (a) K.go curve from easeInOutCubic 600 ms to a spring-like ease-out, duration scaled to distance, 400-700 ms, interruptible by a new click (start from the current cam); (b) drag-pan with 1:1 follow after 10 px, release carries velocity, decays with friction (inertia about 500 ms); (c) pinch only on touch laptops/tablets, NOT phone (phone galaxy is decorative, taste); (d) pointer parallax: star layer moves 2-4 px opposite to pointer, transform only, off on touch and Reduce motion; (e) hover glow on planet: opacity/brightness ramp 120 ms, mouse only (draw already has setHover); no glow pulse. Rubber band: when the camera would leave the world bounds, resist 30 percent and return in 300 ms.
4. Lesson sliders and knob: thumb grows on hold, ticks at detents (visual tick marks already specified in spec-tactile-light), sound tick, Android vibrate 8 ms per detent, value in mono above thumb. Keyboard arrows = one step with the same tick.
5. Drag of items (Spanish exercises, later): lift on pickup (scale 1.04, shadow --raise stronger, 120 ms), follow 1:1, drop target highlights with outline + text (not colour alone), release snaps with spring 200 ms, wrong drop returns with the same spring + hearts/shake text. Later, after wave 3.
6. Lesson transition: shared element. Planet tapped scales to fill the lesson container in 320 ms ease-out (transform + opacity only, FLIP technique: measure once, then animate transform), lesson content fades in during the last 160 ms; Back reverses (exit 20 percent faster, 256 ms). Interruptible: Back mid-way starts from the current value. Fallback and Reduce motion: cross-fade 200 ms (today: opacity .3 s in tokens.css L58).
7. Toasts and pops: enter translateY 8 px + opacity, 320 ms ease-spring (no overshoot); exit 200 ms ease-in; auto dismiss 3 s; pause on hover; role=status. Pops (Lumens +n): scale .9 to 1 + opacity, 200 ms.
8. Confetti (exists): unchanged; off with Reduce motion. Success keeps one reward sound.
9. Tabs/phone: bottom tabbar uses the same capsule thumb; touch targets 44, no hover; press feedback is label .97 + sound + vibrate tick (Android).

## 4 Performance and accessibility
Performance (hard rules):
- Animate only transform and opacity. Never animate width, height, top, left, box-shadow size, filter blur. For depth change on press, swap between two pre-defined shadows (instant at 80 ms) or put the shadow on a pseudo-element whose opacity changes.
- Budget: 60 fps on a mid laptop (4-core, integrated GPU) and a 2019 phone (for example Galaxy A50 / iPhone 8 class); no frame over 20 ms during a 200 ms interaction; no long task over 50 ms at press.
- No layout thrash: read (getBoundingClientRect) once, then write; no reads inside rAF loops after the write.
- will-change: transform only on the active thumb and during a camera move, removed after; never on more than 3 elements.
- Camera and drag run in one rAF loop with a fixed time step (taste: laptop and phone behave the same); pause when the tab is hidden (existing rule); no new timers per control.
- Sounds: reuse the single AudioContext (get() exists); no new context.
Accessibility:
- Reduce motion (OS setting and L.reduced()): all transform animation becomes a fade of at most 120 ms or an instant swap; no slide, lift, parallax, inertia, roll-up or shake; the thumb jumps; shared-element transition = cross-fade; press feedback keeps colour/inset only (no travel).
- No information carried by motion alone: every state change also changes text, icon or shape (On/Off text, OK/MISS prefix, notch value, active tab label weight).
- Haptics off = nothing lost. Sound off = nothing lost.
- Touch targets 44 coarse; focus ring always; contrast as in spec-tactile-light (text 4.5, edges 3).
- No flashes; no motion faster than 3 per second.

## 5 Staging (timeline and risk)
FREEZE RULE: nothing from this spec is pushed before the HSIC upload (Sat 28 Nov 14:00). No live push for this before then; demo stays v1 (jury lens). Target window Sat 28 Nov (after upload) to Thu 3 Dec. Frozen before the Grand Final on Sat 5 Dec (Fri 4 Dec = only fixes for a regression; nothing new).
Stage A, CSS only, low risk (about 3 h, one block, reverts by deleting): tokens (--d1..3, --ease-*), press states per table, segment thumb curve + label press, toggle knob widen, card hover lift (pointer:fine), disabled and focus audit, Reduce motion rules.
Stage B, small JS, low-medium (about 4 h): sound.js additions in sfx.js (F.seg, F.toggle, debounce), Settings Haptics row + haptics.js (feature, skipped if absent), slider tick wiring, Lumens roll-up, toast spring, hearts shake text.
Stage C, JS, medium-high (about 6-8 h, own review): camera curve + interruptible + inertia + rubber band + parallax; shared-element zoom (FLIP) for planet to lesson; fallback cross-fade.
Later (after Grand Final): drag items for Spanish, pinch on touch laptops, iPhone haptic trick test on a real device, optional overshoot (Q1).
Decision gates: A may ship alone on Sat 28 Nov evening or Sun 29 Nov; C only if A and B are green by Tue 1 Dec, else cut C (the app still feels better with A and B).

## 6 Acceptance checklist (Tester) and parity
Parity guarantee: no feature, string, setting, route or state is removed or changed. New: Haptics setting (optional key), tokens, motion. Delete the tactile block and haptics.js and v2 behaves exactly as today. Tester runs the v1-vs-v2 parity table plus tools/test-lesson-stay.py unchanged, zero console errors, storage blocked works, RO + EN, Light + Dark, 1273 and 390.
Measurements (how):
1. Press latency: Chrome DevTools Performance, record, click each control type once (capsule, primary, card, chip, slider, toggle); from pointerdown event to the first frame where the style changes: pass at 100 ms or less (target 1-2 frames). Slow-motion CPU throttle 4x must still be 100 ms or less.
2. Frame rate: Performance panel, record camera zoom, drag-pan, segment slide, lesson transition on laptop; then Android phone via remote debugging (or Lighthouse mobile 4x throttle); pass: 55 fps median and no frame over 20 ms; the flame chart shows Composite only, zero Layout and zero Paint of big areas during animation; Rendering > Paint flashing shows only the moved element.
3. Reduced motion: DevTools Rendering > Emulate prefers-reduced-motion: reduce; check every item in section 3: nothing slides, lifts, rolls, shakes or inertia-scrolls; thumb jumps; transitions are fades up to 120 ms; confetti off; the app is fully usable.
4. Haptics: Android Chrome real device, Haptics ON: tick at each slider detent, none when OFF, none when sound/haptic toggled off, none while a disabled control is pressed; iPhone: row shown disabled with the muted line, no error, no claim; desktop same as iPhone. navigator.vibrate stubbed to a counter for the desktop test.
5. Sound: segment sound about -24 dB and toggle about -29 dB relative to F.pop, none when Sounds is off, none on hover, max one per 60 ms.
6. Interruptibility: click Back mid-transition, click a second segment mid-slide, release a slider mid-snap: no jump, no stuck state.
7. Consistency: grep tokens.css that every transition uses --d1..3 and --ease-*; no new hard-coded durations in the block.
8. Keyboard only: arrows on segments and slider give the same tick; focus ring visible on every control.
9. Memory/battery: 5 min idle on Home = CPU near 0 (no running loop when nothing moves).
Designer review after build: taste check (no bounce on chrome, one main moving element per screen, no new colours, orange only Lumens, violet only Moon), screenshots of pressed states in Light and Dark.

## Questions for Eduard (via Manager)
Q1. May the sliding thumb and toggle knob overshoot by 4 percent (more Apple, but taste says no bounce)? Designer default: NO, zero overshoot everywhere.
Q2. Camera: keep one level per gesture (taste) while adding inertia only to pan after drag? Designer default: yes.
Q3. Test the iPhone Safari haptic trick on a real phone after 5 Dec, or never? Designer default: after 5 Dec, flagged, never promised.
