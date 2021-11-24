import React from 'react'
import {Row, Col, Accordion} from 'react-bootstrap'
import HeaderTask from './components/HeaderTask'


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
              <p>Instruction: Count the object. Type the number in the box</p>
            </Col>
              <Col sm={3} className='icon-exam'>
                <i class="fas fa-eye" style={{paddingRight:'10px'}} ></i>{' '}
                <i class="fas fa-edit"style={{paddingRight:'10px'}}></i>
                <i class="fas fa-user-clock" style={{paddingRight:'10px'}}></i>
                <i class="fas fa-trash-alt" style={{paddingRight:'10px'}}></i>
              </Col>
              <Col sm={9} className='due-date-discusstion' >
                <h5>Due Nov 9, 2021</h5>
              </Col>
              <Col sm={3} className='posted-date-discusstion'>
                <h5>Posted Nov 5, 2021</h5>
              </Col>
              ____________________________________________________________________________________________________________________________________________
          </Row>
        </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}
export default ClassTask