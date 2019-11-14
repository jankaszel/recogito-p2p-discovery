import React, {useState, useEffect} from 'react'
import Dialog from './Dialog'

export default function Discovery({targetUrl, discovery, onSave, onCancel}) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const handleShow = shown => setShown(shown)

    setShown(discovery.shown)
    discovery.on('show', handleShow)

    return () => discovery.removeListener('show', handleShow)
  }, [])

  return shown ? <Dialog onSave={onSave} onCancel={onCancel} /> : null
}
