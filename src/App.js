import React from 'react';
import './App.css';
import Login from './Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Login />
        </Switch>        
      </Router>      
    </div>
  );
}

export default App;
