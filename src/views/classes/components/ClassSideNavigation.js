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
  const [collapseSide, setCollapseSide] = useState(true);
  const [loading, setLoading] = useState(false);
  const links = [
    {link: 'feed', title: 'Feed', icon: 'fa-comment'},
    {link: 'learn', title: 'Learn', icon: 'fa-book'},
    {link: 'exam', title: 'Exam', icon: 'fa-file-alt'},
    {link: 'discussion', title: 'Discussion', icon: 'fa-comment-alt'},
    {link: 'assignment', title: 'Assignment', icon: 'fa-sticky-note'},
    {link: 'task', title: 'Task', icon: 'fa-edit'},
    {link: 'interactives', title: 'Interactive Exercises', icon: 'fa-chalkboard-teacher'},
    {link: 'links', title: 'Links', icon: 'fa-link'},
  ]
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

  if(classInfo == null){
    return (<div/>)
  }
  if(classInfo == null) return <div/>

  const handleSideNavTabsWords = (link, title, icon) => {
    if(collapseSide){
      return(
        <Link className={currentLoc.includes(link) ? "active-nav-item" : 'nav-item'} to={`/classes/${id}/${link}`}>
          {title}
        </Link>
      )
    }else{
      return(
        <a className={ currentLoc.includes(link) ? "active-nav-item" : 'nav-item'} href={`#/${link}`}>
          <i className={`fas ${icon}`} title={title}/>
        </a>
      )
    }
  }


  return (
    <MainContainer activeHeader={'classes'} loading={loading} fluid style='not-scrollable'>
    <Col style={{height: 100}} />
    <Row>
      {collapseSide ? <Col className="row-course-bg course-widget-font" sm={collapseSide ? 3 : 1}>
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
              <a className={currentLoc == '#/list' ? "active-nav-item" : 'nav-item'} href="#/list">
                Class List
              </a>
              <a className={currentLoc == '#/files' ? "active-nav-item" : 'nav-item'} href="#/files">
                Class Files
              </a>
            </>
          }
        </ListGroup>
      </Col>
      :
      <Col className='row-course-bg course-widget-font' sm={1}>
        <Col className="text-align-right mb-2">
          <i className="fas fa-chevron-right" style={{color: '#EE9337'}} onClick={()=> setCollapseSide(true)}/>
        </Col>
        <ListGroup>
          {
            links.map((item, index) => {
              return(
                handleSideNavTabsWords(item.link, item.title, item.icon)
                )
              }
            )
          }
          {(user?.teacher != null)
          &&
          <>
            <a className={currentLoc == '#/list' ? "active-nav-item" : 'nav-item'} href="#/list">
              <i className="fas fa-users" title="Class List"/>
            </a>
            <a className={currentLoc == '#/files' ? "active-nav-item" : 'nav-item'} href="#/files">
              <i className="fas fa-folder-open" title="Files"/>
            </a>
          </>}
        </ListGroup>
      </Col>
      }
      <Col sm={collapseSide ? 9 : 11} className='scrollable vh-85 pb-5'>
        {children}
        {/* <HashRouter basename='/'>
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
        </HashRouter> */}
      </Col> 
    </Row>
    </MainContainer>
  )
}