// Captures the results + chart area and saves it as a PDF report.
import { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function ExportButton({ targetRef }) {
  const [busy, setBusy] = useState(false)

  const handleExport = async () => {
    const node = targetRef.current
    if (!node) return

    setBusy(true)
    try {
      // Render the results + chart area to an image (elements marked
      // data-html2canvas-ignore, like this button, are skipped).
      const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#ffffff' })
      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF('p', 'pt', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const margin = 40

      // Heading
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(22)
      pdf.setTextColor('#1a1a2e')
      pdf.text('ROI Analysis Report', margin, 52)

      // Current date, e.g. "January 15, 2025"
      const now = new Date()
      const dateLong = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(12)
      pdf.setTextColor('#6b7280')
      pdf.text(dateLong, margin, 72)

      // Captured results + chart, scaled to fit the page width
      const imgWidth = pageWidth - margin * 2
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', margin, 92, imgWidth, imgHeight)

      // Filename: roi-report-YYYY-MM-DD.pdf
      const yyyy = now.getFullYear()
      const mm = String(now.getMonth() + 1).padStart(2, '0')
      const dd = String(now.getDate()).padStart(2, '0')
      pdf.save(`roi-report-${yyyy}-${mm}-${dd}.pdf`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button className="export-btn" onClick={handleExport} disabled={busy}>
      {busy ? 'Generating PDF…' : 'Export to PDF'}
    </button>
  )
}

export default ExportButton
