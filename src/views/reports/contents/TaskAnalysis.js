import React, {useState, useEffect, useContext} from 'react'
import {Accordion, Row, Col, Table, Button, Form, Modal} from 'react-bootstrap'
import ClassesAPI from '../../../api/ClassesAPI'
import SweetAlert from 'react-bootstrap-sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskAnalysis({selectedClassId, taskAnalysis, setTaskAnalysis,  showTaskHeader, setShowTaskHeader}) {
  
  const [showTaskAnalysis, setShowTaskAnalysis] = useState([])
  const [loading, setLoading] = useState(false)
  const [sweetError, setSweetError] = useState(false)
  const [show, setShow] = useState(false);

  let testname = sessionStorage.getItem('testName')
  let classid = sessionStorage.getItem('classId')
  let studentidsession = sessionStorage.getItem('studentid')
  let testidsession = sessionStorage.getItem('testid')


  const getTaskAnalysis = async(e, studentid, classid, taskid) => {
    e.preventDefault()
    console.log(selectedClassId)
    setShowTaskAnalysis(true)
    console.log(showTaskAnalysis)
    let response = await new ClassesAPI().getTaskAnalysis(studentid, classid, taskid)
    if(response.ok){
      setTaskAnalysis(response.data)
      console.log(response.data)
      
    }else{
      alert(response.data.errorMessage)
    }
  }

  const cancelSweetError = () => {
    setSweetError(false)
  }

  useEffect(() => {
    setSweetError(false)
    setShowTaskHeader(false)
  }, [])

  const notifyUpdateTaskScore = () => 
  toast.success('Score Saved', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return(
  <>
    <ToastContainer />
		<Row>
      {taskAnalysis.studentTask === null ?
      <Col md={12}>No Answer Yet </Col>
      
      :
        <>
          <Col md={12}>Assignment Name : {taskAnalysis.task?.taskName}</Col>
          <hr></hr>
          <Col md={12}>{taskAnalysis.studentTask?.taskAnswer}</Col>
          <hr></hr>
          <Col md={12}>{taskAnalysis.studentTask?.taskGrade}<Button variant="outline-warning" size="sm"><i class="fas fa-redo"style={{paddingRight:'10px'}} ></i>Update Score</Button></Col>
          <hr></hr>
          <Col md={12}>{taskAnalysis.studentTask?.feedback}</Col>
        </>
      }
    </Row>
  </> 
  )
}
export default TaskAnalysis