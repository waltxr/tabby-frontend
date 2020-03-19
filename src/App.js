import React from 'react';
import './App.css';
import Login from './Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './PrivateRoute'
import { connect } from 'react-redux'


const Protected = () => <h3>Protected</h3>

function App() {
  console.log(this);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={Login} />
          <PrivateRoute path='/user' component={Protected} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
})

export default connect(mapStateToProps, null)(App);
