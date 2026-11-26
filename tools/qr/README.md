# QR print sheet (live demo)
Run: `node tools/qr/make-sheet.js <out.pdf> [url]` (needs node + playwright; default url https://edunguru-gitub.github.io/lumio/).
Output: A4 PDF, page 1 one big QR (16 cm, black on white, 4-module quiet zone, error correction Q) + URL + "Scan to try Lumio" / "Scanează și încearcă Lumio"; page 2 eight cut-out cards (2 x 4, dashed cut lines).
The QR matrix comes from the MIT library already bundled in v2/js/qr.js. Print at 100% (no "fit to page").
Never commit the PDF or any rendered images; write them outside the repo.
