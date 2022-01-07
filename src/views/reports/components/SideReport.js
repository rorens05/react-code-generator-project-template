import React, {useState, useEffect, useContext} from 'react'
import {ListGroup, Tab, Row, Col, Form} from 'react-bootstrap'
import ReportHeader from './ReportHeader'
import AssignmentReport from './AssignmentReport'
import AssignmentHeader from './AssignmentHeader'
import ReportTask from './ReportTask'
import ReportInteractives from '../ReportInteractives'
import { UserContext } from './../../../context/UserContext'
import ClassesAPI from './../../../api/ClassesAPI'
import TaskHeader from './TaskHeader'

function SideReport() {

  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const [classes, setClasses] = useState([])
  const [classesModules, setClassesModules] = useState([])
  const [classId, setClassId] = useState([])
  const [selectedClassId, setSelectedClassId] = useState(null)
  const [viewTestReport, setViewTestReport] = useState(false)
  const [viewAssignmentReport, setViewAssignmentReport] = useState(false)
  const [viewTaskReport, setViewTaskReport] = useState(false)

  const getClasses = async() => {
    let response = await new ClassesAPI().getClasses(user.teacher.id)
    if(response.ok){
      setClasses(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  const getClassModules = async(selectedClassId) => {
    console.log(selectedClassId)
    let response = await new ClassesAPI().getClassModules(selectedClassId)
    if(response.ok){
      setClassesModules(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  
  const onShowClassModules = (e) => {
    sessionStorage.removeItem("taskName")
    sessionStorage.removeItem("assignmentName")
    setSelectedClassId(e.target.value)
    setViewTestReport(true)
    setViewTaskReport(true)
    setViewAssignmentReport(true)
    if(e.target.value == null || e.target.value == ""){
      setViewTestReport(true)
      setViewTaskReport(true)
      setViewAssignmentReport(true)
      setClassesModules([])
    }else{
      setViewTestReport(true)
      setViewTaskReport(true)
      setViewAssignmentReport(true)
      getClassModules(e.target.value)
    }
  }

  const showTest = (e) => {
    setViewTestReport(true)
    setViewAssignmentReport(false)
    setViewTaskReport(false)
    sessionStorage.removeItem("testName")
  }

  const showAssignment = (e) => {
    setViewAssignmentReport(true)
    setViewTestReport(false)
    setViewTaskReport(false)
    sessionStorage.removeItem("assignmentName")
  }

  const showTask = (e) => {
    setViewTaskReport(true)
    setViewAssignmentReport(false)
    setViewTestReport(false)
    sessionStorage.removeItem("taskName")
  }

  useEffect(() => {
    getClasses()
    //getClassModules()
  }, [])

  return (
    <Tab.Container className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
        <div className="row">
          <div className="report-sidenav col-md-3">
              <ListGroup.Item className="list-group-item-o">
                <Row>
								<Form.Select onChange={onShowClassModules}>
                <option value="">-- Select Class Here --</option>
                {classes.map(item =>{
                  return (<option value={item?.classId} > {item?.className}</option>)
                })}
              </Form.Select>
                </Row>
              </ListGroup.Item>
            <ListGroup style={{paddingLeft:'15px'}}>
              <ListGroup.Item  className="list-group-item-o "action href="#link3" onClick={showTest}>
                Exam
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5" onClick={showAssignment}>
                Assignment
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6" onClick={showTask}>
                Task
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link7" >
                Interactive
              </ListGroup.Item>
            </ListGroup>
          </div>
					<Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
              </Tab.Pane>
              <Tab.Pane className='content-pane report-content'  eventKey="#link3">
                <ReportHeader viewTestReport={viewTestReport} setViewTestReport={setViewTestReport} classesModules={classesModules} setClassesModules={setClassesModules} selectedClassId={selectedClassId}/>
              </Tab.Pane>
              <Tab.Pane className='content-pane report-content' eventKey="#link5">
                <AssignmentHeader viewAssignmentReport={viewAssignmentReport} setViewAssignmentReport={setViewAssignmentReport} classesModules={classesModules} setClassesModules={setClassesModules} selectedClassId={selectedClassId}/>
              </Tab.Pane>
              <Tab.Pane className='content-pane report-content' eventKey="#link6">
                <TaskHeader viewTaskReport={viewTaskReport} setViewTaskReport={setViewTaskReport} classesModules={classesModules} setClassesModules={setClassesModules} selectedClassId={selectedClassId}/>
              </Tab.Pane>
              <Tab.Pane className='content-pane report-content' eventKey="#link7">
              <ReportInteractives />
              </Tab.Pane>
            </Tab.Content> 
          </Col> 
        </div>
      </Tab.Container>

      
  )
}
export default SideReport