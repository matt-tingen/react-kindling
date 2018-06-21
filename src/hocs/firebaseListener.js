import _ from 'lodash'
import React from 'react'
import asFunction from '../utils/asFunction'
import buildQuery from '../utils/buildQuery'
import getDisplayName from './helpers/getDisplayName'

const firebaseListener = (
  collection,
  query,
  propName = collection,
) => WrappedComponent => {
  const queryFunction = asFunction(query)

  class Component extends React.Component {
    state = { [propName]: [] }

    componentDidMount() {
      this.setListener()
    }

    componentDidUpdate() {
      this.setListener()
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    setListener() {
      const queryObject = queryFunction(this.props)
      if (!this.previousQuery || !_.isEqual(this.previousQuery, queryObject)) {
        if (this.unsubscribe) {
          this.unsubscribe()
        }

        this.previousQuery = queryObject

        this.unsubscribe = buildQuery(collection, queryObject).onSnapshot(
          snapshot => {
            const docs = []
            snapshot.forEach(doc => {
              docs.push(doc.data())
            })
            this.setState({ [collection]: docs })
          },
        )
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }

  Component.displayName = `mergeStateintoProps(${getDisplayName(
    WrappedComponent,
  )})`

  return Component
}

export default firebaseListener
