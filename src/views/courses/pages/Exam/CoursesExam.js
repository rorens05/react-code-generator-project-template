import React, { useState, useEffect } from "react";
import { Tab, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";
import CourseCreateUnit from "./../../components/CourseCreateUnit";
import CreateLesson from "./../../components/CreateLesson";
import EditExam from "./../../components/EditExam";
import CreateExam from "../CreateExam";
import SweetAlert from 'react-bootstrap-sweetalert';

export default function CoursesExam() {

  const [loading, setLoading] = useState(false)

  const [openCreateExamModal, setOpenCreateExamModal] = useState(false)
  const [openEditExamModal, setOpenEditExamModal] = useState(false)
  const [moduleInfo, setModuleInfo] = useState([])
  const [examInfo, setExamInfo] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)
  const [sweetError, setSweetError] = useState(false)

  const courseid = sessionStorage.getItem('courseid')
  const moduleid = sessionStorage.getItem('moduleid')

  const handleOpenCreateExamModal = () =>{
    setOpenCreateExamModal(!openCreateExamModal)
  }

  const handleOpenEditExamModal = (e, item) =>{
    e.preventDefault()
    setSelectedExam(item)
    setOpenEditExamModal(!openEditExamModal)
  }

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

  const cancelSweetError = () => {
    setSweetError(false)
  }

  const confirmSweetError = (id) => {
    alert('Deleted')
    deleteCourseExam(id)
    setSweetError(false)
  } 

  const deleteCourseExam = async(data) => {
    setLoading(true)
    let response = await new CoursesAPI().deleteExam(data)
    setLoading(false)
    if(response.ok){
      // setLessonInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all pages")
    }
  }

  useEffect(() => {
    getCourseUnitInformation()
  }, [])

  return (
    <>
      <span className="content-pane-title">
        Exam 
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
            <Accordion.Item eventKey={item.id}> 
              <Accordion.Header onClick={(e) => getExamInfo(e, item.id)}>
                <span className="unit-title">{item.moduleName} <Button className="m-l-10" variant="outline-warning" onClick={handleOpenCreateExamModal}><i className="fa fa-plus"></i> Add Exam</Button>
                <CreateExam openCreateExamModal={openCreateExamModal} setOpenCreateExamModal={setOpenCreateExamModal}/></span>
              </Accordion.Header>
              <Accordion.Body>
                {examInfo.map((item, index) => {
                  return(
                    <Row>
                      <Col className="lesson-header" md={9}>
                        {item?.testName}
                      </Col>
                      <Col className="align-right-content" md={3}>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"   onClick={(e) => handleOpenEditExamModal(e, item)}><i className="fa fa-edit"></i></Button>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i className="fa fa-trash" onClick={() => setSweetError(true)}></i></Button>
                        <SweetAlert
                              warning
                              showCancel
                              show={sweetError}
                              confirmBtnText="Yes, delete it!"
                              confirmBtnBsStyle="danger"
                              title="Are you sure?"
                              onConfirm={() => confirmSweetError(item.id)}
                              onCancel={cancelSweetError}
                              focusCancelBtn
                            >
                              You will not be able to recover this imaginary file!
                            </SweetAlert>
                      
                      </Col>
                      <EditExam selectedExam={selectedExam} openEditExamModal={openEditExamModal} setOpenEditExamModal={setOpenEditExamModal}/>
                    </Row>
                  )
                })}
              </Accordion.Body>
            </Accordion.Item>
            )
          })
        }
      </Accordion>
    </> 
  )
}
