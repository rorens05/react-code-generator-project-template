import React from 'react'
import {Row, Col, Accordion} from 'react-bootstrap'
import HeaderTask from './components/Task/HeaderTask'


function ClassTask({handleOpenModal}) {
  return (
    <>
     <HeaderTask/>
     <Accordion>
        <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className='unit-exam'>Unit 1 
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col sm={8}>
              <div className='title-exam'>
                Task
              </div>
            </Col>
            <Col sm={9} className='instruction-exam' >
              <div className='inline-flex'>
                <div className='text-color-bcbcbc' >
                  Instruction:&nbsp;
                </div>
                <div className='text-color-707070' >
                  Count the object. Type the number in the box
                </div>
              </div>
            </Col>
              <Col sm={3} className='icon-exam'>
                <i class="fas fa-eye icon-padding-right" ></i>{' '}
                <i class="fas fa-edit icon-padding-right"></i>
                <i class="fas fa-user-clock icon-padding-right"></i>
                <i class="fas fa-trash-alt icon-padding-right"></i>
              </Col>
              <Col sm={7} className='due-date-discusstion' >
                <div className='inline-flex'>
                  <div className='text-color-bcbcbc'>
                    Start Date:&nbsp;
                  </div>
                  <div className='text-color-707070'>
                    November 11/10:30AM
                  </div>
                </div>
              </Col>
              <Col className='posted-date-discusstion'>
                <div className='inline-flex'>
                  <div className='text-color-bcbcbc'>
                    End Date:&nbsp;
                  </div>
                  <div className='text-color-707070'>
                    November 12/10:30AM
                  </div>
                </div>
              </Col>
              <div className='text-color-bcbcbc' >
                ________________________________________________________________________________________________________________________________________
              </div>
          </Row>
        </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}
export default ClassTask