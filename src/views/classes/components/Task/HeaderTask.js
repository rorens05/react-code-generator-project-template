import React, {useState} from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import CreateTask from './CreateTask';

function HeaderTask({module, getTaskModule}) {
const [modal, setModal] = useState(false)
const toggle = () =>{
    setModal(!modal)
  }

	

	return (
		<div>
			<div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Task <Button className='btn-create-task' Button variant="link" onClick={() => setModal(true)}> <i className="fa fa-plus"></i>  Create Task  </Button></h1></div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search task here" type="search"/>
					<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
			</div>
				<CreateTask module={module} toggle={toggle} modal={modal} getTaskModule={getTaskModule} />
		</div>
	)
}
export default HeaderTask

