import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { ProposalDocument } from '@/services/pdfService'

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 11, color: '#0F172A' },
  title: { fontSize: 22, marginBottom: 8, color: '#2563EB', fontFamily: 'Helvetica-Bold' },
  subtitle: { fontSize: 12, marginBottom: 20, color: '#64748B' },
  sectionTitle: { fontSize: 14, marginTop: 16, marginBottom: 8, fontFamily: 'Helvetica-Bold' },
  row: { marginBottom: 4 },
  bullet: { marginLeft: 12, marginBottom: 3 },
  footer: { marginTop: 30, fontSize: 9, color: '#94A3B8' },
})

interface ProposalPdfProps {
  doc: ProposalDocument
}

export function ProposalPdfDocument({ doc }: ProposalPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AS Events — Event Proposal</Text>
        <Text style={styles.subtitle}>
          Quote {doc.quoteNumber} · {new Date(doc.generatedAt).toLocaleDateString('en-IN')}
        </Text>

        <Text style={styles.sectionTitle}>Event Summary</Text>
        <Text style={styles.row}>Type: {doc.eventSummary.eventType}</Text>
        <Text style={styles.row}>Date: {doc.eventSummary.eventDate}</Text>
        <Text style={styles.row}>Guests: {doc.eventSummary.guestCount}</Text>
        <Text style={styles.row}>Budget: {doc.eventSummary.budget}</Text>
        <Text style={styles.row}>Venue Preference: {doc.eventSummary.venuePreference}</Text>

        <Text style={styles.sectionTitle}>Recommended Package</Text>
        <Text style={styles.row}>{doc.packageRecommendation.name}</Text>
        {doc.packageRecommendation.inclusions.map((item) => (
          <Text key={item} style={styles.bullet}>
            • {item}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Budget Estimate</Text>
        <Text style={styles.row}>{doc.budgetRange}</Text>
        <Text style={styles.row}>Timeline: {doc.timeline}</Text>

        <Text style={styles.sectionTitle}>Venue Suggestions</Text>
        {doc.venueSuggestions.map((v) => (
          <Text key={v.name} style={styles.bullet}>
            • {v.name} — {v.location} ({v.startingCost})
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Planning Timeline</Text>
        {doc.planningTips.map((tip) => (
          <Text key={tip} style={styles.bullet}>
            • {tip}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Next Steps</Text>
        {doc.nextSteps.map((step, i) => (
          <Text key={step} style={styles.bullet}>
            {i + 1}. {step}
          </Text>
        ))}

        <Text style={styles.footer}>
          AS Events · as.eventmanagement2829@gmail.com · Vadodara, Gujarat
        </Text>
      </Page>
    </Document>
  )
}
