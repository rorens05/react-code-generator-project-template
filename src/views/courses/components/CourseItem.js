import React, { useState, useEffect } from "react";
import { Card, Dropdown } from 'react-bootstrap';
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.css"
import { Link } from 'react-router-dom'
import CoursesAPI from "../../../api/CoursesAPI";

export default function CoursesItem({setLoading, setOpenEditModal, setSelectedCourse}) {
    const [course, setCourse] = useState([])
    const [openDropdown, setOpenDropdown] = useState(false)
  
  const handleOpeEditModal = (e, item) => {
    e.preventDefault()
    setSelectedCourse(item)
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
    setLoading(true)
    let response = await new CoursesAPI().getCourses()
    setLoading(false)
    if(response.ok){
      setCourse(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  useEffect(() => {
    getCourses()
  }, [])
  
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
                            <Dropdown.Item onClick={(e) => handleOpeEditModal(e, item)}>
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
                      <Link to="/coursecontent" className="active">{item.courseName}</Link>
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
