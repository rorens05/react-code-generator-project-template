import React, { useContext, useState, useEffect } from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import moment from 'moment'

function StudentInteractive({interactive, searchTerm}) {
  const dateCompareNow = moment().format("YYYY-MM-DD")
  const timeNow = moment().format('HH:mm');
  const dateTimeNow = dateCompareNow + ' ' + '00:00:00';

  console.log('interactive:', interactive)
  return (
    <div>
      {interactive?.filter((item) => {
        if(searchTerm == ''){
          return item
        }else if(item?.interactive?.interactiveName.toLowerCase().includes(searchTerm.toLowerCase())){
          return item
        }
      }).map(item => {
        return(
          <>
            {(item?.isScheduled === true)?(
            <>
               <Row>
               <Col sm={8}>
                      <div className='title-exam' >
                        {item?.interactive?.interactiveName}
                      </div>
                    </Col>
                      {(item.isLoggedUserDone === true)?(
                    <>
                    </>
                  ):
                  <>
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classInteractiveAssignment?.startDate + ' ' + item?.classInteractiveAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(item?.classInteractiveAssignment?.endDate + ' ' + item?.classInteractiveAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <Col sm={3} className='icon-exam'>
                      <a target="_blank" style={{textDecoration:'none'}} className="btn btn-primary m-r-5 color-white tficolorbg-button" size="sm" href={item?.interactive?.path} role="button"><i class="fas fa-play" ></i></a>
                      </Col>
                    }
                      {
                        moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classInteractiveAssignment?.endDate + ' ' + item?.classInteractiveAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                        <Col sm={3} className='icon-exam'>
                        
                        </Col>
                      }
                    </>
                    }
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classInteractiveAssignment?.startDate + ' ' + item?.classInteractiveAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(item?.classInteractiveAssignment?.endDate + ' ' + item?.classInteractiveAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ongoing</b></div>
                    }
                    {
                      moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classInteractiveAssignment?.endDate + ' ' + item?.classInteractiveAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                      <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ended</b>&nbsp;</div>  
                    }
                    <Col sm={7} className='due-date-discusstion' >
                        <div className='inline-flex'>
                          <div className='text-color-bcbcbc'>
                            Start Date:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                           {moment(item?.classInteractiveAssignment?.startDate).format('LL')}&nbsp;
                          </div>
                          <div className='text-color-bcbcbc'>
                            Start Time:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            {item?.classInteractiveAssignment?.startTime}
                          </div>
                      </div>
                      </Col>
                      <Col className='posted-date-discusstion'>
                        <div className='inline-flex'>
                          <div className='text-color-bcbcbc'>
                            End Date:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            {moment(item?.classInteractiveAssignment?.endDate).format('LL')}&nbsp;
                          </div>
                          <div className='text-color-bcbcbc'>
                            End Time:&nbsp;
                          </div>
                          <div className='text-color-707070'>
                            {item?.classInteractiveAssignment?.endTime}
                          </div>
                        </div>
                      </Col>
                </Row>
                <div className='text-color-bcbcbc' >
                   ___________________________________________________________________________________________________________________________________________________________________________________________________________
                 </div>
            </>
            ):(
            <>
            </>
            )}
          </>
        )
      })}
    </div>
  )
}

export default StudentInteractive
