import React, { useState, useEffect } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";
import EditTest from "./EditTest";

export default function CourseExams({examInfo, setExamInfo, display, setDisplay, modulePages, selectedTest, setSelectedTest}) {

  const [loading, setLoading] = useState(false)
  const [openEditTestModal, setOpenEditTestModal] = useState(false)
  
 
  const courseid = sessionStorage.getItem('courseid')
  const moduleid = sessionStorage.getItem('moduleid')

  
  const handleOpenEditTestModal = (e, item) => {
    e.preventDefault()
    setSelectedTest(item)
    console.log(item)
    setOpenEditTestModal(true)
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
                  <Button className="m-r-5 color-white tficolorbg-button" size="sm" onClick={(e) => handleOpenEditTestModal(e, item)}><i className="fa fa-edit"></i></Button>
                  <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i className="fa fa-trash"></i></Button>
                </Col>
                
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
