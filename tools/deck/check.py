"""Deck check: python3 tools/deck/check.py original.pdf out.pdf o1,o2,n1,...  (order as in build.js ORDER)
Prints page count, the footer read on every page (LUMIO · NN / total), and for each original page the box (pt) of
pixels that differ from the original outside the footer patch and the approved edit boxes (EXPECTED, pt).
'identical outside approved edits' = only the new footer and the approved edits changed; anything else is printed as UNEXPECTED.
Ranks screenshot for page 14: live v2 Ranks, dark theme, 1060x798 viewport at 2x, saved as tools/deck/ranks.png or RANKS_PNG (never committed)."""
import re, subprocess, sys, tempfile
from PIL import Image, ImageChops
from pypdf import PdfReader

orig, out, order = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
# approved edits per original page (keep in step with EDITS in build.js); Eduard OK 26 Nov for o1 slogan, o2/o7 counts, o13 screenshot, o18 slogan + ask
EXPECTED = {
    'o1': [(60, 300, 700, 346), (60, 456, 460, 476)],        # factual cover line; TEAM FLOW · SUCEAVA
    'o2': [(362, 238, 607, 441), (645, 238, 897, 441)],      # survey counts tagged
    'o5': [(406, 331, 900, 349), (60, 465, 700, 485)],       # Not in public docs; check-date line
    'o6': [(648, 375, 882, 393)],                            # NO PARTNERS YET, PILOT NEXT
    'o7': [(60, 62, 420, 82), (60, 106, 806, 166)],          # counts tag; headline without 'Seven in ten'
    'o13': [(414, 40, 901, 447)],                            # retaken v2 Ranks screenshot + SAMPLE PLAYERS label
    'o18': [(60, 168, 890, 340), (60, 420, 560, 440)],       # factual closing line; ask stamp
}
pages = PdfReader(out).pages
print(f'{len(pages)} pages (order has {len(order)})')
foot = [re.findall(r'LUMIO · (\d\d) / (\d\d)', p.extract_text() or '') for p in pages]
bad = [i + 1 for i, f in enumerate(foot) if (f'{i + 1:02d}', f'{len(pages):02d}') not in f]
print('footers NN / total sequential:', 'OK' if not bad else f'MISSING on pages {bad}')
tmp = tempfile.mkdtemp()
for src, name in ((orig, 'o'), (out, 'f')):  # 72 dpi = 1 px per pt on the 960x540 page
    subprocess.run(['pdftoppm', '-r', '72', '-png', src, f'{tmp}/{name}'], check=True)
w = len(str(len(PdfReader(orig).pages))), len(str(len(pages)))
for i, key in enumerate(order):
    if key[0] != 'o':
        continue
    a = Image.open(f'{tmp}/o-{int(key[1:]):0{w[0]}d}.png').convert('RGB')
    b = Image.open(f'{tmp}/f-{i + 1:0{w[1]}d}.png').convert('RGB')
    d = ImageChops.difference(a, b).convert('L').point(lambda v: 255 if v > 8 else 0)
    d.paste(0, (58, 487, 202, 512))  # footer patch: LUMIO · NN / total
    for box in EXPECTED.get(key, []):
        d.paste(0, box)
    bb = d.getbbox()
    print(f'page {i + 1:2} ({key}):', f'UNEXPECTED diff {bb}' if bb else 'identical outside footer' + (' and approved edits' if key in EXPECTED else ''))
