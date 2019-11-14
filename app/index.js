import React from 'react'
import ReactDOM from 'react-dom'
import {EventEmitter} from 'events'
import Discovery from './components/Discovery'

class AnnotationDiscovery extends EventEmitter {
  constructor(node, targetUrl) {
    super()

    this.node = node
    this.shown = false
    this.targetUrl = targetUrl

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

  _handleDialogCancel = () => {
    this.close()
    this.emit('cancel')
  }

  _handleDialogSave = id => {
    this.close()
    this.emit('save', id)
  }

  _render() {
    ReactDOM.render(
      <Discovery
        discovery={this}
        targetUrl={this.targetUrl}
        onSave={this._handleDialogSave}
        onCancel={this._handleDialogCancel}
      />,
      this.node
    )
  }
}

export function createDiscovery(node, targetUrl) {
  return new AnnotationDiscovery(node, targetUrl)
}
