import React, { useState } from "react";
import { CardGroup, Card, Dropdown, InputGroup, FormControl, Button, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import ClassesAPI from "../../../../api/ClassesAPI";
import SweetAlert from 'react-bootstrap-sweetalert';

export default function HeaderArchive({archiveItem, getArchive, onSearch, searchTerm}) {
const [openDropdown, setOpenDropdown] = useState(false)
const [editNotify, setEditNotity] = useState(false)
const history = useHistory();

const closeNotify = () =>{
  setEditNotity(false)
}

const handleHistoryArchive = () => {
  history.push('/archive')
}

const handleHistoryList = () => {
  history.push('/classes')
}

const retrieveArchive = async(item) =>{
  let response = await new ClassesAPI().retrieveArchive(item)
    if(response.ok){
      setEditNotity(true)
      getArchive()
    }else{
      alert(response.data.errorMessage)
    }
}

console.log('Archive:', archiveItem)

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
  <div className="row m-b-20" >
				<div style={{display:'inline-flex'}}>
				<div className="col-md-10 pages-header">
					<p className='title-header' >Archive Classes </p>
				</div>
				<div className='inline-flex' style={{textAlign:'right', marginLeft:'auto', paddingRight:'10px'}}>				
					{/* <Link to="/archive" className="class-archive"><h1><i class="fas fa-archive"></i></h1></Link>
					<Link to="/classes" className="class-archive"><h1><i class="th-list"></i></h1></Link> */}
					<Button onClick={() => handleHistoryList()} className='btn-list' size='sm' variant="outline-warning"><i class="fas fa-th-list"></i></Button>
        	<Button onClick={() => handleHistoryArchive()}  className='btn-archive' size='sm' variant="outline-warning"><i class="fas fa-archive"></i></Button>
				</div>
				</div>
			</div>

			  <div className="row m-b-20">
				  <div className="col-md-12">
					  <InputGroup size="lg">
						  <FormControl onChange={(e) => onSearch(e.target.value)} aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search here for archived classes" type="search"/>
					  <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					  </InputGroup>
					</div>
			  </div>
      </div>
      <CardGroup className='card-group2'>
      {archiveItem.filter((item) => {
        if(searchTerm == ''){
          return item
        }else if(item.className.toLowerCase().includes(searchTerm.toLowerCase())){
          return item
        }
      }).map(item =>{
        return(
          <div>
          <Card className='class-card' >
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
                    <Dropdown.Item onClick={() => retrieveArchive(item.id)} >
                      Restore 
                    </Dropdown.Item>
                    <Dropdown.Item >
                      Delete 
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={10}>
                <b>{item.gradeName}   {item.className} </b>
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
            <Card.Text style={{color:'#EE9337', textAlign:'center'}}>
            <br />
            <i style={{fontSize:'90px', paddingBottom:'25px'}} class="fas fa-box-open"></i>
            </Card.Text>
          </Card.Body>
      </Card>
      </div>
        )
      })}
     </CardGroup>
     <SweetAlert 
          success
          show={editNotify} 
          title="Done!" 
          onConfirm={closeNotify}>
        </SweetAlert>

      {/* <div className="col-md-3 card-group-tfi">
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
  </div> */}
</div>
  )
}
