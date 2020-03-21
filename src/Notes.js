import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';


const handleLogout = history => () => {
  //action that handles logout
  history.push('/login')
}

const Notes = ({ auth, history }) => {
  console.log(auth);
  if (!auth.authenticated) {
    return <Redirect to="/login" />
  }
  return(
    <Button name='logout' onClick={handleLogout(history)}>Log out</Button>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Notes)
