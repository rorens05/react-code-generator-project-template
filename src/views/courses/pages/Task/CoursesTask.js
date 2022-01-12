import React, { useState, useEffect } from "react";
import { Tab, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";
import CourseCreateUnit from "./../../components/CourseCreateUnit";
import CreateTask from "./../../components/CreateTask";
import EditTask from "./../../components/EditTask";

export default function CoursesTask({moduleInfo, setModuleInfo}) {

  const [loading, setLoading] = useState(false)

  const [openCreateTaskModal, setCreateTaskModal] = useState(false)
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [taskInfo, setTaskInfo] = useState([])

  const sessionCourse = sessionStorage.getItem('courseid')

  const handleOpenCreateTaskModal = () =>{
    setCreateTaskModal(!openCreateTaskModal)
  }

  const handleOpenEditTaskModal = (e, item) =>{
    e.preventDefault()
    setSelectedTask(item)
    setOpenEditTaskModal(!openEditTaskModal)
  }

  const getTaskInfo = async(e, data) => {
    setLoading(true)
    sessionStorage.setItem('moduleid', data)
    const sessionModule = sessionStorage.getItem('moduleid')
    let response = await new CoursesAPI().getTaskInformation(sessionModule)
    setLoading(false)
    if(response.ok){
      setTaskInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all task")
    }
  }

  useEffect(() => {
  }, [])

  return (
    <>
      <span className="content-pane-title">
        Task 
      </span>
      <div className="row m-b-20 m-t-30">
        <div className="col-md-12">
          <InputGroup size="lg">
            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
            <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
          </InputGroup>
        </div>
      </div>
      <EditTask setTaskInfo={setTaskInfo} selectedTask={selectedTask} openEditTaskModal={openEditTaskModal} setOpenEditTaskModal={setOpenEditTaskModal}/>
      <CreateTask setTaskInfo={setTaskInfo} openCreateTaskModal={openCreateTaskModal} setCreateTaskModal={setCreateTaskModal}/>
      <Accordion defaultActiveKey="0">
        {moduleInfo.map((item, index) => {
          return(
            <>
            <Accordion.Item eventKey={item.id}> 
              <Accordion.Header onClick={(e) => getTaskInfo(e, item.id)}>
                <span className="unit-title">{item.moduleName} <Button className="m-l-10" variant="outline-warning" onClick={handleOpenCreateTaskModal}><i className="fa fa-plus"></i> Add Task</Button>
                </span>
              </Accordion.Header>
              <Accordion.Body>
                {taskInfo.map((item, index) => {
                  return(
                    <Row>
                      <Col className="lesson-header" md={9}>
                        {item?.taskName}
                      </Col>
                      <Col className="align-right-content" md={3}>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"  onClick={(e) => handleOpenEditTaskModal(e, item)}><i className="fa fa-edit"></i></Button>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i className="fa fa-trash"></i></Button>
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
