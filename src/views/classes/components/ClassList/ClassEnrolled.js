import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert';

function ClassEnrolled({enrolledStudent, getStudentEnrolled, getStudentWaiting, searchTerm}) {
  const [deleteNotify, setDeleteNotify] = useState(false)
  const [itemId, setItemId] = useState('')
  const {id} = useParams()

  const cancelSweetAlert = () => {
    setDeleteNotify(false)
  }

  const handleDeleteNotify = (item) =>{
    setDeleteNotify(true)
    setItemId(item)
  }

  const removeStudentEnrolled = async(item) =>{
    console.log('this studentId', item)
    let studentId = item
    let isAccepted = false
    let response = await new ClassesAPI().acceptStudent(id, isAccepted, [studentId])
      
    if(response.ok){
      // alert('Add Student')
      setDeleteNotify(false)
      getStudentEnrolled()
      getStudentWaiting()
    }else{
      alert("Something went wrong while fetching all Add Student")
    }
  }


  return (
    <div>
      <SweetAlert
        warning
        showCancel
        show={deleteNotify}
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => removeStudentEnrolled(itemId)}
        onCancel={cancelSweetAlert}
        focusCancelBtn
        >
      </SweetAlert>
      <Table>
        <thead>
          <tr> 
            <th><div className='class-enrolled-header'> Student{' '}</div></th>
          </tr>
        </thead>
        <tbody>
        {enrolledStudent.students?.filter((item) => {
          if(searchTerm == ''){
            return item
          }else if(item.lname.toLowerCase().includes(searchTerm.toLowerCase())){
            return item
          }
        }).map(item => {
          return (         
            <tr>
              <td>
                <div className='class-waiting-list' style={{fontSize:'24px', color:'#707070', }} >
                  <i class="fas fa-user-circle fas-1x" style={{color:'#EE9337',fontSize:'36px',}}></i>&nbsp;
                    {item.fname} {item.lname}
                </div>
              </td>
              <td className='class-waiting-icon'>
                <Button onClick={() => handleDeleteNotify(item.id)} className="m-r-5 color-white tficolorbg-button" size="sm"> <i class="fas fa-trash-alt"></i></Button>
              </td> 
            </tr>)
            })}
        </tbody>
      </Table>
    </div>
  )
}
export default ClassEnrolled
