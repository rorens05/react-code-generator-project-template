import React, { useState, useEffect } from "react";
import { Tab, ListGroup, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import MainContainer from '../../components/layouts/MainContainer'
import CourseBreadcrumbs from "./components/CourseBreadcrumbs";
import CoursesAPI from "../../api/CoursesAPI";
import CoursesLearn from "./pages/Learn/CoursesLearn";
import CoursesExam from "./pages/Exam/CoursesExam";
import CoursesDiscussion from "./pages/Discussion/CoursesDiscussion";
import CoursesAssignment from "./pages/Assignment/CoursesAssignment";
import CoursesTask from "./pages/Task/CoursesTask";

export default function CourseContent(course) {

  const [loading, setLoading] = useState(false)
  const [moduleInfo, setModuleInfo] = useState([])
  const [viewLesson, setViewLesson] = useState(false)
  const [courseInfo, setCourseInfo] = useState("")

  const courseid = sessionStorage.getItem('courseid')

  const getCourseUnitInformation = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseUnit(courseid)
    setLoading(false)
    if(response.ok){
      setModuleInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all a")
    }
  }

  const getCourseInformation = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseInformation(courseid)
    setLoading(false)
    if(response.ok){
      setCourseInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all a")
    }
  }

  const contentDisplay = e => {
    e.preventDefault()
    setViewLesson(false)
  }

  useEffect(() => {
    getCourseUnitInformation()
    getCourseInformation()
  }, [])

  return (
    <MainContainer loading={loading} fluid>
      <CourseBreadcrumbs />
      <Tab.Container className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
        <Row>
          <Col className="row-course-bg course-widget-font" sm={3}>
            <ListGroup.Item className="list-group-item-o">
              <Row>
                <Col className="" sm={9} >
                  {courseInfo.courseName}
                  <div className="course-subtitle">{courseInfo.authorName}</div>
                  {/* <div className="course-subtitle">{courseInfo.subjectArea.subjectAreaName}</div> */}
                </Col>
                <Col className="t-a-r" sm={3}>
                  <i className="fa fa-ellipsis-v s"></i>
                </Col>
              </Row>
            </ListGroup.Item> 
            <ListGroup>
              <ListGroup.Item className="list-group-item-o " action href="#link1" onClick={(e) => contentDisplay(e)}>
              Learn
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o "action href="#link2">
              Exam
              </ListGroup.Item>
              <ListGroup.Item  className="list-group-item-o "action href="#link3">
              Discussion
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link4">
              Assignment
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5">
              Task
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6">
              Links
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={9}>
            <Tab.Content className="content-pane">
              <Tab.Pane eventKey="#link1">
                <CoursesLearn viewLesson={viewLesson} setViewLesson={setViewLesson} moduleInfo={moduleInfo} setModuleInfo={setModuleInfo}/>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <CoursesExam />
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                <CoursesDiscussion moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} />
              </Tab.Pane>
              <Tab.Pane eventKey="#link4">
                <CoursesAssignment moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} />
              </Tab.Pane>
              <Tab.Pane eventKey="#link5">
                <CoursesTask moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} />
              </Tab.Pane>
              <Tab.Pane eventKey="#link6">
              </Tab.Pane>
            </Tab.Content> 
          </Col> 
        </Row>
      </Tab.Container>
    </MainContainer>
  )
}
