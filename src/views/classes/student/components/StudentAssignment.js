import React, { useContext, useState, useEffect } from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import moment from 'moment'
import { useParams } from 'react-router'
import { UserContext } from '../../../../context/UserContext'
import StudentAnswerAssignment from './StudentAnswerAssignment'
import StudentSubmittedAssigment from './StudentSubmittedAssigment'
import ClassesAPI from '../../../../api/ClassesAPI'

function StudentAssignment({assignment}) {
  const [answerModal, setAnswerModal] = useState(false)
  const [submittedAssignment, setSubmittedAssignment] = useState(false)
  const [studentAnswer, setStudentAnswer] = useState()
  const [assignmentId, setAssignmentId] = useState(null)
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const {id} = useParams()
  const dateCompareNow = moment().format("YYYY-MM-DD")
  const timeNow = moment().format('HH:mm');
  const dateTimeNow = dateCompareNow + ' ' + '00:00:00';
  // console.log('Assingment:', assignment)

  const answerAnswerToggle = (item) => {
    setAssignmentId(item)
    setAnswerModal(!answerModal)
  }

  const submittedAssignmentToggle =  () => {
    setSubmittedAssignment(!submittedAssignment)
  }

  const getStudentAssignmentAnswer = async(item) => {
    let studentId = user.student.id
    let classId = id
    let response = await new ClassesAPI().getStudentAssignmentAnswer(studentId, classId, item)
      if(response.ok){
        setStudentAnswer(response.data)
        submittedAssignmentToggle()
      }else{
       alert('ERROR getStudentAssignmentAnswer')
      }
  }

  useEffect(() => {
    if(assignmentId !== null){
      return(
        getStudentAssignmentAnswer()
      )
    }
    
  }, [])

  return (
    <div>
      {assignment.map(item =>{
        return(
          <>
            {(item?.isScheduled === true)?(
              <>
              <Row>
               <Col sm={8}>
                      <div className='title-exam' >
                        {item?.assignment?.assignmentName}
                      </div>
                    </Col>
                    <Col sm={9} className='instruction-exam' >
                      <div className='inline-flex'>
                        <div className='text-color-bcbcbc' >
                          Instruction:&nbsp;
                        </div>
                        <div className='text-color-707070' >
                        <span style={{marginTop:"300px !important"}} dangerouslySetInnerHTML={{__html:item?.assignment?.instructions }} />
                        </div>
                      </div>
                    </Col>
                      {(item.isLoggedUserDone === true)?(
                    <>
                      <Col sm={3} className='icon-exam'>
                      <Button onClick={() => getStudentAssignmentAnswer(item?.assignment?.id)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-eye" ></i>{' '}</Button>
                    </Col>
                      {
                        moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classAssignment?.endDate + ' ' + item?.classAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                        <></>
                      } 
                    </>
                  ):
                  <>
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classAssignment?.startDate + ' ' + item?.classAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(item?.classAssignment?.endDate + ' ' + item?.classAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <Col sm={3} className='icon-exam'>
                      <Button onClick={() => answerAnswerToggle(item?.assignment?.id)}  className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-user-edit"></i></Button>
                      </Col>
                    }
                      {
                        moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classAssignment?.endDate + ' ' + item?.classAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                        <Col sm={3} className='icon-exam'>
                        <Button  className="m-r-5 color-white tficolorbg-button" size="sm">Not Submitted</Button>
                        </Col>
                      }
                    </>
                    }
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classAssignment?.startDate + ' ' + item?.classAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(item?.classAssignment?.endDate + ' ' + item?.classAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ongoing</b></div>
                    }
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classAssignment?.endDate + ' ' + item?.classAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ended</b>&nbsp;</div>  
                    }
                    <Col sm={7} className='due-date-discusstion' >
                        <div className='inline-flex'>
                          <div className='text-color-bcbcbc'>
                            Start Date:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                           {moment(item?.classAssignment?.startDate).format('LL')}&nbsp;
                          </div>
                          <div className='text-color-bcbcbc'>
                            Start Time:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            {item?.classAssignment?.startTime}
                          </div>
                      </div>
                      </Col>
                      <Col className='posted-date-discusstion'>
                        <div className='inline-flex'>
                          <div className='text-color-bcbcbc'>
                            End Date:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            {moment(item?.classAssignment?.endDate).format('LL')}&nbsp;
                          </div>
                          <div className='text-color-bcbcbc'>
                            End Time:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            {item?.classAssignment?.endTime}
                          </div>
                        </div>
                      </Col>
                </Row>
                <div className='text-color-bcbcbc' >
                   ___________________________________________________________________________________________________________________________________________________________________________________________________________
                 </div>
              </>
              ):
              <>
              </>}
          </>
        )
      })}
      <StudentAnswerAssignment assignmentId={assignmentId} answerAnswerToggle={answerAnswerToggle} answerModal={answerModal} />
      <StudentSubmittedAssigment studentAnswer={studentAnswer} submittedAssignmentToggle={submittedAssignmentToggle} submittedAssignment={submittedAssignment} />
    </div>
  )
}

export default StudentAssignment
