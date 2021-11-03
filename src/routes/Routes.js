import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Classes from "../views/classes/Classes";
import Courses from "../views/courses/Courses";
import Exam from "../views/exam/Exam";
import Files from "../views/files/Files";
import ForgotPassword from "../views/forgot-password/ForgotPassword";
import Home from "../views/home/Home";
import Login from "../views/login/Login";
import Reports from "../views/reports/Reports";

export default function Routes() {
  return (
    <div className="content">
      <Router>
        <Switch>
          <Route path='/courses' exact component={Courses}/>
          <Route path='/exam' exact component={Exam}/>
          <Route path='/files' exact component={Files}/>
          <Route path='/reports' exact component={Reports}/>
          <Route path='/classes' exact component={Classes}/>
          <Route path='/login' exact component={Login}/>
          <Route path='/forgot_password' exact component={ForgotPassword}/>
          <Route path='/' exact component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}
