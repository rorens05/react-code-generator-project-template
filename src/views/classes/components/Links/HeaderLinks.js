import React, {useState} from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import CreateLinks from './CreateLinks';

function HeaderLinks({getConfe, getVideos, getLinks}) {
const [modal, setModal] = useState(false)
const toggle = () =>{
    setModal(!modal)
  }
	return (
		<div>
			<div className="row m-b-20" style={{paddingTop:'15px'}}>
				<div className=""><p className='title-header' >Links <Button className='btn-create-link' variant="link" onClick={() => setModal(true) }> <i className="fa fa-plus"></i>  Create Links  </Button></p></div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search Links here" type="search"/>
						<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
			</div>
			<CreateLinks getConfe={getConfe} getVideos={getVideos} getLinks={getLinks} toggle={toggle} modal={modal} />
		</div>
	)
}
export default HeaderLinks

