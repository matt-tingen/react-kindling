import React, { Fragment } from 'react'
import GoogleButton from 'react-google-button'
import { Subscribe } from 'unstated'
import UserContainer from '../store/UserContainer'
import Loading from './Loading'

const Auth = () => (
  <Subscribe to={[UserContainer]}>
    {({ state: { user, loading }, login, logout }) => (
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
    )}
  </Subscribe>
)

export default Auth
