import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
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
import ClassList from "../views/classes/ClassList";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { UserContext } from "../context/UserContext";
import PageLoader from "../components/loaders/PageLoader";
import AuthRoute from "./components/AuthRoute";
import PageNotFound from "../components/error_pages/PageNotFound";
import ExamInformation from "../views/exam-information/ExamInformation";
import ExamCreation from "../views/exam-creation/ExamCreation";
import  Profile from "../views/profile/Profile";

export default function Routes() {
  const userContext = useContext(UserContext);
  const {loading, refreshUser} = userContext.data
  const {user} = userContext.data

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <div className="content">
      {loading ? <PageLoader/> : 
        (<Router>
          <Switch>
            <PrivateRoute path='/courses' exact component={Courses}/>
            <PrivateRoute path='/coursecontent/:id' exact component={CourseContent}/>
            <PrivateRoute path='/exam' exact component={Exam}/>
            <PrivateRoute path='/files' exact component={Files}/>
            <PrivateRoute path='/reports' exact component={Reports}/>
            <PrivateRoute path='/classes' exact component={Classes}/>
            <PrivateRoute path='/classlist' exact component={ClassList}/>
            <PrivateRoute path='/classescontent/:id' exact component={ClassesContent}/>
            <PrivateRoute path='/archive' exact component={ArchiveClass}/>
            <PrivateRoute path='/class/:class_id/exam/:id' exact component={ExamInformation}/>
            <PrivateRoute path='/' exact component={Home}/>
            <PrivateRoute path='/classescontent/:id' exact component={ClassesContent}/>
            <PrivateRoute path='/class/:class_id/exam/:id' exact component={ExamInformation}/>
            <PrivateRoute path='/classes' exact component={Classes}/>
            <PrivateRoute path='/' exact component={Home}/>
            <PrivateRoute path='/profile/:id' exact component={Profile}/>
            <PrivateRoute path='/exam_creation/:id' exact component={ExamCreation}/>
            <AuthRoute path='/login' exact component={Login}/>
            <AuthRoute path='/forgot_password' exact component={ForgotPassword}/>
            <PublicRoute path='/404' exact component={PageNotFound}/>
            <PrivateRoute path='/' exact component={Home}/>
            <Redirect to="/404"/>
          </Switch>
        </Router>)
      }
    </div>
  );
}
