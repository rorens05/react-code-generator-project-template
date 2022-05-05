import React, {  } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "../views/home/Home";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import PageNotFound from "../components/error_pages/PageNotFound";

export default function Routes() {
  return (
    <div className="content">
      <Router>
        <Switch>
          <PublicRoute path='/404' exact component={PageNotFound}/>
          <PrivateRoute path='/' exact component={Home}/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    </div>
  );
}
