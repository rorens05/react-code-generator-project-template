import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import ClassSideNavigation from './components/ClassSideNavigation'
import {Row, Col, Button, Form, Card, Accordion, useAccordionButton, Nav} from 'react-bootstrap'
import HeaderTask from './components/HeaderTask'
import { Link } from 'react-router-dom'

function Customtoggle({ children, eventKey }) {
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
function ClassTask({handleOpenModal}) {
  return (
    <>
     <HeaderTask/>
        <Row style={{flexWrap:'wrap'}}>
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
            </Accordion>
          </Col>
        </Row>
    </>
  )
}
export default ClassTask