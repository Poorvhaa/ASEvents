// Touched to invalidate next.js json bundle cache
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { ProposalDocument } from '@/services/pdfService'
import { formatINR, computeDisplayTotal } from '@/lib/currency/format-inr'
import en from '@/src/locales/en.json'
import hi from '@/src/locales/hi.json'
import gu from '@/src/locales/gu.json'

const translations: Record<string, any> = {
  en,
  hi,
  gu,
}

function getTranslator(lang?: string) {
  const language = (lang && ['en', 'hi', 'gu'].includes(lang) ? lang : 'en') as 'en' | 'hi' | 'gu'
  const localeData = translations[language]

  return (key: string): string => {
    const keys = key.split('.')
    let val: any = localeData

    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) {
        val = val[k]
      } else {
        val = undefined
        break
      }
    }

    if (val !== undefined && typeof val === 'string') {
      return val
    }

    // Fallback to English
    let fallbackVal: any = translations['en']
    for (const k of keys) {
      if (fallbackVal && typeof fallbackVal === 'object' && k in fallbackVal) {
        fallbackVal = fallbackVal[k]
      } else {
        fallbackVal = undefined
        break
      }
    }

    if (fallbackVal !== undefined && typeof fallbackVal === 'string') {
      return fallbackVal
    }

    return key
  }
}

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

const fontCache: Record<string, { regular: string; bold: string }> = {}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

async function registerUnicodeFonts(doc: jsPDF, lang?: string): Promise<void> {
  const language = (lang && ['en', 'hi', 'gu'].includes(lang) ? lang : 'en') as 'en' | 'hi' | 'gu'
  
  if (!fontCache[language]) {
    let regularUrl = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Regular.ttf'
    let boldUrl = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Bold.ttf'
    
    if (language === 'hi') {
      regularUrl = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Regular.ttf'
      boldUrl = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Bold.ttf'
    } else if (language === 'gu') {
      regularUrl = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansGujarati/NotoSansGujarati-Regular.ttf'
      boldUrl = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansGujarati/NotoSansGujarati-Bold.ttf'
    }
    
    const [regularRes, boldRes] = await Promise.all([
      fetch(regularUrl),
      fetch(boldUrl),
    ])

    if (!regularRes.ok || !boldRes.ok) {
      throw new Error(`Failed to load PDF fonts for ${language}`)
    }

    fontCache[language] = {
      regular: arrayBufferToBase64(await regularRes.arrayBuffer()),
      bold: arrayBufferToBase64(await boldRes.arrayBuffer()),
    }
  }

  const cache = fontCache[language]
  doc.addFileToVFS('NotoSans-Regular.ttf', cache.regular)
  doc.addFileToVFS('NotoSans-Bold.ttf', cache.bold)
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

function addPageFooters(doc: jsPDF, t: (key: string) => string): void {
  const total = doc.getNumberOfPages()
  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    setFont(doc, 'normal', 7)
    setMuted(doc)
    doc.text(t('pdf.preparedBy'), MARGIN + CONTENT_WIDTH / 2, PAGE_BOTTOM - 4, {
      align: 'center',
    })
    doc.text(
      t('pdf.pageOf')
        .replace('{page}', i.toString())
        .replace('{total}', total.toString()),
      MARGIN + CONTENT_WIDTH / 2,
      PAGE_BOTTOM,
      {
        align: 'center',
      }
    )
  }
}

function drawHeader(doc: jsPDF, proposal: ProposalDocument, t: (key: string) => string): number {
  let y = MARGIN + 4

  setFont(doc, 'bold', 16)
  setNavy(doc)
  doc.text(t('pdf.proposalTitle').toUpperCase(), 105, y, { align: 'center' })
  y += 9

  setFont(doc, 'normal', 9)
  setMuted(doc)
  doc.text(`${t('pdf.quoteNumber')}: ${safe(proposal.quoteNumber)}`, MARGIN, y)
  doc.text(
    `${t('pdf.generated')}: ${new Date(proposal.generatedAt).toLocaleDateString(
      proposal.language === 'hi' ? 'hi-IN' : proposal.language === 'gu' ? 'gu-IN' : 'en-IN',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    )}`,
    MARGIN + CONTENT_WIDTH,
    y,
    { align: 'right' }
  )
  y += 4

  return drawDivider(doc, y)
}

