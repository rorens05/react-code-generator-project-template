import React from 'react'
import { Table } from 'react-bootstrap'


function AssignmentContent() {
  return (
    <div>
			<div className="row m-b-20">
			<Table responsive="sm">
    <thead>
      <tr>
        <th>Student Name <i class="fas fa-sort-alpha-down"></i></th>
        <th>Grade <i class="fas fa-sort-numeric-down"></i></th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Jeffrey Geli</td>
        <td>100/100</td>
        <td><i class="fas fa-eye"style={{paddingRight:'10px'}}></i>
				<i class="fas fa-edit" style={{paddingRight:'10px'}}></i></td>
      </tr>
      <tr>
        <td>Kent Placia</td>
        <td>100/100</td>
        <td><i class="fas fa-eye"style={{paddingRight:'10px'}}></i>
				<i class="fas fa-edit" style={{paddingRight:'10px'}}></i></td>
      </tr>
      <tr>
        <td>Laurence Bautista</td>
        <td>100/100</td>
        <td><i class="fas fa-eye"style={{paddingRight:'10px'}}></i>
				<i class="fas fa-edit" style={{paddingRight:'10px'}}></i></td>
      </tr>
    </tbody>
  </Table>
			</div>
		</div>
  )
}
export default AssignmentContent
