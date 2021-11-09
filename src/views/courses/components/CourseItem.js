import React, { useState } from "react";
import { Card, Dropdown } from 'react-bootstrap';
import CourseEdit from "./CourseEdit";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.css"
import { Link } from 'react-router-dom'

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
    
  return (
        <Card className="card-design b-0px">
          <Card.Header className="card-header">
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
                  <Link to="/coursecontent" className="active">Web Programming</Link>
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
        // <CourseEdit openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
  )
}
