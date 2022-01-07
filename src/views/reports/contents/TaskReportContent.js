import React, {useState, useEffect, useContext} from 'react'
import {Accordion, Row, Col, Table} from 'react-bootstrap'

import ClassesAPI from './../../../api/ClassesAPI'

function TaskReportContent({classesModules, setClassesModules, selectedClassId, viewTaskReport, setViewTaskReport, taskReport, setTaskReport, taskColumns = ["header 1", "header 2"]}) {
  return(
    <Table hover size="lg" responsive>
      <thead>
        <tr>
          <th>Student Name</th>
          {/* {assignmentReport.map(item =>{
            return(
            item.columnAssignments.map(as =>{
                return(
                <th>{as.assignmentName}</th>
                )
              })
            )
          })} */}
          {taskColumns.map((item, index) => {
            return (
              <th key={index}>{item}</th>
            )
          })}
        </tr>
      </thead>
      <tbody>
      {taskReport.map(item =>{
          return (
            <tr>
              <td><i class="fas fa-user-circle td-icon-report-person"></i> {item.student.lname}, {item.student.fname}</td>
              {item.studentTasks.map(st =>{
              return (
                <td>{st.score} </td>
                )
            })}
            </tr>
          )
        })
      }
      </tbody>
    </Table>
  )
}
export default TaskReportContent