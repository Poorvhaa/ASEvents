import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { ProposalDocument } from '@/services/pdfService'
import { formatINR, computeDisplayTotal } from '@/lib/currency/format-inr'

const MARGIN = 14
const CONTENT_WIDTH = 182
const PAGE_BOTTOM = 275
const FONT = 'NotoSans'

const COLORS = {
  navy: [15, 23, 42] as const,
  gold: [201, 162, 39] as const,
  white: [255, 255, 255] as const,
  slate: [100, 116, 139] as const,
  cardBg: [248, 250, 252] as const,
  cardBorder: [226, 232, 240] as const,
  goldLight: [254, 249, 235] as const,
}

let regularFontB64: string | null = null
let boldFontB64: string | null = null

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

async function registerUnicodeFonts(doc: jsPDF): Promise<void> {
  if (!regularFontB64) {
    const [regularRes, boldRes] = await Promise.all([
      fetch(
        'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Regular.ttf'
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Bold.ttf'
      ),
    ])

    if (!regularRes.ok || !boldRes.ok) {
      throw new Error('Failed to load PDF fonts')
    }

    regularFontB64 = arrayBufferToBase64(await regularRes.arrayBuffer())
    boldFontB64 = arrayBufferToBase64(await boldRes.arrayBuffer())
  }

  doc.addFileToVFS('NotoSans-Regular.ttf', regularFontB64)
  doc.addFileToVFS('NotoSans-Bold.ttf', boldFontB64)
  doc.addFont('NotoSans-Regular.ttf', FONT, 'normal')
  doc.addFont('NotoSans-Bold.ttf', FONT, 'bold')
}

function setFont(doc: jsPDF, style: 'normal' | 'bold' = 'normal', size = 10) {
  doc.setFont(FONT, style)
  doc.setFontSize(size)
}

function setNavy(doc: jsPDF) {
  doc.setTextColor(...COLORS.navy)
}

function setGold(doc: jsPDF) {
  doc.setTextColor(...COLORS.gold)
}

function setMuted(doc: jsPDF) {
  doc.setTextColor(...COLORS.slate)
}

function safe(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return 'N/A'
  const text = String(value).trim()
  if (!text || text === 'undefined' || text === 'null' || text === 'NaN') return 'N/A'
  return text
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_BOTTOM) {
    doc.addPage()
    return MARGIN + 4
  }
  return y
}

function drawDivider(doc: jsPDF, y: number): number {
  doc.setDrawColor(...COLORS.gold)
  doc.setLineWidth(0.6)
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y)
  return y + 6
}

function drawSectionHeading(doc: jsPDF, title: string, y: number): number {
  y = ensureSpace(doc, y, 14)
  setGold(doc)
  setFont(doc, 'bold', 11)
  doc.text(title.toUpperCase(), MARGIN, y)
  setNavy(doc)
  return y + 6
}

function drawCardBackground(doc: jsPDF, y: number, height: number): void {
  doc.setFillColor(...COLORS.cardBg)
  doc.setDrawColor(...COLORS.cardBorder)
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, height, 2, 2, 'FD')
}

function drawKeyValue(
  doc: jsPDF,
  label: string,
  value: string,
  x: number,
  y: number,
  colWidth: number
): number {
  setFont(doc, 'bold', 8)
  setMuted(doc)
  doc.text(label, x, y)
  setFont(doc, 'normal', 10)
  setNavy(doc)
  const lines = doc.splitTextToSize(safe(value), colWidth - 2)
  doc.text(lines, x, y + 4.5)
  return y + 4.5 + lines.length * 4.5 + 3
}

function addPageFooters(doc: jsPDF): void {
  const total = doc.getNumberOfPages()
  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    setFont(doc, 'normal', 7)
    setMuted(doc)
    doc.text('Prepared by AS Events AI Consultant', MARGIN + CONTENT_WIDTH / 2, PAGE_BOTTOM - 4, {
      align: 'center',
    })
    doc.text(`Page ${i} of ${total}`, MARGIN + CONTENT_WIDTH / 2, PAGE_BOTTOM, {
      align: 'center',
    })
  }
}

function drawHeader(doc: jsPDF, proposal: ProposalDocument): number {
  let y = MARGIN + 4

  setFont(doc, 'bold', 16)
  setNavy(doc)
  doc.text('PERSONALIZED EVENT PROPOSAL', 105, y, { align: 'center' })
  y += 9

  setFont(doc, 'normal', 9)
  setMuted(doc)
  doc.text(`Quote Number: ${safe(proposal.quoteNumber)}`, MARGIN, y)
  doc.text(
    `Generated: ${new Date(proposal.generatedAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`,
    MARGIN + CONTENT_WIDTH,
    y,
    { align: 'right' }
  )
  y += 4

  return drawDivider(doc, y)
}

