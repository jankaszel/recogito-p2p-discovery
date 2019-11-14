import React, {Component} from 'react'

export default class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
    this.props.emitter.emit('error', error)
  }

  render() {
    return this.props.children
  }
}
