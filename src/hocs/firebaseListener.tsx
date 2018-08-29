import * as _ from 'lodash'
import * as React from 'react'
import asFunction, { MaybeFunction } from '../utils/asFunction'
import buildQuery, { QueryRequest } from '../utils/buildQuery'
import getDisplayName from './helpers/getDisplayName'

type DocumentPair = [string, firebase.firestore.DocumentData]

const firebaseListener = <Props extends {}>(
  collection: string,
  query: MaybeFunction<QueryRequest, [Props]>,
  propName = collection,
) => (WrappedComponent: React.ComponentType<Props>) => {
  const queryFunction = asFunction(query)

  class Component extends React.Component<Props> {
    private unsubscribe?: () => void
    private previousQuery?: any

    state = { [propName]: [] }

    componentDidMount() {
      this.setListener()
    }

    componentDidUpdate() {
      this.setListener()
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe()
      }
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
            const docs: DocumentPair[] = []
            // snapshot does not support `.map()`
            snapshot.forEach(doc => {
              docs.push([doc.id, doc.data()])
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

  ;(Component as React.ComponentClass).displayName = `firebaseListener(${getDisplayName(
    WrappedComponent,
  )})`

  return Component
}

export default firebaseListener
