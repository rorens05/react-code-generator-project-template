import React from 'react'
import { Button, InputGroup, FormControl,} from 'react-bootstrap';

function StudentClassListHeader() {
  return (
    <div>
      
			<div className="row m-b-20" >
				<div style={{display:'inline-flex'}}>
				<div className="col-md-10 pages-header">
					<h1>Classes <Button className='btn-create-class' Button variant="link" > <i className="fa fa-plus"></i>  Join Class  </Button></h1>
				</div>
				</div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
					<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
					</div>
				</div>
			
    </div>
  )
}

export default StudentClassListHeader
