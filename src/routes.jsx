import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./components/RouteGuard";

//history
import { history } from "./helpers/history";

//pages
// import HomePage from "./pages/HomePage";
import Todo from "./TodoScreen";
import LoginPage from "./pages/Login";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <RouteGuard exact path="/dashboard" component={Todo} />
        <Route exact path="/" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default Routes;
