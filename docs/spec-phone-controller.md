# Spec: phone controller (parity P3)
Rule: same features as v1 (PARITY RULE). Reuse v1 verbatim; restyle only. Reference: app/lumio.html (Ctl, LAB, Net, bc, onRemote, openConnect) and app/Lumio.cmd (server).

## 1. What v1 does and needs
- Controls per lab (LAB registry): 1 knob (270 deg arc, drag), 1-2 sliders, tilt pad (2D puck x->param, y->param), Motion button (deviceorientation: gamma/40, beta-45 /40, smoothed 0.35), Center button, live read-out line, live dot.
  Labs: parabola knob a, sliders b c, tilt b c. geometry knob a, slider b, tilt a b. gas knob T, sliders V N, tilt T V. Values snapped to step and clamped (setP).
- Three layouts (Settings): Desktop, Hybrid (laptop shows a phone mockup dock with the same controller, side or floating; 3D tilt follows the puck), Phone (?role=phone or width<700: lab screen shows a preview canvas plus controls). With no lab open the dock shows 3 shortcut buttons.
- Sync: BroadcastChannel 'incognia-sync' (two tabs, same browser, Settings switch "Live tab") AND LAN relay (Net): GET /api/info (app id check), SSE /events, POST /send. Messages: param {lab,k,v} (coalesced every 33 ms), nav {page,stage}, hello, state (full snapshot to the joining phone), peers. Echo-filtered by TAB id.
- Server = app/Lumio.cmd (Node 20, no deps, also Lumio.exe): HTTP :8080, HTTPS :8443 (self-signed cert, needed because iOS/Android give gyro only on HTTPS), serves lumio.html, random pairing token per run (phones need ?t=; localhost exempt), /pair page, token rotates when the Wi-Fi IP changes, Windows firewall rule, Settings > Quit.
- Pairing: header pill "Link / LAN n" opens Connect phone: QR (qrcodejs from cdnjs, MIT) + typed URL + steps + peer count + gyro note (HTTPS or touch pad). No server = text "run node server.js".
- Needs: Node on the laptop, same Wi-Fi, port 8080/8443 allowed, QR scan. Nothing else (no account, no internet except the QR script).

## 2. v2 port
- New file v2/js/phone.js, feature id "phone" in v2/modules/registry.js features list; registers window.LumioFeatures.phone; absent = no controller, no Link pill, lessons unchanged (same skip rule as ink/sfx).
- Reused verbatim (logic, math, messages): karc, knob/tilt/slider handlers, applyTilt, enableMotion, onOri, setP clamp+snap, Net (info/connect/send/flush/post), bc, onRemote, snap, drawQR, tween idea. Rewrite only the glue to v2 (no global S/LAB/$): ES5 style like other v2 files.
- Lesson hooks (ctx, 3 additions, shell.js only): ctx.controls(def) where def = {knob:'T', sliders:['V','N'], tilt:['T','V'], params:{k:{min,max,step,label,fmt}}, get(k), set(k,v), ro(), draw(cv,now)}. Same shape as v1 LAB, so the table in section 1 is copied 1:1 into gas.js, parabola.js, pythagoras.js (set() = the existing slider set + upd). Lessons already own U.slider widgets; set() just calls the same setter. ctx.controls returns an unregister (called on leaving the lesson). Optics: no controls (no v1 source), nothing registered.
- phone.js listens to shell events (planet in/out) to mount/unmount controls; keeps lesson id as the lab key, so nav messages use v2 ids (lesson key) instead of v1 pages.
- Layouts: Desktop/Hybrid/Phone kept as a 3-capsule segmented control (L.seg) in Settings; Hybrid dock bottom-right over the lesson, Phone mode = ?role=phone, controller below the preview canvas.
- Storage: lumio2_phone {mode, tabsync, dock}. Old v1 keys not read.
- Parity test (Tester): each lab, knob/slider/tilt change the lesson live both ways, Motion on iOS and Android over HTTPS, Center, Hybrid dock, Phone mode, two tabs, LAN with token, QR, peer count, nav + state snapshot on join, uninstall phone.js = nothing breaks.

## 3. Relay
- Default (no v1 change): keep app/Lumio.cmd verbatim; v2 hosted single file (tools/build-hosted.py) is saved as lumio.html next to it. Same protocol, same port, same token, same QR. Server needs no edit (its app id 'incognia' stays, or one string allowed by both).
- GitHub Pages (https) cannot call http://LAN (mixed content, blocked), so on Pages the LAN relay is unavailable. There only BroadcastChannel works and the Connect dialog says "start Lumio.cmd to link a phone" (v1 text lan_off). No v1 behaviour changes.
- Optional, only if Manager approves: cross-device on Pages via a free WebRTC broker (PeerJS, MIT; public broker free, best-effort, no SLA; room code/QR replaces token; gyro works because Pages is HTTPS). Not chosen; ask Manager first.

## 4. Restyle (lumio-taste, tokens.css, Light and Dark)
- Colours from tokens: surfaces --card/--line, knob arc and filled value in the subject colour (ctx.color), pointer ink, no orange (Lumens only), no purple (Moon only). Read-out Inter, values mono. Sage = connected dot, rose = error. No emojis (v1 used icons in labels: replace with text).
- Raised/inset tactile tokens from spec-tactile-light: knob raised, slider detent style as U.slider, tilt pad inset with 1px edge >=3:1. Matte default; Glass only on the dock chrome. Mockup frame is a plain 20px radius card, no notch/3D tilt unless Reduce motion is off (then 6 deg max).
- Motion: no bounce; transform/opacity only; Reduce motion = no dock tilt. Touch targets >=44px, focus ring tan, knob keyboard arrows. Both themes pass tools/contrast.py.
- Copy EN/RO: v1 strings (ctl_*, lan_*) reused, no new slogans.
