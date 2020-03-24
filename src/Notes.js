import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { logOut } from './actions'
import { Dimmer, Loader, Button } from 'semantic-ui-react'
import NoteTabs from './NoteTabs'
import NewNoteForm from './NewNoteForm'



const handleLogout = (logOut, history) => () => {
  logOut()
  history.push('/login')
}

const Notes = ({ logOut, auth, history }) => {
  if (!auth.authenticated) {
    return <Redirect to="/login" />
  }
  return(
    <div>
      {
        auth.authenticating
        ?
        <Dimmer active>
          <Loader size='massive'>Logging out..</Loader>
        </Dimmer>
        :
        <div>
          <div className='left-menu'>
            <NewNoteForm />
            <Button basic color='purple' name='logout' size='mini' onClick={handleLogout(logOut, history)}>Log out</Button>
          </div>
          <div className='notes-container'>
            <NoteTabs />
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logOut })(Notes)
