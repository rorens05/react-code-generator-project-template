import React from 'react'
import ClassInteractiveHeader from './components/Interactive/ClassInteractiveHeader'
import { Row, Col, Accordion} from 'react-bootstrap'

function ClassInteractive() {
  return (
    <div>
      <ClassInteractiveHeader />
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
                Lesson 1 - Interactive Title
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
                <i class="fas fa-user-clock icon-padding-right"></i>
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
              <div className='text-color-bcbcbc' >
                ________________________________________________________________________________________________________________________________________
              </div>
          </Row>
        </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default ClassInteractive
