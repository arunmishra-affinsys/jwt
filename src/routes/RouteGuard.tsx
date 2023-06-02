import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface RouteGuardProps extends RouteProps {
  component: React.ComponentType<any>;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  component: Component,
  ...rest
}) => {
  function hasJWT() {
    let flag = false;

    // Check if user has JWT token
    localStorage.getItem("token") ? (flag = true) : (flag = false);

    return flag;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        hasJWT() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default RouteGuard;
