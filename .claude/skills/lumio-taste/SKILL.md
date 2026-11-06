---
name: "lumio-taste"
description: "Applies the user's recorded Lumio design, copy and pitch-writing preferences. Use for any Lumio design, copy, pitch or format decision, and to log new preferences."
---

# Lumio taste

Apply silently. On a new preference: confirm in one line, then propose an updated copy of this file as a card (the user saves each update).

## Log format
`- [tag] area: preference`. Tags: [stated] user said it (highest authority), [proposed] Claude suggested, ask before treating as rule, [rejected] never suggest again. One line, under 20 words, keep the user's scope, newest line wins on conflict, no personal data.

## Design process (idea from UI UX Pro Max + taste-skill, adapted)
Before any Lumio design work:
1. One-line design read: screen kind, audience (high school students), vibe (quiet luxury), direction.
2. Set 3 dials from the brief: variance (layout boldness), motion (low), density (low to medium). Lumio default: variance medium, motion low, density low.
3. Use the Lumio design system below. Do not invent new colours, fonts or styles.
4. Run the AI-slop check below. Fix before showing.
5. Label what is inspiration vs what is in the app.

Anti-patterns (never): purple or pink gradients, neon, centered hero over dark mesh, three equal feature cards, glassmorphism everywhere, endless micro-animations, emojis, orange except Lumens, purple except Moon, colour as the only state signal.

## AI-slop check (own list, idea from a saved reel "AI slop vs senior designer"; the reel itself was not watched)
Slop signs: default gradients and glows, everything centered, one radius and one shadow on everything, placeholder or stock-looking content, vague headings, emoji bullets, uneven spacing, many accent colours, text over busy images.
Senior signs: a grid and one spacing scale, one focal point per screen, one accent per screen, real content and real numbers, every state designed (empty, loading, error, locked), visible focus and enough contrast.
Before showing a design, answer yes or no to each senior sign. Fix every no.

