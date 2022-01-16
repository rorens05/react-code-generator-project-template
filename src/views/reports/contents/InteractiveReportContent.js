import React, {useState, useEffect, useContext} from 'react'
import {Accordion, Row, Col, Table, Button} from 'react-bootstrap'
import ClassesAPI from '../../../api/ClassesAPI'

function InteractiveReportContent({classesModules, setClassesModules, selectedClassId, viewInteractiveReport, interactiveReport, setinteractiveReport, showReportHeader, setShowReportHeader}) {
  
  const [loading, setLoading] = useState(false)
  let sessionClass = sessionStorage.getItem("classId")

  useEffect(() => {
  }, [])
  
  return(
    <>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Easy Score</th>
          <th>Average Score</th>
          <th>Hard Score</th>
        </tr>
      </thead>
      <tbody>
      {interactiveReport.map(item =>{
        return (
        item.interactiveResults.map(st =>{
          return (
            <tr>
              <td ><i class="fas fa-user-circle td-icon-report-person"></i></td>
              <td>{st.easyScore}</td>
              <td>{st.averageScore}</td>
              <td>{st.hardScore}</td>
            </tr>
          )
        })
        )
      })}
      </tbody>
    </Table>
    
    </>
  )
}
export default InteractiveReportContent