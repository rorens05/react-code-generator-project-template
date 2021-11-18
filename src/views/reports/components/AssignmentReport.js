import React from 'react'
import {Accordion, Row, Col} from 'react-bootstrap'

function AssignmentReport() {
  return (
    <div> 
    <Accordion>
      <Accordion.Item eventKey="0">
      <Accordion.Header><div className='unit-exam'>Unit 1 </div></Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col sm={8}>
              <div className='title-exam'>
                <a href="/assigncontent" >Assignment 1 </a>
              </div>
            </Col>
            <Col sm={9} className='instruction-exam' >
              <p>Submit your answer here.</p>
            </Col>
            <Col sm={3} className='icon-exam'>
              <i class="fas fa-edit"style={{paddingRight:'10px'}}></i>
              <i class="fas fa-trash-alt" style={{paddingRight:'10px'}}></i>
            </Col>
          </Row>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1 ">
      <Accordion.Header><div className='unit-exam'>Unit 2 </div></Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col sm={8}>
              <div className='title-exam'>
                Assignment 2
              </div>
            </Col>
            <Col sm={9} className='instruction-exam' >
              <p>Submit your answer here.</p>
            </Col>
            <Col sm={3} className='icon-exam'>
              <i class="fas fa-edit"style={{paddingRight:'10px'}}></i>
              <i class="fas fa-trash-alt" style={{paddingRight:'10px'}}></i>
            </Col>
          </Row>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
    </div>
  )
}
export default AssignmentReport
