import React, { useState, useEffect } from "react";
import { Row, Col, Button, InputGroup, FormControl, Accordion, Tooltip, OverlayTrigger } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";
import CourseCreateUnit from "./../../components/CourseCreateUnit";
import CreateDiscussion from "./../../components/CreateDiscussion";
import EditDiscussion from "./../../components/EditDiscussion";
import ViewDiscussion from "./ViewDiscussion";
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CoursesDiscussion({moduleInfo, moduleId, showDiscussion, setShowDiscussion}) {

  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("")
  const [openCreateDiscussionModal, setOpenCreateDiscussionModal] = useState(false)
  const [openEditDiscussionModal, setOpenEditDiscussionModal] = useState(false)
  const [selectedDiscussion, setSelectedDiscussion] = useState(null)
  const [discussionInfo, setDiscussionInfo] = useState([])
  const [sweetError, setSweetError] = useState(false)
  const [localModuleId, setLocalModuleId] = useState(false)
  const [discussionId, setDiscussionId] = useState("")

  const courseid = sessionStorage.getItem('courseid')
  const moduleid = sessionStorage.getItem('moduleid')

  const handleopenCreateDiscussionModal = () =>{
    setOpenCreateDiscussionModal(!openCreateDiscussionModal)
  }

  const handleOpenEditDiscussionModal = (e, item) =>{
    e.preventDefault()
    setSelectedDiscussion(item)
    setOpenEditDiscussionModal(!openEditDiscussionModal)
  }

  const getDiscussionInfo = async(e, data) => {
    setLoading(true)
    setLocalModuleId(data)
    sessionStorage.setItem("moduleid", data)
    let response = await new CoursesAPI().getDiscussionInformation(data)
    setLoading(false)
    if(response.ok){
      setDiscussionInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all discussion")
    }
  }

  const cancelSweetError = () => {
    setSweetError(false)
  }

  const confirmSweetError = (id) => {
    notifyDeleteDiscussion()
    deleteCourseDiscussion(discussionId)
    setSweetError(false)
  } 

  const deleteCourseDiscussion = async(data, mid) => {
    setLoading(true)
    let response = await new CoursesAPI().deleteDiscussion(discussionId)
    setLoading(false)
    if(response.ok){
      getDiscussionInfo(null, localModuleId)
      // setLessonInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all pages")
    }
  }

  const onSearch = (text) => {
    setFilter(text)
  }

  const viewDis = (data) => {
    setSelectedDiscussion(data)
    setShowDiscussion(true)
  }

  useEffect(() => {
    console.log(moduleId)
  }, [])

  const notifyDeleteDiscussion= () => 
  toast.error('Discussion Deleted!', {
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

  if(showDiscussion === false){
  return (
    <>
      <span className="content-pane-title">
        Discussion 
      </span>
      <div className="row m-b-20 m-t-30">
        <div className="col-md-12">
          <InputGroup size="lg">
            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search" onChange={(e) => onSearch(e.target.value)}/>
            <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
          </InputGroup>
        </div>
      </div>
      <CreateDiscussion setDiscussionInfo={setDiscussionInfo} openCreateDiscussionModal={openCreateDiscussionModal} setOpenCreateDiscussionModal={setOpenCreateDiscussionModal}/>
      <EditDiscussion setDiscussionInfo={setDiscussionInfo} selectedDiscussion={selectedDiscussion} openEditDiscussionModal={openEditDiscussionModal} setOpenEditDiscussionModal={setOpenEditDiscussionModal}/>
      <Accordion defaultActiveKey="0">
        {moduleInfo.map((item, index) => {
          return(
            <>
            <Accordion.Item eventKey={item.id}> 
              <Accordion.Header onClick={(e) => {getDiscussionInfo(e, item.id)}}>
                <span className="unit-title">{item.moduleName} <Button className="m-l-10" variant="outline-warning" onClick={handleopenCreateDiscussionModal}><i className="fa fa-plus"></i> Add Discussion</Button>
                </span>
              </Accordion.Header>
              <Accordion.Body>
                
                {discussionInfo.filter(di => 
                  di.discussion?.discussionName?.toLowerCase().includes(filter.toLowerCase())
                ).map((di, index) => (
                  <Row>
                    <Col className="lesson-header" md={9}>
                    <span onClick={(e) => {viewDis(di)}}>{di?.discussion.discussionName}</span>
                    </Col>
                    <Col className="align-right-content" md={3}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 10, hide: 25 }}
                      overlay={renderTooltipEdit}>
                           <Button className="m-r-5 color-white tficolorbg-button" size="sm" onClick={(e) => handleOpenEditDiscussionModal(e, di)}><i className="fa fa-edit"></i></Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 10, hide: 25 }}
                      overlay={renderTooltipDelete}>
                      <Button className="m-r-5 color-white tficolorbg-button" size="sm" onClick={() => {setSweetError(true); setDiscussionId(di.discussion.id)}}><i className="fa fa-trash"></i></Button>
                    </OverlayTrigger>
                    </Col>
                  </Row>
                ))}
                <SweetAlert
                  warning
                  showCancel
                  show={sweetError}
                  confirmBtnText="Yes, delete it!"
                  confirmBtnBsStyle="danger"
                  title="Are you sure?"
                  onConfirm={() => confirmSweetError(item.id, moduleid)}
                  onCancel={cancelSweetError}
                  focusCancelBtn
                >
                  You will not be able to recover this Discussion!
                </SweetAlert>
              </Accordion.Body>
            </Accordion.Item>
            </>
            )
          })
        }
      </Accordion>
    </> 
  )}else{
    return(
      <ViewDiscussion selectedDiscussion={selectedDiscussion} setShowDiscussion={setShowDiscussion} />
    )
  }
}