function drawClientSection(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Client Details', y)
  const cardTop = y
  const cardHeight = 34
  drawCardBackground(doc, cardTop, cardHeight)

  const colW = CONTENT_WIDTH / 2 - 4
  const leftX = MARGIN + 5
  const rightX = MARGIN + CONTENT_WIDTH / 2 + 2
  const { name, email, phone, city } = proposal.clientDetails

  let innerY = cardTop + 5
  let leftY = drawKeyValue(doc, 'Name', name, leftX, innerY, colW)
  let rightY = drawKeyValue(doc, 'Email', email, rightX, innerY, colW)
  innerY = Math.max(leftY, rightY)
  leftY = drawKeyValue(doc, 'Phone', phone, leftX, innerY, colW)
  rightY = drawKeyValue(doc, 'City', city, rightX, innerY, colW)

  return cardTop + cardHeight + 8
}

function drawEventSummary(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Event Summary', y)
  const cardTop = y
  const cardHeight = 44
  drawCardBackground(doc, cardTop, cardHeight)

  const colW = CONTENT_WIDTH / 2 - 4
  const leftX = MARGIN + 5
  const rightX = MARGIN + CONTENT_WIDTH / 2 + 2
  const s = proposal.eventSummary

  let innerY = cardTop + 5
  let leftY = drawKeyValue(doc, 'Event Type', s.eventType, leftX, innerY, colW)
  let rightY = drawKeyValue(doc, 'Event Date', s.eventDate, rightX, innerY, colW)
  innerY = Math.max(leftY, rightY)
  leftY = drawKeyValue(doc, 'Guest Count', s.guestCount, leftX, innerY, colW)
  rightY = drawKeyValue(doc, 'Budget', s.budget, rightX, innerY, colW)
  innerY = Math.max(leftY, rightY)
  leftY = drawKeyValue(doc, 'Venue Preference', s.venuePreference, leftX, innerY, colW)
  rightY = drawKeyValue(doc, 'Special Requirements', s.specialRequirements, rightX, innerY, colW)

  return cardTop + cardHeight + 8
}

function drawRecommendedPackage(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Recommended Package', y)
  y = ensureSpace(doc, y, 20)

  doc.setFillColor(...COLORS.goldLight)
  doc.setDrawColor(...COLORS.gold)
  doc.setLineWidth(0.4)
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 16, 2, 2, 'FD')

  setFont(doc, 'bold', 13)
  setNavy(doc)
  doc.text(safe(proposal.packageRecommendation.name), MARGIN + 5, y + 10)

  return y + 24
}

function drawPackageInclusions(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Package Inclusions', y)
  const inclusions = proposal.packageRecommendation.inclusions

  if (inclusions.length === 0) {
    setFont(doc, 'normal', 9)
    setNavy(doc)
    doc.text('N/A', MARGIN + 2, y + 2)
    return y + 8
  }

  setFont(doc, 'normal', 9)
  setNavy(doc)
  inclusions.forEach((item) => {
    y = ensureSpace(doc, y, 6)
    doc.text(`• ${safe(item)}`, MARGIN + 2, y)
    y += 5
  })

  return y + 4
}

function drawBudgetRange(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Budget Estimate', y)
  y = drawSectionHeading(doc, 'Recommended Budget Range', y)

  setFont(doc, 'bold', 12)
  setNavy(doc)
  doc.text(safe(proposal.budgetRange), MARGIN + 2, y)
  return y + 10
}

function drawCostBreakdown(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Estimated Cost Breakdown', y)

  const b = proposal.budgetEstimate
  const total = computeDisplayTotal(b) ?? b.total

  const lines = [
    ['Venue', formatINR(b.venue)],
    ['Decor', formatINR(b.decor)],
    ['Catering', formatINR(b.food)],
    ['Entertainment', formatINR(b.entertainment)],
    ['Contingency', formatINR(b.contingency)],
  ]

  setFont(doc, 'normal', 10)
  setNavy(doc)

  lines.forEach(([label, amount]) => {
    y = ensureSpace(doc, y, 6)
    doc.text(`${label}:`, MARGIN + 2, y)
    doc.text(safe(amount), MARGIN + 45, y)
    y += 6
  })

  y = ensureSpace(doc, y, 8)
  setFont(doc, 'bold', 11)
  doc.text('Total Event Cost:', MARGIN + 2, y)
  doc.text(formatINR(total), MARGIN + 45, y)

  return y + 10
}

