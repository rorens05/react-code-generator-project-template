import React, { useState, useEffect } from "react";
import { Card, Dropdown, Row, Col } from 'react-bootstrap';
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.css"
import { Link } from 'react-router-dom'
import CoursesAPI from "../../../api/CoursesAPI";

export default function CoursesItem({course, setLoading, setOpenEditModal, setSelectedCourse}) {
  
  const [openDropdown, setOpenDropdown] = useState(false)
  
  const handleOpeEditModal = (e, item) => {
    e.preventDefault()
    sessionStorage.setItem('courseid', item.id)
    setSelectedCourse(item)
    setOpenEditModal(true)
  }

  const setCourseId = (item) => {
    sessionStorage.setItem('courseid', item)
  } 

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span 
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >{children}</span>
  ));
  
  return (
    <React.Fragment>
      {
      course.map(item => { 
        return(
          <div className="col-md-3 card-group-tfi">
            <Card className="card-design b-0px">
              <Card.Header className="card-header-courses">
                <Row style={{color:"white"}}>
                    <Col md={12}>
                      <i className="fa fa-lock fa-2x"></i>
                        <Dropdown className="float-right" isOpen={openDropdown} toggle={()=> setOpenDropdown(!openDropdown)}>
                          <Dropdown.Toggle data-toggle="dropdown" as={CustomToggle} >
                            <i className="fa fa-ellipsis-v fa-2x"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                          <Dropdown.Item onClick={(e) => handleOpeEditModal(e, item)}>
                          Edit 
                          </Dropdown.Item>
                          <Dropdown.Item>
                          Delete
                          </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col md={12} className="t-a-c m-t-20">
                      <i className="fa fa-book-open fa-7x"></i>
                    </Col>
                </Row>
              </Card.Header>
                <Card.Body>
                    <Card.Title tag="h5">
                      <Link to={"coursecontent/"+item.id} onClick={() => setCourseId(item.id)} setLoading={setLoading} className="active card-title">{item.courseName}</Link>
                    </Card.Title>
                    <Card.Subtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Card subtitle
                    </Card.Subtitle>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                </Card.Body>
            </Card>
          </div>
        )
        })
      
    }
    </React.Fragment>
  )
}
