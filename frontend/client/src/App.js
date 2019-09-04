import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Steps/Login'
import Registration from './components/Steps/Registration'
import Homepage from './Homepage'
import LoginRegOption from './components/Steps/LoginRegOption';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <div>
            <Route exact path="/" component={Homepage}/>
            <Route path="/login" component={Login} />
            <Route path="/registration" component={LoginRegOption} />
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
