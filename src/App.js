import React from 'react';
import './App.css';
import Login from './Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux'


const Protected = () => <h3>Protected</h3>

const App = props => {
  console.log(props.auth.authenticated);
  return(
    <div className="App">
      <Router>
        <Route>
          { props.auth.authenticated ? <Redirect to ='/user'/> : <Redirect to='/login' /> }
        </Route>
        <Route path='/login' component={Login} />
        <Route path='/user'>
          <Protected />
        </Route>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App)
