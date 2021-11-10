import React, {useState} from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import CreateTask from './CreateTask';


function HeaderTask() {

  const [modal, setModal] = useState(false)

  const toggle = () =>{
    setModal(!modal)
  }
	return (
		<div>
			<div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Task <Button Button variant="outline-warning" onClick={() => setModal(true) }> <i className="fa fa-plus"></i>  Create Task  </Button></h1>
				</div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					</div>
				</div>
				<CreateTask toggle={toggle} modal={modal} />
		</div>
	)
}
export default HeaderTask

