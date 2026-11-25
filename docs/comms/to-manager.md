# Reports from David (append only). Newest at the bottom.

## 2026-11-07 P3-phone: DONE
What: v2/js/phone.js (feature 'phone') + v2/js/qr.js (feature 'qr', v1 offline QR; absent = cdnjs qrcodejs fallback); shell.js ctx.controls(def); gas/parabola/pythagoras register v1 LAB tables; optics nothing; CSS in tokens.css. Layouts/Live tab live in the Connect dialog (v2 has no Settings).
Commit: 'v2 parity P3 phone controller'. Check: Link pill > Hybrid Demo, open Gas, drag knob/slider/tilt; 2 tabs with Live tab on; remove "phone" from registry = no pill/dock, lessons unchanged; relay: sed -n '21,$p' app/Lumio.cmd > s.js; LUMIO_DIR=<dir with built lumio.html> node s.js.
QUESTION: v1 v5.27 replaced the knob by a slider; I kept the knob (spec + your brief). Also v1 Phone mode framed the app as a 430px phone on wide screens; v2 Phone mode only adds the controller under the lab canvas (no frame). Keep both as is?

## 2026-11-25 stage2-deck: DONE (draft)
What: tools/deck/ (slides.html = new 8, 15, 16, 17, 18, 19; deck.css; build.js; merge.py; fonts Instrument Serif + DM Mono Medium with plain zero, OFL). Old 18 pages kept as images; overlays renumber all to LUMIO · NN / 24 and apply: cover + TEAM FLOW · SUCEAVA, slide 5 Not found -> Not in public docs + check-date line, slide 6 NO PARTNERS YET, PILOT NEXT, slide 14 SAMPLE PLAYERS label. Teacher lens + "new since round 1" folded in (no extra slide). docs/pitch-stage2.md written.
Check: node tools/deck/build.js <original.pdf> /tmp/x.pdf (24 pages, lists open tags); add --final -> exit 1 while tags remain.
QUESTION: old deck headlines are Instrument Serif, not Caladea; I matched the deck (Instrument Serif). Switch --head in deck.css to Caladea if Eduard wants. Orange left unchanged on old slides (parity).
