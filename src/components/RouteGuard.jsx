import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "../pages/Login";

const RouteGuard = ({ component: Component, ...rest }) => {
  function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem("token") ? (flag = true) : (flag = false);

    return flag;
  }

  return (
    <Route
      {...rest}
      render={(props) => (hasJWT() ? <Component {...props} /> : <Login />)}
    />
  );
};

export default RouteGuard;
