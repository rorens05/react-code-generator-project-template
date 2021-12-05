import React, {useState} from 'react'
import { Button, InputGroup, FormControl,} from 'react-bootstrap';
import CreateClassModal from './CreateClassModal'
import { Link } from 'react-router-dom'

function ClassHeader({getClasses}) {
  const [modal, setModal] = useState(false)
  const toggle = () =>{
    setModal(!modal)
  }
	return (
		<div>
			<div className="row m-b-20" >
				<div style={{display:'inline-flex'}}>
				<div className="col-md-10 pages-header">
					<h1>Classes <Button className='btn-create-class' Button variant="link" onClick={() => setModal(true) }> <i className="fa fa-plus"></i>  Create Class  </Button></h1>
				</div>
				<div style={{textAlign:'right', marginLeft:'auto'}}>				
					<Link to="/archive" className="class-archive"><h1><i class="fas fa-archive"></i></h1></Link>
					<Link to="/classes" className="class-archive"><h1><i class="fas fa-th-list"></i></h1></Link>
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
				<CreateClassModal toggle={toggle} modal={modal} getClasses={getClasses}  />
		</div>
	)
}
export default ClassHeader

