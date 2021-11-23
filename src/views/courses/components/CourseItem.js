import React, { useState, useEffect } from "react";
import { Card, Dropdown } from 'react-bootstrap';
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.css"
import { Link } from 'react-router-dom'
import Courses from "../Courses";

export default function CoursesItem() {
    const [course, setCourse] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [haru] = useState("haru")
  
  const handleOpeEditModal = e => {
    e.preventDefault()
    setOpenEditModal(true)
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

  const getCourses = async() => {
    // let sessionToken = sessionStorage.getItem("session");
    // let sessToken = sessionToken.replace(/\"/g, "");
    let token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dnZWRVc2VyIjoie1wiVXNlcklkXCI6MixcIlJvbGVcIjp7XCJJRFwiOjMsXCJSb2xlTmFtZVwiOlwiVGVhY2hlclwiLFwiUm9sZURlc2NyaXB0aW9uXCI6XCJUZWFjaGVyXCIsXCJBY2Nlc3NMZXZlbFwiOm51bGwsXCJDcmVhdGVkQnlcIjpudWxsLFwiQ3JlYXRlZERhdGVcIjpudWxsLFwiVXBkYXRlZEJ5XCI6bnVsbCxcIlVwZGF0ZWREYXRlXCI6bnVsbCxcIkRlbGV0ZWRcIjpudWxsLFwiRGVsZXRlZEJ5XCI6bnVsbCxcIkRlbGV0ZWREYXRlXCI6bnVsbH0sXCJUZWFjaGVyXCI6e1wiSWRcIjoxLFwiRW1wbG95ZWVOb1wiOlwiMjAwNzEzOTM0XCIsXCJQcmVmaXhOYW1lXCI6XCJNclwiLFwiRm5hbWVcIjpcIk1pY2hhZWxzc3NcIixcIkxuYW1lXCI6XCJHYWJyaWVsc1wiLFwiTWlkZGxlSW5pdGlhbFwiOlwiQlNzcnJyXCIsXCJTZXhcIjpcIk1hbGVcIixcIkNpdGl6ZW5zaGlwXCI6bnVsbCxcIlN0YXR1c1wiOm51bGwsXCJQZXJtYW5lbnRBZGRyZXNzXCI6XCIzMDQgU2FtcGFsb2MgU3QuIENlbWJvXCIsXCJQcmVzZW50QWRkcmVzc1wiOm51bGwsXCJCZGF5XCI6XCIyMDIxLTA1LTAyVDAwOjAwOjAwXCIsXCJDb250YWN0Tm9cIjpcIis2MzkxNzg2ODQ5NTFcIixcIkVtYWlsQWRkXCI6XCJtaWNoYWVsYmVuZ2FicmllbEBsaXZlLmNvbVwiLFwiRW1lcmdlbmN5Q29udGFjdE5vXCI6bnVsbCxcIlBvc2l0aW9uSURcIjo3LFwiVXNlckFjY291bnRJRFwiOjIsXCJDcmVhdGVkQnlcIjpudWxsLFwiQ3JlYXRlZERhdGVcIjpudWxsLFwiVXBkYXRlZEJ5XCI6MixcIlVwZGF0ZWREYXRlXCI6XCIyMDIxLTA5LTAzVDAwOjAwOjAwXCIsXCJEZWxldGVkXCI6bnVsbCxcIkRlbGV0ZWRCeVwiOm51bGwsXCJEZWxldGVkRGF0ZVwiOm51bGx9LFwiU3R1ZGVudFwiOm51bGwsXCJQYXJlbnRcIjpudWxsfSIsImV4cCI6MTYzNzM4NjMyMSwiaXNzIjoic21lc2suaW4iLCJhdWQiOiJyZWFkZXJzIn0.X3-7zNe-bIj0Matu4WyzyVcDg1oVdva1y5nJO0QvgM4"
    let response = await fetch("https://tekteachlms-api.com/api/Course",{
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer' + " " + token,
          'X-LMS-Key':"Web|localhost:3001"
      },
    })
    const courseData = await response.json();
    setCourse(courseData);
  }

  useEffect(() => {
    getCourses()
  }, [ ])
    
  return (
    <React.Fragment>
      {
      course.map(item => { 
        return(
          <div className="col-md-3 card-group-tfi">
            <Card className="card-design b-0px">
              <Card.Header className="card-header-courses">
                <div className="row" style={{color:"white"}}>
                  <div className="col-md-6">
                    <i className="fa fa-lock fa-2x"></i>
                      </div>
                        <div className="col-md-6 t-a-r">
                          <Dropdown isOpen={openDropdown} toggle={()=> setOpenDropdown(!openDropdown)}>
                            <Dropdown.Toggle data-toggle="dropdown" as={CustomToggle} >
                              <i className="fa fa-ellipsis-v fa-2x"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                            <Dropdown.Item onClick={handleOpeEditModal}>
                            Edit 
                            </Dropdown.Item>
                            <Dropdown.Item>
                            Delete
                            </Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6" style={{textAlign:"center", marginTop:20}}>
                            <i className="fa fa-book-open fa-7x"></i>
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title tag="h5">
                      <Link to="/coursecontent" className="active">{item.id}</Link>
                    </Card.Title>
                    <Card.Subtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Card subtitle
                    </Card.Subtitle>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
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
