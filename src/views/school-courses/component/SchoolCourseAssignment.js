import React, {useState, useEffect} from 'react'
import {Row, Col, Accordion, Button} from 'react-bootstrap'
import CoursesAPI from '../../../api/CoursesAPI'
import { useParams } from "react-router";
import CourseBreadcrumbs from '../../courses/components/CourseBreadcrumbs';

function SchoolCourseAssignment() {
  const [modules, setModules] = useState([])
  const [moduleId, setModuleId] = useState(null)
  const [assignment, setAssignment] = useState([])
  const [viewAssignment, setViewAssignment] = useState(false)
  const [assignmentName, setAssignmentName] = useState('')
  const [assignmentIntruction, setAssignmentIntruction] = useState('')
  const {id} = useParams()

  const getCourseUnit = async () =>{
    let response = await new CoursesAPI().getCourseUnit(id)
      if(response.ok){
        setModules(response.data)
      }else{
        alert(response.data.errorMessage)
      }
  }

  useEffect(() => {
    getCourseUnit()
  }, [])

  const getAssignmentInformation = async (e, moduleId) => {
    let response =  await new CoursesAPI().getAssignmentInformation(moduleId)
    if(response.ok){
      setAssignment(response.data)
      setModuleId(moduleId)
    }else{
      alert(response.data.errorMessage)
    }
  }

  useEffect(() => {
    if(moduleId !== null){
      return(
        getAssignmentInformation() 
      )
    }  
  }, [])

  const handleOnclick = (e, assignmentName, assignmentIntruction) => {
    setViewAssignment(true)
    setAssignmentName(assignmentName)
    setAssignmentIntruction(assignmentIntruction)
  }

  return (
        <>
      {viewAssignment ? 
      <>
    <Button onClick={() => setViewAssignment(false)} className="m-r-5 color-white tficolorbg-button" size="sm">Back</Button><br /><br />
      {/* {moduleName}<br /> */}
      {assignmentName}<br />
      <hr></hr>
      {assignmentIntruction}<br />
      </>:
      <>
      <div className='rounded-white-container'>
      <div className="col-md-10 pages-header"><p className='title-header'>Assignment </p>
			</div>
      <Accordion>
        {modules.map((item, index) => {
          return(
            <Accordion.Item eventKey={index} onClick={(e) => getAssignmentInformation(e, item?.id)}>
            <Accordion.Header><div style={{fontSize:'20px'}}>{item.moduleName}</div></Accordion.Header>
            <Accordion.Body>
              {assignment.map(item =>{
                return(
                  <>
                    <div className='title-exam' >
                      <Row>
                        <Col onClick={(e) => handleOnclick(e, item?.assignmentName, item?.instructions)} >
                         {item?.assignmentName}
                        </Col>
                      </Row>
                     
                    </div>
                  </>
                )
              })} 
            </Accordion.Body>
          </Accordion.Item>
          )
        })}
     </Accordion>
    </div>
      </>}
    </>
  )
}

export default SchoolCourseAssignment