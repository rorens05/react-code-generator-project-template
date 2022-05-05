import SchoolIndex from "../views/School";
import SchoolNew from "../views/School/new";
import SchoolEdit from "../views/School/edit";
import SchoolShow from "../views/School/show";
import StudentsIndex from "../views/Students";
import StudentsNew from "../views/Students/new";
import StudentsEdit from "../views/Students/edit";
import StudentsShow from "../views/Students/show";
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
          <PublicRoute exact path="/School" component={SchoolIndex} />
          <PublicRoute exact path="/School/new" component={SchoolNew} />
          <PublicRoute exact path="/School/:id/edit" component={SchoolEdit} />
          <PublicRoute exact path="/School/:id" component={SchoolShow} />
          <PublicRoute exact path="/Students" component={StudentsIndex} />
          <PublicRoute exact path="/Students/new" component={StudentsNew} />
          <PublicRoute exact path="/Students/:id/edit" component={StudentsEdit} />
          <PublicRoute exact path="/Students/:id" component={StudentsShow} />
          <PublicRoute path='/404' exact component={PageNotFound}/>
          <PrivateRoute path='/' exact component={Home}/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    </div>
  );
}
