import React, { Fragment } from 'react'
import GoogleButton from 'react-google-button'
import { connect } from 'react-redux'
import Loading from './Loading'

const Auth = ({ login, logout, user, loading }) => (
  <div>
    <h2>Auth</h2>
    <div>
      Status:&nbsp;
      {loading ? (
        <Loading />
      ) : user ? (
        <Fragment>
          <span>Logged In</span>
          <div>
            <button onClick={logout} type="button">
              Logout
            </button>
          </div>
          <div>Data:</div>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </Fragment>
      ) : (
        <Fragment>
          <span>Not Authed</span>
          <GoogleButton onClick={login} />
        </Fragment>
      )}
    </div>
  </div>
)

const mapState = ({ user: { user, loading } }) => ({ user, loading })
const mapDispatch = ({ user: { login, logout } }) => ({ login, logout })

export default connect(
  mapState,
  mapDispatch,
)(Auth)
