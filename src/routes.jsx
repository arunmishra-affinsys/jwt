import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./components/RouteGuard";
import { Todo } from "./TodoScreen";
import LoginWrapper from "./pages/LoginWrapper";

//history
import { history } from "./helpers/history";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <RouteGuard exact path="/dashboard" component={Todo} />
        <Route exact path="/" component={LoginWrapper} />
        <Route path="/login" component={LoginWrapper} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default Routes;
