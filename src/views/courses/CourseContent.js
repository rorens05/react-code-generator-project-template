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
import CourseFiles from "./pages/Files/CourseFiles";
import CourseLinks from "./pages/Links/CourseLinks";
import { HashRouter, BrowserRouter as Router, } from 'react-router-dom';
import PrivateRoute from "../../routes/components/PrivateRoute";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClassAssignment from "../classes/ClassAssignment";
import { useParams } from "react-router";
export default function CourseContent({children, course}) {
  console.log(course, '//////////////////')
  const [loading, setLoading] = useState(false)
  const [moduleInfo, setModuleInfo] = useState([])
  const [viewLesson, setViewLesson] = useState(false)
  const [courseInfo, setCourseInfo] = useState("")
  const [selectedModule, setSelectedModule] = useState("")
  const [showAssignment, setShowAssignment] = useState(false)
  const [showTask, setShowTask] = useState(false)
  const [showDiscussion, setShowDiscussion] = useState(false)
  const [collapseSide, setCollapseSide] = useState(true)
  const courseid = sessionStorage.getItem('courseid')
  const currentLoc = window.location.pathname;
  console.log(window.location, 'ssssssssssssssssssssss')
  const {id} = useParams()

  console.log(id, 'url id')

  const getCourseUnitInformation = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseUnit(courseid)
    setLoading(false)
    if(response.ok){
      setModuleInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching course unit")
    }
  }

  const moduleId = () => {
    if(moduleInfo.length > 0){ 
      return (moduleInfo.map(item => item.id)) || []
    }
    return []
  }

  const getCourseInformation = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseInformation(courseid)
    setLoading(false)
    if(response.ok){
      setCourseInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching course information.")
    }
  }

  const contentDisplay = e => {
    e.preventDefault()
    setViewLesson(false)
  }

  const setBread = (e, data) => {
    setLoading(true)
    sessionStorage.setItem('breadname', data)
    setShowAssignment(false)
    setShowTask(false)
    setShowDiscussion(false)
    setLoading(false)
  }

  useEffect(() => {
    getCourseUnitInformation()
    getCourseInformation()
  }, [])

  const Authors = courseInfo.authorName;

  return (
    <MainContainer loading={loading} fluid activeHeader={'courses'} style='not-scrollable'>
      <ToastContainer />
      <Row>
        <Col sm={3}>
          <CourseBreadcrumbs setShowAssignment={setShowAssignment} setShowTask={setShowTask} setShowDiscussion={setShowDiscussion} />
        </Col>
        <Col sm={9}>
          
        </Col>
      </Row>
      <Tab.Container className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1" >
        <Row>
          {collapseSide ? <Col className="row-course-bg course-widget-font" sm={3}>
            <ListGroup.Item className="list-group-item-o">
              <Row>
                <Col className="" sm={9} >
                  {courseInfo.courseName}
                  <div className="course-subtitle">{courseInfo.authorName}</div>
                </Col>
                <Col className="t-a-r" sm={3}>
                  <Col className="text-align-right">
                    <i className="fas fa-chevron-left cursor-pointer" style={{color: '#EE9337'}} onClick={()=> setCollapseSide(false)}/>
                  </Col>
                </Col>
              </Row>
            </ListGroup.Item> 
            <ListGroup>
              <a className={currentLoc.includes('learn') ? "active-nav-item" : 'nav-item'} href={`/courses/${id}/learn`}>
                Learn
              </a>
              <a className={currentLoc.includes('exam') ? "active-nav-item" : 'nav-item'}  href={`/courses/${id}/exam`}>
                Exam
              </a>
              <a className={currentLoc.includes('discussion') ? "active-nav-item" : 'nav-item'}  href={`/courses/${id}/discussion`}>
                Discussion
              </a>
              <a className={currentLoc.includes('assignment') ? "active-nav-item" : 'nav-item'}  href={`/courses/${id}/assignment`}>
                Assignment
              </a>
              <a className={currentLoc.includes('task') ? "active-nav-item" : 'nav-item'}  href={`/courses/${id}/task`}>
                Task
              </a>
              <a className={currentLoc.includes('files') ? "active-nav-item" : 'nav-item'}  href={`/courses/${id}/files`}>
                Files
              </a>
            </ListGroup>
          </Col>
          :
          <Col className="row-course-bg course-widget-font pt-2" sm={1}>
            <Col className="text-align-right mb-2">
              <i className="fas fa-chevron-right" style={{color: '#EE9337'}} onClick={()=> setCollapseSide(true)}/>
            </Col>
            <ListGroup>
            <a className={currentLoc == '#/' ? "active-nav-item" : 'nav-item'} href="#/">
                <i className="fas fa-book" title="Learn"/>
              </a>
              <a className={currentLoc == '#/exam' ? "active-nav-item" : 'nav-item'} href="#/exam">
                <i className="fas fa-file-alt" title="Exam"/>
              </a>
              <a className={currentLoc == '#/discussion' ? "active-nav-item" : 'nav-item'} href="#/discussion">
                <i className="fas fa-comment-alt" title="Discussion"/>
              </a>
              <a className={currentLoc == '#/assignment' ? "active-nav-item" : 'nav-item'} href="#/assignment">
                <i className="fas fa-sticky-note" title="Assignment"/>
              </a>
              <a className={currentLoc == '#/task' ? "active-nav-item" : 'nav-item'} href="#/task">
                <i className="fas fa-edit" title="Task"/>
              </a>
              <a className={currentLoc == '#/files' ? "active-nav-item" : 'nav-item'} href="#/files">
                <i className="fas fa-folder-open" title="Files"/>
              </a>
            </ListGroup>
          </Col>
          }
          <Col sm={ collapseSide ? 9 : 11} className='scrollable vh-85 pb-5'>
           {children}
          </Col>
        </Row>
      </Tab.Container>
    </MainContainer>
  )
}
