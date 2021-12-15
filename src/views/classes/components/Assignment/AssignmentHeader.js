import React, {useState} from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import CreateAssignment from './CreateAssignment'

function AssignmentHeader() {
	const [modal, setModal] = useState(false)
const toggle = () =>{
    setModal(!modal)
  }
  return (
    <div>
      <div className="row m-b-20">
			<div className="col-md-10 pages-header"><h1>Assignment <Button className='btn-create-task' Button variant="link" onClick={() => setModal(true) }> <i className="fa fa-plus"></i>  Create Assignment  </Button></h1></div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
					<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
			</div>
			<CreateAssignment toggle={toggle} modal={modal} />
    </div>
  )
}
export default AssignmentHeader
