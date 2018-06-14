import { replace } from 'connected-react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import Loading from '../views/Loading'

const locationHelper = locationHelperBuilder({})

// Redirects to path when predicate is true
const authRedirect = (path, predicate) =>
  connectedRouterRedirect({
    wrapperDisplayName: 'UserIsAuthenticated',
    AuthenticatingComponent: Loading,
    allowRedirectBack: false,
    redirectPath: (state, ownProps) =>
      locationHelper.getRedirectQueryParam(ownProps) || path,
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
      !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) => predicate(auth),
    redirectAction: newLoc => dispatch => {
      dispatch(replace(newLoc))
      dispatch({ type: 'UNAUTHED_REDIRECT' })
    },
  })

export default authRedirect
