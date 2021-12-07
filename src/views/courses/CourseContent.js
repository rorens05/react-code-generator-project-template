import React, { useState, useEffect } from "react";
import { Tab, ListGroup, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import MainContainer from '../../components/layouts/MainContainer'
import CourseWidget from "./components/CourseWidget";
import CourseBreadcrumbs from "./components/CourseBreadcrumbs";
import ClassSideNavigation from "./components/CourseSideNavigation";
import CoursesAPI from "../../api/CoursesAPI";
import CoursesLearn from "./pages/Learn/CoursesLearn";

export default function CourseContent() {

  const [loading, setLoading] = useState(false)
  const [moduleInfo, setModuleInfo] = useState(false)

  const moduleid = sessionStorage.getItem('moduleid')
  const sessionCourse = sessionStorage.getItem('courseid') 

  const getCourseUnitInformation = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseUnit(sessionCourse)
    setLoading(false)
    if(response.ok){
      setModuleInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all a")
    }
  }

  useEffect(() => {
    getCourseUnitInformation()
  }, [])

  return (
    <MainContainer>
      <CourseBreadcrumbs />
      <Tab.Container loading={loading} className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
        <Row>
          <ClassSideNavigation />
          <CoursesLearn />
        </Row>
      </Tab.Container>
    </MainContainer>
  )
}
