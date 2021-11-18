import React from 'react'
import { Table } from 'react-bootstrap'

function ClassWaiting() {
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
          <td style={{textAlign:'right'}}> <i class="fas fa-user-plus"></i> <i class="fas fa-trash-alt"></i></td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}

export default ClassWaiting
