# Spec: nav, header controls, themes (v2)
Design read: persistent chrome, students, quiet luxury. Dials: variance low, motion low, density low. Replaces the Terminal|Galaxy|Tabs toggle in spec-terminal-ratings.md section 1/6. Sources: docs/skills/lumio-taste, app/lumio.html tiramisu-light (line 581), v2/css/tokens.css.

## 1. Header (#bar, always visible, never wraps)
Order: Lumio wordmark | back (lesson/galaxy only) | crumb (flex 1, ellipsis, hidden under 600px) | Galaxy/Tabs | Light/Dark | RO/EN.
- Controls are borderless text: Inter 13/500, muted, no bg, no border, min touch 44x36 (padding 0 8px), gap 4. Active = ink colour + 1px underline (--tan, offset 6px). Separator between groups: 1px x 16px --line, margin 0 8px.
- Galaxy/Tabs shows only on the Subjects tab (laptop >= 900px). Phone: hidden, Subjects = Tabs. Light/Dark: text "Light | Dark" ("Luminos | Intunecat"); RO/EN: "RO | EN". Each is a role=group of 2 buttons, aria-pressed.
- 390px: wordmark 18px; groups tighten to padding 0 6px, gap 0, separators 1px x 12px, total <= 358px. Crumb hidden; back replaces it (icon only, aria-label). Light/Dark group collapses to one button showing the target mode ("Light"/"Dark") if width < 360.
- Storage keys (try/catch): lumio2_view ('galaxy'|'tabs'), lumio2_theme ('light'|'dark'; absent = system), lumio2_lang ('ro'|'en'; absent = navigator.language). Read before first paint (inline script in <head>) to avoid flash.

## 2. Tabs and screens
Top-level tabs: Home | Subjects | Ranks. Laptop: text tabs under the wordmark row is NOT used; place in #bar centre (Inter 14/500, same underline rule). Phone: #tabbar bottom (64px, 3 equal items, label only, no icons needed).
- Home = #term: player card, meters (Lumens, Moon, Streak, Days left), ticker, Ranks preview (top 3 rows + "See all" text link to Ranks). No lesson-card grid (moves to Subjects tabs view).
- Subjects = #stage (galaxy) or #tabs (list) per Galaxy/Tabs choice.
- Ranks = #ranks: full table (rank, name, Overall, Lumens, this week). Real data only: one You row. Under it empty state: "Add friends" (muted text + outline button, disabled, title "Coming soon"). Moon column: 1000 base, "No challenges yet". No invented names, no placeholder rows.
- State: body[data-tab=home|subjects|ranks], body[data-view=galaxy|tabs]. L.setTab(t), L.setView(v). Lesson/planet levels live inside Subjects; Back returns there.

## 3. Token structure
Rule: components use only tokens; no hex in JS or component CSS. Default = system: `:root` holds dark; `@media (prefers-color-scheme:light){:root:not([data-theme=dark]){ ...light }}`; `[data-theme=light]{ ...light }` (same block, duplicated once, nothing else); `[data-theme=dark]` needs no block (= :root). JS sets `document.documentElement.dataset.theme` only when the user picks; choosing the system value removes it. `color-scheme:dark|light` follows. Canvas colours read from CSS vars (galaxy.js line 72 g('--x')) and re-read on theme change (matchMedia change + toggle), then redraw.

## 4. Light values (tiramisu-light, adjusted for AA)
Surfaces: --bg #F6F0E6; --card #FFFBF4; --line #DDD0BC; --bg-hi #FBF7EF; --glow #EBDCC0 (stage gradient unchanged in shape).
Text: --ink #2B2018 (14.6:1 on bg); --muted #6E6253 (5.1:1 on bg, 5.6 on card).
Accent: --tan #7A5A2E (text/underline/focus, 5.9:1 on bg). Focus ring 2px --tan.
Subjects (text and marks, all >= 4.5:1 on bg): --physics #2F6F86; --math #4A7550; --spanish #A25A5A; --life #7A5A2E. Sage = success, rose = miss kept (--good #2F7D55, --bad #C4383D).
Reserved (taste rule: only for Lumens / Moon): --lumens #FF6A13 for fills and icons only; --lumens-text #B84700 (4.9:1) for the number. --moon #A78BFA for icon/fill; --moon-text #6A4BD0 (5.6:1) for the number. Dark theme: --lumens-text = #FF6A13, --moon-text = #A78BFA (add both tokens to :root).
Tier edges on cards: 60-79 border --tan, 80+ border subject colour + 10% tint (color-mix with --card). Unchanged logic.
Radii, fonts, spacing, hairlines: unchanged. Matte stays default; Glass tint in light = rgba(255,251,244,.6), blur 12px, border rgba(43,32,24,.12). No shadows.

## 5. Galaxy canvas in light
Add tokens: --sky (dust colour) dark #EDE3D0, light #2B2018; --sky-a (alpha multiplier) dark 1, light 1.6 (cap 0.6 per dot); --core-glow (planet halo shadowBlur colour) dark = --ink, light = --card. Dust dots: --sky at their alpha, 1px (light: 1.5px so they register). Planet fill/stroke: subject colour tokens above; locked planets alpha .35 stays. Labels use --ink, counts --muted. Orbit/link lines: --line at 1px. Stage gradient uses --bg-hi/--glow so light reads as warm paper, not grey. No orange/violet in the sky.

## 6. States and a11y
Empty (no friends, no ratings), locked, loading (skeleton = --line bars, no shimmer), error (inline text --bad + icon-free message) all designed. Contrast check target AA 4.5 text, 3 non-text. Focus visible both themes. Reduce motion: theme switch is instant, view switch fades. Theme change must never reset camera, level or progress.

## 7. Build order
1. tokens.css: add --lumens-text/--moon-text/--sky*/--core-glow to :root, then the light block (media + [data-theme=light]). Check every hex in v2/css and v2/js, replace with tokens.
2. Inline head script + L.theme/L.lang/L.view store helpers (keys above), apply before paint.
3. Header markup/CSS: text controls, groups, 390px rules; remove the old #toggle.
4. Tabs: Home | Subjects | Ranks (setTab, #tabbar on phone); move Galaxy/Tabs under Subjects.
5. Move rankings out of the full Home page: Home preview (top 3) + new #ranks page.
6. galaxy.js: read new canvas tokens, redraw on theme change.
7. Tester at 390, 768, 1280, both themes, both languages; contrast pass on muted, tan, subject colours.
