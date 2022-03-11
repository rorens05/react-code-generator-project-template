import React, {useState, useEffect, useContext} from 'react'
import {ListGroup, Row, Col} from 'react-bootstrap'
import ClassAssignment from '../ClassAssignment'
import ClassDiscussion from '../ClassDiscussion'
import ClassExam from '../ClassExam'
import ClassFeed from '../ClassFeed'
import ClassLearn from '../ClassLearn'
import ClassLinks from '../ClassLinks'
import ClassTask from '../ClassTask'
import ClassInteractive from '../ClassInteractive'
import ClassList from '../ClassList'
import ClassFiles from '../ClassFiles'
import DiscussionAPI from '../../../api/DiscussionAPI'
import { useParams } from 'react-router'
import { UserContext } from '../../../context/UserContext'
import { HashRouter, Link } from 'react-router-dom';
import PrivateRoute from "../../../routes/components/PrivateRoute";
import MainContainer from '../../../components/layouts/MainContainer'
import ExamCreation from "../../../views/exam-creation/ExamCreation";

export default function ClassSideNavigation({children}) {
  const userContext = useContext(UserContext)
  const [classInfo, setClassInfo] = useState(null)
  const {id} = useParams()
  const {user} = userContext.data
  const currentLoc = window.location.pathname;
  const [collapseSide, setCollapseSide] = useState(localStorage.getItem('collaps') == 'false' ? false : true);
  const [loading, setLoading] = useState(false);
  const [showTab, setShowTab] = useState(true)

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
    getClassInfo();
  }, [window.location.pathname])
  
  useEffect(() => {
    console.log(localStorage.getItem('collaps'))
    setShowTab(localStorage.getItem('collaps') == 'false' ? false : true)
  }, [collapseSide])

  const handleClicked = (data) => {
    setCollapseSide(data);
    localStorage.setItem('collaps', data)
  }

  return (
    <MainContainer activeHeader={'classes'} loading={loading} fluid style='not-scrollable'>
    <Col style={{height: 100}} />
    <Row>
      {showTab ? <Col className="row-course-bg course-widget-font" sm={3}>
          <ListGroup.Item className="list-group-item-o">
            <Row>
              <Col className="" sm={9} >
                <div className="class-subtitle-code" > {classInfo?.classInformation?.classCode}</div>
                <div className="class-subtitle-section">{classInfo?.classInformation?.className}</div>
                <div className="class-subtitle-subject">{classInfo?.classInformation?.gradeName}</div>
                <div className="class-subtitle-name">{classInfo?.classInformation?.teacherName}</div>
              </Col>
              <Col className="ellipsis-top-right" sm={3}>
                <i className="fas fa-chevron-left cursor-pointer color-black" onClick={()=> handleClicked(false)}/>
                <div className='fa-user-size'>
                <i className="fas fa-user"></i> {classInfo?.students?.length}
                </div>
              </Col>
            </Row>
          </ListGroup.Item>
        <ListGroup>
        <Link className={currentLoc.includes('feed') ? "active-nav-item" : 'nav-item'} to={`/classescontent/${id}/feed`}>
          Feed
        </Link>
        <Link className={currentLoc.includes('learn') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/learn`}>
          Learn
        </Link>
        <Link className={currentLoc.includes('exam') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/exam`}>
          Exam
        </Link>
        <Link className={currentLoc.includes('discussion') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/discussion`}>
          Discussion
        </Link>
        <Link className={currentLoc.includes('assignment') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/assignment`}>
          Assignment
        </Link>
        <Link className={currentLoc.includes('task') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/task`}>
          Task
        </Link>
        <Link className={currentLoc.includes('interactives') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/interactives`}>
          Class Interactives
        </Link>
        <Link className={currentLoc.includes('links') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/links`}>
          Links
        </Link>
          { 
            (user?.teacher != null) && 
            <>
               <Link className={currentLoc.includes('classList') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/classList`}>
                Class List
              </Link>
              <Link className={currentLoc.includes('files') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/files`}>
                Class Files
              </Link>
            </>
          }
        </ListGroup>
      </Col>
      :
      <Col className='row-course-bg course-widget-font' sm={1}>
        <Col className="text-align-right mb-2">
          <i className="fas fa-chevron-right" style={{color: '#EE9337'}} onClick={()=> handleClicked(true)}/>
        </Col>
        <ListGroup>
        <Link className={currentLoc.includes('feed') ? "active-nav-item" : 'nav-item'} to={`/classescontent/${id}/feed`}>
          <i className='fas fa-comment' title='Feed' />
        </Link>
        <Link className={currentLoc.includes('learn') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/learn`}>
          <i className='fas fa-book' title='Learn' />
        </Link>
        <Link className={currentLoc.includes('exam') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/exam`}>
        <i className='fas fa-file-alt' title='Exam' />
        </Link>
        <Link className={currentLoc.includes('discussion') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/discussion`}>
          <i className='fas fa-comment-alt' title='Discussion' />
        </Link>
        <Link className={currentLoc.includes('assignment') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/assignment`}>
          <i className='fas fa-sticky-note' title='Assignment' />
        </Link>
        <Link className={currentLoc.includes('task') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/task`}>
          <i className='fas fa-edit' title='Task' />
        </Link>
        <Link className={currentLoc.includes('interactives') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/interactives`}>
          <i className='fas fa-chalkboard-teacher' title='Class Interactives' />
        </Link>
        <Link className={currentLoc.includes('links') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/links`}>
          <i className='fas fa-link' title='Links' />
        </Link>
          {(user?.teacher != null)
          &&
          <>
            <Link className={currentLoc.includes('classList') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/classList`}>
              <i className="fas fa-users" title="Class List"/>
            </Link>
            <Link className={currentLoc.includes('files') ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/files`}>
              <i className="fas fa-folder-open" title="Files"/>
            </Link>
          </>}
        </ListGroup>
      </Col>
      }
      <Col sm={showTab ? 9 : 11} className='scrollable vh-85 pb-5'>
        {children}
      </Col> 
    </Row>
    </MainContainer>
  )
}