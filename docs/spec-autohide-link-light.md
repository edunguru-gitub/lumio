# Spec: auto-hide top bar + phone link light (Designer, 27 Nov). Docs only, no code. Build AFTER the HSIC upload (Sat 28 Nov 14:00, docs/teacher/knowledge.md), together with or after the premium pass.
Ask (Eduard via Manager): (1) top bar disappears and reappears by itself, EXCEPT Link; (2) top-right a GREEN FLASHING light = phone link connected or not. Assessed by Designer (taste), Psychologist (Boyle lens: first 10 s, discoverability, ADHD teen, getting lost) and Tester (what breaks).
Read: CLAUDE.md, lumio-taste, psychologist-review, spec-premium-pass, spec-tactile-motion, spec-phone-controller, v2/js/phone.js (pill(), Net, onRemote 'peers'), v2/css/tokens.css (premium pass P1 block, L393 #plink, L18/L93 #bar), Boyle ux-wave in to-david.md.

## 0. Verdict (read first)
Auto-hide is GOOD only in two places (inside a lesson, galaxy view) and BAD on Home, Subjects/Ranks, Settings. Reasons: (a) lessons and the galaxy are "stage" screens, the student works on one thing and 56 px of chrome is 6-8% of a 700-900 px viewport (phone landscape: 15%); (b) on Home/Ranks/Settings the bar IS the navigation. Boyle's findings say students already struggle to see where to go (items 3, 4, 5, 8); hiding the nav there makes "I am lost" worse in the first 10 seconds. Safest version = section 1 table + "Pin bar" setting + Back and the light never hide. Fully hidden bar everywhere = REJECTED (hidden nav is a known discoverability failure; Boyle will flag it; jury sees an empty screen on Home).
Taste check: calm and Apple-like, fits "quiet luxury"; motion stays opacity+transform only, 200 ms, no bounce. The GREEN pulse conflicts mildly with taste "very frequent elements are not animated" and "no neon": solved by a soft sage pulse (section 3), steady on reduced motion, pausing rules below. Colour never the only signal.

## 1. Auto-hide behaviour (a)
| Context | Default | Why |
|---|---|---|
| First run, before the first pointer/key/touch | Visible, locked | Student must see all controls once (Boyle: first 10 s) |
| Home | Always visible | Navigation and Continue live there |
| Subjects/Tabs list, Ranks, Settings | Always visible | Same; these are menus |
| Galaxy view (laptop) | Auto-hide ON | Camera is the product; Back/zoom already live in #ctl bottom-right and Esc/Backspace work |
| Inside a lesson | Auto-hide ON | Student works; bar hides after inactivity |
| Phone (<700 px) | Top bar stays (64 px, 2 rows max); bottom tab bar hides on scroll down, shows on scroll up; hides only in lists, never in a lesson | see section 1.4 |
Setting "Pin bar" (Settings, Appearance row, toggle, EN "Always show top bar" / RO "Arată mereu bara de sus"): OFF = defaults above; ON = bar never hides anywhere. Stored in the existing prefs (try/catch). Reason for ON-by-context default instead of global: nobody is forced; Home/Ranks/Settings keep the proven layout the premium pass and Boyle reviewed; the saving only applies where it pays.

### 1.1 Hide triggers
Hide after 2.5 s with no pointer move, key, scroll, touch, or lesson input (typing in the Type field and slider drags count as activity and keep it visible only if the bar is already showing; they never reveal it). Do not hide while the pointer is over the bar. Hide immediately (0.6 s grace) on lesson open so the student sees the bar once on arrival.
### 1.2 Reveal triggers (any one, within 120 ms)
1. Pointer enters the top 10 px (hot edge 8-12 px; use 10) with no button pressed.
2. Mouse moves upward at >= 600 px/s anywhere in the upper third (the "move up" gesture), no button pressed.
3. Scroll up (wheel deltaY < 0 or touch drag down) by more than 24 px inside a scrolling lesson/list.
4. Keyboard focus lands on anything inside the bar (Tab, Shift+Tab). Focus order is unchanged and must reach the bar from the start of the document; a hidden bar must not trap focus invisibly: hidden = bar is `inert`-free but moves into view on first focus, never `display:none` or `visibility:hidden` (so Tab always works and screen readers always find it).
5. Escape or Alt pressed (Esc already means "go out" in the galaxy: in galaxy Esc keeps going out AND shows the bar; in a lesson with a dialog open Esc closes the dialog first, bar unchanged).
6. Touch: tap the grabber (section 1.5). Also swipe down from the top 24 px (not Safari's own gesture area, see risks).
7. Route change (Back, Home, lesson open) reveals the bar for 2.5 s.
### 1.3 Never hide (hard rules, checked before every hide)
- any dialog, menu, popover, tooltip or the Connect dialog is open (role=dialog or aria-modal, #cdlg, dropdowns);
- keyboard focus is inside the bar; pointer is over it; a bar control is being pressed;
- first run before the first interaction; the first-run tip of Boyle item 4 is showing;
- page is not scrolled-at-top AND the lesson is mid-drag (pointer captured by a canvas or slider): defer the hide, do not cancel it;
- the 5 s after a Link state change (student needs to read it);
- Reduced motion does NOT disable the feature (users who asked for less motion often also want less clutter) but simplifies it: no slide, opacity cross-fade 120 ms, hot-edge reveal only plus all keyboard triggers; no upward-move gesture. If Pin bar is ON or `prefers-contrast: more`, never hide.
### 1.4 Phone
Top bar (64 px) does not auto-hide on phone: too many Boyle-flagged controls (item 8, one compact row) and a fixed 64 px on a 390x844 screen is 7.6%, acceptable. Bottom tab bar (Home/Subjects/Ranks): hide on scroll down (> 40 px, velocity > 0), show on scroll up (> 16 px) or at top/bottom of the list; 200 ms transform. Inside a lesson there is no tab bar anyway: Back (44 px) in the top row NEVER hides. Link light stays. Do not use `position:fixed` bottom elements that fight the Safari toolbar (section 3 risks). Hover-only reveal does not exist on phone; touch uses grabber/scroll-up only.
### 1.5 What stays visible while hidden
- the Link LIGHT (section 2), always;
- Back chevron (44x44 hit area, 32 px visible, top-left) inside a lesson. Deviation from Eduard's literal "except Link": a student in a lesson cannot get lost. Esc/Backspace remain. If Eduard objects, Back appears only on reveal, but Boyle will flag it;
- a 3-4 px reveal affordance: centred top hairline, 36 px wide x 3 px, colour muted at 35% (not tan, tan = active), radius 2; it is the grabber on touch with a 44 px hit area (expands to 44x24 transparent). On desktop it is a pure affordance (hint that the bar lives there). It never fades: it is the only discoverability cue for non-mouse users.
### 1.6 Timing and motion (use tactile-motion tokens)
Hide: 200 ms (--dur-2), ease-in-ish exit `cubic-bezier(.4,0,1,1)`, translateY(-100%) + opacity 0 (exits 20% faster per taste: 160 ms is acceptable). Reveal: 120 ms (--dur-1), --ease-out, translateY(0). Hide delay 2.5 s, reveal debounce 0 ms, hide re-arm 2.5 s after the last activity. Interruptible: reversing mid-way starts from the current value. Only transform and opacity (no height animation).
### 1.7 Layout stability (no content jump)
Auto-hide contexts: the stage is full-height ALWAYS and the bar overlays it (position:fixed/absolute, z above stage, solid var(--bg) plus hairline, no blur needed). Pinned contexts: bar stays in flow as today. A context change (Home -> lesson) re-lays out once, under the existing navigation transition, never on hide/reveal. The first 56 px of lessons/galaxy gets 56 px top padding in auto-hide contexts so no content sits under the revealed bar. `scrollbar-gutter` stable; bar width = 100% minus scrollbar. Hide/reveal must change zero bounding boxes of anything except the bar (Tester measures).

## 2. Link light (b)
Placement: top-right, the right-most element of the bar, 12 px after RO/EN and aligned to its vertical centre; when the bar is hidden it stays at the same pixel position (top 16 px, right 16 px + env(safe-area-inset-right)). It is the existing dot of #plink promoted to its own persistent element; the text label ("Phone link") belongs to the bar and hides with it. When the bar is pinned the full pill is unchanged (parity, nothing removed).
Size: 10 px dot (12 px at 1.5 DPR is not needed), ring 18 px max, hit area 44x44 transparent button (aria-label "Phone link: Connected/Not connected", opens the Connect dialog, same handler as #plink onclick incl. the `Net.init()` retry on phone). Focus ring: tan 2 px, offset 2 (existing rule).
### 2.1 States
| State | Light | Text (tooltip + aria-live, EN / RO) |
|---|---|---|
| Not connected / no relay | 10 px dot, muted `--muted`, no animation | "Phone not connected" / "Telefon neconectat" |
| Connecting / reconnecting (Net.es retrying, CD.re) | dot muted, slow opacity pulse .4 to 1, 2.4 s | "Connecting…" / "Se conectează…" |
| Connected | dot `--good`, soft ring pulse, 1.6 s period | "Phone connected" / "Telefon conectat" |
| Error (relay up, token old: Net.err / Net.old on phone) | dot `--bad`, steady, plus a 1 px ring | "Cannot reach the laptop" / "Laptopul nu răspunde" |
Pulse: ring (box-shadow-free; use a pseudo-element scaling 1 -> 1.8 and opacity .45 -> 0) over 1.6 s ease-out, repeat. That is 0.625 pulses/s, far under 3 flashes/s (WCAG 2.3.1) and under the 0.5 Hz-1 Hz calm band; amplitude low so it is not a strobe. "Flashing fast" is REJECTED (distracting for ADHD, photosensitivity, taste). After 10 pulses the ring stops and the dot stays steady green (taste: frequent elements not animated; WCAG 2.2.2 pause/stop/hide); pulses resume on any state change or when the Connect dialog is opened. The stop-after-10 rule is the pause/stop mechanism (WCAG 2.2.2). The pulse also pauses while the tab is hidden.
Reduced motion: no pulse, steady green dot with a 2 px `--good` ring (shape change, not only colour), connecting = steady muted dot with a dashed ring.
Colour: exact `--good`: Dark #9DBF9E on #171513 = about 8:1; Light #2B724D on #F6F0E6 = about 5.3:1 (both pass the 3:1 non-text and 4.5:1 text minimums; Tester measures). It is the existing success sage (taste: sage = success), NOT orange (Lumens only), NOT violet (Moon only), NOT neon. Ring colour = same token at .45 alpha. Error dot `--bad`. Connecting/not connected `--muted` (#958C7B on #171513 passes 3:1 as a dot, and on Light #5E5242 passes 4.5:1).
Announcements: one polite `aria-live="polite"` region (visually hidden, already exists as role=status patterns in phone.js) says "Phone connected" / "Phone disconnected" on change only, debounced 800 ms to avoid chatter on SSE flap. No sound, no vibration.
### 2.2 What "connected" means in phone.js terms
- Laptop (the default viewer): Connected = `Net.phones > 0` (relay says at least one phone-role peer; from the 'peers' message). Today the pill shows "LAN · n" when only `Net.on` (relay reachable) with no phone: that is "relay ready", NOT a phone. The light stays NOT connected (muted) in that case, tooltip "Ready, waiting for a phone" / "Gata, aștept un telefon". Do not turn green for the relay alone: a green light with no phone would be a lie (honest limits, Ethos).
- Tab sync (BroadcastChannel, same browser, cfg.tabsync) counts only if another tab answers (needs a ping from the other tab; today `lamp()` shows on whenever BC exists, which is not a peer). Recommended: tab sync is a SEPARATE tiny state (ring only, no pulse) or ignored by the light; keep the light = phone. Needs David to confirm what BC can report.
- Phone viewer (?role=phone, width<700): Connected = `Net.on` (EventSource open to the laptop). Error = `Net.err`/`Net.old`.
- GitHub Pages / any `github.io` host, `file://`, or no `/api/info`: there is no relay at all (phone.js init returns at once), so the light is the muted NOT connected state with tooltip "Needs Lumio.cmd on your laptop" / "Necesită Lumio.cmd pe laptop" and the click opens the Connect dialog explaining it (existing `cn_file` string). Reason shown to the jury: a static page cannot accept a phone connection; this is the honest-limits line already in taste ("QR mode needs a local server").
- Lessons without a controller: ctx.controls absent = no Link pill today (phone.js header). Keep: no light on those lessons? Recommended: light stays visible everywhere once the relay exists (state is global), and is hidden only when `F.phone` is absent (feature file skipped).

## 3. Risks and mitigations (c)
| Risk | Who | Mitigation |
|---|---|---|
| Discoverability: student never finds the bar after it hides | Boyle | first-run lock; grabber hairline always visible; reveal on top edge, upward move, scroll up, Esc; bar shows 2.5 s after every route change; Pin bar in Settings; Home/Ranks/Settings never hide |
| Bar hides while student writes/types in an exercise | Boyle, Tester | typing, drags and pointer capture count as activity; never hide with a dialog/focus in bar; reveal never triggered by those (no flicker) |
| Slider/canvas drag near the top edge (a drag that ends at y<10 reveals the bar and the next pointerup misfires) | Tester | hot-edge reveal only when no button pressed; bar ignores pointer events for 150 ms after a reveal that started during a press |
| Safari/iOS toolbars and the dynamic viewport already resize the page; a second hiding layer is confusing; the top 20-24 px swipe belongs to the system | Tester | no custom top swipe on iOS; use grabber tap and scroll-up only; use `100dvh`; keep phone top bar pinned (1.4); test on real iPhone Safari 17+ |
| Keyboard/screen-reader users | Boyle, a11y | bar always in DOM and tab order, never `display:none`; reveal on focus; live region; light is a real button with a name; Esc/Alt reveal; Tab order unchanged (skip-link not needed) |
| Interaction with the nav fixed-position fix (nav is position-fixed on scroll; premium pass `#top` centred, `#bar` z-index 3) | Tester | overlay = same z-index as #bar, never above #toast/#gain/#cdlg; no `position:sticky` mix; run a check that `#top` bounding box does not move on hide (it translates with the bar only) |
| Hidden bar loses RO/EN, Light/Dark, Galaxy/Tabs | Boyle (item 8: must stay reachable) | all reachable: hover/edge, keyboard focus, touch grabber, Settings; Settings already holds RO/EN and theme (verify; if not, Pin bar stays ON by default until they do) |
| Light flicker/chatter on SSE reconnect | Tester | 800 ms debounce, announcement on change only |
| Pulse annoying or photosensitive | Boyle | 0.625 Hz soft ring, stops after 10 pulses, steady on reduced motion |
| Light overlapping lesson content in the top-right | Designer | 44 px reserved corner, lesson top padding 56 px in auto-hide contexts |
| Eduard's "flashing" (fast) vs our "soft pulse" | Manager to confirm | explain: same signal, safer; if he insists, 1 Hz max |
| Parity | all | NOTHING removed: every control still exists; pinned mode is identical to today; auto-hide is additive and skipped if `v2/js/autohide.js` or the pref is absent |
| Jury demo: bar vanishes during the pitch video | Teacher lens | record the video with Pin bar ON or after this feature is verified; do not ship this inside the upload build |

## 4. Staging (d)
1. Not in the HSIC upload build. After Sat 28 Nov 14:00, with premium pass phase 2.
2. Build: CSS block `/* autohide + link light */` at the end of tokens.css (revert = delete block) + new optional `v2/js/autohide.js` (loader skips it if absent; same pattern as other features) hooking `L.on` nav events, `matchMedia` for reduced motion/hover, one `pinbar` pref, one live region. Small light patch in `v2/js/phone.js pill()` to expose state `idle|connecting|on|err` on `#plink` (data-state) so CSS/JS read it, no logic change. Settings row: one toggle.
3. Effort: MEDIUM (David), Tester LOW/MEDIUM.
4. Tester checklist (EN+RO, Dark+Light, 1273 and 390 px, mouse + keyboard + touch emulation, reduced motion on and off):
   - hide delay 2.5 s +/- 100 ms; reveal latency <= 120 ms for edge, upward move, scroll up, focus, Esc/Alt, grabber tap (performance timeline);
   - zero layout shift: bounding boxes of main/stage/lesson/#top/#ctl unchanged before, during and after hide/reveal (compare getBoundingClientRect), CLS = 0;
   - never hides: dialog open, Connect dialog, focus in bar, first run, Pin bar ON, hover on bar;
   - focus order identical to today, hidden bar reachable by Tab and revealed; screen reader reads state changes once;
   - light: 4 states, `--good` contrast measured Dark and Light, ring present under reduced motion, <= 3 flashes/s (verified period 1.6 s), stops after 10 pulses, hit area >= 44 px, click opens Connect dialog, github.io shows NOT connected with Lumio.cmd tooltip, relay up with 0 phones stays muted, phone viewer green on Net.on;
   - lessons: Back never hides; slider/drag near top edge does not reveal or misfire; typing in Type field does not flicker the bar;
   - phone: bottom tab bar hides on scroll down and shows on scroll up; top bar and Back stay; iOS Safari toolbar not fighting;
   - parity v1 vs v2 (CLAUDE.md): every control reachable by hover, keyboard and touch; nothing removed; Pin bar ON = identical to current build; scoring/payouts unchanged; 0 page errors.
5. Designer review after build vs lumio-taste (one accent per screen: green only on the light; no glow; no bounce).

## Open questions for Eduard (Manager asks)
Q1 Keep Back visible in lessons while the bar hides (recommended yes)? Q2 Accept a soft 1.6 s pulse instead of fast flashing (recommended yes)? Q3 Default: auto-hide only in lessons and galaxy, bar always on Home/Ranks/Settings (recommended yes)?
