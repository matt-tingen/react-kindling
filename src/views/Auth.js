import React, { Fragment } from 'react'
import GoogleButton from 'react-google-button'
import { connect } from 'react-redux'
import { isEmpty, isLoaded, withFirebase } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import Loading from './Loading'

const Auth = ({ login, logout, auth }) => (
  <div>
    <h2>Auth</h2>
    <div>
      Status:&nbsp;
      {!isLoaded(auth) ? (
        <Loading />
      ) : isEmpty(auth) ? (
        <Fragment>
          <span>Not Authed</span>
          <GoogleButton onClick={login} />
        </Fragment>
      ) : (
        <Fragment>
          <span>Logged In</span>
          <div>
            <button onClick={logout} type="button">
              Logout
            </button>
          </div>
          <div>Data:</div>
          <pre>{JSON.stringify(auth, null, 2)}</pre>
        </Fragment>
      )}
    </div>
  </div>
)

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth })),
  withHandlers({
    login: ({ firebase }) => () =>
      firebase.login({
        provider: 'google',
        type: 'popup',
      }),
    logout: ({ firebase }) => () => firebase.logout(),
  }),
)(Auth)
