import React from 'react'
import {Row, Col, Accordion, useAccordionButton,} from 'react-bootstrap'
import HeaderDiscussion from './components/HeaderDiscussion'


function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );
  return (
    <button
      type="button"
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
function ClassDiscussion({handleOpenModal}) {
  return (
        <Row style={{flexWrap:'wrap'}}>
           <HeaderDiscussion/>
          <Col> 
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Unit 1</Accordion.Header>
                <Accordion.Body>
                <Row>
                    <Col sm={8}>
                      <div className='title-exam'>
                      Discussion
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
                  <Col sm={8}>
                      <div className='title-exam'>
                      Discussion
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
                </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
  )
}
export default ClassDiscussion