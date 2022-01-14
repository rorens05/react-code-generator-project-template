import React, { useState, useEffect } from "react";
import { Tab, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";
import CourseCreateUnit from "./../../components/CourseCreateUnit";
import CreateDiscussion from "./../../components/CreateDiscussion";
import EditDiscussion from "./../../components/EditDiscussion";
import SweetAlert from 'react-bootstrap-sweetalert';

export default function CoursesDiscussion({moduleInfo, setModuleInfo, moduleId}) {

  const [loading, setLoading] = useState(false)

  const [openCreateDiscussionModal, setOpenCreateDiscussionModal] = useState(false)
  const [openEditDiscussionModal, setOpenEditDiscussionModal] = useState(false)
  const [selectedDiscussion, setSelectedDiscussion] = useState(null)
  const [discussionInfo, setDiscussionInfo] = useState([])
  const [sweetError, setSweetError] = useState(false)
  const [localModuleId, setLocalModuleId] = useState(false)

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

  const confirmSweetError = (id, mid) => {
    alert('Deleted')
    deleteCourseDiscussion(id, mid)
    setSweetError(false)
  } 

  const deleteCourseDiscussion = async(data, mid) => {
    setLoading(true)
    let response = await new CoursesAPI().deleteDiscussion(data)
    setLoading(false)
    if(response.ok){
      getDiscussionInfo(null, localModuleId)
      // setLessonInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all pages")
    }
  }

  useEffect(() => {
    console.log(moduleId)
  }, [])

  return (
    <>
      <span className="content-pane-title">
        Discussion 
      </span>
      <div className="row m-b-20 m-t-30">
        <div className="col-md-12">
          <InputGroup size="lg">
            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
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
                {discussionInfo.map((item, index) => {
                  return(
                    <Row>
                      <Col className="lesson-header" md={9}>
                        {item?.discussion.discussionName}
                      </Col>
                      <Col className="align-right-content" md={3}>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"  onClick={(e) => handleOpenEditDiscussionModal(e, item)}><i className="fa fa-edit"></i></Button>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i className="fa fa-trash"  onClick={() => {setSweetError(true); setLocalModuleId(moduleid)}}></i></Button>
                        <SweetAlert
                              warning
                              showCancel
                              show={sweetError}
                              confirmBtnText="Yes, delete it!"
                              confirmBtnBsStyle="danger"
                              title="Are you sure?"
                              onConfirm={() => confirmSweetError(item.discussion.id, moduleId)}
                              onCancel={cancelSweetError}
                              focusCancelBtn
                            >
                              You will not be able to recover this imaginary file!
                            </SweetAlert>
                      </Col>
                    </Row>
                  )
                })}
              </Accordion.Body>
            </Accordion.Item>
            </>
            )
          })
        }
      </Accordion>
    </> 
  )
}
