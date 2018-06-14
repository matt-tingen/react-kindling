import authRedirect from './authRedirect'

const authOnly = authRedirect('/auth', auth => auth.isLoaded && !auth.isEmpty)

export default authOnly
