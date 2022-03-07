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
import { Route, HashRouter } from 'react-router-dom';
import PrivateRoute from "../../../routes/components/PrivateRoute";

import ExamCreation from "../../../views/exam-creation/ExamCreation";

export default function ClassSideNavigation({setLoading}) {
  const userContext = useContext(UserContext)
  const [classInfo, setClassInfo] = useState(null)
  const {id} = useParams()
  const {user} = userContext.data
  const currentLoc = window.location.hash;
  const [collapseSide, setCollapseSide] = useState(true)
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
    console.log(window.location.hash, '---------------- heeeeeeeerrrrrrreeee')
    getClassInfo();
  }, [window.location.pathname])

  if(classInfo == null){
    return (<div/>)
  }
  if(classInfo == null) return <div/>

  return (
    // <Tab.Container style={{position:'relative'}} className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
        <div style={{position:'relative'}} className="row">
          {collapseSide ? <div className="row-course-bg course-widget-font col-md-3">
              <ListGroup.Item className="list-group-item-o">
                <Row>
                  <Col className="" sm={9} >
                    <div className="class-subtitle-code" > {classInfo?.classInformation?.classCode}</div>
                    <div className="class-subtitle-section">{classInfo?.classInformation?.className}</div>
                    <div className="class-subtitle-subject">{classInfo?.classInformation?.gradeName}</div>
                    <div className="class-subtitle-name">{classInfo?.classInformation?.teacherName}</div>
                  </Col>
                  <Col className="ellipsis-top-right" sm={3}>
                    {/* <i className="fa fa-ellipsis-v fa-1x cursor-pointer"></i> */}
                    <i className="fas fa-chevron-left cursor-pointer color-black" onClick={()=> setCollapseSide(false)}/>
                    <div className='fa-user-size'>
                    <i className="fas fa-user"></i> {classInfo?.students?.length}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            <ListGroup>
              <a className={currentLoc == '#/feed' || currentLoc == '#/' ? "active-nav-item" : 'nav-item'} href="#/">
                Feed
              </a>
              <a className={currentLoc == '#/learn' ? "active-nav-item" : 'nav-item'} href="#/learn">
                Learn
              </a>
              <a className={currentLoc == '#/exam' || currentLoc.includes('exam_creation') ? "active-nav-item" : 'nav-item'} href="#exam">
                Exam
              </a>
              <a className={currentLoc == '#/discussion' ? "active-nav-item" : 'nav-item'} href="#/discussion">
                Discussion
              </a>
              <a className={currentLoc == '#/assignment' ? "active-nav-item" : 'nav-item'} href="#/assignment">
                Assignment
              </a>
              <a className={currentLoc == '#/task' ? "active-nav-item" : 'nav-item'} href="#/task">
                Task
              </a>
              <a className={currentLoc == '#/links' ? "active-nav-item" : 'nav-item'} href="#/links">
               Links
              </a>
              {
              (user?.teacher === null) && 
              <>
                <a className={currentLoc == '#/list' ? "active-nav-item" : 'nav-item'} href="#/list">
                  Class List
                </a>
                <a className={currentLoc == '#/files' ? "active-nav-item" : 'nav-item'} href="#/files">
                  Class Files
                </a>
              </>}
            </ListGroup>
          </div>
          :
          <Col className='row-course-bg course-widget-font' sm={1}>
            <Col className="text-align-right mb-2">
              <i className="fas fa-chevron-right" style={{color: '#EE9337'}} onClick={()=> setCollapseSide(true)}/>
            </Col>
            <ListGroup>
              <ListGroup.Item  className="list-group-item-o " action href="#link1">
                <i className='fas fa-comment' title='Feed'/>
              </ListGroup.Item>
              <ListGroup.Item style={{position:'relative'}} className="list-group-item-o "action href="#link2">
                <i className="fas fa-book" title="Learn"/>
              </ListGroup.Item>
              <ListGroup.Item  className="list-group-item-o "action href="#link3">
                <i className="fas fa-file-alt" title="Exam"/>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link4">
                <i className="fas fa-comment-alt" title="Discussion"/>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5">
               <i className="fas fa-sticky-note" title="Assignment"/>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6">
                <i className="fas fa-edit" title="Task"/>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link7">
                <i className='fas fa-chalkboard-teacher' title='Interactive Exercises'/>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link8">
                <i className='fa fa-link' title='Links'/>
              </ListGroup.Item>
              {(user?.teacher === null)?(
              <>
              </>
              ):
              <>
                <ListGroup.Item className="list-group-item-o " action href="#link9">
                  <i className="fas fa-users" title="Class List"/>
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-o " action href="#link10">
                  <i className="fas fa-folder-open" title="Files"/>
                </ListGroup.Item>
              </>}
            </ListGroup>
          </Col>
          }
          <Col sm={collapseSide ? 9 : 11} className='scrollable vh-85 pb-5'>
            <HashRouter basename='/'>
              <PrivateRoute path='/' exact component={ClassFeed} />
              <PrivateRoute path='/learn' exact component={ClassLearn} />
              <PrivateRoute path='/exam' exact component={ClassExam} />
              <PrivateRoute path='/exam_creation/:id' exact component={ExamCreation} />
              <PrivateRoute path='/discussion' exact component={ClassDiscussion} />
              <PrivateRoute path='/assignment' exact component={ClassAssignment} />
              <PrivateRoute path='/task' exact component={ClassTask} />
              <PrivateRoute path='/interactives' exact component={ClassInteractive} />
              <PrivateRoute path='/links' exact component={ClassLinks} />
              <PrivateRoute path='/list' exact component={ClassList} />
              <PrivateRoute path='/files' exact component={ClassFiles} />

            </HashRouter>
          </Col> 
        </div>
      // {/* </Tab.Container> */}
  )
}