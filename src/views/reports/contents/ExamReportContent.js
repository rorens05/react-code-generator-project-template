import React, {useState, useEffect, useContext} from 'react'
import {Accordion, Row, Col, Table} from 'react-bootstrap'
import ClassesAPI from '../../../api/ClassesAPI'

function ExamReportContent({classesModules, setClassesModules, selectedClassId, viewTestReport, setViewTestReport, testReport, setTestReport}) {
  return(
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
              <td><i class="fas fa-user-circle td-icon-report-person"></i> {item.student.lname}, {item.student.fname}</td>
              <td>{st.score}</td>
              <td>
                <i class="fas fa-eye"style={{paddingRight:'10px'}}></i>
                <i class="fas fa-edit" style={{paddingRight:'10px'}}></i>
              </td>
            </tr>
          )
        })
        )
      })}
      </tbody>
    </Table>
  )
}
export default ExamReportContent