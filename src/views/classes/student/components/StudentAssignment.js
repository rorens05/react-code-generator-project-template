import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import moment from 'moment'

function StudentAssignment({assignment}) {
  const dateCompareNow = moment().format("YYYY-MM-DD")
  const timeNow = moment().format('HH:mm');
  const dateTimeNow = dateCompareNow + ' ' + '00:00:00';
  console.log('Assingment:', assignment)
  return (
    <div>
      {assignment.map(item => {
        return(
        <>
          {(item?.classAssignment !== null)?(
          <>
                 <Row>
        <Col sm={8}>
              <div className='title-exam'>
                {item.assignment?.assignmentName}
              </div>
            </Col>
            <Col sm={9} className='instruction-exam' >
              <div className='inline-flex'>
                <div className='text-color-bcbcbc' >
                  Instruction:&nbsp;
                </div>
                <div className='text-color-707070' >
                <span style={{marginTop:"300px !important"}} dangerouslySetInnerHTML={{__html:item.assignment?.instructions }} /> 
                </div>
              </div>
            </Col>
            <Col sm={3} className='icon-exam'>
                {(item?.studentAnswers === null)?(
                <>
                
                   
                </>
                ):
                <>
                                                {
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classAssignment?.endDate + ' ' + item?.classAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                    
                    <div style={{color:'#EE9337', fontSize:'15px'}}><b>Not Submitted</b></div>
                }
                {
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classAssignment?.startDate + ' ' + item?.classAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(item?.classAssignment?.endDate + ' ' + item?.classAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                  <Button className="m-r-5 color-white tficolorbg-button" size="sm"><i class="fas fa-user-edit"></i></Button>
                }
                
                </>}
                  

              </Col>
                {
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classAssignment?.endDate + ' ' + item?.classAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                    
                    <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ended</b></div>
                }
                {
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isSame(moment(item?.classAssignment?.startDate + ' ' + item?.classAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                  <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ongoing</b></div>
                }
                {
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isAfter(moment(item?.classAssignment?.startDate + ' ' + item?.classAssignment?.startTime, 'YYYY-MM-DD HH:mm')) &&
                  moment(dateCompareNow + ' ' + timeNow, 'YYYY-MM-DD HH:mm').isBefore(moment(item?.classAssignment?.endDate + ' ' + item?.classAssignment?.endTime, 'YYYY-MM-DD HH:mm')) &&
                    <div style={{color:'#EE9337', fontSize:'15px'}}><b>Ongoing</b></div>
                } 
            <Col sm={7} className='due-date-discusstion' >
                <div className='inline-flex'>
                  <div className='text-color-bcbcbc'>
                    Start Date:&nbsp;
                  </div>
                <div className='text-color-707070'>
                  {moment(item.classAssignment.startDate).format('LL')}&nbsp;
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
                    {moment(item.classAssignment.startDate).format('LL')}&nbsp;
                  </div>
                  <div className='text-color-bcbcbc'>
                    End Time:&nbsp;
                  </div>
                  <div className='text-color-707070'>
                    {item.classAssignment.endTime}
                  </div>
                </div>
              </Col>
              <div className='text-color-bcbcbc' >
                ___________________________________________________________________________________________________________________________________________________________________________________________________________
              </div>
        </Row>
          <br />
          </>
          ):
          <>
          </>}
          
        </>)
      })}
    </div>
  )
}

export default StudentAssignment
