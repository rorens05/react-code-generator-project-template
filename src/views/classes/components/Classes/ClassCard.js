import React, { useState } from 'react'
import { Card, Dropdown, Row, Col } from 'react-bootstrap';
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
      <Card className='class-card' >
        <Link to={`/classescontent/${item.classId}`}>
          <Card.Header className='class-header-card' >
            <Row>
              <Col sm={10}>
                <i class="fas fa-expand"></i>&nbsp; {item.classCode}
              </Col>
              <Col sm={2} style={{textAlign:'right'}}>
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
              </Col>
              <Col sm={10}>
                <b>{item.gradeName} -  {item.className} </b>
              </Col>
              <Col sm={8}>
               {item.courseName}
              </Col>
              <Col ms={22} style={{fontSize:'15px', textAlign:'right',}}>
                <i className="fas fa-user"></i> 30
             </Col>
           </Row>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Due Tomorrow  
            </Card.Title>
            <Card.Subtitle>
              Oct 01 2021 <br />
            </Card.Subtitle>
            <Card.Text style={{color:'#EE9337'}}>
            <br />
            <p>Assignment #1 <br />
            Test #1</p>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </div> 
    )
}
export default ClassCard
