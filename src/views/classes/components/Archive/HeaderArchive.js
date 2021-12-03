import React, { useState } from "react";
import { Card, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function HeaderArchive() {
const [openDropdown, setOpenDropdown] = useState(false)
const [openEditModal, setOpenEditModal] = useState(false)
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
<div>
  <div>
		<div className="row m-b-20">
			  <div className="col-md-10 pages-header"><h1>Archived Class </h1></div>
        <Link to="/archive" className="class-archive"><h1><i class="fas fa-th"></i></h1></Link>
        <Link to="/classes" className="class-archive"><h1><i class="fas fa-th-list"></i></h1></Link>
		  </div>
			  <div className="row m-b-20">
				  <div className="col-md-12">
					  <InputGroup size="lg">
						  <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search here for archived class" type="search"/>
					  <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					  </InputGroup>
					</div>
			  </div>
      </div>
      <div className="col-md-3 card-group-tfi">
          <Card className="card-design b-0px">
            <Card.Header className="card-header">
            <div className="row" style={{color:"white"}}>
              <div className="col-md-6">
              <i class="fas fa-unlock"></i>
              </div>
              <div className="col-md-6 t-a-r">
                <Dropdown isOpen={openDropdown} toggle={()=> setOpenDropdown(!openDropdown)}>
                <Dropdown.Toggle data-toggle="dropdown" as={CustomToggle} >
                  <i className="fa fa-ellipsis-v fa-2x"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={handleOpeEditModal}>
                    Restore 
                </Dropdown.Item>
                <Dropdown.Item>
                    Delete
                </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
              </div>
                <div className="col-md-3"></div>
                <div className="col-md-6" style={{textAlign:"center", marginTop:20}}>
                        <i className="fa fa-book-open fa-7x"></i>
                </div>
                  <div className="col-md-3"></div>
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
  </div>
</div>
  )
}
