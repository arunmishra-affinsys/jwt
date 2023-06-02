import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./RouteGuard";
import { Todo } from "../pages/TodoScreen";
import Login from "../pages/Login";
import { history } from "../helpers/history";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <RouteGuard exact path="/dashboard" component={Todo} />
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default Routes;
