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
import CourseContent from "../views/courses/CourseContent";
import ArchiveClass from "../views/classes/ArchiveClass"
import ClassesContent from "../views/classes/ClassesContent";
import AssignmentContent from "../views/reports/components/AssignmentContent";
import ClassList from "../views/classes/ClassList";


export default function Routes() {
  return (
    <div className="content">
      <Router>
        <Switch>
          <Route path='/courses' exact component={Courses}/>
          <Route path='/coursecontent' exact component={CourseContent}/>
          <Route path='/exam' exact component={Exam}/>
          <Route path='/files' exact component={Files}/>
          <Route path='/reports' exact component={Reports}/>
          <Route path='/classes' exact component={Classes}/>
          <Route path='/classlist' exact component={ClassList}/>
          <Route path='/classescontent' exact component={ClassesContent}/>
          <Route path='/archive' exact component={ArchiveClass}/>
          <Route path='/assigncontent' exact component={AssignmentContent}/>
          <Route path='/login' exact component={Login}/>
          <Route path='/forgot_password' exact component={ForgotPassword}/>
          <Route path='/' exact component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}