## Design system (current, 5 Nov)
- [stated] Base: Quiet luxury + Swiss grid + Aurora. Neumorphism only as control depth. Matte look is the default.
- [stated] Two separate looks, chosen in Settings: Matte (default) and Glass. Glass is its own mode, not mixed into Matte.
- [proposed] Glass mode (Apple's newer Liquid Glass feel): only on chrome (nav pill, bottom tab, floating Back and zoom). Dark tint rgba(33,30,26,.5), blur 12px, 1px light border, thin inner highlight. Active item tan at 16%. Never on cards, text or the Continue button. Reduce transparency makes it solid.
- [stated] Apple principles, calm, clean, professional. No emojis (except the agreement signal).
- [stated] Lumens orange only for Lumens (small, low-key). Moon purple only for Moon.
- [stated] Subject colours: Physics steel #7FB0C0, Math sage #9DBF9E, Spanish rose #C98B8B, Life skills tan. Same font, only colour differs. Sage = success, rose = miss.
- [stated] Primary button (Continue Optics): outline in the subject colour, 1px border, transparent, radius 12, text and arrow in that colour, height 60. No tan fill, no bottom lip. Eduard disliked the tan solid button.
- [proposed] Primary button optional refinement: faint subject-colour tint (10%) inside the outline; ivory text for contrast over the galaxy.
- [stated] Rating symbol: the Lumio sparkle, not stars. 1 to 3 per level. Earned = tan accent, empty = outline. Subject colour on sparkles is open (steel for Physics).
- [stated] Home text: only "Continue learning". No slogans in the app.
- [stated] Fonts: Caladea for headings, wordmark and big numerals; Inter for UI and small text. Test Romanian diacritics.
- [stated] Laptop: subjects as galaxies, lessons as planets, galaxy grows with progress, connected like Google Maps. Toggle Galaxy | Tabs. Weak laptops are not a priority: they use Tabs.
- [stated] Laptop navigation as easy as scrolling: left click goes in, right click goes out, mouse wheel also (forward in, back out). No pinch.
- [proposed] Navigation details: one level per gesture (all galaxies, galaxy, planet), smooth zoom about 0.8 s toward the cursor, never free zoom. Back button always visible, plus Esc, Backspace, Tab and Enter. Right click is captured only inside the galaxy area. One-time hint: "Click: go in. Right click: go out". Reduce motion: fade.
- [stated] Phone: Tabs only (planet mode did not work on a small screen). The galaxy is decorative behind the title, not touchable.
- [stated] Galaxy dust rotates very slowly (about one turn per 2 minutes); planets and labels stay still so taps never move. Plain CSS or canvas, not a GIF. Pauses when the tab is hidden, in a lesson or on battery saver; off with Reduce motion.
- [proposed] Structure: permanent shell (galaxies, camera, zoom) plus one module per lesson, loaded on approach and preloaded at half zoom. Same file or separate files: undecided with David.
- [stated] Missions have levels with sparkles, grouped in Lumi (worlds) unlocked by sparkles. Needs Darius's OK.
- [stated] Haptics optional in Settings; Android API, iPhone Safari hack; sound and animation always fallback.
- [stated] Buttons quiet: Continue and Back not heavy, especially on phone.
- [rejected] Neo-Brutalism, Cyberpunk, Synthwave, Y2K, Pixel Art, Maximalism, ad-style 10-second hooks, tan solid Continue button, planet mode on phone.
- Tokens: bg #171513, card #211E1A, line #2E2A24, ink #EDE3D0, muted #A89F8E, tan #D9C3A0, Lumens #FF6A13, Moon #A78BFA. Radii 8/12/20. Mono for values.

## Motion (under Lumio design)
Rules written in our own words, drawn from Apple HIG motion ideas and web animation practice.
- [stated] UI motion eased, no bounce, no glow. Neutral UI sounds; reward sound only for correct answers.
- [stated] Physics objects (piston, ball, particles) use real spring physics: spring constant, damping and restitution tied to the lesson. UI chrome never bounces.
- [proposed] Continuity: the touched element is the one that grows (planet becomes lesson). One main moving element per screen.
- [proposed] Interruptible: any animation can be stopped or reversed mid-way, starting from the current on-screen value.
- [proposed] Durations 0.25 to 0.4 s, ease-out for user actions; exits about 20% faster; UI springs use damping 1.0 (no overshoot).
- [proposed] Gestures: feedback on touch-down, drag follows 1:1 after about 10 px, release velocity passes to the spring, slider snaps into its notch with one tick.
- [proposed] Performance: animate only transform and opacity; physics on fixed time steps so laptop and phone behave the same; blur 20px or less.
- [proposed] Hover effects only with a real mouse. Elements seen very often are not animated.
- [stated] Reduce motion: every animation becomes a fade; physics objects settle without oscillation.
- Sources checked 5 Nov: emilkowalski apple-design (licence unstated, do not copy text), segersniels web-animation-design. Skipped: NutshellEngineering apple-design-skill (native Apple, 0 stars), motion-physics (no content), Liquid Glass skills.

## Writing (pitch, scripts, captions, demos)
Voice: a 12th-grade student, group view ("we"), short sentences, plain words, no hype.
- Ethos (trust): real survey and testers, real team, honest limits (small sample, local server needed for QR mode).
- Logos (logic): one number per claim, one cause per effect.
- Pathos (feeling): the stuck moment, then the click. One human line per section.
- No ad style, no 10-second hook. Straight to the product, one idea per screen, end on one clear line.
- Demo style: problem, action, result. Verbs first, real UI words and values, under 12 words per step.
- Example: "Ne blocăm și recitim aceeași pagină. Aici încerci, și vezi." (pathos). "9 din 13 învață cel mai bine făcând." (logos).
Facts: survey 13 answers (9 practise best hands-on, 7 short lessons); 5 testers (4 learned faster); more lessons exist than shown; QR mode needs a local server.

## Copy and process
- [stated] Never fabricate data or quotes; real quotes only. No knob on the phone controller (sliders only).
- [stated] Announce foundation changes as "CHANGE NOTICE". Warn on repeated tasks. Ask before doing anything but text.
- [stated] When asked to council, give consensus plus my own call, with real dissent.
- [stated] Self-improve: when Eduard corrects me or rejects something, log it here at once as a card line. After a long session, list at most 3 lessons and propose the card. Never log guesses.
- [stated] Instagram Saved can be read through Claude in Chrome (his logged-in profile). Reviewed 6 Nov: 21 reels, captions only. Stop rule: 10 reels in a row without anything about Claude means done.