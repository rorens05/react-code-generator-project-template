import React, { useState, useEffect } from "react";
import { Tab, Row, Col, Button, InputGroup, FormControl, Accordion, Tooltip, OverlayTrigger } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";
import CourseCreateUnit from "./../../components/CourseCreateUnit";
import CreateAssignment from "./../../components/CreateAssignment";
import EditAssignment from "./../../components/EditAssignment";
import SweetAlert from 'react-bootstrap-sweetalert';
import ViewAssignment from "./ViewAssignment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CoursesAssignment({moduleInfo, setModuleInfo, showAssignment, setShowAssignment}) {

  const [loading, setLoading] = useState(false)

  const [openCreateUnitModal, setOpenCreateUnitModal] = useState(false)
  const [openCreateAssignmentModal, setOpenCreateAssignmentModal] = useState(false)
  const [openEditAssignmentModal, setOpenEditAssignmentModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [assignmentInfo, setAssignmentInfo] = useState([])
  const [sweetError, setSweetError] = useState(false)
  const [assignmentId, setAssignmentId] = useState("")
  const [localModuleId, setLocalModuleId] = useState(false)
  const [filter, setFilter] = useState("")

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
    setSelectedAssignment(item)
    setOpenEditAssignmentModal(!openEditAssignmentModal)
  }

  const getAssignmentInfo = async(e, data) => {
    setLoading(true)
    setLocalModuleId(data)
    sessionStorage.setItem("moduleid", data)
    let response = await new CoursesAPI().getAssignmentInformation(data)
    setLoading(false)
    if(response.ok){
      setAssignmentInfo(response.data)
      console.log(response.data)
    }else{
      alert(response.data.errorMessage)
    }
  }

  const fetchAssignments = async() => {
    setLoading(true)
    let response = await new CoursesAPI().getAssignmentInformation(moduleid)
    setLoading(false)
    if(response.ok) {
      setAssignmentInfo(response.data.filter(item => item != null))
    }else{
      alert("Something went wrong while fetching assignment")
    }
  }


  const cancelSweetError = () => {
    setSweetError(false)
  }

  const confirmSweetError = (id) => {
    notifyDeleteAssignment()
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

  const onSearch = (text) => {
    setFilter(text)
  }

  const viewAss = (data) => {
    setSelectedAssignment(data)
    setShowAssignment(true)
  }

  useEffect(() => {
  }, [])

  const notifyDeleteAssignment= () => 
  toast.error('Assignment Deleted!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  )

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  )

  if(showAssignment === false){
  return (
    <React.Fragment>
      <span className="content-pane-title">
        Assignment 
        <CourseCreateUnit moduleInfo={moduleInfo} setModuleInfo={setModuleInfo} openCreateUnitModal={openCreateUnitModal} setOpenCreateUnitModal={setOpenCreateUnitModal}/>
      </span>
      <div className="row m-b-20 m-t-30" onSearch={onSearch}>
        <div className="col-md-12">
          <InputGroup size="lg">
            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search" onChange={(e) => onSearch(e.target.value)} />
            <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
          </InputGroup>
        </div>
      </div>
      <CreateAssignment openCreateAssignmentModal={openCreateAssignmentModal} setOpenCreateAssignmentModal={setOpenCreateAssignmentModal} setAssignmentInfo={setAssignmentInfo}/>
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
                  {assignmentInfo.filter(item => 
                    item.assignmentName.toLowerCase().includes(filter.toLowerCase())
                  ).map((as, index) => (
                    <Row style={{margin:'10px'}} >
                      <Col className="lesson-header" md={9} >
                        <span onClick={(e) => {viewAss(as)}}>{as?.assignmentName}</span>
                      </Col>
                      <Col className="align-right-content" md={3}>
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 1, hide: 25 }}
                        overlay={renderTooltipEdit}>
                          <Button className="m-r-5 color-white tficolorbg-button" size="sm" onClick={(e) => handleOpenEditAssignmentModal(e, as)}><i className="fa fa-edit"></i>1</Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 1, hide: 25 }}
                        overlay={renderTooltipDelete}> 
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm" onClick={() => {setSweetError(true); setAssignmentId(as.id)}}><i className="fa fa-trash"  >1</i></Button>
                      </OverlayTrigger> 
                      </Col>
                      {assignmentInfo.length == 0 && !loading && <div className="no-exams">No assignment found...</div>}
                    </Row>
                  ))}
                  <SweetAlert
                    warning
                    showCancel
                    show={sweetError}
                    confirmBtnText= "Yes"
                    confirmBtnBsStyle="danger"
                    title="Are you sure?"
                    onConfirm={() => confirmSweetError(item.id)}
                    onCancel={cancelSweetError}
                    focusCancelBtn
                  >
                    You will not be able to recover this Assignment!
                  </SweetAlert>
                </Accordion.Body>
              </Accordion.Item>
            </>
            )
          })
        }
      </Accordion>
    </React.Fragment>
  )}else{
    return(
    <ViewAssignment setShowAssignment={setShowAssignment} selectedAssignment={selectedAssignment} assignmentInfo={assignmentInfo} setAssignmentInfo={setAssignmentInfo}/>
    )
  }
}
