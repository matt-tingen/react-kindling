import * as React from 'react'
import GoogleButton from 'react-google-button'
import { Subscribe } from 'unstated'
import UserContainer from '../store/UserContainer'
import Loading from './Loading'

const Auth: React.SFC = () => (
  <Subscribe to={[UserContainer]}>
    {({ state: { user, loading }, login, logout }: UserContainer) => (
      <div>
        <h2>Auth</h2>
        <div>
          Status:&nbsp;
          {loading ? (
            <Loading />
          ) : user ? (
            <React.Fragment>
              <span>Logged In</span>
              <div>
                <button onClick={logout} type="button">
                  Logout
                </button>
              </div>
              <div>Data:</div>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span>Not Authed</span>
              <GoogleButton onClick={login} />
            </React.Fragment>
          )}
        </div>
      </div>
    )}
  </Subscribe>
)

export default Auth
