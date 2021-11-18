import React from 'react'
import {Button, InputGroup, FormControl} from 'react-bootstrap'

function ClassListHeader() {
  return (
    <div>
      <div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Class List</h1></div>
			</div>
      <Button variant="outline-warning">Enrolled</Button><Button variant="outline-warning">Waiting List</Button>
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
export default ClassListHeader
