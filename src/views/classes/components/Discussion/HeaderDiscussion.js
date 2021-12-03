import React, {useState} from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import CreateDiscussion from './CreateDiscussion';

function HeaderDiscussion() {
const [modal, setModal] = useState(false)
const toggle = () =>{
    setModal(!modal)
  }
	return (
		<div>
			<div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Discussion <Button className='btn-create-discussion' variant="link" onClick={() => setModal(true) }> <i className="fa fa-plus"></i>  Create Discussion  </Button></h1></div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search discussion here" type="search"/>
						<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
			</div>
				<CreateDiscussion toggle={toggle} modal={modal} />
		</div>
	)
}
export default HeaderDiscussion

