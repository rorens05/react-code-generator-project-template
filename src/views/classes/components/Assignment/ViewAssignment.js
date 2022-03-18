import React from 'react';
import {Row, Col} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'
import ContentViewer from '../../../../components/content_field/ContentViewer';

const ViewAssignment = ({viewAssignmentToggle, setViewAssigmentModal, viewAssignmentModal, viewAssignmentItem, startDate, startTime, endDate, endTime, viewAssignmentAssign}) => {
  let startDate1 = moment(startDate).format('ll')
  let startDate2 = moment().format('ll')
  console.log('startDatestartDatestartDate:', viewAssignmentAssign)

  return (
    <>
       <Modal  size="lg" show={viewAssignmentModal} onHide={() => setViewAssigmentModal(false)} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header className='class-modal-header' closeButton>
            <Modal.Title id="example-modal-sizes-title-lg" >
             {viewAssignmentItem?.assignmentName}
              <Row>
              {viewAssignmentAssign?(
              <>
                <Col sm={10} className='due-date-discusstion' style={{width:'auto', fontSize:'20px'}} >
                <div className='inline-flex'>
                  <div className='text-color-bcbcbc'>
                    Start Date:&nbsp;
                  </div>
                  <div className='text-color-707070'>
                  {moment(viewAssignmentAssign?.startDate).format('ll')}&nbsp;
                  </div>
                  <div className='text-color-707070'>
                   /&nbsp;
                  </div>
                  <div className='text-color-707070'>
                  {viewAssignmentAssign?.startTime}
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
                  {moment(viewAssignmentAssign?.endDate).format('ll')}&nbsp;
                  </div>
                  <div className='text-color-707070'>
                   /&nbsp;
                  </div>
                  <div className='text-color-707070'>
                    {viewAssignmentAssign?.endTime}
                  </div>
                </div>
              </Col>
              </>):(
              <>
                <div style={{color:'red', fontSize:'15px', paddingTop:'10px'}}>
                  <b>Not Assigned</b>
                </div>
              </>
              )}
              </Row>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='text-color-707070' >
            {/* <span style={{marginTop:"300px !important"}} dangerouslySetInnerHTML={{__html:viewAssignmentItem?.instructions }} /> */}
            <ContentViewer>{viewAssignmentItem?.instructions}</ContentViewer>
          </div>
          </Modal.Body>
        </Modal>
    </>
  )
  
};

export default ViewAssignment;
