import React from 'react'
import { Accordion, Row, Col } from 'react-bootstrap'

function AccordionVideos() {
  return (
    <div>
       <Accordion>
        <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className='unit-exam'>
            Vidoes 
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col sm={9}>
              <div className='title-exam'>
                Videos Links
              </div>
            </Col>
            <Col sm={3} className='icon-exam'>
              <i class="fas fa-eye icon-padding-right" ></i>{' '}
              <i class="fas fa-user-clock icon-padding-right"></i>
              <i class="fas fa-trash-alt icon-padding-right"></i>
            </Col>
            <Col sm={9}>
            </Col>
              <Col sm={3} style={{textAlign:'right'}} className='due-date-discusstion' >
                <div className='inline-flex'>
                  <div className='text-color-bcbcbc'>
                    Post Date: Nov 5, 2021
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

export default AccordionVideos
