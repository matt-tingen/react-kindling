import React from 'react'

const createHocFromContext = (propName, Context) =>
  function withContext(WrappedComponent) {
    return function ThemedComponent(props) {
      return (
        <Context.Consumer>
          {value => {
            const contextProp = { [propName]: value }
            return <WrappedComponent {...props} {...contextProp} />
          }}
        </Context.Consumer>
      )
    }
  }

export default createHocFromContext
