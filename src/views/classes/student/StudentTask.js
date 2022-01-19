import React, { useState, useContext, useEffect } from 'react'
import {Row, Col, Accordion, Button} from 'react-bootstrap'
import moment from 'moment'
import StundentAnswerTask from './components/StundentAnswerTask';
import StudentSubmittedTask from './components/StudentSubmittedTask';
import { useParams } from 'react-router'
import { UserContext } from '../../../context/UserContext'
import ClassesAPI from '../../../api/ClassesAPI';

function StudentTask({taskModule}) {
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const [answerTaskModal, setAnswerTaskModal] = useState(false)
  const [submittedTaskModal, setSubmittedTaskModal] = useState(false)
  const [taskId, setTaskId] = useState(null)
  const [taskAnswerItem, setTaskAnswerItem] = useState()
  const {id} = useParams()
  const dateCompareNow = moment().format("YYYY-MM-DD")
  const timeNow = moment().format('HH:mm');
  const dateTimeNow = dateCompareNow + ' ' + '00:00:00';

  const answerTaskToggle = (item) => {
    setTaskId(item)
    setAnswerTaskModal(!answerTaskModal)
  }


  const submittedTaskToggle = () => {
    setSubmittedTaskModal(!submittedTaskModal)
  }

  const getStudentTaskAnwswer = async(item) =>{
    let studentId = user?.student?.id
    let classId = id
    let response = await new ClassesAPI().getStudentTaskAnwswer(studentId, classId, item)
    if(response.ok){
      setTaskAnswerItem(response.data)
      setSubmittedTaskModal(!submittedTaskModal)
    }else{
      alert('ERROR')
    }
  }
  
  useEffect(() => {
    if(taskId !== null){
      return(
        getStudentTaskAnwswer()
      )
    }
    
  }, [])

  return (
    <div>
      {taskModule.map(item => {
        return(
          <>
              {(item?.isScheduled === true)?(
              <>
              <Row>
               <Col sm={8}>
                      <div className='title-exam' >
                        {item?.task?.taskName}
                      </div>
                    </Col>
                    <Col sm={9} className='instruction-exam' >
                      <div className='inline-flex'>
                        <div className='text-color-bcbcbc' >
                          Instruction:&nbsp;
                        </div>
                        <div className='text-color-707070' >
                        <span style={{marginTop:"300px !important"}} dangerouslySetInnerHTML={{__html:item?.task?.instructions }} />
                        </div>
                      </div>
                    </Col>
                      {(item.isLoggedUserDone === true)?(
                    <>
                      <Col sm={3} className='icon-exam'>
                      <Button onClick={(e) => getStudentTaskAnwswer(item?.task?.id)} className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-eye" ></i>{' '}</Button>
                    </Col>
                      {
                        moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.taskAssignment?.endDate + ' ' + item?.taskAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                        <></>
                      } 
                    </>
                  ):
                  <>
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.taskAssignment?.startDate + ' ' + item?.taskAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(item?.taskAssignment?.endDate + ' ' + item?.taskAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <Col sm={3} className='icon-exam'>
                      <Button onClick={() => answerTaskToggle(item?.task?.id)}  className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-user-edit"></i></Button>
                      </Col>
                    }
                      {
                        moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.taskAssignment?.endDate + ' ' + item?.taskAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                        <Col sm={3} className='icon-exam'>
                        <Button  className="m-r-5 color-white tficolorbg-button" size="sm">Not Submitted</Button>
                        </Col>
                      }
                    </>
                    }
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.taskAssignment?.startDate + ' ' + item?.taskAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(item?.taskAssignment?.endDate + ' ' + item?.taskAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ongoing</b></div>
                    }
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.taskAssignment?.endDate + ' ' + item?.taskAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ended</b>&nbsp;</div>  
                    }
                    <Col sm={7} className='due-date-discusstion' >
                        <div className='inline-flex'>
                          <div className='text-color-bcbcbc'>
                            Start Date:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                           {moment(item?.taskAssignment?.startDate).format('LL')}&nbsp;
                          </div>
                          <div className='text-color-bcbcbc'>
                            Start Time:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            {item?.taskAssignment?.startTime}
                          </div>
                      </div>
                      </Col>
                      <Col className='posted-date-discusstion'>
                        <div className='inline-flex'>
                          <div className='text-color-bcbcbc'>
                            End Date:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            {moment(item?.taskAssignment?.endDate).format('LL')}&nbsp;
                          </div>
                          <div className='text-color-bcbcbc'>
                            End Time:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            {item?.taskAssignment?.endTime}
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
      <StundentAnswerTask taskId={taskId} answerTaskToggle={answerTaskToggle} answerTaskModal={answerTaskModal} />
      <StudentSubmittedTask taskAnswerItem={taskAnswerItem} submittedTaskToggle={submittedTaskToggle} submittedTaskModal={submittedTaskModal} />
    </div>
  )
}

export default StudentTask
