import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../../../context/UserContext'
import {Row, Col, Accordion, Button} from 'react-bootstrap'
import moment from 'moment'

function StudentDiscussion({discussionModule}) {
  const dateCompareNow = moment().format("YYYY-MM-DD")
  const timeNow = moment().format('HH:mm');
  const dateTimeNow = dateCompareNow + ' ' + '00:00:00';

  console.log('discussionModule:', discussionModule)
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
                      <Button  className="m-r-5 color-white tficolorbg-button" size="sm">Comments</Button>
                      </Col>
                    }
                      {
                        moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.discussionAssignment?.endDate + ' ' + item?.discussionAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                        <Col sm={3} className='icon-exam'>
                        <Button  className="m-r-5 color-white tficolorbg-button" size="sm">Comments</Button>
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
      
    </div>
  )
}

export default StudentDiscussion
