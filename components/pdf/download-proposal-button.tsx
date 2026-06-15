'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { downloadProposalAsPDF } from '@/services/pdfService'
import type { ProposalDocument } from '@/services/pdfService'
import { useTranslation } from '@/src/hooks/useTranslation'

interface DownloadProposalButtonProps {
  document: ProposalDocument
  className?: string
}

export function DownloadProposalButton({ document, className }: DownloadProposalButtonProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDownload = async () => {
    setLoading(true)
    setError('')
    try {
      await downloadProposalAsPDF(document)
    } catch (err) {
      console.error('PDF generation failed:', err)
      setError(t('pdf.failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleDownload}
        disabled={loading}
        className={className}
      >
        <Download size={16} className="mr-2" />
        {loading ? t('pdf.generating') : t('pdf.downloadProposal')}
      </Button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
