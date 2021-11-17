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
                Lesson 1
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Unit 2</Accordion.Header>
                <Accordion.Body>
                  Lesson 1
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Unit 3</Accordion.Header>
                <Accordion.Body>
                  Lesson 1
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
  )
}
export default ClassDiscussion