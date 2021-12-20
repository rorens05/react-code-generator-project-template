import React, { useState, useEffect} from 'react'
import AssignmentHeader from './components/Assignment/AssignmentHeader'
import {Accordion, Row, Col, Button} from 'react-bootstrap'
import ClassesAPI from '../../api/ClassesAPI'
import { useParams } from 'react-router'
import EditAssignment from './components/Assignment/EditAssignment'

function ClassAssignment({classInfo}) {
  const [modal, setModal] = useState(false)
  const [module, setModule] = useState([])
  const [assignment, setAssignment] = useState([])
  const [editAssignment, setEditAssignment] = useState()
  const courseId = classInfo?.classInformation?.courseId
  const {id} = useParams()

  const toggle = (e, item) =>{
    setEditAssignment(item)
    setModal(!modal)
  }

  const getModule = async () =>{
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

  const getAssignmentList = async (e, item) => {
    let response = await new ClassesAPI().getAssignment(id, item)
      if(response.ok){
        setAssignment(response.data)
    }else{
      alert("Something went wrong while fetching all Assignment")
    }
  }

  const removeAssignment = async (e, item) => {
    let response = await new ClassesAPI().delateAssignment(item)
    if(response.ok){
      alert('Assingment Deleted')
  
    }else{
      alert("Something went wrong while Deleting a task")
    }
  }

  return (
    <div>
      <AssignmentHeader module={module} />
      <Accordion>
      {module.map((item, index) => {
        return(<Accordion.Item eventKey={index} onClick={(e) => getAssignmentList(e, item?.id)} >
        <Accordion.Header>
          <div className='unit-exam'>{item?.moduleName}
          </div>
        </Accordion.Header>
        <Accordion.Body>
        {assignment.map(assigItem => {
          return( <Row>
            <Col sm={8}>
              <div className='title-exam'>
                {assigItem?.assignment?.assignmentName}
              </div>
            </Col>
            <Col sm={9} className='instruction-exam' >
              <div className='inline-flex'>
                <div className='text-color-bcbcbc' >
                  Instruction:&nbsp;
                </div>
                <div className='text-color-707070' >
                <span style={{marginTop:"300px !important"}} dangerouslySetInnerHTML={{__html:assigItem?.assignment?.instructions }} /> 
                </div>
              </div>
            </Col>
            {assigItem.assignment.classId?( 
                    <Col sm={3} className='icon-exam'>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-eye" ></i>{' '}</Button>
                        <Button onClick={(e) => toggle(e, assigItem)}  className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-edit"></i></Button>
                        <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-user-clock"></i></Button>
                        <Button onClick={(e) => removeAssignment(e, assigItem?.assignment?.id)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-trash-alt"></i></Button>
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
          </Row>)
        })}
         
        </Accordion.Body>
        </Accordion.Item>)
      })}
      </Accordion>
      <EditAssignment toggle={toggle} modal={modal} editAssignment={editAssignment} />
    </div>
  )
}
export default ClassAssignment
