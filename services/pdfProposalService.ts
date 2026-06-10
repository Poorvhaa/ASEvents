import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { ProposalDocument } from '@/services/pdfService'

const LOGO_PATH = '/clean.png'
const LOGO_WIDTH_MM = 42.3 // ~160px at standard density
const MARGIN = 14
const CONTENT_WIDTH = 182
const PAGE_BOTTOM = 275

const COLORS = {
  navy: [15, 23, 42] as const,
  gold: [201, 162, 39] as const,
  white: [255, 255, 255] as const,
  slate: [100, 116, 139] as const,
  cardBg: [248, 250, 252] as const,
  cardBorder: [226, 232, 240] as const,
  goldLight: [254, 249, 235] as const,
}

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

async function loadImageDataUrl(path: string): Promise<string | null> {
  try {
    const response = await fetch(path)
    if (!response.ok) return null
    const blob = await response.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
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
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
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
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  setMuted(doc)
  doc.text(label, x, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  setNavy(doc)
  const lines = doc.splitTextToSize(value || '—', colWidth - 2)
  doc.text(lines, x, y + 4.5)
  return y + 4.5 + lines.length * 4.5 + 3
}

function addPageFooters(doc: jsPDF): void {
  const total = doc.getNumberOfPages()
  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(7)
    setMuted(doc)
    doc.text('Prepared by AS Events AI Consultant', MARGIN + CONTENT_WIDTH / 2, PAGE_BOTTOM - 4, {
      align: 'center',
    })
    doc.setFont('helvetica', 'normal')
    doc.text(`Page ${i} of ${total}`, MARGIN + CONTENT_WIDTH / 2, PAGE_BOTTOM, {
      align: 'center',
    })
  }
}

function drawHeader(doc: jsPDF, logoDataUrl: string | null, proposal: ProposalDocument): number {
  let y = MARGIN

  if (logoDataUrl) {
    const x = (210 - LOGO_WIDTH_MM) / 2
    doc.addImage(logoDataUrl, 'PNG', x, y, LOGO_WIDTH_MM, LOGO_WIDTH_MM * 0.35)
    y += LOGO_WIDTH_MM * 0.35 + 4
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  setNavy(doc)
  doc.text('AS EVENTS', 105, y, { align: 'center' })
  y += 6

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  setGold(doc)
  doc.text('Luxury Weddings • Corporate Events • Destination Celebrations', 105, y, {
    align: 'center',
  })
  y += 10

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  setNavy(doc)
  doc.text('PERSONALIZED EVENT PROPOSAL', 105, y, { align: 'center' })
  y += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  setMuted(doc)
  doc.text(`Quote: ${proposal.quoteNumber}`, MARGIN, y)
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
  y += 5

  const colW = CONTENT_WIDTH / 2 - 4
  const leftX = MARGIN + 5
  const rightX = MARGIN + CONTENT_WIDTH / 2 + 2
  const { name, email, phone, city } = proposal.clientDetails

  let leftY = drawKeyValue(doc, 'Name', name, leftX, y, colW)
  let rightY = drawKeyValue(doc, 'Email', email, rightX, y, colW)
  y = Math.max(leftY, rightY)
  leftY = drawKeyValue(doc, 'Phone', phone, leftX, y, colW)
  rightY = drawKeyValue(doc, 'City', city, rightX, y, colW)
  y = Math.max(leftY, rightY)

  return cardTop + cardHeight + 8
}

function drawEventSummary(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Event Summary', y)
  const cardTop = y
  const cardHeight = 44
  drawCardBackground(doc, cardTop, cardHeight)
  y += 5

  const colW = CONTENT_WIDTH / 2 - 4
  const leftX = MARGIN + 5
  const rightX = MARGIN + CONTENT_WIDTH / 2 + 2
  const s = proposal.eventSummary

  let leftY = drawKeyValue(doc, 'Event Type', s.eventType, leftX, y, colW)
  let rightY = drawKeyValue(doc, 'Event Date', s.eventDate, rightX, y, colW)
  y = Math.max(leftY, rightY)
  leftY = drawKeyValue(doc, 'Guest Count', s.guestCount, leftX, y, colW)
  rightY = drawKeyValue(doc, 'Budget', s.budget, rightX, y, colW)
  y = Math.max(leftY, rightY)
  leftY = drawKeyValue(doc, 'Venue Preference', s.venuePreference, leftX, y, colW)
  rightY = drawKeyValue(doc, 'Special Requirements', s.specialRequirements, rightX, y, colW)
  y = Math.max(leftY, rightY)

  return cardTop + cardHeight + 8
}

function drawPackageSection(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Recommended Package', y)
  const pkg = proposal.packageRecommendation
  const inclusionsHeight = pkg.inclusions.length * 5 + 8
  const cardHeight = 18 + inclusionsHeight + 10
  y = ensureSpace(doc, y, cardHeight + 10)

  doc.setFillColor(...COLORS.goldLight)
  doc.setDrawColor(...COLORS.gold)
  doc.setLineWidth(0.4)
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, cardHeight, 2, 2, 'FD')

  let innerY = y + 8
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  setNavy(doc)
  doc.text(pkg.name, MARGIN + 5, innerY)
  innerY += 8

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  setGold(doc)
  doc.text('Inclusions', MARGIN + 5, innerY)
  innerY += 5

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  setNavy(doc)
  pkg.inclusions.forEach((item) => {
    doc.text(`• ${item}`, MARGIN + 7, innerY)
    innerY += 5
  })

  innerY += 2
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  setMuted(doc)
  doc.text('Timeline', MARGIN + 5, innerY)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  setNavy(doc)
  doc.text(pkg.timeline, MARGIN + 5, innerY + 4.5)

  return y + cardHeight + 8
}

function drawBudgetSection(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Budget Estimate', y)
  const b = proposal.budgetEstimate
  const cardHeight = 52
  y = ensureSpace(doc, y, cardHeight + 10)
  const cardTop = y
  drawCardBackground(doc, cardTop, cardHeight)

  const colW = CONTENT_WIDTH / 2 - 4
  const leftX = MARGIN + 5
  const rightX = MARGIN + CONTENT_WIDTH / 2 + 2
  let innerY = cardTop + 5

  innerY = drawKeyValue(doc, 'Recommended Budget Range', proposal.budgetRange, leftX, innerY, colW)

  const breakdown = [
    `Venue: ${formatINR(b.venue)}`,
    `Decor: ${formatINR(b.decor)}`,
    `Catering: ${formatINR(b.food)}`,
    `Entertainment: ${formatINR(b.entertainment)}`,
    `Contingency: ${formatINR(b.contingency ?? 0)}`,
    `Total: ${formatINR(b.total)}`,
  ].join('\n')

  drawKeyValue(doc, 'Estimated Cost', breakdown, rightX, cardTop + 5, colW)
  drawKeyValue(
    doc,
    'Event Planning Timeline',
    proposal.timeline,
    leftX,
    cardTop + 30,
    CONTENT_WIDTH - 10
  )

  return cardTop + cardHeight + 8
}

function drawVenueTable(doc: jsPDF, proposal: ProposalDocument, y: number): number {
  y = drawSectionHeading(doc, 'Venue Suggestions', y)
  y = ensureSpace(doc, y, 30)

  const rows =
    proposal.venueSuggestions.length > 0
      ? proposal.venueSuggestions.map((v) => [v.name, v.location, v.startingCost])
      : [['To be shortlisted with our team', proposal.clientDetails.city || 'TBD', 'On request']]

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
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [...COLORS.navy],
    },
    alternateRowStyles: {
      fillColor: [...COLORS.cardBg],
    },
    styles: {
      cellPadding: 3,
      lineColor: [...COLORS.cardBorder],
      lineWidth: 0.2,
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

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  setNavy(doc)

  items.forEach((item, index) => {
    y = ensureSpace(doc, y, 6)
    const prefix = numbered ? `${index + 1}. ` : '• '
    const lines = doc.splitTextToSize(prefix + item, CONTENT_WIDTH - 4)
    doc.text(lines, MARGIN + 2, y)
    y += lines.length * 4.5 + 1
  })

  return y + 4
}

function drawContactFooter(doc: jsPDF, y: number): number {
  y = ensureSpace(doc, y, 55)
  y = drawDivider(doc, y)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  setNavy(doc)
  doc.text('AS Events', 105, y, { align: 'center' })
  y += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
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
  doc.setFontSize(7)
  setMuted(doc)
  doc.text('WhatsApp QR', 105, y + qrSize / 2 - 1, { align: 'center' })
  doc.text('(Coming Soon)', 105, y + qrSize / 2 + 3, { align: 'center' })

  return y + qrSize + 6
}

/**
 * Generates a luxury-branded PDF proposal from a ProposalDocument.
 * Client-side only — call from browser after user interaction.
 */
export async function generateProposalPDF(proposal: ProposalDocument): Promise<Blob> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const logoDataUrl = await loadImageDataUrl(LOGO_PATH)

  let y = drawHeader(doc, logoDataUrl, proposal)
  y = drawClientSection(doc, proposal, y)
  y = drawEventSummary(doc, proposal, y)
  y = drawPackageSection(doc, proposal, y)
  y = drawBudgetSection(doc, proposal, y) + 4
  y = drawVenueTable(doc, proposal, y) + 8
  y = drawBulletList(doc, 'Planning Tips', proposal.planningTips, y)
  y = drawBulletList(doc, 'Next Steps', proposal.nextSteps, y, true)
  drawContactFooter(doc, y)

  addPageFooters(doc)

  return doc.output('blob')
}
