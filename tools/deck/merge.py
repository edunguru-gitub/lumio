"""Merge for the stage II deck: python3 merge.py original.pdf new.pdf overlays.pdf out.pdf o1,o2,n1,...
(python3 merge.py --scan original.pdf o1,o2,n1,... is the gate helper used by build.js)
Old pages are kept as they are (same image, same size); each final page gets its overlay page stamped on top."""
import re
import sys
from pypdf import PdfReader, PdfWriter

if sys.argv[1] == '--scan':  # gate helper: print original pages (final numbering) whose text has '__' or brackets
    pages = PdfReader(sys.argv[2]).pages
    for i, key in enumerate(sys.argv[3].split(',')):
        t = pages[int(key[1:]) - 1].extract_text() if key[0] == 'o' else ''
        hit = re.search(r'.{0,40}(__|\[|\]).{0,40}', t or '')
        if hit:
            print(f'page {i + 1}: {hit.group(0)}')
    sys.exit(0)
if sys.argv[1] == '--px':  # build.js helper: colour of original page p at (x, y) pt, for patches with fill 'auto'
    import json, subprocess, tempfile
    from PIL import Image
    out, tmp = [], tempfile.mkdtemp()
    for p, x, y in json.loads(sys.argv[3]):
        subprocess.run(['pdftoppm', '-r', '72', '-f', str(p), '-l', str(p), '-singlefile', '-png', sys.argv[2], f'{tmp}/p{p}'], check=True)
        out.append('#%02X%02X%02X' % Image.open(f'{tmp}/p{p}.png').convert('RGB').getpixel((x, y))[:3])
    print(json.dumps(out))
    sys.exit(0)
orig, new, ov, out, order = sys.argv[1:6]
src = {'o': PdfReader(orig).pages, 'n': PdfReader(new).pages}
ovp = PdfReader(ov).pages
order = order.split(',')
assert len(ovp) == len(order), f'{len(ovp)} overlays for {len(order)} pages'
w = PdfWriter()
for i, key in enumerate(order):
    page = w.add_page(src[key[0]][int(key[1:]) - 1])
    page.merge_page(ovp[i])
w.write(out)
print(f'{out}: {len(order)} pages')
