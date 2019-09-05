import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Steps/Login'
import Registration from './components/Steps/Registration'
import Homepage from './Homepage'
import Calender from './components/Calender';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <div>            
            <Route exact path="/" component={Homepage}/>
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/test" component={Calender} />
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
