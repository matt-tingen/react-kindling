import React from 'react'

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'

const mergeStateintoProps = WrappedComponent => {
  class Component extends React.Component {
    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }

  Component.displayName = `mergeStateintoProps(${getDisplayName(
    WrappedComponent,
  )})`

  return Component
}

export default mergeStateintoProps
