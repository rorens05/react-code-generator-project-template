import React, { useState } from 'react'
import { Table, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert';
import StudentPortfolio from './StudentPortfolio';

function ClassEnrolled({enrolledStudent, getStudentEnrolled, getStudentWaiting, searchTerm}) {
  const [deleteNotify, setDeleteNotify] = useState(false)
  const [itemId, setItemId] = useState('')
  const [openPortfolioModal, setOpenPortfolioModal] = useState(false)
  const {id} = useParams()

  const cancelSweetAlert = () => {
    setDeleteNotify(false)
  }

  const openPortfolioToggle = () => {
    setOpenPortfolioModal(!openPortfolioModal)
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

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  )

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
      <Table >
        <thead>
          <tr> 
            <th><div className='class-enrolled-header'> Student{' '}</div></th>
          </tr>
        </thead>
        <tbody >
        {enrolledStudent.students?.filter((item) => {
          if(searchTerm == ''){
            return item
          }else if(item.lname.toLowerCase().includes(searchTerm.toLowerCase())){
            return item
          }
        }).map(item => {
          return (         
            <tr>
              <td >
                <div className='class-waiting-list' style={{fontSize:'24px', color:'#707070', marginLeft:'25px'}} >
                  <i class="fas fa-user-circle fas-1x" style={{color:'#EE9337',fontSize:'36px'}}></i>&nbsp;
                    <Button className='btn-student-portfolio' onClick={() => openPortfolioToggle()} variant="link">{item.fname} {item.lname}</Button>
                </div>
              </td>
              <td className='class-waiting-icon'>
                <div style={{marginRight:'35px'}}>
              <OverlayTrigger
                placement="right"
                delay={{ show: 1500, hide: 0 }}
                overlay={renderTooltipDelete}>
                <Button onClick={() => handleDeleteNotify(item.id)} className="m-r-5 color-white tficolorbg-button" size="sm"> <i class="fas fa-trash-alt"></i></Button>
              </OverlayTrigger>
              </div>
              </td> 
            </tr>)
            })}
        </tbody>
      </Table>
      <StudentPortfolio openPortfolioModal={openPortfolioModal} openPortfolioToggle={openPortfolioToggle} />
    </div>
  )
}
export default ClassEnrolled
