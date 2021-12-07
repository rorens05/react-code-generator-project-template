import React from 'react'
import { Table } from 'react-bootstrap'

function ClassEnrolled() {
  return (
    <div>
      <Table>
        <thead>
          <tr> 
            <th><div className='class-enrolled-header'> Student{' '} <i class="fas fa-sort-alpha-down" style={{color:'#EE9337',fontSize:'32px'}}></i></div></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className='class-enrolled-list'>
                  <i class="fas fa-user-circle fas-1x" style={{color:'#EE9337',fontSize:'36px',}}>
                  </i> Carlos Alfronso Inigo
              </div>
            </td> 
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
export default ClassEnrolled
