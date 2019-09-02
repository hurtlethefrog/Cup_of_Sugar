import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Steps/Login'
import Registration from './components/Steps/Registration'
import Homepage from './Homepage'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <div>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registration">Registration</Link>
              </li>
            </ul>
            
            <Route exact path="/" component={Homepage}/>
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
