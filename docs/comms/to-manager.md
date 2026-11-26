# Reports from David (append only). Newest at the bottom.

## 2026-11-07 P3-phone: DONE
What: v2/js/phone.js (feature 'phone') + v2/js/qr.js (feature 'qr', v1 offline QR; absent = cdnjs qrcodejs fallback); shell.js ctx.controls(def); gas/parabola/pythagoras register v1 LAB tables; optics nothing; CSS in tokens.css. Layouts/Live tab live in the Connect dialog (v2 has no Settings).
Commit: 'v2 parity P3 phone controller'. Check: Link pill > Hybrid Demo, open Gas, drag knob/slider/tilt; 2 tabs with Live tab on; remove "phone" from registry = no pill/dock, lessons unchanged; relay: sed -n '21,$p' app/Lumio.cmd > s.js; LUMIO_DIR=<dir with built lumio.html> node s.js.
QUESTION: v1 v5.27 replaced the knob by a slider; I kept the knob (spec + your brief). Also v1 Phone mode framed the app as a 430px phone on wide screens; v2 Phone mode only adds the controller under the lab canvas (no frame). Keep both as is?

## 2026-11-25 stage2-deck: DONE (draft)
What: tools/deck/ (slides.html = new 8, 15, 16, 17, 18, 19; deck.css; build.js; merge.py; fonts Instrument Serif + DM Mono Medium with plain zero, OFL). Old 18 pages kept as images; overlays renumber all to LUMIO · NN / 24 and apply: cover + TEAM FLOW · SUCEAVA, slide 5 Not found -> Not in public docs + check-date line, slide 6 NO PARTNERS YET, PILOT NEXT, slide 14 SAMPLE PLAYERS label. Teacher lens + "new since round 1" folded in (no extra slide). docs/pitch-stage2.md written.
Check: node tools/deck/build.js <original.pdf> /tmp/x.pdf (24 pages, lists open tags); add --final -> exit 1 while tags remain.
QUESTION: old deck headlines are Instrument Serif, not Caladea; I matched the deck (Instrument Serif). Switch --head in deck.css to Caladea if Eduard wants. Orange left unchanged on old slides (parity).

## 2026-11-25 stage2-deck fixes after review: DONE (draft 2)
What: 25 pages (HSIC max). Old 15 split: 15 How it works (v1 today vs v2 adds, live URL checked 25 Nov + Lumio.cmd caveat), 16 AI and data (no AI in app except read-aloud; human reviews every change; data = browser localStorage, relay on laptop LAN only; hint tutor tagged as plan). New mapping: BMC 17, GTM 18, Costs 19, KPIs 20, Next 21, Team 22-24, Thanks 25. Footers NN / 25.
Slides 8/17/19/20: body >=13pt, mono >=10pt; BMC 6 boxes naming all 9 fields, Khan "three paths" cut; costs = one scenario classes x licence = revenue - running x12 = margin, break-even line, every blank is an ASSUMPTION tag; KPIs 6 rows, teacher-reported weekly active students + teacher quiz, anonymous codes on paper. Tags nowrap, footer spacing, curly quotes, "under-18s" kept on one line.
Originals: unchanged except agreed stamps + renumbering; slide 5 "__" replaced by a tag; NEW stamp on slide 25 "OUR ASK · ONE CLASS FOR A 4-WEEK PILOT" carries a TO VERIFY tag (parity: needs Eduard OK; delete EDITS.o18 in build.js to drop it).
Gate: build.js prints tags and every __ / bracket on any page and in docs/pitch-stage2.md (with location); --final exits 1 and writes nothing. Check: python3 tools/deck/check.py <orig.pdf> <out.pdf> <ORDER> (page count, footers, pixel diff boxes).
Script: 4:49 at 130 wpm (no block over), opening says "since stage I" at ~0:13, ask on slide 25 and last block, Eduard 7 / Stefan 7 / Darius 5 blocks, all on camera; Stefan variant removed.
QUESTION: OK to keep the ask stamp on the original Thanks slide (needs Eduard per parity)?

## 2026-11-26 wave2-A projectile: DONE + QUESTION
What: v2/modules/physics/projectile.js (v1 Free play: θ 10-80, v 5-30, 4 tiles, 4 exercises +10 each/+15 all, flag on ex 3; Levels: 5 LVL verbatim, ±3%, comma or dot, 3 SVG hearts + "n / 3", sparkles 3/2/1, Lumens 10/15/20 first time only, replay 0, unlock chain, Show me how + 3 hints; phone knob a/slider v/tilt a,v ignored in Levels + note; lumio2_proj), U.gridMap/U.mdot (ui.js), .proj CSS layer, phone.js "open a lab" string, registry line last.
Commits: 'v2 projectile lab module (not registered yet)', 'v2 register projectile'. Check: Subjects > Physics > Projectile motion; 45°/20 m/s = 40.8 m, 10.2 m, 2.88 s, 14.1 · 14.1; Levels 19.8 / 24.3 / 23.65 or 66.35 / 18.8 / 91.8.
QUESTION: (1) rating: I report miss = bad:1, hit with no miss on that attempt = ok:1, hit after a miss = no extra (spec line is ambiguous). (2) all-4 bonus shown as one "+25 Lumens" pop (10+15, same total, like pythagoras 10+30). (3) v1 hid the "R = · H =" read-out on the page (line 618); kept hidden, used by the phone read-out. (4) A-opt summary (intro + 5 takeaways) not built. (5) value stays in the field after a miss (mockup); v1 cleared it. OK?