import React from 'react'
import { Table } from 'react-bootstrap'

function ClassWaiting() {
  return (
    <div>
      <Table>
        <thead>
          <tr> 
          <th><div className='class-waiting-header'> Student{' '} <i class="fas fa-sort-alpha-down" style={{color:'#EE9337',fontSize:'32px'}}></i></div></th>  
          </tr>
        </thead>
        <tbody>
          <tr>
          <td><div className='class-waiting-list' style={{fontSize:'24px', color:'#707070', }} > <i class="fas fa-user-circle fas-1x" style={{color:'#EE9337',fontSize:'36px',}}></i> Kent Placia</div></td>
            <td className='class-waiting-icon'> <i class="fas fa-user-plus"style={{color:'#EE9337',fontSize:'20px',}}></i> <i class="fas fa-trash-alt" style={{color:'#EE9337',fontSize:'20px',}}></i></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default ClassWaiting
