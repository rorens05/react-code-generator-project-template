import React, {useState, useEffect, useContext} from 'react'
import {Accordion, Row, Col, Table, Button} from 'react-bootstrap'
import ClassesAPI from '../../../api/ClassesAPI'
import ExamAnalysis from './ExamAnalysis'


function ExamReportContent({classesModules, setClassesModules, selectedClassId, viewTestReport, setViewTestReport, testReport, setTestReport, showReportHeader, setShowReportHeader}) {
  
  const [examAnalysis, setExamAnalysis] = useState([])
  const [showExamAnalysis, setShowExamAnalysis] = useState(false)
  const [loading, setLoading] = useState(false)
  let sessionClass = sessionStorage.getItem("classId")

  const getExamAnalysis = async(e, studentid, classid, testid) => {
    console.log(selectedClassId)
    
    sessionStorage.setItem('analysis','true')
    setShowExamAnalysis(true)
    console.log(showExamAnalysis)
    let response = await new ClassesAPI().getExamAnalysis(studentid, sessionClass, testid)
    if(response.ok){
      setExamAnalysis(response.data)
      console.log(response.data)
      
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  const testPartAnswers = () => {
    if(examAnalysis.length > 0){ 
      return examAnalysis.testPartAnswers?.map(item => item.instructions) || []
    }
    return []
  }

  useEffect(() => {
    setShowReportHeader(true)
  }, [])
  
  if(showExamAnalysis === false){
  return(
    <>
    <Table striped bordered hover size="sm">
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
              <td ><i class="fas fa-user-circle td-icon-report-person"></i><span onClick={(e) => getExamAnalysis(e, item.student.id, st.test.classId, st.test.id)}>{item.student.lname}, {item.student.fname}</span> </td>
              <td>{st.score}</td>
              <td>
                <Button variant="outline-warning" size="sm"><i class="fas fa-redo"style={{paddingRight:'10px'}}></i>Retake</Button>
              </td>
            </tr>
          )
        })
        )
      })}
      </tbody>
    </Table>
    
    </>
  )}else{
    return(
    <ExamAnalysis showReportHeader={showReportHeader} setShowReportHeader={setShowReportHeader} examAnalysis={examAnalysis} setExamAnalysis={setExamAnalysis}/>
    )
  }
}
export default ExamReportContent