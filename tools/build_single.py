#!/usr/bin/env python3
"""Tek dosyalık sürüm üretir: CSS ve bütün JS, three.js'i içe aktaran modülün içine gömülür.

Kullanım:
  python3 tools/build_single.py                 -> dist/pacman-arka-odalar.html (tam HTML belgesi)
  python3 tools/build_single.py --fragment OUT  -> <html>/<head>/<body> etiketleri olmadan (artifact için)
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def build(fragment=False):
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    css = (ROOT / 'css' / 'game.css').read_text(encoding='utf-8')
    scripts = re.findall(r'<script defer src="(js/[^"]+)"></script>', html)
    code = []
    for src in scripts:
        body = (ROOT / src).read_text(encoding='utf-8')
        code.append(f'// ---- {src}\n{body}')
    joined = '\n'.join(code).replace('</script', '<\\/script')
    module = (
        '<script type="module">\n'
        "import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js';\n"
        'window.THREE = THREE;\n'
        f'{joined}\n'
        '</script>'
    )
    html = html.replace('<link rel="stylesheet" href="css/game.css">', f'<style>\n{css}\n</style>')
    # Harici betik etiketlerini ve ayrı modülü kaldır, yerine tek modülü koy
    html = re.sub(r'<!-- 3D motoru.*?</script>\n', '', html, flags=re.S)
    html = re.sub(r'<script defer src="js/[^"]+"></script>\n', '', html)
    html = html.replace('</body>', module + '\n</body>')
    if fragment:
        drop = ['<!DOCTYPE html>', '<html lang="tr">', '<head>', '<meta charset="utf-8">', '</head>', '<body>', '</body>', '</html>']
        lines = []
        for line in html.splitlines():
            s = line.strip()
            if s in drop or s.startswith('<meta name="viewport"'):
                continue
            lines.append(line)
        html = '\n'.join(lines) + '\n'
    return html


if __name__ == '__main__':
    if len(sys.argv) > 2 and sys.argv[1] == '--fragment':
        out = Path(sys.argv[2])
        out.write_text(build(fragment=True), encoding='utf-8')
    else:
        out = ROOT / 'dist' / 'pacman-arka-odalar.html'
        out.parent.mkdir(exist_ok=True)
        out.write_text(build(), encoding='utf-8')
    print(f'{out} ({out.stat().st_size // 1024} KB)')
