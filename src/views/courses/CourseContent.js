import React, { useState, useEffect } from "react";
import { Tab, ListGroup, Row, Col, Button, InputGroup, FormControl, Accordion, Tooltip, OverlayTrigger } from 'react-bootstrap';
import MainContainer from '../../components/layouts/MainContainer'
import CourseBreadcrumbs from "./components/CourseBreadcrumbs";
import CoursesAPI from "../../api/CoursesAPI";
import CoursesLearn from "./pages/Learn/CoursesLearn";
import CoursesExam from "./pages/Exam/CoursesExam";
import CoursesDiscussion from "./pages/Discussion/CoursesDiscussion";
import CoursesAssignment from "./pages/Assignment/CoursesAssignment";
import CoursesTask from "./pages/Task/CoursesTask";
import CourseLinks from "./pages/Links/CourseLinks";
import CourseFiles from "./pages/Files/CourseFiles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CourseContent(course) {
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
      alert("Something went wrong while fetching all a")
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

  const renderTooltipFeed = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Feed
    </Tooltip>
  )
  const renderTooltipLearn = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Learn
    </Tooltip>
  )
  const renderTooltipExam = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Exam
    </Tooltip>
  )
  const renderTooltipDiscussion = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Discussion
    </Tooltip>
  )
  const renderTooltipAssignment = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Assignment
    </Tooltip>
  )
  const renderTooltipTask = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Task
    </Tooltip>
  )
  const renderTooltipInteractive = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Interactive
    </Tooltip>
  )
  const renderTooltipLink = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Link
    </Tooltip>
  )
  const renderTooltipFiles = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Files
    </Tooltip>
  )

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
                  {/* <div className="course-subtitle">{courseInfo.subjectArea.subjectAreaName}</div> */}
                </Col>
                <Col className="t-a-r" sm={3}>
                  {/* <i className="fa fa-ellipsis-v s"></i> */}
                  <Col className="text-align-right">
                    <i className="fas fa-chevron-left cursor-pointer" style={{color: '#EE9337'}} onClick={()=> setCollapseSide(false)}/>
                  </Col>
                </Col>
              </Row>
            </ListGroup.Item> 
            <ListGroup>
              <ListGroup.Item className="list-group-item-o " action href="#link1" onClick={(e) => contentDisplay(e)}>
              Learn
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o "action href="#link2" onClick={(e) => setBread(e, "Exam")}>
              Exam
              </ListGroup.Item>
              <ListGroup.Item  className="list-group-item-o "action href="#link3" onClick={(e) => setBread(e, "Discussion")}>
              Discussion
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link4" onClick={(e) => setBread(e, "Assignment")}>
              Assignment
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5" onClick={(e) => setBread(e, "Task")}>
              Task
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6" onClick={(e) => setBread(e, "Files")}>
                Files
              </ListGroup.Item>
              {/* <ListGroup.Item className="list-group-item-o " action href="#link6">
              Links
              </ListGroup.Item> */}
            </ListGroup>
          </Col>
          :
          <Col className="row-course-bg course-widget-font pt-2" sm={1}>
            <Col className="text-align-right mb-2">
              <i className="fas fa-chevron-right" style={{color: '#EE9337'}} onClick={()=> setCollapseSide(true)}/>
            </Col>
            <ListGroup>
            <OverlayTrigger
                placement="right"
                delay={{ show: 1000, hide: 25 }}
                overlay={renderTooltipLearn}>
              <ListGroup.Item className="list-group-item-o" action href="#link1" onClick={(e) => contentDisplay(e)}>
                <i className="fas fa-book" />
              </ListGroup.Item>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                delay={{ show: 1000, hide: 25 }}
                overlay={renderTooltipExam}>
              <ListGroup.Item className="list-group-item-o "action href="#link2" onClick={(e) => setBread(e, "Exam")}>
                <i className="fas fa-file-alt" />
              </ListGroup.Item>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                delay={{ show: 1000, hide: 25 }}
                overlay={renderTooltipDiscussion}>
              <ListGroup.Item  className="list-group-item-o "action href="#link3" onClick={(e) => setBread(e, "Discussion")}>
                <i className="fas fa-comment-alt" />
              </ListGroup.Item>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                delay={{ show: 1000, hide: 25 }}
                overlay={renderTooltipAssignment}>
              <ListGroup.Item className="list-group-item-o " action href="#link4" onClick={(e) => setBread(e, "Assignment")}>
                <i className="fas fa-sticky-note" />
              </ListGroup.Item>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                delay={{ show: 1000, hide: 25 }}
                overlay={renderTooltipTask}>
              <ListGroup.Item className="list-group-item-o " action href="#link5" onClick={(e) => setBread(e, "Task")}>
                <i className="fas fa-edit" />
              </ListGroup.Item>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                delay={{ show: 1000, hide: 25 }}
                overlay={renderTooltipFiles}>
              <ListGroup.Item className="list-group-item-o " action href="#link6" onClick={(e) => setBread(e, "Files")}>
                <i className="fas fa-folder-open" />
              </ListGroup.Item>
              </OverlayTrigger>
              {/* <ListGroup.Item className="list-group-item-o " action href="#link6">
              Links
              </ListGroup.Item> */}
            </ListGroup>
          </Col>
          }
          <Col sm={ collapseSide ? 9 : 11} className='scrollable vh-85 pb-5'>
            <Tab.Content className={Authors === "Techfactors Inc." ? "" : "content-pane"} >
              <Tab.Pane eventKey="#link1" style={{backgroundColor:""}}>
                <CoursesLearn courseInfo={courseInfo} setCourseInfo={setCourseInfo} viewLesson={viewLesson} setViewLesson={setViewLesson} moduleInfo={moduleInfo} setModuleInfo={setModuleInfo}/>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <CoursesExam moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} moduleId={moduleId()}/>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                <CoursesDiscussion moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} moduleId={moduleId()} setShowDiscussion={setShowDiscussion} showDiscussion={showDiscussion} />
              </Tab.Pane>
              <Tab.Pane eventKey="#link4">
                <CoursesAssignment moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} setShowAssignment={setShowAssignment} showAssignment={showAssignment} />
              </Tab.Pane>
              <Tab.Pane eventKey="#link5">
                <CoursesTask moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} setShowTask={setShowTask} showTask={showTask} />
              </Tab.Pane>
              <Tab.Pane eventKey="#link6">
                <CourseFiles id={courseid}/>
              </Tab.Pane>
              {/* <Tab.Pane eventKey="#link6">
                <CourseLinks moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} />
              </Tab.Pane> */}
            </Tab.Content> 
          </Col>
        </Row>
      </Tab.Container>
    </MainContainer>
  )
}
