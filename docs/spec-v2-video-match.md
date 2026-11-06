# v2 vs update video (design/video/lumio-update-video.mp4) - match spec
Method: 8 frames (ffmpeg) vs Playwright shots of v2/ at 1280 and 390, galaxy + tabs. Ordered by impact.
Tokens stay: bg #171513, card #211E1A, Caladea+Inter, subject tint --physics #7FB0C0.

1. GALAXY LOOKS FLAT, VIDEO IS LUSH (galaxy.js draw)
 Video: elliptical spiral of ~600 fine blue-white specks (1-1.5px, soft), bright cream ellipse core (~28x14px, rotated -15deg, #EDE3D0 + glow shadowBlur 14), 3 tight rings. v2: 200 sharp square 1.4-2.4px, tiny dot core, sparse arms.
 Fix: N=200 -> 650; fillRect -> arc r .6-1.3; alpha .15-.7; core = ellipse(rx 14,ry 7,rot -.26) fill --ink, shadowColor --ink blur 14; y-squash .85 -> .5 and tilt -.26rad; rot speed 120000ms -> 240000ms ("dust drifts slowly, planets stay put").
2. PLANETS (video: solid filled discs + name + progress stars)
 Video: lesson planet = FILLED subject tint disc r~13px (#7FB0C0), label right of disc (Inter 500 17px, ink), 1-3 tiny cream stars (4-point, 9px, #D9C3A0) under label = mastery. Current lesson (Optics) = hollow ring r14 + outer halo ring r20 alpha .35. Locked (Momentum) = hollow, whole item alpha .35. v2: hollow dark discs r16 with 1.5px stroke, label BELOW centred 13px, no stars.
 Fix: fill s.color when unlocked; stroke only for current/locked; label x=p.x+pr+10, left aligned, 17/z px; stars: draw "✦" 9/z px at p.x+pr+10,p.y+16/z, count=min(3,round(P*3)); halo ring on current (first lesson with P<1). Planet r 16->13, no card fill.
3. BACKGROUND (video: warm vignette + star field; v2: flat #171513)
 Video: bg radial-gradient(ellipse at 30% 0%, #2A2219 0%, #171513 60%) plus ~120 1px stars alpha .15-.5 scattered full screen, faint warm glow lower right (radial #3A2C1C alpha .25).
 Fix: #stage background above (canvas must clear transparent: clearRect, not fillRect C.bg); stars = seeded array drawn in screen space before translate.
4. GALAXY SCREEN HEADER (missing in v2; v2 shows only crumb)
 Video, top-left at x=80,y=125: eyebrow "Galaxy" Inter 14 muted; title "Physics" Caladea 400 (not bold) 64px, color subject tint; under it 3px progress bar 280px wide (tint fill, track --line) + "4 of 12 lessons" 12px muted. Top-right: outlined button "Continue Optics →" 177x40, 1px tint border, radius 8, tint text Inter 500 15.
 Fix: HTML overlay inside #stage, pointer-events:none except button; hide when level=home. Bold 700 titles in v2 -> 400 for h1/galaxy title.
5. TOP NAV (video: text nav, v2: boxed Back + toggle)
 Video: wordmark "Lumio" Caladea 36px with small tan 4-point star above the o; right nav text links Home / Subjects / Missions / Ranks / Settings, Inter 15 muted, active = ink + 1px underline pill (tan). No border-bottom, height ~110px, padding 0 80px. v2: 56px bar, border line, Back/crumb/Galaxy-Tabs buttons.
 Fix: #bar height 96, border none, bg transparent over stage; move Back to galaxy controls (item 6); keep Galaxy/Tabs toggle but move under Settings as segmented "Look" control (Matte/Glass in video, top-right under nav).
6. GALAXY CONTROLS (video: floating glass pill bottom-right of stage)
 Video: pill at ~(795,490) 145x40, bg rgba(33,30,26,.6), 1px --line, radius 14, backdrop-filter blur(12px); contains "Back" text + two 34x30 square buttons "-" "+" (#2E2A24, r8) for zoom. v2: none (Back in header, zoom only by wheel).
 Fix: add #ctl pill with Back, -, + (L.cam.z *=1.25 / .8 via U.tween); Glass applies to this chrome only (taste: Matte default).
7. CAPTION (video: 22px Inter 400 ink centred bottom 44px). v2 hint is 13px muted. Fix: #hint font 20px/1.3 ink, bottom 40px; keep .on fade .3s.
8. TABS MODE (390): video shows lesson list as ordered rows in a phone, not cards
 Video: header block "Subject" eyebrow, "Physics" Caladea 400 44px tint, mini galaxy (110px canvas, same render as item 1) top-right, progress bar. Rows: 48px, NO card bg/border, hairline bottom divider --line, left index "1" muted 14px, name Inter 500 16, right 3 stars (cream) or "Now" / "Locked" 13px muted; locked row alpha .4. Primary button "Continue Optics →" full width 44px outlined tint r10. Bottom tab bar Home/Subjects/Missions/Ranks 56px, active pill bg --card r10.
 v2: bold 28px title, 60px bordered cards, dot + % at right, no header galaxy, no tab bar.
 Fix: .row{height:48px;background:none;border:0;border-bottom:1px solid var(--line);border-radius:0}; replace .dot with index number; .v -> stars/"Now"/"Locked"; h2 400 44px tint; add #tabbar fixed bottom (it replaces top nav at <700px).
9. HOME LEVEL (v2 home shows 4 equal static galaxies, no labels in video since video starts inside Physics)
 Keep, but apply items 1-3 to each galaxy; subject label Caladea 400 not 700; % -> "4 of 12".
10. MOTION
 Video: dust rotates slowly; planets static; zoom between levels ~600ms ease-in-out (v2 cam: check camera.js duration); caption crossfades .3s; Matte<->Glass toggle crossfades chrome .25s. Respect prefers-reduced-motion (already handled).
11. MOBILE GALAXY (390): video says "on phone: Tabs only, galaxy is decoration, no touch targets". v2 already defaults to tabs <700; keep, but show galaxy as the header mini canvas (item 8).
No code edited.
