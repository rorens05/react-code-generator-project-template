import React, {useState,} from 'react'
import { Button, InputGroup, FormControl,} from 'react-bootstrap';
import CreateClassModal from './CreateClassModal'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'

function ClassHeader({getClasses}) {
  const [modal, setModal] = useState(false)
	const history = useHistory();
  const toggle = () =>{
    setModal(!modal)
  }

	const handleHistoryArchive = () => {
		history.push('/archive')
	}

	const handleHistoryList = () => {
		history.push('/classes')
	}

	return (
		<div>
			<div className="row m-b-20" >
				<div style={{display:'inline-flex'}}>
				<div className="col-md-10 pages-header">
					<p className='title-header' >Classes <Button className='btn-create-class' Button variant="link" onClick={() => setModal(true) }> <i className="fa fa-plus"></i>  Create Class  </Button></p>
				</div>
				<div className='inline-flex' style={{textAlign:'right', marginLeft:'auto', paddingRight:'10px'}}>				
					{/* <Link to="/archive" className="class-archive"><h1><i class="fas fa-archive"></i></h1></Link>
					<Link to="/classes" className="class-archive"><h1><i class="fas fa-th-list"></i></h1></Link> */}
					<Button onClick={() => handleHistoryList()} className='btn-list' size='sm' variant="outline-warning"><i class="fas fa-th-list"></i></Button>
        	<Button onClick={() => handleHistoryArchive()}  className='btn-archive' size='sm' variant="outline-warning"><i class="fas fa-archive"></i></Button>
				</div>
				</div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl className='search-box' aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search here for available classes" type="search"/>
					<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
			</div>
			<CreateClassModal toggle={toggle} modal={modal} getClasses={getClasses}  />
		</div>
	)
}
export default ClassHeader

