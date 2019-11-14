import React from 'react'
import ReactDOM from 'react-dom'
import {EventEmitter} from 'events'
import Discovery from './components/Discovery'

class AnnotationDiscovery extends EventEmitter {
  constructor(node, targetUrl, opts = {}) {
    super()

    this.node = node
    this.shown = false
    this.targetUrl = targetUrl
    this.documents = []
    this.userId = opts.userId || ''
    this.useP2P = !!opts.useP2P
    this.allowOutsideClick = !!opts.allowOutsideClick

    this._render()
  }

  open() {
    this.shown = true
    this.emit('show', true)
  }

  close() {
    this.shown = false
    this.emit('show', false)
  }

  setDocuments(documents) {
    this.documents = documents
    this.emit('documents', documents)
  }

  _handleDialogCancel = () => {
    this.close()
    this.emit('cancel')
  }

  _handleDialogSave = (id, docUrl) => {
    this.close()
    this.emit('save', id, docUrl)
  }

  _render() {
    ReactDOM.render(
      <Discovery
        discovery={this}
        targetUrl={this.targetUrl}
        userId={this.userId}
        useP2P={this.useP2P}
        allowOutsideClick={this.allowOutsideClick}
        onSave={this._handleDialogSave}
        onCancel={this._handleDialogCancel}
      />,
      this.node
    )
  }
}

export function createDiscovery(node, targetUrl, opts) {
  return new AnnotationDiscovery(node, targetUrl, opts)
}
