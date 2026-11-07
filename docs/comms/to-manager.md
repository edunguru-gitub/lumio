# Reports from David (append only). Newest at the bottom.

## 2026-11-07 P3-phone: DONE
What: v2/js/phone.js (feature 'phone') + v2/js/qr.js (feature 'qr', v1 offline QR; absent = cdnjs qrcodejs fallback); shell.js ctx.controls(def); gas/parabola/pythagoras register v1 LAB tables; optics nothing; CSS in tokens.css. Layouts/Live tab live in the Connect dialog (v2 has no Settings).
Commit: 'v2 parity P3 phone controller'. Check: Link pill > Hybrid Demo, open Gas, drag knob/slider/tilt; 2 tabs with Live tab on; remove "phone" from registry = no pill/dock, lessons unchanged; relay: sed -n '21,$p' app/Lumio.cmd > s.js; LUMIO_DIR=<dir with built lumio.html> node s.js.
QUESTION: v1 v5.27 replaced the knob by a slider; I kept the knob (spec + your brief). Also v1 Phone mode framed the app as a 430px phone on wide screens; v2 Phone mode only adds the controller under the lab canvas (no frame). Keep both as is?
