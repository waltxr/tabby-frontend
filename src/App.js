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
import Notes from './Notes'

const App = () => {
  return(
    <div className="App">
      <Router>
        <Redirect from='*' to='/notes' />
        <Switch>
          <Route path='/notes' component={Notes} />
          <Route path='/login' component={Login}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
