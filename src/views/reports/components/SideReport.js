import React, {useState, useEffect, useContext} from 'react'
import {ListGroup, Tab, Row, Col, Form} from 'react-bootstrap'
import ReportHeader from './ReportHeader'
import AssignmentReport from './AssignmentReport'
import AssignmentHeader from './AssignmentHeader'
import ReportTask from './ReportTask'
import ReportInteractives from '../ReportInteractives'
import { UserContext } from './../../../context/UserContext'
import ClassesAPI from './../../../api/ClassesAPI'

function SideReport() {

  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const [classes, setClasses] = useState([])
  const [classesModules, setClassesModules] = useState([])
  const [classId, setClassId] = useState([])
  const [selectedClassId, setSelectedClassId] = useState(null)

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
    setSelectedClassId(e.target.value)
    
    if(e.target.value == null || e.target.value == ""){
      setClassesModules([])
    }else{
      getClassModules(e.target.value)
    }
  }

  useEffect(() => {
    getClasses()
    getClassModules()
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
              <ListGroup.Item  className="list-group-item-o "action href="#link3">
                Exam
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5">
                Assignment
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6">
                Task
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link7">
                Interactive
              </ListGroup.Item>
            </ListGroup>
          </div>
					<Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
              </Tab.Pane>
              <Tab.Pane className='content-pane report-content'  eventKey="#link3">
                <ReportHeader classesModules={classesModules} setClassesModules={setClassesModules} selectedClassId={selectedClassId}/>
              </Tab.Pane>
              <Tab.Pane className='content-pane report-content' eventKey="#link5">
              <AssignmentHeader />
                <AssignmentReport />
              </Tab.Pane>
              <Tab.Pane className='content-pane report-content' eventKey="#link6">
              <ReportTask />
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