function drawTimelineSection(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Event Timeline', y)

  setFont(doc, 'bold', 12)
  setNavy(doc)
  doc.text(safe(proposal.timeline), MARGIN + 2, y)

  return y + 10
}

function drawVenueTable(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Venue Suggestions', y)
  y = ensureSpace(doc, y, 30)

  const rows =
    proposal.venueSuggestions.length > 0
      ? proposal.venueSuggestions.map((v) => [
          safe(v.name),
          safe(v.location),
          safe(v.startingCost),
        ])
      : [['To be shortlisted with our team', safe(proposal.clientDetails.city), 'N/A']]

  autoTable(doc, {
    startY: y,
    head: [['Venue Name', 'Location', 'Starting Cost']],
    body: rows,
    margin: { left: MARGIN, right: MARGIN },
    theme: 'grid',
    headStyles: {
      fillColor: [...COLORS.navy],
      textColor: [...COLORS.white],
      fontStyle: 'bold',
      fontSize: 9,
      font: FONT,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [...COLORS.navy],
      font: FONT,
    },
    alternateRowStyles: {
      fillColor: [...COLORS.cardBg],
    },
    styles: {
      cellPadding: 3,
      lineColor: [...COLORS.cardBorder],
      lineWidth: 0.2,
      font: FONT,
    },
  })

  return (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y + 20
}

function drawBulletList(
  doc: jsPDF,
  title: string,
  items: string[],
  y: number,
  numbered = false
): number {
  y = drawSectionHeading(doc, title, y) + 2
  y = ensureSpace(doc, y, items.length * 5 + 8)

  setFont(doc, 'normal', 9)
  setNavy(doc)

  items.forEach((item, index) => {
    y = ensureSpace(doc, y, 6)
    const prefix = numbered ? `${index + 1}. ` : '• '
    const lines = doc.splitTextToSize(prefix + safe(item), CONTENT_WIDTH - 4)
    doc.text(lines, MARGIN + 2, y)
    y += lines.length * 4.5 + 1
  })

  return y + 4
}

function drawContactFooter(doc: jsPDF, y: number): number {
  y = ensureSpace(doc, y, 55)
  y = drawDivider(doc, y)

  setFont(doc, 'bold', 12)
  setNavy(doc)
  doc.text('AS Events', 105, y, { align: 'center' })
  y += 7

  setFont(doc, 'normal', 9)
  setNavy(doc)

  const contactLines = [
    'Email: as.eventmanagement2829@gmail.com',
    'Phone: +91 95103 24143',
    'Website: www.asevents.in',
    'Address: 803-804 Blue Chip Complex, Sayajigunj, Vadodara, Gujarat',
  ]
  contactLines.forEach((line) => {
    doc.text(line, 105, y, { align: 'center' })
    y += 5
  })

  y += 6
  y = ensureSpace(doc, y, 30)

  const qrSize = 22
  const qrX = (210 - qrSize) / 2
  doc.setDrawColor(...COLORS.gold)
  doc.setLineWidth(0.5)
  doc.rect(qrX, y, qrSize, qrSize)
  setFont(doc, 'normal', 7)
  setMuted(doc)
  doc.text('WhatsApp QR', 105, y + qrSize / 2 - 1, { align: 'center' })
  doc.text('(Coming Soon)', 105, y + qrSize / 2 + 3, { align: 'center' })

  return y + qrSize + 6
}

export async function generateProposalPDF(proposal: ProposalDocument): Promise<Blob> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  await registerUnicodeFonts(doc)
  setFont(doc, 'normal', 10)
  setNavy(doc)

  let y = drawHeader(doc, proposal)
  y = drawClientSection(doc, proposal, y)
  y = drawEventSummary(doc, proposal, y)
  y = drawRecommendedPackage(doc, proposal, y)
  y = drawPackageInclusions(doc, proposal, y)
  y = drawBudgetRange(doc, proposal, y)
  y = drawCostBreakdown(doc, proposal, y)
  y = drawTimelineSection(doc, proposal, y)
  y = drawVenueTable(doc, proposal, y) + 8
  y = drawBulletList(doc, 'Planning Tips', proposal.planningTips, y)
  y = drawBulletList(doc, 'Next Steps', proposal.nextSteps, y, true)
  drawContactFooter(doc, y)

  addPageFooters(doc)

  return doc.output('blob')
}