function drawClientSection(doc: jsPDF, proposal: ProposalDocument, y: number, t: (key: string) => string): number {
  y = drawSectionHeading(doc, t('pdf.clientDetails'), y)
  const cardTop = y
  const cardHeight = 34
  drawCardBackground(doc, cardTop, cardHeight)

  const colW = CONTENT_WIDTH / 2 - 4
  const leftX = MARGIN + 5
  const rightX = MARGIN + CONTENT_WIDTH / 2 + 2
  const { name, email, phone, city } = proposal.clientDetails

  let innerY = cardTop + 5
  let leftY = drawKeyValue(doc, t('pdf.labels.name'), name, leftX, innerY, colW)
  let rightY = drawKeyValue(doc, t('pdf.labels.email'), email, rightX, innerY, colW)
  innerY = Math.max(leftY, rightY)
  leftY = drawKeyValue(doc, t('pdf.labels.phone'), phone, leftX, innerY, colW)
  rightY = drawKeyValue(doc, t('pdf.labels.city'), city, rightX, innerY, colW)

  return cardTop + cardHeight + 8
}

function drawEventSummary(doc: jsPDF, proposal: ProposalDocument, y: number, t: (key: string) => string): number {
  y = drawSectionHeading(doc, t('pdf.eventSummary'), y)
  const cardTop = y
  const cardHeight = 44
  drawCardBackground(doc, cardTop, cardHeight)

  const colW = CONTENT_WIDTH / 2 - 4
  const leftX = MARGIN + 5
  const rightX = MARGIN + CONTENT_WIDTH / 2 + 2
  const s = proposal.eventSummary

  let innerY = cardTop + 5
  let leftY = drawKeyValue(doc, t('pdf.labels.eventType'), s.eventType, leftX, innerY, colW)
  let rightY = drawKeyValue(doc, t('pdf.labels.eventDate'), s.eventDate, rightX, innerY, colW)
  innerY = Math.max(leftY, rightY)
  leftY = drawKeyValue(doc, t('pdf.labels.guestCount'), s.guestCount, leftX, innerY, colW)
  rightY = drawKeyValue(doc, t('pdf.labels.venuePreference'), s.venuePreference, rightX, innerY, colW)
  innerY = Math.max(leftY, rightY)
  leftY = drawKeyValue(doc, t('pdf.labels.specialRequirements'), s.specialRequirements, leftX, innerY, CONTENT_WIDTH - 10)

  return cardTop + cardHeight + 8
}

function drawRecommendedPackage(doc: jsPDF, proposal: ProposalDocument, y: number, t: (key: string) => string): number {
  y = drawSectionHeading(doc, t('pdf.recommendedPackage'), y)
  y = ensureSpace(doc, y, 20)

  doc.setFillColor(...COLORS.goldLight)
  doc.setDrawColor(...COLORS.gold)
  doc.setLineWidth(0.4)
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 16, 2, 2, 'FD')

  setFont(doc, 'bold', 13)
  setNavy(doc)
  const pkgId = proposal.packageRecommendation.id
  const pkgName = pkgId ? t(`packages.${pkgId}.title`) : proposal.packageRecommendation.name
  const displayName = pkgName.startsWith('packages.') ? proposal.packageRecommendation.name : pkgName
  doc.text(safe(displayName), MARGIN + 5, y + 10)

  return y + 24
}

function drawPackageInclusions(doc: jsPDF, proposal: ProposalDocument, y: number, t: (key: string) => string): number {
  y = drawSectionHeading(doc, t('pdf.packageInclusions'), y)
  const inclusions = proposal.packageRecommendation.inclusions

  if (inclusions.length === 0) {
    setFont(doc, 'normal', 9)
    setNavy(doc)
    doc.text('N/A', MARGIN + 2, y + 2)
    return y + 8
  }

  setFont(doc, 'normal', 9)
  setNavy(doc)
  inclusions.forEach((item, index) => {
    y = ensureSpace(doc, y, 6)
    const pkgId = proposal.packageRecommendation.id
    const key = `packages.${pkgId}.includedServices.${index}`
    const translated = pkgId ? t(key) : item
    const displayItem = translated.startsWith('packages.') ? item : translated
    doc.text(`• ${safe(displayItem)}`, MARGIN + 2, y)
    y += 5
  })

  return y + 4
}

// Recommended budget range section removed

