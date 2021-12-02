import React, { useState, useEffect } from "react";
import { Tab, ListGroup, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import CourseAccordion from "./CourseAccordion";
import CoursesAPI from "../../../api/CoursesAPI";
import MainContainer from '../../../components/layouts/MainContainer'

export default function CourseWidget() {

  const [courseInfo, setCourseInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const courseid = sessionStorage.getItem('courseid')
  const [cid, setCid] = useState(courseid)

  const getCoursesInfo = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseInformation(courseid)
    setLoading(false)
    if(response.ok){
      setCourseInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  useEffect(() => {
    getCoursesInfo()
  }, [])

  return (
      <Tab.Container loading={loading} className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
        <Row>
          <Col className="row-course-bg course-widget-font" sm={3}>
            <ListGroup.Item className="list-group-item-o">
              <Row>
                <Col className="" sm={9} >
                  {courseInfo.courseName}
                  <div className="course-subtitle">{courseInfo.subjectAreaName}</div>
                  <div className="course-subtitle">Carlos Inigo</div>
                </Col>
                <Col className="t-a-r" sm={3}>
                  <i className="fa fa-ellipsis-v s"></i>
                </Col>
              </Row>
            </ListGroup.Item> 
            <ListGroup>
              <ListGroup.Item className="list-group-item-o " action href="#link1">
                Learn
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o "action href="#link2">
                Exam
              </ListGroup.Item>
              <ListGroup.Item  className="list-group-item-o "action href="#link3">
                Discussion
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link4">
                Assignment
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5">
                Task
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6">
                Links
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={9}>
            <Tab.Content className="content-pane">
              <span className="content-pane-title">Math <Button variant="outline-warning"><i className="fa fa-plus"></i> Add Unit</Button></span>
              <div className="row m-b-20 m-t-30">
                <div className="col-md-12">
                  <InputGroup size="lg">
                    <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
                    <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
              <Tab.Pane eventKey="#link1">
                <CourseAccordion />
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                v
              </Tab.Pane>
            </Tab.Content> 
          </Col> 
        </Row>
      </Tab.Container>
  )
}
