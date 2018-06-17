// const authOnly = authRedirect('/auth', auth => auth.isLoaded && !auth.isEmpty)
const authOnly = c => c

export default authOnly
