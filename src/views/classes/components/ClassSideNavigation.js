import React, {useState, useEffect, useContext} from 'react'
import {ListGroup, Tab, Row, Col} from 'react-bootstrap'
import ClassAssignment from '../ClassAssignment'
import ClassDiscussion from '../ClassDiscussion'
import ClassExam from '../ClassExam'
import ClassFeed from '../ClassFeed'
import ClassLearn from '../ClassLearn'
import ClassLinks from '../ClassLinks'
import ClassTask from '../ClassTask'
import ClassCalendar from './ClassCalendar'
import ClassInteractive from '../ClassInteractive'
import ClassList from '../ClassList'
import ClassFiles from '../ClassFiles'
import DiscussionAPI from '../../../api/DiscussionAPI'
import { useParams } from 'react-router'
import { UserContext } from '../../../context/UserContext'

export default function ClassSideNavigation({setLoading}) {
  const userContext = useContext(UserContext)
  const [classInfo, setClassInfo] = useState(null)
  const {id} = useParams()
  const {user} = userContext.data

  const getClassInfo = async() => {
    setLoading(true)
    let response = await new DiscussionAPI().getClassInfo(id)
    if(response.ok){
      setClassInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
    setLoading(false)

  }

  useEffect(() => {
    getClassInfo()
  }, [])

  if(classInfo == null){
    return (<div/>)
  }
  if(classInfo == null) return <div/>

  return (
    <Tab.Container style={{position:'relative'}} className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
        <div style={{position:'relative'}} className="row">
          <div className="row-course-bg course-widget-font col-md-3">
              <ListGroup.Item className="list-group-item-o">
                <Row>
                  <Col className="" sm={9} >
                    <div className="class-subtitle-code" > <i class="fas fa-expand"></i> {classInfo?.classInformation?.classCode}</div>
                    <div className="class-subtitle-section">{classInfo?.classInformation?.className}</div>
                    <div className="class-subtitle-subject">{classInfo?.classInformation?.gradeName}</div>
                    <div className="class-subtitle-name">{classInfo?.classInformation?.teacherName}</div>
                  </Col>
                  <Col className="ellipsis-top-right" sm={3}>
                    <i className="fa fa-ellipsis-v fa-1x cursor-pointer"></i>
                    <div className='fa-user-size'>
                    <i className="fas fa-user"></i> {classInfo?.students?.length}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            <ListGroup style={{paddingLeft:'15px'}}>
              <ListGroup.Item  className="list-group-item-o " action href="#link1">
                Feed
              </ListGroup.Item>
              <ListGroup.Item style={{position:'relative'}} className="list-group-item-o "action href="#link2">
                Learn
              </ListGroup.Item>
              <ListGroup.Item  className="list-group-item-o "action href="#link3">
                Exam
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link4">
               Discussion
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5">
                Assignment
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6">
                Task
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link7">
                Interactive Exercises
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link8">
                Links
              </ListGroup.Item>
              {(user?.teacher === null)?(
              <>
              </>
              ):
              <>
                <ListGroup.Item className="list-group-item-o " action href="#link9">
                  Class List
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-o " action href="#link10">
                  Files
                </ListGroup.Item>
              </>}
            </ListGroup>
          </div>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
              <Row>
                <Col>
               <ClassFeed />
               </Col>
               <Col md="auto">
               <ClassCalendar />
               </Col>
             </Row>
              </Tab.Pane>
              <Tab.Pane  eventKey="#link2">
                  <ClassLearn classInfo={classInfo} />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link3">
                <ClassExam />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link4">
                <ClassDiscussion classInfo={classInfo} />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link5">
                <ClassAssignment classInfo={classInfo} />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link6">
                <ClassTask classInfo={classInfo} />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link7">
                <ClassInteractive classInfo={classInfo} />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link8">
                <ClassLinks classInfo={classInfo}  />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link9">
                <ClassList />
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link10">
                <ClassFiles id={id}/>
              </Tab.Pane>
            </Tab.Content> 
          </Col> 
        </div>
      </Tab.Container>
  )
}