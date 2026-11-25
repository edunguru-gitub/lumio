"""Merge for the stage II deck: python3 merge.py original.pdf new.pdf overlays.pdf out.pdf o1,o2,n1,...
Old pages are kept as they are (same image, same size); each final page gets its overlay page stamped on top."""
import sys
from pypdf import PdfReader, PdfWriter

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
