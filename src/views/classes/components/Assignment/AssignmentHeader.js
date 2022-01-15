import React, {useState} from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import CreateAssignment from './CreateAssignment'

function AssignmentHeader({module, getAssignmentList, refmoduleId }) {
	const [modal, setModal] = useState(false)
const toggle = () =>{
    setModal(!modal)
  }
  return (
    <div>
      <div className="row m-b-20" style={{paddingTop:'10px'}}>
			<div className="col-md-10 pages-header"><p className='title-header'>Assignment <Button className='btn-create-task' Button variant="link" onClick={() => setModal(true) }> <i className="fa fa-plus"></i>  Create Assignment  </Button></p></div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
					<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
			</div>
			<CreateAssignment toggle={toggle} modal={modal} module={module} getAssignmentList={getAssignmentList} refmoduleId={refmoduleId} />
    </div>
  )
}
export default AssignmentHeader
