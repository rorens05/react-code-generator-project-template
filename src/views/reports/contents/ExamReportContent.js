import React, {useState, useEffect, useContext} from 'react'
import {Badge, Table, Button} from 'react-bootstrap'
import ClassesAPI from '../../../api/ClassesAPI'
import ExamAnalysis from './ExamAnalysis'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import { UserContext } from './../../../context/UserContext'


function ExamReportContent({ selectedClassId, testReport, setTestReport, showReportHeader, setShowReportHeader}) {
  
  const [examAnalysis, setExamAnalysis] = useState([])
  const [showExamAnalysis, setShowExamAnalysis] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sweetError, setSweetError] = useState(false)
  const [studentId, setStudentId] = useState(false)
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  let sessionClass = sessionStorage.getItem("classId")
  let sessionTestId = sessionStorage.getItem("testid")

  const getExamAnalysis = async(e, studentid, classid, testid) => {
    console.log(selectedClassId)
    
    sessionStorage.setItem('analysis','true')
    sessionStorage.setItem('studentid',studentid)
    sessionStorage.setItem('testid',testid)
    setShowExamAnalysis(true)
    let response = await new ClassesAPI().getExamAnalysis(studentid, sessionClass, testid)
    if(response.ok){
      setExamAnalysis(response.data)
      console.log(response.data)
      
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  const retakeExam = async(classid, testid, studentid) => {
    let isConsider = true
    let response = await new ClassesAPI().retakeExam
    (
      sessionClass, testid, studentid
    )
    if(response.ok){
      notifyRetakeExam()
      getTestReport(null, sessionClass, testid)
    }else{
      alert(response.data.errorMessage)
    }
  }

  const getTestReport = async(e, classid,testid) => {
    setLoading(true)
    let sessionClass = sessionStorage.getItem("classId")
    // setViewTestReport(false)
    let response = await new ClassesAPI().getTestReport(classid, testid)
    setLoading(false)
    if(response.ok){
      setTestReport(response.data)
    }else{
      alert(response.data.errorMessage)
    }
  }

  const cancelSweetError = () => {
    setSweetError(false)
  }

  const confirmSweetError = (classid, testid, studentid) => {
    retakeExam(classid, testid, studentid)
    setSweetError(false)
  } 

  const notifyRetakeExam = () => 
  toast.success('Exam can now be retaken', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  useEffect(() => {
    setShowReportHeader(true)
  }, [])
  
  if(showExamAnalysis === false){
  return(
    <>
    <ToastContainer />
    {user.student === null ?
    <Table striped hover size="sm">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Grade</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {testReport.map(item =>{
          return (
            item.studentTests.map(st =>{
              return (
                <tr>
                  <td >
                    <i className="fas fa-user-circle td-icon-report-person m-r-10"></i>
                      <span onClick={(e) => getExamAnalysis(e, item.student.id, st.test.classId, st.test.id)} >
                      { item.student.lname, item.student.fname} 
                      </span> 
                  </td>
                  <td>{st.isSubmitted === false ? <Badge bg="warning">Not Submitted</Badge>: st.score}</td>
                  {/* <td>{st.score}</td> */}
                  <td>
                    {/* <Button variant="outline-warning" size="sm" onClick={(e) => retakeExam(e, st.test.classId, st.test.id, item.student.id)}><i class="fas fa-redo"style={{paddingRight:'10px'}} ></i>Retake</Button> */}
                    <Button style={{color:"white"}} variant="warning" size="sm" onClick={() => {setSweetError(true); setStudentId(item.student.id)}}><i class="fas fa-redo"style={{paddingRight:'10px'}} ></i>Retake</Button>
                    <SweetAlert
                          warning
                          showCancel
                          show={sweetError}
                          confirmBtnText="Yes!"
                          confirmBtnBsStyle="danger"
                          title="Are you sure?"
                          onConfirm={() => confirmSweetError(st.test.classId, st.test.id, item.student.id)}
                          onCancel={cancelSweetError}
                          focusCancelBtn
                        >
                          Retake the exam?
                      </SweetAlert>
                  </td>
                </tr>
              )
            })
            )
          })
        }
      </tbody>
    </Table>
    :
    <div onClick={(e) => getExamAnalysis(e, user.student.id, sessionClass, sessionTestId)}>{user.student.lname}</div>
    }
    </>
  )}else{
    return(
    <ExamAnalysis showReportHeader={showReportHeader} setShowReportHeader={setShowReportHeader} examAnalysis={examAnalysis} setExamAnalysis={setExamAnalysis} testReport={testReport}/>
    )
  }
}
export default ExamReportContent