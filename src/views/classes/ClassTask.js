import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import ClassSideNavigation from './components/ClassSideNavigation'
import {Row, Col, Button, Form, Card, Accordion, useAccordionButton, Nav} from 'react-bootstrap'
import HeaderTask from './components/HeaderTask'
import { Link } from 'react-router-dom'

function Links({ children, eventKey }) {
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
      <MainContainer>
       <Row style={{flexWrap:'wrap'}}>
         <Col Col md={4} className = "class-row">
        <ClassSideNavigation/>
        </Col>
        <Col className = "class-padding">
           
        <HeaderTask/> 
        <Accordion defaultActiveKey="0">
        <Card>
      <Card.Header className="discussion-unit">
        <Link eventKey="1">Unit 1</Link>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
        <Card.Body>Hello! I'm another body</Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Card.Header className="discussion-unit">
        <Link eventKey="1">Unit 2</Link>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
        <Card.Body>Hello! I'm another body</Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
       </Col>
      </Row>
      </MainContainer>
  )
}
export default ClassTask