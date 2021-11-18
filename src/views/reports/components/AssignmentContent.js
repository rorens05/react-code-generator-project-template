import React from 'react'
import {InputGroup, FormControl, Table} from 'react-bootstrap'
import AssignmentReport from './AssignmentReport'

function AssignmentContent() {
  return (
    <div>
			<div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Assignment 1 <i class="fas fa-eye"></i></h1> </div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-8">
					<InputGroup size="md">
						<FormControl aria-label="medium" aria-describedby="inputGroup-sizing-sm" placeholder="Search studednt here..." type="search"/>
						<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
				<Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Student Name</th>
      <th>Grade</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jeffrey Geli</td>
      <td>100/100</td>
      <td><i class="fas fa-eye"style={{paddingRight:'10px'}}></i>
          <i class="fas fa-edit" style={{paddingRight:'10px'}}></i>
			</td>
    </tr>
    <tr>
      <td>Kent Placia</td>
      <td>100/100</td>
      <td><i class="fas fa-eye"style={{paddingRight:'10px'}}></i>
          <i class="fas fa-edit" style={{paddingRight:'10px'}}></i>
			</td>
    </tr>
    <tr>
      <td>Laurence Bautista</td>
      <td>100/100</td>
      <td><i class="fas fa-eye"style={{paddingRight:'10px'}}></i>
          <i class="fas fa-edit" style={{paddingRight:'10px'}}></i>
			</td>
    </tr>
  </tbody>
</Table>
			</div>
		</div>
  )
}
export default AssignmentContent
