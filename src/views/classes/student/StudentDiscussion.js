import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../../../context/UserContext'
import {Row, Col, Accordion, Button, InputGroup, FormControl} from 'react-bootstrap'
import moment from 'moment'
import StudentDiscussionComment from './components/StudentDiscussionComment'
import ClassesAPI from '../../../api/ClassesAPI'
import SweetAlert from 'react-bootstrap-sweetalert';

function StudentDiscussion({discussionModule, getDiscussionUnit, moduleId}) {
  const [discussionId, setDiscussionId] = useState('')
  const [commentAlert, setCommentAlert] = useState(false)
  const dateCompareNow = moment().format("YYYY-MM-DD")
  const timeNow = moment().format('HH:mm');
  const dateTimeNow = dateCompareNow + ' ' + '00:00:00';
  const [studentCommentModal, setstudentCommentModal] = useState(false)
  const [comments, setComments] = useState([])
  const [startDate, setStartDate] = useState()
  const [startTime, setStartTime] = useState()
  const [endDate, setEndDate] = useState()
  const [endTime, setEndTime] = useState()
  const {id} = useParams()
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const [reply, setReply] = useState('')

  const closeNotify = () =>{
    setCommentAlert(false)
  }

  const studentCommentToggle = (item, item1, item3, item4, item5, item6) => {
    setComments(item)
    setDiscussionId(item1)
    setStartDate(item3)
    setStartTime(item4)
    setEndDate(item5)
    setEndTime(item6)
    setstudentCommentModal(!studentCommentModal)
  }

  const submitComment = async (e, item) => {
    e.preventDefault()
    let classId = id
    let userAccountId = user?.userId
    let response = await new ClassesAPI().submitComment(classId, item, {userAccountId, reply})
      if(response.ok){
        setCommentAlert(true)
        setReply('')
        getDiscussionUnit(null, moduleId)
      }else{
        alert('No good')
      }
  }

  return (
    <div>
      {(discussionModule?.map(item => {
        return(
          <>
            {(item?.isScheduled === true)?(
            <>
          <Row>
            <Col sm={8}>
                <div className='title-exam' >
                  {item?.discussion?.discussionName}
                </div>
              </Col>
              <Col sm={9} className='instruction-exam' >
                <div className='inline-flex'>
                  <div className='text-color-bcbcbc' >
                    Instruction:&nbsp;
                  </div>
                  <div className='text-color-707070' >
                  <span style={{marginTop:"300px !important"}} dangerouslySetInnerHTML={{__html:item?.discussion?.instructions }} />
                  </div>
                </div>
              </Col>
                {(item.isLoggedUserDone === true)?(
              <>
              <Col sm={3} className='icon-exam'>
                <Button  className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-eye" ></i>{' '}</Button>
              </Col>
                {
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.discussionAssignment?.endDate + ' ' + item?.discussionAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                  <></>
                } 
              </>
              ):
              <>
                {
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.discussionAssignment?.startDate + ' ' + item?.discussionAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(item?.discussionAssignment?.endDate + ' ' + item?.discussionAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                  <Col sm={3} className='icon-exam'>
                    <Button onClick={() => studentCommentToggle(item?.responses, item?.discussionAssignment?.discussionId, item?.discussionAssignment?.startDate, item?.discussionAssignment?.startTime, item?.discussionAssignment?.endDate, item?.discussionAssignment?.endTime)} className="m-r-5 color-white tficolorbg-button" size="sm">Comments&nbsp;{item.responseCount}</Button>
                  </Col>
                }
                {
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.discussionAssignment?.endDate + ' ' + item?.discussionAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                  <Col sm={3} className='icon-exam'>
                    <Button onClick={() => studentCommentToggle(item?.responses, item?.discussionAssignment?.discussionId, item?.discussionAssignment?.startDate, item?.discussionAssignment?.startTime, item?.discussionAssignment?.endDate, item?.discussionAssignment?.endTime)} className="m-r-5 color-white tficolorbg-button" size="sm">Comments&nbsp;{item.responseCount}</Button>
                  </Col>
                }
              </>
                }
                {
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.discussionAssignment?.startDate + ' ' + item?.discussionAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(item?.discussionAssignment?.endDate + ' ' + item?.taskAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                  <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ongoing</b></div>
                }
                {
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.discussionAssignment?.endDate + ' ' + item?.discussionAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                  <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ended</b>&nbsp;</div>  
                }
              <Col sm={7} className='due-date-discusstion' >
                  <div className='inline-flex'>
                    <div className='text-color-bcbcbc'>
                      Start Date:&nbsp;
                    </div>
                    <div className='text-color-707070'>
                      {moment(item?.discussionAssignment?.startDate).format('LL')}&nbsp;
                    </div>
                    <div className='text-color-bcbcbc'>
                      Start Time:&nbsp;
                    </div>
                    <div className='text-color-707070'>
                      {item?.discussionAssignment?.startTime}
                    </div>
                </div>
                </Col>
                <Col className='posted-date-discusstion'>
                  <div className='inline-flex'>
                    <div className='text-color-bcbcbc'>
                      End Date:&nbsp;
                    </div>
                    <div className='text-color-707070'>
                      {moment(item?.discussionAssignment?.endDate).format('LL')}&nbsp;
                    </div>
                    <div className='text-color-bcbcbc'>
                      End Time:&nbsp;
                    </div>
                    <div className='text-color-707070'>
                      {item?.discussionAssignment?.endTime}
                    </div>
                  </div>
                </Col>
          </Row>
          <br />
          <div className='text-color-bcbcbc' >
              ___________________________________________________________________________________________________________________________________________________________________________________________________________
          </div>
            </>):(
            <>

            </>
            )}
          </>
        )
      }))}
      <StudentDiscussionComment endTime={endTime} endDate={endDate} startTime={startTime} startDate={startDate} getDiscussionUnit={getDiscussionUnit} moduleId={moduleId} discussionId={discussionId} comments={comments} studentCommentToggle={studentCommentToggle} studentCommentModal={studentCommentModal} />
      <SweetAlert 
          success
          show={commentAlert} 
          title="Done!" 
           onConfirm={closeNotify}>
        </SweetAlert>
    </div>
   
  )
}

export default StudentDiscussion
