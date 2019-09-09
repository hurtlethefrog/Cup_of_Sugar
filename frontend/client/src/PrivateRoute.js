import React, {useState} from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  console.log("GET ITEM:", localStorage.getItem("jwt"))
  return localStorage.getItem("jwt");
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/registration',
          state: { from: props.location }
        }} />
  )} />
)

export default PrivateRoute;