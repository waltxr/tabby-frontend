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


const Protected = () => <h3>Protected</h3>

function App() {
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

export default App;
