import React, { useState, useEffect } from "react";
import { Tab, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";
import CourseCreateUnit from "./../../components/CourseCreateUnit";
import CreateAssignment from "./../../components/CreateAssignment";
import EditAssignment from "./../../components/EditAssignment";
import SweetAlert from 'react-bootstrap-sweetalert';

export default function CoursesAssignment({moduleInfo, setModuleInfo}) {

  const [loading, setLoading] = useState(false)

  const [openCreateUnitModal, setOpenCreateUnitModal] = useState(false)
  const [openCreateAssignmentModal, setOpenCreateAssignmentModal] = useState(false)
  const [openEditAssignmentModal, setOpenEditAssignmentModal] = useState(false)
  const [selectedAssignment, setselectedAssignment] = useState(null)
  const [assignmentInfo, setAssignmentInfo] = useState([])
  const [sweetError, setSweetError] = useState(false)
  const [assignmentId, setAssignmentId] = useState("")
  const [localModuleId, setLocalModuleId] = useState(false)

  const courseid = sessionStorage.getItem('courseid')
  const moduleid = sessionStorage.getItem('moduleid')

  const handleOpenCreateUnitModal = () =>{
    setOpenCreateUnitModal(!openCreateUnitModal)
  }

  const handleOpenCreateAssignmentModal = () =>{
    setOpenCreateAssignmentModal(!openCreateAssignmentModal)
  }

  const handleOpenEditAssignmentModal = (e, item) =>{
    e.preventDefault()
    setselectedAssignment(item)
    setOpenEditAssignmentModal(!openEditAssignmentModal)
  }

  const getAssignmentInfo = async(e, data) => {
    setLoading(true)
    setLocalModuleId(data)
    let response = await new CoursesAPI().getAssignmentInformation(data)
    setLoading(false)
    if(response.ok){
      setAssignmentInfo(response.data)
      console.log(response.data)
    }else{
      alert(response.data.errorMessage)
    }
  }

  const cancelSweetError = () => {
    setSweetError(false)
  }

  const confirmSweetError = (id) => {
    alert('Deleted')
    console.log(assignmentId)
    deleteCourseAssignment(id)
    setSweetError(false)
  } 

  const deleteCourseAssignment = async(e, data) => {
    setLoading(true)
    let response = await new CoursesAPI().deleteAssignment(assignmentId)
    setLoading(false)
    if(response.ok){
      getAssignmentInfo(null, localModuleId)
      console.log(response.data)
    }else{
      alert(response.data.errorMessage)
    }
  }


  useEffect(() => {
  }, [])

  return (
    <React.Fragment>
      <span className="content-pane-title">
        Assignment 
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
      <CreateAssignment openCreateAssignmentModal={openCreateAssignmentModal} setOpenCreateAssignmentModal={setOpenCreateAssignmentModal}/>
      <EditAssignment setAssignmentInfo={setAssignmentInfo} selectedAssignment={selectedAssignment} openEditAssignmentModal={openEditAssignmentModal} setOpenEditAssignmentModal={setOpenEditAssignmentModal}/>

      <Accordion defaultActiveKey="0">
        {moduleInfo.map((item, index) => {
          return(
            <>
              <Accordion.Item eventKey={item.id}> 
                <Accordion.Header onClick={(e) => getAssignmentInfo(e, item.id)}>
                  <span className="unit-title">{item.moduleName} <Button className="m-l-10" variant="outline-warning" onClick={handleOpenCreateAssignmentModal}><i className="fa fa-plus"></i> Add Assignment</Button>
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  {assignmentInfo.map((item, index) => {
                    return(
                      <Row>
                        <Col className="lesson-header" md={9}>
                          {item?.assignmentName}
                        </Col>
                        <Col className="align-right-content" md={3}>
                          <Button className="m-r-5 color-white tficolorbg-button" size="sm" onClick={(e) => handleOpenEditAssignmentModal(e, item)}><i className="fa fa-edit"></i></Button>
                          <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i className="fa fa-trash"  onClick={() => {setSweetError(true); setAssignmentId(item.id)}}></i></Button>
                            
                        </Col>
                      </Row>
                    )
                  })}
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
                </Accordion.Body>
              </Accordion.Item>
            </>
            )
          })
        }
      </Accordion>
    </React.Fragment>
  )
}
