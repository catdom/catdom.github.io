"""Traces the "jcd." wordmark from Geist into an SVG path.

Run only when the wordmark's font, weight, size or tracking changes:

    python3 tools/make-wordmark.py            # prints the path and metrics

The glyphs are shaped with HarfBuzz, the same engine the browser uses, so the
advances include the font's own kerning — j/c and c/d are both kerned, and
ignoring that made the mark 0.37px too wide.

BASELINE_U was matched against the live text rendering rather than derived
from the font's metrics: none of hhea, OS/2 typo or usWin* predicted where
Chromium actually puts the baseline in a line-height:1 box, and the intent
here is to reproduce what the text version looked like, exactly.
"""

import io
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

FONT = 'public/fonts/geist-latin.woff2'
TEXT = 'jcd.'
SIZE_PX = 18.4          # 1.15rem
WEIGHT = 600
TRACKING_EM = -0.03
BASELINE_U = 821        # see the note above
BOX_H_U = 1000          # 18.4px at this scale, i.e. the em

font_tt = instantiateVariableFont(TTFont(FONT), {'wght': WEIGHT})
font_tt.flavor = None
raw = io.BytesIO()
font_tt.save(raw)

face = hb.Face(raw.getvalue())
upm = face.upem
buf = hb.Buffer()
buf.add_str(TEXT)
buf.guess_segment_properties()
hb.shape(hb.Font(face), buf)

glyphs = font_tt.getGlyphSet()
names = font_tt.getGlyphOrder()
track_u = TRACKING_EM * upm

commands, x = [], 0.0
for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
    # Flip y (font space is y-up) and drop the glyph onto the baseline.
    move = Transform(1, 0, 0, -1, x + pos.x_offset, BASELINE_U - pos.y_offset)
    pen = SVGPathPen(glyphs, ntos=lambda v: f'{v:.1f}'.rstrip('0').rstrip('.'))
    glyphs[names[info.codepoint]].draw(TransformPen(pen, move))
    if pen.getCommands():
        commands.append(pen.getCommands())
    x += pos.x_advance + track_u

advance_u = x
scale = SIZE_PX / upm

print(f'viewBox="0 0 {advance_u:.0f} {BOX_H_U}"')
print(f'width="{advance_u * scale:.2f}" height="{BOX_H_U * scale:.1f}"')
print()
print(' '.join(commands))
