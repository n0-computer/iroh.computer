#!/usr/bin/env python3
"""Generate the public subprocessor PDF (requires reportlab and svglib).

Run from any directory: python scripts/generate-subprocessors.py
Update the date here and on the subprocessor page when revising the list.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/legal/subprocessor-list.pdf"
UPDATED = "November 11, 2026"
SUBPROCESSORS = [
    ("N0, Inc.", "Provision of support services"),
    ("Amazon Web Services, Inc.", "Provision of hosting services"),
    ("Blacksmith.sh", "Provision of continuous integration infrastructure"),
    ("Discord", "Communication with Authorized Users in connection with the provision of the Services and support"),
    ("Fastmail", "Email communication with Authorized Users in connection with the provision of the Services and support"),
    ("GitHub, Inc.", "Authorized Users account authentication"),
    ("Google Drive", "Document storage and collaboration"),
    ("Grafana", "Monitoring and observability"),
    ("Hetzner", "Provision of hosting services"),
    ("HubSpot, Inc.", "Communication with Authorized Users in connection with the provision of the Services and support"),
    ("Notion Labs, Inc.", "Communication with Authorized Users in connection with the provision of the Services and support"),
    ("PagerDuty", "Incident management and alerting"),
    ("Slack", "Communication with Authorized Users in connection with the provision of the Services and support"),
    ("Vercel, Inc.", "Provision of hosting services"),
    ("Functional Software, Inc. d/b/a Sentry", "Error monitoring and tracing"),
    ("Plausible", "Provision of customer insight services"),
    ("Zoom", "Video communication with Authorized Users in connection with the provision of the Services and support"),
]


def main():
    pdfmetrics.registerFont(TTFont("Space", ROOT / "public/fonts/space-grotesk.ttf"))
    ink = colors.HexColor("#242329")
    muted = colors.HexColor("#66646d")
    purple = colors.HexColor("#6946c9")
    line = colors.HexColor("#dedbe5")
    body = ParagraphStyle("body", fontName="Space", fontSize=10, leading=15, textColor=ink)
    heading = ParagraphStyle("heading", parent=body, fontSize=30, leading=36, spaceAfter=10)
    date = ParagraphStyle("date", parent=body, fontSize=10, textColor=muted, spaceAfter=22)
    header = ParagraphStyle("header", parent=body, textColor=purple, alignment=TA_LEFT)
    logo = svg2rlg(str(ROOT / "public/img/logo/iroh-wordmark-purple.svg"))
    logo.scale(0.72, 0.72)
    logo.width *= 0.72
    logo.height *= 0.72

    def page_frame(canvas, doc):
        width, height = A4
        renderPDF.draw(logo, canvas, 48, height - 66)
        canvas.setStrokeColor(line)
        canvas.line(48, 55, width - 48, 55)
        canvas.setFont("Space", 9)
        canvas.setFillColor(muted)
        canvas.drawString(48, 38, "iroh.computer")
        canvas.linkURL("https://iroh.computer/legal", (48, 35, 118, 48), relative=0)
        canvas.drawRightString(width - 48, 38, str(doc.page))

    rows = [[Paragraph("Subprocessor", header), Paragraph("Processing activity", header)]]
    rows += [[Paragraph(name, body), Paragraph(activity, body)] for name, activity in SUBPROCESSORS]
    table = Table(rows, colWidths=[199, A4[0] - 96 - 199], repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#f0ebfa")),
        ("LINEBELOW", (0, 0), (-1, 0), 0.8, purple),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, line),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, leftMargin=48, rightMargin=48,
                            topMargin=104, bottomMargin=76, title="Iroh Subprocessor List",
                            author="N0, Inc.", subject="Subprocessors and processing activities")
    doc.build([
        Paragraph("Subprocessor List", heading),
        Paragraph(f"As of {UPDATED}", date),
        Paragraph("The following subprocessors help provide Iroh Services.", body),
        Spacer(1, 22),
        table,
    ], onFirstPage=page_frame, onLaterPages=page_frame)
    print(OUTPUT)


if __name__ == "__main__":
    main()
