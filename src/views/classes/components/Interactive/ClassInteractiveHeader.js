import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap';

function ClassInteractiveHeader({onSearch}) {
  return (
		<div>
			<div className="row m-b-20" style={{paddingTop:'15px'}}>
				<div className="col-md-10 pages-header"><p className='title-header' >Interactive Exercises</p></div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl onChange={(e) => onSearch(e.target.value)} aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search interactive exercise here" type="search"/>
					<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
					</div>
				</div>
				
		</div>
  )
}

export default ClassInteractiveHeader
