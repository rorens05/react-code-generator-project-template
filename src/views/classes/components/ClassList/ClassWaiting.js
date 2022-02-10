import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams} from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert';


function ClassWaiting({waitingStudent, getStudentEnrolled, getStudentWaiting, searchTerm}) {
  const [addNotify, setAddNotify] = useState(false)
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

  const closeAddNotify = () =>{
    setAddNotify(false)
  }

  const addStudent = async(e, item) =>{
    console.log('this studentId', item)
    let studentId = item
    let isAccepted = true
    let response = await new ClassesAPI().acceptStudent(id, isAccepted, [studentId]) 
    if(response.ok){
      // alert('Add Student')
      setAddNotify(true)
      getStudentEnrolled()
      getStudentWaiting()
    }else{
      alert("Something went wrong while fetching all Add Student")
    }
  }

  const removeStudent = async (e, item) =>{
    let response = await new ClassesAPI().removeStudentWaitingList(id, [item])
    if(response.ok){
      // alert('Remove Student from ClassList')
      setDeleteNotify(false)
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
        {waitingStudent?.students?.filter((item) => {
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
               <Button onClick={(e) => addStudent(e, item.id)} className="m-r-5 color-white tficolorbg-button" size="sm"> <i class="fas fa-user-plus"></i> </Button>
               <Button onClick={() => handleDeleteNotify(item.id)} className="m-r-5 color-white tficolorbg-button" size="sm"> <i class="fas fa-trash-alt"></i></Button>
              </td>
            </tr>)
            })}
        </tbody>
      </Table>
        <SweetAlert 
          success
          show={addNotify} 
          title="Done!" 
          onConfirm={closeAddNotify}>
        </SweetAlert>
        <SweetAlert
          warning
          showCancel
          show={deleteNotify}
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={() => removeStudent(itemId)}
          onCancel={cancelSweetAlert}
          focusCancelBtn
        >
            You will not be able to recover this imaginary file!
          </SweetAlert>
    </div>
  )
}

export default ClassWaiting
