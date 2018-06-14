import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'recompose'

const withAuth = compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)

export default withAuth
