import React from 'react';
import './App.css';
import Login from './Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Notes from './Notes'
import Signup from './Signup'

const App = () => {
  return(
    <div className="App">
      <Router>
        <Redirect from='*' to='/notes' />
        <Switch>
          <Route path='/notes' component={Notes} />
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
