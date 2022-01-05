import React, { useState, useEffect } from 'react'
import {Row, Col, Accordion, Button} from 'react-bootstrap'
import ClassesAPI from '../../api/ClassesAPI'
import HeaderTask from './components/Task/HeaderTask'
import { useParams } from 'react-router'
import EditTask from './components/Task/EditTask'
import SweetAlert from 'react-bootstrap-sweetalert';


function ClassTask({classInfo}) {
  const [modal, setModal] = useState(false)
  const [moduleId, setModuleId] = useState()
  const [module, setModule] = useState([])
  const [taskModule, setTaskModule] = useState([])
  const [editTask, setEditTask] = useState()
  const {id} = useParams()
  const courseId = classInfo?.classInformation?.courseId
  const [deleteNotify, setDeleteNotify] = useState(false)
  const [itemId, setItemId] = useState('')

  const toggle = (e, item) =>{
    setEditTask(item)
    setModal(!modal)
  }
  
  const cancelSweetAlert = () => {
    setDeleteNotify(false)
  }

  const handleDeleteNotify = (item, item1) =>{
    setDeleteNotify(true)
    setItemId(item)
    setModuleId(item1)
  }

  const getModule = async() =>{
    let response = await new ClassesAPI().getModule(courseId)
    if(response.ok){
        setModule(response.data)
    }else{
      alert("Something went wrong while fetching all Module")
    }
  }

  useEffect(() => {
    getModule()
  }, [])

  const getTaskModule = async(e, item) =>{
    let response = await new ClassesAPI().getTaskModule(id, item)
    if(response.ok){
      setTaskModule(response.data)
      setModuleId(item)
    }else{
    
    }
  }

  console.log('moduleId:', moduleId)

  useEffect(() => {
    getTaskModule(null, moduleId)
  }, [])

  const removeTask = async (e, item, item1) => {
    let response = await new ClassesAPI().deleteTasks(item)
    if(response.ok){
      getTaskModule(null, item1)
      setDeleteNotify(false)
      // alert('Task Deleted')
    }else{
      alert("Something went wrong while Deleting a task")
    }
  }

  return (
    <>
      <HeaderTask module={module} getTaskModule={getTaskModule} refModuleId={moduleId} />
        <Accordion>
          <SweetAlert
            warning
            showCancel
            show={deleteNotify}
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={(e) => removeTask(e, itemId, moduleId)}
            onCancel={cancelSweetAlert}
            focusCancelBtn
            >
              You will not be able to recover this imaginary file!
          </SweetAlert>
        {module.map((item, index) =>{
          return ( 
            <Accordion.Item eventKey={index} onClick={(e) => getTaskModule(e, item?.id)}>
            <Accordion.Header ><div style={{fontSize:'20px'}}>{item.moduleName}</div></Accordion.Header>
            <Accordion.Body>
              {taskModule?.map(moduleitem => {
                return (
                  <Row>
                    <Col sm={8}>
                      <div className='title-exam' >
                        {moduleitem?.task?.taskName}
                      </div>
                    </Col>
                    <Col sm={9} className='instruction-exam' >
                      <div className='inline-flex'>
                        <div className='text-color-bcbcbc' >
                          Instruction:&nbsp;
                        </div>
                        <div className='text-color-707070' >
                        <span style={{marginTop:"300px !important"}} dangerouslySetInnerHTML={{__html:moduleitem?.task?.instructions }} />
                        </div>
                      </div>
                    </Col>
                    {moduleitem.task.classId?( 
                    <Col sm={3} className='icon-exam'>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-eye" ></i>{' '}</Button>
                        <Button onClick={(e) => toggle(e, moduleitem)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-edit"></i></Button>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-user-clock"></i></Button>
                        <Button onClick={() => handleDeleteNotify(moduleitem?.task?.id, item?.id)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-trash-alt"></i></Button>
                      </Col>
                      ):
                      <Col sm={3} className='icon-exam'>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-eye" ></i>{' '}</Button>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-user-clock"></i></Button>
                      </Col>
                    }
                     <Col sm={7} className='due-date-discusstion' >
                        <div className='inline-flex'>
                          <div className='text-color-bcbcbc'>
                            Start Date:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            November 11/10:30AM
                          </div>
                        </div>
                      </Col>
                      <Col className='posted-date-discusstion'>
                        <div className='inline-flex'>
                          <div className='text-color-bcbcbc'>
                            End Date:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            November 12/10:30AM
                          </div>
                        </div>
                      </Col>
                    <div className='text-color-bcbcbc' >
                    ___________________________________________________________________________________________________________________________________________________________________________________________________________
                    </div>
                  </Row>  
                    )})}
              </Accordion.Body>
              </Accordion.Item>
            )
          })}
          </Accordion>
          <EditTask moduleId={moduleId} editTask={editTask} toggle={toggle} modal={modal} module={module} getTaskModule={getTaskModule} />
       </>
    )
  }
export default ClassTask