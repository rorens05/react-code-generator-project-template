import React, { useState, useEffect } from "react";
import { Tab, ListGroup, Row, Col } from 'react-bootstrap';
import MainContainer from '../../components/layouts/MainContainer'
import CourseBreadcrumbs from "./components/CourseBreadcrumbs";
import CoursesAPI from "../../api/CoursesAPI";
import { Link} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router";

export default function CourseContent({children, course}) {
  const [loading, setLoading] = useState(false)
  const [courseInfo, setCourseInfo] = useState("")
  const [collapseSide, setCollapseSide] = useState(localStorage.getItem('collapsCourse') == 'false' ? false : true);
  const [showTab, setShowTab] = useState(true)
  const currentLoc = window.location.pathname;
  const {id} = useParams()

  const getCourseInformation = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseInformation(id)
    setLoading(false)
    if(response.ok){
      setCourseInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching course information.")
    }
  }

  useEffect(() => {
    console.log(localStorage.getItem('collapsCourse'))
    setShowTab(localStorage.getItem('collapsCourse') == 'false' ? false : true)
  }, [collapseSide]);

  const handleClicked = (data) => {
    setCollapseSide(data);
    localStorage.setItem('collapsCourse', data)
  }

  useEffect(() => {
    getCourseInformation()
  }, [])

  return (
    <MainContainer loading={loading} fluid activeHeader={'courses'} style='not-scrollable'>
      {/* <ToastContainer /> */}
        <Col style={{height: 100}} />
        <Row>
          {showTab ? <Col className="row-course-bg course-widget-font" sm={3}>
            <ListGroup.Item className="list-group-item-o">
              <Row>
                <Col className="" sm={9} >
                  {courseInfo.courseName}
                  <div className="course-subtitle">{courseInfo.authorName}</div>
                </Col>
                <Col className="t-a-r" sm={3}>
                  <Col className="text-align-right">
                    <i className="fas fa-chevron-left cursor-pointer" style={{color: '#EE9337'}} onClick={()=> handleClicked(false)}/>
                  </Col>
                </Col>
              </Row>
            </ListGroup.Item> 
            <ListGroup>
              <Link className={currentLoc.includes('learn') ? "active-nav-item" : 'nav-item'} to={`/coursecontent/${id}/learn`}>
                Learn
              </Link>
              <Link className={currentLoc.includes('exam') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/exam`}>
                Exam
              </Link>
              <Link className={currentLoc.includes('discussion') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/discussion`}>
                Discussion
              </Link>
              <Link className={currentLoc.includes('assignment') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/assignment`}>
                Assignment
              </Link>
              <Link className={currentLoc.includes('task') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/task`}>
                Task
              </Link>
              <Link className={currentLoc.includes('files') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/files`}>
                Files
              </Link>
            </ListGroup>
          </Col>
          :
          <Col className="row-course-bg course-widget-font pt-2" sm={1}>
            <Col className="text-align-right mb-2">
              <i className="fas fa-chevron-right" style={{color: '#EE9337'}} onClick={()=> handleClicked(true)}/>
            </Col>
            <ListGroup>
              <Link className={currentLoc.includes('learn') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/learn`}>
                <i className="fas fa-book" title="Learn"/>
              </Link>
              <Link className={currentLoc.includes('exam') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/exam`}>
                <i className="fas fa-file-alt" title="Exam"/>
              </Link>
              <Link className={currentLoc.includes('discussion') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/discussion`}>
                <i className="fas fa-comment-alt" title="Discussion"/>
              </Link>
              <Link className={currentLoc.includes('assignment') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/assignment`}>
                <i className="fas fa-sticky-note" title="Assignment"/>
              </Link>
              <Link className={currentLoc.includes('task') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/task`}>
                <i className="fas fa-edit" title="Task"/>
              </Link>
              <Link className={currentLoc.includes('files') ? "active-nav-item" : 'nav-item'} to={`/courses/${id}/files`}>
                <i className="fas fa-folder-open" title="Files"/>
              </Link>
            </ListGroup>
          </Col>
          }
          <Col sm={ showTab ? 9 : 11} className='scrollable vh-85 pb-5'>
           {children}
          </Col>
        </Row>
    </MainContainer>
  )
}
