import React, {useState, useEffect, useContext} from 'react'
import {Accordion, Row, Col, Table} from 'react-bootstrap'
import ClassesAPI from './../../../api/ClassesAPI'
import { UserContext } from './../../../context/UserContext'
import TaskAnalysis from './TaskAnalysis'


function TaskReportContent({setShowTaskHeader, showTaskHeader, selectedClassId, viewTaskReport, setViewTaskReport, taskReport, setTaskReport, taskColumns = ["header 1", "header 2"]}) {
  
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const [taskAnalysis, setTaskAnalysis] = useState([])
  const [showTaskAnalysis, setShowTaskAnalysis] = useState(false)

  let sessionClass = sessionStorage.getItem("classId")
  let sessionTaskId = sessionStorage.getItem("taskId")

  const getTaskAnalysis = async(e, studentid, classid, taskid) => {
    console.log(selectedClassId)
    
    sessionStorage.setItem('analysis','true')
    sessionStorage.setItem('studentid',studentid)

    setShowTaskAnalysis(true)
    console.log(showTaskAnalysis)
    let response = await new ClassesAPI().getTaskAnalysis(studentid, sessionClass, taskid)
    if(response.ok){
      setTaskAnalysis(response.data)
      console.log(response.data)
      
    }else{
      alert(response.data.errorMessage)
    }
  }
  
  if(showTaskAnalysis === false){
  return(
    <>
    {user.student === null ?
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
          {/* {taskColumns.map((item, index) => {
            return (
              <th key={index}>{item}</th>
            )
          })} */}
          <th>Grade </th>
        </tr>
      </thead>
      <tbody>
      {taskReport.map(item =>{
          return (
            <tr>
              
              {item.studentTasks.map(st =>{
                <td><i class="fas fa-user-circle td-icon-report-person"></i> 
                  <span onClick={(e) => getTaskAnalysis(e, item.student.id, st.task.classId, st.task.id)}>{item.student.lname}, {item.student.fname}</span>
                </td>
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
    :
    <div onClick={(e) => getTaskAnalysis(e, user.student.id, sessionClass, sessionTaskId)}>{user.student.lname}</div>
    }
    </>
  )}else{
    return(
    <TaskAnalysis showTaskHeader={showTaskHeader} setShowTaskHeader={setShowTaskHeader} taskAnalysis={taskAnalysis} setTaskAnalysis={setTaskAnalysis}/>
    )
  }
}
export default TaskReportContent