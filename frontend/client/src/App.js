import React, {useState} from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Steps/Login";
import Homepage from "./Homepage";
import UserProcedure from "./components/Steps/index";
import PrivateRoute from "./PrivateRoute";
import Ready from "./components/Steps/Ready";

export default function App() {
  const [user, setUser] = useState()

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <div>
            <PrivateRoute exact path="/" component={Homepage} />
            <Route path="/registration" component={UserProcedure} />
            <Route path="/login" component={Login} />
            <Route path="/ready" component={Ready} />
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
