import React from 'react'
import { Table } from 'react-bootstrap'

function ClassEnrolled() {
  return (
    <div>
    <Table>
      <thead>
        <tr> 
          <th> Student <i class="fas fa-sort-alpha-down"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> <i class="fas fa-user-circle fas-1x" ></i> Carlos Alfronso Inigo</td> 
        </tr>
      </tbody>
    </Table>
    </div>
  )
}

export default ClassEnrolled
