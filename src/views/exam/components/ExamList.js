import React from 'react'
import { Table } from 'react-bootstrap'

function ExamList() {
  return (
    <div>
       <Table responsive="sm">
    <thead>
      <tr className='tr-exam-list'>
        <th>NO.</th>
        <th>Exam</th>
        <th>Exam Code</th>
        <th>Publisher</th>
        <th>No. of Test</th>
        <th>No. of Questions</th>
        <th>Total Points</th>
        <th>Options</th>
      </tr>
    </thead>
    <tbody>
      <tr className='tr-exam-list'>
        <td className='td-number-exam' >1</td>
        <td className='td-title-exam'>Exam 1  <br />Math</td>
        <td className='td-number-exam' >EQF1</td>
        <td className='td-icon-plus' ><i class="fas fa-plus-circle"></i></td>
        <td className='td-number-exam' >2</td>
        <td className='td-number-exam' >20</td>
        <td className='td-number-exam' >20</td>
        <td className='td-icon-plus'><i class="fas fa-edit" style={{paddingRight:'10px'}}></i><i class="far fa-share-square" ><i class="fas fa-trash-alt" style={{paddingLeft:'10px'}} ></i></i></td>
      </tr>
      <tr className='tr-exam-list'>
        <td className='td-number-exam'>2</td>
        <td className='td-title-exam'>Exam 2 <br />Math</td>
        <td className='td-number-exam'>EQF2</td>
        <td className='td-icon-plus'><i class="fas fa-plus-circle"></i></td>
        <td className='td-number-exam'>2</td>
        <td className='td-number-exam'>20</td>
        <td className='td-number-exam'>20</td>
        <td className='td-icon-plus'><i class="fas fa-edit" style={{paddingRight:'10px'}}></i><i class="far fa-share-square" ><i class="fas fa-trash-alt" style={{paddingLeft:'10px'}} ></i></i></td>
      </tr>
      <tr className='tr-exam-list'>
        <td className='td-number-exam'>3</td>
        <td className='td-title-exam'>Exam 3 <br />Math</td>
        <td className='td-number-exam'>EQF3</td>
        <td className='td-icon-plus'><i class="fas fa-plus-circle"></i></td>
        <td className='td-number-exam'>2</td>
        <td className='td-number-exam'>20</td>
        <td className='td-number-exam'>20</td>
        <td className='td-icon-plus'><i class="fas fa-edit" style={{paddingRight:'10px'}}></i><i class="far fa-share-square" ><i class="fas fa-trash-alt" style={{paddingLeft:'10px'}} ></i></i></td>
      </tr>
    </tbody>
  </Table>
    </div>
  )
}
export default ExamList
