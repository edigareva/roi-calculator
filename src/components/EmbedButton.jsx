// Opens a modal with an <iframe> snippet the user can copy to embed this
// calculator on their own website.
import { useEffect, useState } from 'react'

function EmbedButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [snippet, setSnippet] = useState('')

  const openModal = () => {
    // Build the snippet from the page's current URL at the moment it opens.
    const url = window.location.href
    setSnippet(
      `<iframe src="${url}" width="100%" height="700" frameborder="0" allowfullscreen title="ROI Calculator"></iframe>`
    )
    setCopied(false)
    setOpen(true)
  }

  const closeModal = () => setOpen(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
    } catch {
      // Clipboard may be blocked; the code is still visible to copy manually.
    }
    setCopied(true)
  }

  // Reset the "Copied!" confirmation after 2 seconds.
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  // Allow the Escape key to close the modal.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button className="embed-btn" onClick={openModal}>
        Embed
      </button>

      {open && (
        <div className="modal-overlay" onClick={closeModal}>
          {/* Stop clicks inside the modal from closing it. */}
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="embed-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title" id="embed-title">
              Embed this Calculator
            </h2>
            <p className="modal-desc">Copy the code below and paste it into your website</p>

            <pre className="embed-code" aria-readonly="true">
              {snippet}
            </pre>

            <div className="modal-actions">
              <button className="copy-btn" onClick={copyCode}>
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EmbedButton
