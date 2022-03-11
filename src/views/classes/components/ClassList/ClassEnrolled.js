import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert';
import StudentPortfolio from './StudentPortfolio';

function ClassEnrolled({enrolledStudent, getStudentEnrolled, getStudentWaiting, searchTerm}) {
  const [deleteNotify, setDeleteNotify] = useState(false)
  const [itemId, setItemId] = useState('')
  const [openPortfolioModal, setOpenPortfolioModal] = useState(false)
  const {id} = useParams()
  const [studentinfo, setStudentInfo] = useState()
  const [classInfo, setClassinfo] = useState()
  const [studentClasses, setStudentClasses] = useState()
  const [studentInformation, setStudentInformation] = useState([])

  const cancelSweetAlert = () => {
    setDeleteNotify(false)
  }
  
  

  const openPortfolioToggle = (item, item1, item2) => {
    setStudentInfo(item)
    setClassinfo(item1)
    getStudentInformation(item2)
    setOpenPortfolioModal(true)
  }
  
  const handleDeleteNotify = (item) =>{
    setDeleteNotify(true)
    setItemId(item)
  }

  const getStudentInformation = async(item2) =>{
    let classId = id
    let response = await new ClassesAPI().getStudentInformation(item2, classId)
      if(response.ok){
        setStudentInformation(response.data)
      }else{
        alert('Something went wrong while fetching all Activeties')
      }
  }

  console.log('enrolledStudent:', enrolledStudent)
  console.log('studentActivities:', studentInformation)

  const removeStudentEnrolled = async(item) =>{
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
                  <i class="fas fa-user-circle fas-1x" style={{color:'#EE9337',fontSize:'36px'}}></i>&nbsp;
                    <Button className='btn-student-portfolio' onClick={() => openPortfolioToggle(item, enrolledStudent?.classInformation, item.id)} variant="link">{item.fname} {item.lname}</Button>
                </div>
              </td>
              <td className='class-waiting-icon'>
                <Button onClick={() => handleDeleteNotify(item.id)} className="m-r-5 color-white tficolorbg-button" size="sm"> <i class="fas fa-trash-alt"></i></Button>
              </td> 
            </tr>)
            })}
        </tbody>
      </Table>
      <StudentPortfolio setOpenPortfolioModal={setOpenPortfolioModal} classInfo={classInfo} studentInformation={studentInformation} openPortfolioModal={openPortfolioModal} openPortfolioToggle={openPortfolioToggle} />
    </div>
  )
}
export default ClassEnrolled
