import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { logOut } from './actions'


const handleLogout = (logOut, history) => () => {
  logOut()
  history.push('/login')
}

const Notes = ({ logOut, auth, history }) => {
  if (!auth.authenticated) {

    return <Redirect to="/login" />
  }
  return(
    <Button name='logout' onClick={handleLogout(logOut, history)}>Log out</Button>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logOut })(Notes)
