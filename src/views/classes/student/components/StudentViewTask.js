import React from 'react';
import {Row, Col} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'
import ContentViewer from '../../../../components/content_field/ContentViewer';

const StudentViewTask = ({viewTaskToggle, viewTaskMotal, viewTaskItem, startDate, startTime, endDate, endTime}) => {
  console.log('viewTaskItemviewTaskItemviewTaskItem:', viewTaskItem)
  return (
    <>
         <Modal  size="lg" show={viewTaskMotal} onHide={viewTaskToggle} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header className='class-modal-header' closeButton>
            <Modal.Title id="example-modal-sizes-title-lg" >
             {viewTaskItem?.taskName}
              <Row>
              <Col sm={10} className='due-date-discusstion' style={{width:'auto', fontSize:'20px'}} >
                <div className='inline-flex'>
                  <div className='text-color-bcbcbc'>
                    Start Date:&nbsp;
                  </div>
                  <div className='text-color-707070'>
                  {moment(startDate).format('ll')}&nbsp;
                  </div>
                  <div className='text-color-707070'>
                   /&nbsp;
                  </div>
                  <div className='text-color-707070'>
                  {startTime}&nbsp;
                  </div>
                </div>
              </Col>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Col sm={7} className='due-date-discusstion' style={{width:'auto'}} >
                <div className='inline-flex'>
                  <div className='text-color-bcbcbc'>
                    End Date:&nbsp;
                  </div>
                  <div className='text-color-707070'>
                    {moment(endDate).format('ll')}&nbsp;
                  </div>
                  <div className='text-color-707070'>
                   /&nbsp;
                  </div>
                  <div className='text-color-707070'>
                  {endTime}&nbsp;
                  </div>
                </div>
              </Col>
              </Row>
              
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='text-color-707070' >
            <ContentViewer>{viewTaskItem?.instructions}</ContentViewer>
          </div>
          </Modal.Body>
        </Modal>
    </>
  )

};

export default StudentViewTask;
