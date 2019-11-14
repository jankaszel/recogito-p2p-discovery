import React from 'react'
import ReactDOM from 'react-dom'
import Discovery from './components/Discovery'

export function createDiscovery(node, targetUrl) {
  ReactDOM.render(<Discovery />, node)
}
