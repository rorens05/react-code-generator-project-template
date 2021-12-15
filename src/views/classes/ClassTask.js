import React, { useState, useEffect } from 'react'
import {Row, Col, Accordion, Button} from 'react-bootstrap'
import ClassesAPI from '../../api/ClassesAPI'
import HeaderTask from './components/Task/HeaderTask'
import { useParams } from 'react-router'


function ClassTask({classInfo}) {
  const [module, setModule] = useState([])
  const [moduleId, setmoduleId] = useState('')
  const [taskModule, setTaskModule] = useState([])
  const {id} = useParams()
  const courseId = classInfo?.classInformation?.courseId
  
  const getModule = async() =>{
    let response = await new ClassesAPI().getLearn(courseId)
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
    }else{
      
    }
  }

  useEffect(() => {
    getTaskModule()
  }, [])
  
  return (
    <>
      <HeaderTask module={module} />
        <Accordion>
        {module.map((item, index) =>{
          return ( 
            <Accordion.Item eventKey={index} onClick={(e) => getTaskModule(e, item?.id)}>
            <Accordion.Header>{item.moduleName}</Accordion.Header>
            <Accordion.Body>
              {taskModule?.map(moduleitem => {
                return (
                  <Row>
                    <Col sm={8}>
                      <div className='title-exam'>
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
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-edit"></i></Button>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-user-clock"></i></Button>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-trash-alt"></i></Button>
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
                      ________________________________________________________________________________________________________________________________________
                    </div>
                  </Row>  
                    )})}
              </Accordion.Body>
              </Accordion.Item>
            )
          })}
          </Accordion>
       </>
    )
  }
export default ClassTask