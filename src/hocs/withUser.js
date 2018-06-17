import { connect } from 'react-redux'

const mapState = ({ user: { user } }) => ({ user })

const withUser = connect(mapState)

export default withUser
