import React from "react";
import "./App.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Steps/Login";
import Homepage from "./Homepage";
import UserProcedure from "./components/Steps/index";

export default function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <div>
            <Route exact path="/" component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={UserProcedure} />
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
