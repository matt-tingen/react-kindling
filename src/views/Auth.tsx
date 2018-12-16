import * as React from 'react'
import GoogleButton from 'react-google-button'
import useUser from 'src/hooks/useUser'
import Loading from './Loading'

const Auth: React.SFC = () => {
  const { user, loading, login, logout } = useUser()

  return (
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
  )
}

export default Auth
