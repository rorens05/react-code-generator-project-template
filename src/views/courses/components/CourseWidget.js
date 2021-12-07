import React, { useState, useEffect } from "react";
import { Tab, ListGroup, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";
import CourseCreateUnit from "./CourseCreateUnit";
import CoursePages from "./../pages/CoursePages";
import CourseExams from "./../pages/CourseExams";
import CreateLesson from "./../pages/CreateLesson";
import CreateExam from "./../pages/CreateExam";
import EditLesson from "./../pages/EditLesson";
import EditTest from "./../pages/EditTest";


export default function CourseWidget({display, setDisplay, setExamDisplay, examDisplay, moduleInfo, setModuleInfo}) {

  const [selectedPage, setSelectedPage] = useState(null)
  const [courseInfo, setCourseInfo] = useState('')
  const [modulePagesContent, setModulePagesContent] = useState('')
  const [modulePages, setModulePages] = useState([])
  const [loading, setLoading] = useState(false)
  const [openCreateUnitModal, setopenCreateUnitModal] = useState(false)
  const [openCreateLessonModal, setCreateLessonModal] = useState(false)
  const [openCreateExamModal, setOpenCreateExamModal] = useState(false)
  const [addLessonButton, setAddLessonButton] = useState(false)
  const [learnHeader, setLearnHeader] = useState(false)
  const [examHeader, setExamHeader] = useState(false)
  const [examInfo, setExamInfo] = useState([])
  const [selectedTest, setSelectedTest] = useState(null)
  const [openEditTestModal, setOpenEditTestModal] = useState(false)

  const courseid = sessionStorage.getItem('courseid')
  const pagename = sessionStorage.getItem('pagename')
  
  const handleOpenEditTestModal = (e, item) => {
    e.preventDefault()
    setSelectedTest(item)
    console.log(item)
    setOpenEditTestModal(true)
  }

  const handleOpenCreateUnitModal = e => {
    e.preventDefault()
    setopenCreateUnitModal(true)
  }

  const handleOpenCreateLessonModal = e => {
    e.preventDefault()
    setCreateLessonModal(true)
  }

  const handleOpenCreateExamModal = e => {
    e.preventDefault()
    setOpenCreateExamModal(true)
  }

  const unitDisplay = e => {
    e.preventDefault()
    setExamHeader(false)
    sessionStorage.removeItem("pagename");
    setLearnHeader(true)
    sessionStorage.setItem("widget", "Learn")
    setDisplay(false)
  }

  const examsDisplay = e => {
    e.preventDefault()
    setLearnHeader(false)
    setExamHeader(true)
    sessionStorage.setItem("widget", "Exam")
    setDisplay(false)
  }

  const getCoursesInfo = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseInformation(courseid)
    setLoading(false)
    if(response.ok){
      setCourseInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  const getCourseUnitPages = async(e, data, data1) => {
    setLoading(true)
    setAddLessonButton(true)
    sessionStorage.setItem('moduleid', data)
    sessionStorage.setItem('pagename', data1)
    let response = await new CoursesAPI().getCourseUnitPages(courseid, data)
    setLoading(false)
    if(response.ok){
      setModulePages(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all pages")
    }
  }

  const getExamInfo = async(e, data) => {
    setLoading(true)
    sessionStorage.setItem('moduleid', data)
    let response = await new CoursesAPI().getExamInformation(data)
    setLoading(false)
    if(response.ok){
      setExamInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all a")
    }
  }

  useEffect(() => {
    getCoursesInfo()
  }, [])

  let widget = sessionStorage.getItem('widget')

  return (
      <Tab.Container loading={loading} className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
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
              <ListGroup.Item className="list-group-item-o " action href="#link1" onClick={unitDisplay}>
                Learn
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o "action href="#link2" onClick={examsDisplay}>
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
            {display === false ?
            <Tab.Content className="content-pane">
              {learnHeader === true &&
              <span className="content-pane-title">
                {pagename === null ? "Learn" : modulePagesContent.pageName}
                <Button variant="outline-warning" onClick={handleOpenCreateUnitModal}><i className="fa fa-plus"></i> 
                  Add Unit
                </Button>
              </span>
              }

              {examHeader === true &&
              <span className="content-pane-title">
                Exam
                <Button variant="outline-warning" onClick={handleOpenCreateUnitModal}><i className="fa fa-plus"></i> 
                  Add Exam
                </Button>
              </span>
              }

              <CourseCreateUnit moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} openCreateUnitModal={openCreateUnitModal} setopenCreateUnitModal={setopenCreateUnitModal}/>
              <div className="row m-b-20 m-t-30">
                <div className="col-md-12">
                  <InputGroup size="lg">
                    <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
                    <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
              <Tab.Pane eventKey="#link1">
                <Accordion defaultActiveKey="0">
                  {moduleInfo.map((item, index) => {
                    return(
                      <Accordion.Item eventKey={item.id}> 
                        <Accordion.Header onClick={(e) => getCourseUnitPages(e, item.id)}>
                          <span className="unit-title">{item.moduleName}
                            {addLessonButton === false ? "" : <Button className="m-l-10" variant="outline-warning" onClick={handleOpenCreateLessonModal}><i className="fa fa-plus"></i> Add Lesson</Button>}
                          </span>
                        </Accordion.Header>
                        <CreateLesson moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} openCreateLessonModal={openCreateLessonModal} setCreateLessonModal={setCreateLessonModal}/>
                        <Accordion.Body>
                          <CoursePages 
                            modulePagesContent={modulePagesContent} 
                            setModulePagesContent={setModulePagesContent} 
                            display={display} setDisplay={setDisplay} 
                            modulePages={modulePages} setModulePages={setModulePages}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                      )
                    })
                  }
                </Accordion>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <Accordion defaultActiveKey="0">
                  {moduleInfo.map((item, index) => {
                    return(
                      <Accordion.Item eventKey={item.id}> 
                        <Accordion.Header onClick={(e) => getExamInfo(e, item.id)}>
                          <span className="unit-title">{item.moduleName}
                            {addLessonButton === false ? "" : <Button className="m-l-10" variant="outline-warning" onClick={handleOpenCreateExamModal}><i className="fa fa-plus"></i> Add Exam</Button>}
                          </span>
                        </Accordion.Header>
                        <CreateExam examInfo={examInfo} setExamInfo={setExamInfo} openCreateExamModal={openCreateExamModal} setOpenCreateExamModal={setOpenCreateExamModal}/>
                        <Accordion.Body>
                          <CourseExams
                            examInfo={examInfo}
                            setExamInfo={setExamInfo}
                            display={display} setDisplay={setDisplay} 
                            modulePages={modulePages} setModulePages={setModulePages}
                            selectedTest={selectedTest}
                            setSelectedTest={setSelectedTest}
                          />
                          <EditTest
                            examInfo={examInfo} 
                            setExamInfo={setExamInfo}   
                            openEditTestModal={openEditTestModal} 
                            setOpenEditTestModal={setOpenEditTestModal} 
                            selectedTest={selectedTest}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                      )
                    })
                  }
                </Accordion>
              </Tab.Pane>
            </Tab.Content> 
            :
            <Tab.Content className="content-pane">
              <span className="content-pane-title">{pagename === null ? "Learn" : modulePagesContent.pageName} <Button variant="outline-warning" onClick={handleOpenCreateUnitModal}><i className="fa fa-plus"></i> Add Unit</Button></span>
              <CourseCreateUnit moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} openCreateUnitModal={openCreateUnitModal} setopenCreateUnitModal={setopenCreateUnitModal}/>
              <div className="row m-b-20 m-t-30">
                <div className="col-md-12">
                  <InputGroup size="lg">
                    <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
                    <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
              <Tab.Pane eventKey="#link1">
                <CoursePages 
                  modulePagesContent={modulePagesContent} 
                  setModulePagesContent={setModulePagesContent} 
                  display={display} setDisplay={setDisplay} 
                  modulePages={modulePages} setModulePages={setModulePages}
                  selectedPage={selectedPage}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                v
              </Tab.Pane>
            </Tab.Content> 
            }
          </Col> 
        </Row>
      </Tab.Container>
  )
}
