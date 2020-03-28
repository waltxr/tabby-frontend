import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { logOut } from './actions'
import { Dimmer, Loader, Button } from 'semantic-ui-react'
import NoteTabs from './NoteTabs'
import NewNoteForm from './NewNoteForm'
import SideMenu from './SideMenu'



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
            <div className='left-menu-content'>
              <NewNoteForm />
              <SideMenu />
            </div>
            <div className='left-footer'>
              <Button attached='bottom' basic name='logout' size='mini' onClick={handleLogout(logOut, history)} id='logout-button'>Log out</Button>
            </div>
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
