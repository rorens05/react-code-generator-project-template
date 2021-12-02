import React, { useState } from 'react'
import { Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function ClassCard({item, setOpenEditModal, setSeletedClass}) {
  
  const [openDropdown, setOpenDropdown] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpeEditModal = (e, item) => {
    e.preventDefault()
    setSeletedClass(item)
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
    <div>
      <Card className='class-card kb-0px'>
        <Link to={`/classescontent/${item.classId}`}>
        <Card.Header className='class-header-card'>
          <div className="row class-card-font-color">
            <div className="col-md-6 pd-10px">
             <i class="fas fa-expand"></i>
           {' '}  {item.classCode}
            </div>
            <div className="col-md-6 ta-pt-10px">
              <Dropdown isOpen={openDropdown} toggle={()=> setOpenDropdown(!openDropdown)}>
                <Dropdown.Toggle data-toggle="dropdown" as={CustomToggle} >
                  <i className="fa fa-ellipsis-v fa-1x cursor-pointer"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu >
                  <Dropdown.Item onClick={(e) => handleOpeEditModal(e, item)}>
                    Edit 
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-md-6 class-header-text">
              <h10><b> {item.gradeName} -  {item.className} </b><br />
              {item.courseName}</h10>
            </div>
            <div className="col-md-6 icon-pd" >
              <i className="fas fa-user"></i> 30
            </div>
          </div>
        </Card.Header>
        <div >
        <Card.Body >
          <Card.Title tag="h5" className='card-title'>
            Due Tomorrow
          </Card.Title>
          <Card.Subtitle tag="h6" className='card-subtitle'>
              <p> Oct 01 2021 </p>
          </Card.Subtitle>
          <Card.Text className='card-text'>
            <p>Assignment #1 <br />
            Test #1</p>
          </Card.Text>
        </Card.Body>
        </div>
        </Link>
      </Card>
    </div> 
    )
}
export default ClassCard
