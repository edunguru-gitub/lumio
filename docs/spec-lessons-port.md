# Spec: port v1 lessons to v2 lazy modules

Source: app/lumio.html (line numbers from branch v2, 6 Nov; re-grep before editing).
Pattern: copy v2/modules/physics/optics.js. One IIFE, registers
`window.LumioModules['<galaxy>/<id>']={render(el,ctx)}`, loaded by v2/js/loader.js
from `modules/<key>.js`. Use ctx.color, ctx.n(), ctx.done. No globals from v1 (S, $, store).
Port the logic as-is (patch, not rewrite); strip DOM ids, keep maths/state.

## Lessons
1. math/parabola (v1 page-learn, line 1149). Galaxy Math, sage #9DBF9E.
   Interaction: sliders a, b, c redraw the parabola; presets; quiz "match the graph".
   Logic: LESSON text 1725; drawParab 1840 (canvas, scale min(w/20,h/13)); renderLearnUI 1438; renderQ 1498; Q/poly nearby.
   Visual: sage curve and success, rose only for a miss; mono for a, b, c values; grid #2E2A24.
2. math/algebra (same page-learn, split off). Galaxy Math, sage.
   Interaction: solve-for-x steps / equation quiz. Logic: LESSONS 1516 + Q generator 1498. Split only if the code separates cleanly; else ship inside parabola and list as TODO.
   Visual: one equation as the focal point, Caladea numerals.
3. math/pythagoras (page-geometry, 1171). Galaxy Math, sage.
   Interaction: drag legs a, b; hypotenuse c updates; triples highlighted (3-4-5, 5-12-13).
   Logic: GEO 1851, renderGeo 1852, updGeo 1854, drawGeo 1861.
   Visual: squares on sides in sage tints, triple badge outline not fill; mono values.
4. physics/gas (page-physics, 1192). Galaxy Physics, steel #7FB0C0.
   Interaction: temperature, volume, count sliders; particles hit walls; pressure needle; presets cool/heat/squeeze/release.
   Logic: PH 1875 (P = N/30 * T/V), renderPhys 1880, updPhys 1882, drawPhys 1887.
   Visual: particles use LumioPhysics (fixed step, restitution), piston spring damped; steel base, no glow. Heat preset must NOT use orange (Lumens only): use tan.
5. spanish/verbs (page-spanish, 1213). Galaxy Spanish, rose #C98B8B.
   Interaction: pick verb, see conjugation, place endings, trace letters (SP.mode see/place/trace).
   Logic: VERBS 1576, SP 1578, renderSpanish 1580, spInk/traceMask. Strip emoji from VERBS[4] (taste: no emojis).
   Visual: rose accent, sage = correct, rose = miss; Inter UI, Caladea for the verb.
6. spanish/vocab (page-vocab, 1227). Galaxy Spanish, rose.
   Interaction: flashcards then 4-option quiz; TTS reads the Spanish word.
   Logic: VOC 1981, VS 1982, renderVocab 1983, vNext 1991, vTr (RO/EN). TTS stays a shell service via ctx.
   Visual: one card focal point, sparkle score (1 to 3), not stars; ro diacritics tested.

## Rules for every module
- Tokens only: bg #171513, card #211E1A, ink #EDE3D0, radii 8/12/20. Lumens/Moon colours only for Lumens/Moon.
- Continue button: 1px outline in subject colour, radius 12, height 60, transparent. No tan fill.
- Motion: ease-out 0.25 to 0.4 s, no bounce on chrome, transform/opacity only, honour Reduce motion.
- Canvas: DPR-aware, pause when hidden, 20px blur max. Every state designed: empty, locked, wrong, done.
- Scoring/XP goes through ctx.done and a ctx hook, not v1 store. Tester verifies each module separately.
- Order: pythagoras (smallest), parabola, gas, vocab, verbs, algebra.

## 5 shell polish items (to match design/video/lumio-update-video.mp4)
1. Zoom: 0.8 s ease toward the cursor, one level per gesture; the touched planet grows into the lesson (continuity), interruptible mid-way.
2. Galaxy dust: very slow rotation (about 2 min/turn), planets and labels still; pauses when hidden or in a lesson.
3. Planet states: locked, current, done with sparkle row (1 to 3, tan earned / outline empty); galaxy grows as progress rises.
4. Chrome: persistent Back, Esc/Backspace, one-time hint "Click: go in. Right click: go out"; Matte default, Glass chrome only, Tabs fallback.
5. Preload next module at half zoom with a calm skeleton; fade (not slide) on Reduce motion; Caladea heading settles in with opacity only.
Note: video not frame-checked by me; Manager should confirm against it.