/*function drawCostBreakdown(doc: jsPDF, proposal: ProposalDocument, y: number, t: (key: string) => string): number {
  y = drawSectionHeading(doc, t('pdf.estimatedCostBreakdown'), y)

  const b = proposal.budgetEstimate
  const total = computeDisplayTotal(b) ?? b.total

   const lines = [
    [t('pdf.labels.venue'), formatINR(b.venue)],
    [t('pdf.labels.decor'), formatINR(b.decor)],
    [t('pdf.labels.catering'), formatINR(b.food)],
    [t('pdf.labels.entertainment'), formatINR(b.entertainment)],
    [t('pdf.labels.contingency'), formatINR(b.contingency)],
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
  doc.text(`${t('pdf.totalEventCost')}:`, MARGIN + 2, y)
  doc.text(formatINR(total), MARGIN + 45, y)

  return y + 10
}*/

function drawTimelineSection(doc: jsPDF, proposal: ProposalDocument, y: number, t: (key: string) => string): number {
  y = drawSectionHeading(doc, t('pdf.eventTimeline'), y)

  setFont(doc, 'bold', 12)
  setNavy(doc)

  let timelineText = proposal.timeline
  if (proposal.language === 'hi') {
    timelineText = timelineText
      .replace(/Weeks/gi, 'सप्ताह')
      .replace(/Week/gi, 'सप्ताह')
      .replace(/Months/gi, 'महीने')
      .replace(/Month/gi, 'महीना')
      .replace(/Days/gi, 'दिन')
      .replace(/Day/gi, 'दिन')
      .replace(/Hours/gi, 'घंटे')
      .replace(/Hour/gi, 'घंटा')
  } else if (proposal.language === 'gu') {
    timelineText = timelineText
      .replace(/Weeks/gi, 'અઠવાડિયા')
      .replace(/Week/gi, 'અઠવાડિયું')
      .replace(/Months/gi, 'મહિના')
      .replace(/Month/gi, 'મહિનો')
      .replace(/Days/gi, 'દિવસો')
      .replace(/Day/gi, 'દિવસ')
      .replace(/Hours/gi, 'કલાક')
      .replace(/Hour/gi, 'કલાક')
  }

  doc.text(safe(timelineText), MARGIN + 2, y)

  return y + 10
}

