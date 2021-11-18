import React from 'react'
import ClassExamHeader from './components/ClassExamHeader'
import {Accordion, Row, Col} from 'react-bootstrap'

function ClassExam() {
  return (
    <div>
    <ClassExamHeader />
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
                Exam 1
              </div>
              <div className='code-exam'>
                EQF1
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
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  )
}
export default ClassExam
