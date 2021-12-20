import React, { useState, useEffect } from "react";
import { Tab, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";
import CourseCreateUnit from "./../../components/CourseCreateUnit";
import CreateLesson from "./../../components/CreateLesson";
import EditLesson from "../../components/EditLesson";
import CoursesLearnContent from "./CoursesLearnContent";

export default function CourseLearn({viewLesson, setViewLesson, moduleInfo, setModuleInfo}) {

  const [loading, setLoading] = useState(false)

  const [openCreateUnitModal, setOpenCreateUnitModal] = useState(false)
  const [openCreateLessonModal, setCreateLessonModal] = useState(false)
  const [openEditLessonModal, setOpenEditLessonModal] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [lessonInfo, setLessonInfo] = useState([])
  const [lessonContent, setLessonContent] = useState([])

  const courseid = sessionStorage.getItem('courseid')
  const moduleid = sessionStorage.getItem('courseid')

  const handleOpenCreateUnitModal = () =>{
    setOpenCreateUnitModal(!openCreateUnitModal)
  }

  const handleOpenCreateLessonModal = () =>{
    setCreateLessonModal(!openCreateLessonModal)
  }

  const handleOpenEditLessonModal = (e, item) =>{
    e.preventDefault()
    setSelectedLesson(item)
    setOpenEditLessonModal(!openEditLessonModal)
  }


  const getCourseLessons = async(e, data, modulename) => {
    setLoading(true)
    sessionStorage.setItem('moduleid', data)
    sessionStorage.setItem('modulename', modulename)
    let response = await new CoursesAPI().getCourseUnitPages(courseid, data)
    setLoading(false)
    if(response.ok){
      setLessonInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all pages")
    }
  }

  const getModuleContent = async(e, data, pagesid) => {
    setLoading(true)
    setViewLesson(true)
    let response = await new CoursesAPI().getCourseUnitPagesContent(courseid, data, pagesid)
    setLoading(false)
    if(response.ok){
      setLessonContent(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  useEffect(() => {
  }, [])
  
  if(viewLesson === false){
    return (
      <React.Fragment>
        <span className="content-pane-title">
          Learn <Button variant="outline-warning" onClick={handleOpenCreateUnitModal}><i className="fa fa-plus"></i> Add Unit</Button>
          <CourseCreateUnit moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} openCreateUnitModal={openCreateUnitModal} setOpenCreateUnitModal={setOpenCreateUnitModal}/>
        </span>
        <div className="row m-b-20 m-t-30">
          <div className="col-md-12">
            <InputGroup size="lg">
              <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
              <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
            </InputGroup>
          </div>
        </div>
        <Accordion defaultActiveKey="0">
          {moduleInfo.map((item, index) => {
            return(
              <>
                <Accordion.Item eventKey={item.id}> 
                  <Accordion.Header onClick={(e) => getCourseLessons(e, item.id, item.moduleName)}>
                    <span className="unit-title">{item.moduleName} <Button className="m-l-10" variant="outline-warning" onClick={handleOpenCreateLessonModal}><i className="fa fa-plus"></i> Add Lesson</Button>
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    {lessonInfo.map((item, index) => {
                      return(
                        <Row>
                          <Col className="lesson-header" md={9} onClick={(e) => getModuleContent(e, moduleid, item.id)}>
                            {item?.pageName}
                          </Col>
                          <Col className="align-right-content" md={3}>
                            <Button key={item.id} className="m-r-5 color-white tficolorbg-button" size="sm" onClick={(e) => handleOpenEditLessonModal(e, item)}><i className="fa fa-edit"></i></Button>
                            <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i className="fa fa-trash"></i></Button>
                          </Col>
                          <EditLesson key={index} selectedLesson={selectedLesson} openEditLessonModal={openEditLessonModal} setOpenEditLessonModal={setOpenEditLessonModal}/>
                        </Row>
                      )
                    })}
                  </Accordion.Body>
                </Accordion.Item>
                <CreateLesson 
                  openCreateLessonModal={openCreateLessonModal} 
                  setCreateLessonModal={setCreateLessonModal} 
                  selectedLesson={selectedLesson} 
                  setSelectedLesson={setSelectedLesson}
                />
              </>
              )
            })
          }
        </Accordion>
      </React.Fragment>
    )
  }else{
    return (
    <CoursesLearnContent setLessonContent={setLessonContent} lessonContent={lessonContent}/>
    )
  }
}
