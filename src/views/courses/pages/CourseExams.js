import React, { useState, useEffect } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";
import EditLesson from "./EditLesson";

export default function CourseExams({examInfo, setExamInfo, display, setDisplay, modulePages}) {

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

  const getExamInfo = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getExamInformation(moduleid)
    setLoading(false)
    if(response.ok){
      setExamInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all a")
    }
  }

  useEffect(() => {
  }, [])

  return (
      <div>
        {display === false ?
          examInfo.map(item => {
            return(
              <Row>
                <Col className="lesson-header" md={9} onClick={(e) => getExamInfo(e, moduleid, item.id)}>
                  {item?.testName}
                  
                </Col>
                <Col className="align-right-content" md={3}>
                  <Button className="m-r-5 color-white tficolorbg-button" size="sm" onClick={(e) => handleOpenEditLessonModal(e, examInfo)}><i className="fa fa-edit"></i></Button>
                  <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i className="fa fa-trash"></i></Button>
                </Col>
                <EditLesson 
                  examInfo={examInfo} 
                  setExamInfo={setExamInfo}   
                  openEditLessonModal={openEditLessonModal} 
                  setEditLessonModal={setEditLessonModal} 
                  selectedPage={selectedPage}
                />
              </Row>
              
            )
          })
        :
          <span>
            {examInfo?.testName}<br></br>
          </span>
      }
      </div>
  )
}
