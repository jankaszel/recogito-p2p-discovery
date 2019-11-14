import React, {useState, useEffect} from 'react'
import Dialog from './Dialog'
import ErrorBoundary from './ErrorBoundary'

const normalizeDocs = documents =>
  documents.map(document =>
    typeof document === 'string' ? {url: document} : document
  )

export default function Discovery({
  discovery,
  targetUrl,
  useP2P,
  allowOutsideClick,
  onSave,
  onCancel,
}) {
  const [shown, setShown] = useState(false)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const handleShow = shown => setShown(shown)
    discovery.on('show', handleShow)
    setShown(discovery.shown)

    return () => discovery.removeListener('show', handleShow)
  }, [])

  useEffect(() => {
    const handleDocuments = documents => setDocuments(normalizeDocs(documents))
    discovery.on('documents', handleDocuments)
    setDocuments(normalizeDocs(discovery.documents))

    return () => discovery.removeListener('documents', handleDocuments)
  }, [])

  return shown ? (
    <ErrorBoundary emitter={discovery}>
      <Dialog
        targetUrl={targetUrl}
        documents={documents}
        useP2P={useP2P}
        allowOutsideClick={allowOutsideClick}
        onSave={onSave}
        onCancel={onCancel}
      />
    </ErrorBoundary>
  ) : null
}
