#!/usr/bin/env python3
"""Build one self-contained HTML from v2/: fonts, css, index scripts, and every feature + lesson in v2/modules/registry.js.
Usage: python3 tools/build-hosted.py OUT.html"""
import base64, json, re, sys
from pathlib import Path

V2 = Path(__file__).resolve().parent.parent / 'v2'
MIME = {'.ttf': 'font/ttf', '.woff2': 'font/woff2'}

def js(text):
    return '<script>\n' + text.replace('</script', '<\\/script') + '\n</script>'

def font(m):
    f = (V2 / 'css' / m.group(1)).resolve()
    return 'url(data:%s;base64,%s)' % (MIME[f.suffix], base64.b64encode(f.read_bytes()).decode())

def main(out):
    html = (V2 / 'index.html').read_text(encoding='utf-8')
    reg_src = (V2 / 'modules/registry.js').read_text(encoding='utf-8')
    reg = json.loads(reg_src.split('window.LumioRegistry=', 1)[1].strip().rstrip(';'))
    # fonts are inlined, so drop the Google Fonts links
    html = re.sub(r'<link rel="(preconnect|stylesheet)" href="https://fonts\.[^>]*>\n?', '', html)
    css = re.sub(r'url\((\.\./fonts/[^)]+)\)', font, (V2 / 'css/tokens.css').read_text(encoding='utf-8'))
    html = html.replace('<link rel="stylesheet" href="css/tokens.css">', '<style>\n' + css + '\n</style>')
    extra = [V2 / 'js' / (f + '.js') for f in reg.get('features', [])]
    extra += [V2 / 'modules' / (k + '.js') for k in reg.get('lessons', []) if isinstance(k, str)]
    missing = [str(p.relative_to(V2)) for p in extra if not p.exists()]
    extra = [p for p in extra if p.exists()]

    def inline(m):
        src = m.group(1)
        body = (V2 / src).read_text(encoding='utf-8')
        if src == 'modules/registry.js':
            body += '\nLumioRegistry.inline=1;'
        return js(body)
    html = re.sub(r'<script src="([^"]+)"></script>', lambda m: inline(m), html)
    tail = '\n'.join(js(p.read_text(encoding='utf-8')) for p in extra)
    html = html.replace('</body>', tail + '\n</body>', 1)
    Path(out).write_text(html, encoding='utf-8')
    print('wrote %s (%d KB), %d registry files inlined%s' % (out, len(html.encode()) // 1024, len(extra),
          ('; missing (skipped): ' + ', '.join(missing)) if missing else ''))

if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
