import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { logOut } from './actions'
import { Grid, Header, Segment, Dimmer, Loader, Message } from 'semantic-ui-react'



const handleLogout = (logOut, history) => () => {
  logOut()
  history.push('/login')
}

const Notes = ({ logOut, auth, history }) => {
  if (!auth.authenticated) {

    return <Redirect to="/login" />
  }
  return(
    <Grid>
      {
        auth.authenticating ?
        <Dimmer active>
          <Loader size='massive'>Logging out..</Loader>
        </Dimmer>
        :
        <Button name='logout' onClick={handleLogout(logOut, history)}>Log out</Button>
      }       
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logOut })(Notes)
