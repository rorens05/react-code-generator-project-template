import React, { useState, useEffect } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";
import EditLesson from "./EditLesson";

export default function CoursePages({modulePagesContent, setModulePagesContent, display, setDisplay, modulePages}) {

  const [loading, setLoading] = useState(false)
  const [openEditLessonModal, setEditLessonModal] = useState(false)
  const [selectedPage, setSelectedPage] = useState(null)
 
  const courseid = sessionStorage.getItem('courseid')
  const moduleid = sessionStorage.getItem('moduleid')

  
  const handleOpenEditLessonModal = (e, item) => {
    e.preventDefault()
    setSelectedPage(item)
    console.log(item)
    setEditLessonModal(true)
  }

  const getCourseUnitPagesContent = async(e, data, pagesid) => {
    setLoading(true)
    setDisplay(true)
    let response = await new CoursesAPI().getCourseUnitPagesContent(courseid, data, pagesid)
    setLoading(false)
    if(response.ok){
      setModulePagesContent(response.data)
      console.log(response.data)
      console.log(display)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  useEffect(() => {
  }, [])

  return (
      <div>
        {display === false ?
          modulePages.map(item => {
            return(
              <Row>
                <Col className="lesson-header" md={9} onClick={(e) => getCourseUnitPagesContent(e, moduleid, item.id)}>
                  {item?.pageName}
                  
                </Col>
                <Col className="align-right-content" md={3}>
                  <Button className="m-r-5 color-white tficolorbg-button" size="sm" onClick={(e) => handleOpenEditLessonModal(e, modulePagesContent)}><i className="fa fa-edit"></i></Button>
                  <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i className="fa fa-trash"></i></Button>
                </Col>
                <EditLesson 
                  modulePagesContent={modulePagesContent} 
                  setModulePagesContent={setModulePagesContent}   
                  openEditLessonModal={openEditLessonModal} 
                  setEditLessonModal={setEditLessonModal} 
                  selectedPage={selectedPage}
                />
              </Row>
              
            )
          })
        :
          <span>
            {modulePagesContent?.pageName}<br></br>
            <span style={{marginTop:"300px !important"}} dangerouslySetInnerHTML={{__html:modulePagesContent.content + '<br>' }} />
          </span>
      }
      </div>
  )
}
