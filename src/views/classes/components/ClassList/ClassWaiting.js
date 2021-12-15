import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams} from 'react-router'


function ClassWaiting({waitingStudent, getStudentEnrolled, getStudentWaiting}) {
  console.log('this is waiting Student', waitingStudent)
  const {id} = useParams()

  const addStudent = async(e, item) =>{
    console.log('this studentId', item)
    let studentId = item
    let isAccepted = true
    let response = await new ClassesAPI().acceptStudent(id, isAccepted, [studentId])
      
    if(response.ok){
      alert('Add Student')
      getStudentEnrolled()
      getStudentWaiting()
    }else{
      alert("Something went wrong while fetching all Add Student")
    }
  }

  const removeStudent = async (e, item) =>{
    let response = await new ClassesAPI().removeStudentWaitingList(id, [item])
    if(response.ok){
      alert('Remove Student from ClassList')
      getStudentEnrolled()
      getStudentWaiting()
    }else{
      alert("Something went wrong while fetching Remove Student from Pending List")
    }
  }

  return (
    <div>
      <Table>
        <thead>
          <tr> 
          <th><div className='class-waiting-header'> Student{' '} <i class="fas fa-sort-alpha-down" style={{color:'#EE9337',fontSize:'32px'}}></i></div></th>  
          </tr>
        </thead>
        <tbody>
        {waitingStudent.students.map(item => {
          return (         
            <tr>
              <td>
                <div className='class-waiting-list' style={{fontSize:'24px', color:'#707070', }} >
                  <i class="fas fa-user-circle fas-1x" style={{color:'#EE9337',fontSize:'36px',}}></i>&nbsp;
                    {item.fname} {item.lname}
                </div>
              </td>
              <td className='class-waiting-icon'> 
               <Button onClick={(e) => addStudent(e, item.id)} className="m-r-5 color-white tficolorbg-button" size="sm"> <i class="fas fa-user-plus"></i> </Button>
               <Button onClick={(e) => removeStudent(e, item.id)} className="m-r-5 color-white tficolorbg-button" size="sm"> <i class="fas fa-trash-alt"></i></Button>
              </td>
            </tr>)
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default ClassWaiting