function drawVenueTable(doc: jsPDF, proposal: ProposalDocument, y: number, t: (key: string) => string): number {
  y = drawSectionHeading(doc, t('pdf.venueSuggestions'), y)
  y = ensureSpace(doc, y, 30)

  const fallbackVenueLabel = proposal.language === 'hi'
    ? 'हमारी टीम के साथ शॉर्टलिस्ट किया जाना है'
    : proposal.language === 'gu'
    ? 'અમારી ટીમ સાથે શોર્ટલિસ્ટ કરવાનું બાકી છે'
    : 'To be shortlisted with our team'

  const rows =
    proposal.venueSuggestions.length > 0
      ? proposal.venueSuggestions.map((v) => {
          const nameKey = v.slug ? `venues.${v.slug}.name` : ''
          const locKey = v.slug ? `venues.${v.slug}.location` : ''
          
          const translatedName = nameKey ? t(nameKey) : ''
          const translatedLoc = locKey ? t(locKey) : ''
          
          let displayLocation = v.location
          if (v.slug && translatedLoc && translatedLoc !== locKey) {
            const cityPart = v.location.split(', ').pop()
            const translatedCity = cityPart ? t(`cities.${cityPart}`) : ''
            if (translatedCity && translatedCity !== `cities.${cityPart}`) {
              displayLocation = `${translatedLoc}, ${translatedCity}`
            } else {
              displayLocation = translatedLoc
            }
          }
          
          return [
            safe(translatedName && translatedName !== nameKey ? translatedName : v.name),
            safe(displayLocation),
            safe(v.startingCost),
          ]
        })
      : [[fallbackVenueLabel, safe(proposal.clientDetails.city), 'N/A']]

  autoTable(doc, {
    startY: y,
    head: [[t('pdf.labels.venueName'), t('pdf.labels.location'), t('pdf.labels.startingCost')]],
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

function drawContactFooter(doc: jsPDF, y: number, t: (key: string) => string, lang?: string): number {
  y = ensureSpace(doc, y, 55)
  y = drawDivider(doc, y)

  setFont(doc, 'bold', 12)
  setNavy(doc)
  doc.text('AS Events', 105, y, { align: 'center' })
  y += 7

  setFont(doc, 'normal', 9)
  setNavy(doc)

  const emailLabel = lang === 'hi' ? 'ईमेल' : lang === 'gu' ? 'ઇમેઇલ' : 'Email'
  const phoneLabel = lang === 'hi' ? 'फ़ोन' : lang === 'gu' ? 'ફોન' : 'Phone'
  const websiteLabel = lang === 'hi' ? 'वेबसाइट' : lang === 'gu' ? 'વેબસાઇટ' : 'Website'
  const addressLabel = lang === 'hi' ? 'पता' : lang === 'gu' ? 'સરનામું' : 'Address'
  const addressVal = t('footer.address')

  const contactLines = [
    `${emailLabel}: as.eventmanagement2829@gmail.com`,
    `${phoneLabel}: +91 95103 24143`,
    `${websiteLabel}: www.asevents.in`,
    `${addressLabel}: ${addressVal}`,
  ]
  contactLines.forEach((line) => {
    const lines = doc.splitTextToSize(line, CONTENT_WIDTH)
    lines.forEach((l: string) => {
      doc.text(l, 105, y, { align: 'center' })
      y += 5
    })
  })

  y += 1
  y = ensureSpace(doc, y, 30)

  const qrSize = 22
  const qrX = (210 - qrSize) / 2
  doc.setDrawColor(...COLORS.gold)
  doc.setLineWidth(0.5)
  doc.rect(qrX, y, qrSize, qrSize)
  setFont(doc, 'normal', 7)
  setMuted(doc)

  const qrLabel = lang === 'hi' ? 'व्हाट्सएप क्यूआर' : lang === 'gu' ? 'વોટ્સએપ ક્યુઆર' : 'WhatsApp QR'
  const soonLabel = lang === 'hi' ? '(जल्द ही आ रहा है)' : lang === 'gu' ? '(ટૂંક સમયમાં આવી રહ્યું છે)' : '(Coming Soon)'

  doc.text(qrLabel, 105, y + qrSize / 2 - 1, { align: 'center' })
  doc.text(soonLabel, 105, y + qrSize / 2 + 3, { align: 'center' })

  return y + qrSize + 6
}

export async function generateProposalPDF(proposal: ProposalDocument): Promise<Blob> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  await registerUnicodeFonts(doc, proposal.language)
  setFont(doc, 'normal', 10)
  setNavy(doc)

  const t = getTranslator(proposal.language)

  const localizedTips = proposal.planningTips.map((tip) => {
    if (tip.includes('Book your venue')) return t('aiPlanner.tips.bookEarly')
    if (tip.includes('Allocate 40-50%')) return t('aiPlanner.tips.allocateBudget')
    if (tip.includes('Confirm vendor availability')) return t('aiPlanner.tips.confirmVendor')
    if (tip.includes('Plan haldi')) return t('aiPlanner.tips.coordinateWeddingEvents')
    if (tip.includes('Consider a backup')) return t('aiPlanner.tips.backupIndoor')
    if (tip.includes('Finalize AV')) return t('aiPlanner.tips.finalizeAV')
    if (tip.includes('Schedule a venue walkthrough')) return t('aiPlanner.tips.scheduleWalkthrough')
    if (tip.startsWith("We'll accommodate")) {
      const reqText = tip.replace("We'll accommodate: \"", "").replace("...\"", "")
      return t('aiPlanner.tips.specialRequirements').replace('{req}', reqText)
    }
    return tip
  })

  const localizedSteps = proposal.nextSteps.map((step) => {
    if (step.includes('Submit your details')) return t('aiPlanner.nextSteps.submitDetails')
    if (step.includes('Schedule a free consultation')) return t('aiPlanner.nextSteps.scheduleConsultation')
    if (step.includes('Visit shortlisted venues')) return t('aiPlanner.nextSteps.visitVenues')
    if (step.includes('Review package inclusions')) return t('aiPlanner.nextSteps.reviewPackage')
    return step
  })

  let y = drawHeader(doc, proposal, t)
  y = drawClientSection(doc, proposal, y, t)
  y = drawEventSummary(doc, proposal, y, t)
  y = drawRecommendedPackage(doc, proposal, y, t)
  y = drawPackageInclusions(doc, proposal, y, t)
  y = drawTimelineSection(doc, proposal, y, t)
  y = drawVenueTable(doc, proposal, y, t) + 8
  y = drawBulletList(doc, t('pdf.planningTips'), localizedTips, y)
  y = drawBulletList(doc, t('pdf.nextSteps'), localizedSteps, y, true)
  drawContactFooter(doc, y, t, proposal.language)

  addPageFooters(doc, t)

  return doc.output('blob')
}
