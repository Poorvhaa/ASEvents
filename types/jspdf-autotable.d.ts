declare module 'jspdf-autotable' {
  import type { jsPDF } from 'jspdf'

  interface AutoTableOptions {
    startY?: number
    head?: string[][]
    body?: string[][]
    margin?: { top?: number; right?: number; bottom?: number; left?: number }
    theme?: 'striped' | 'grid' | 'plain'
    headStyles?: Record<string, unknown>
    bodyStyles?: Record<string, unknown>
    alternateRowStyles?: Record<string, unknown>
    styles?: Record<string, unknown>
  }

  export default function autoTable(doc: jsPDF, options: AutoTableOptions): void
}
