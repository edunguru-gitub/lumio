"""Deck check: python3 tools/deck/check.py original.pdf out.pdf o1,o2,n1,...  (order as in build.js ORDER)
Prints page count, the footer read on every page (LUMIO · NN / total), and for each original page the box (pt) of
pixels that differ from the original outside the footer patch. Empty = pixel-identical apart from the new footer."""
import re, subprocess, sys, tempfile
from PIL import Image, ImageChops
from pypdf import PdfReader

orig, out, order = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
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
    print(f'page {i + 1:2} ({key}):', d.getbbox() or 'identical outside footer')
