import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import ClassSideNavigation from './components/ClassSideNavigation'
import {Row, Col, Button, Form, Card, Accordion, useAccordionButton, Nav} from 'react-bootstrap'
import ClassHeader from './components/ClassHeader'
import HeaderDiscussion from './components/HeaderDiscussion'
import { Link } from 'react-router-dom'

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
      <MainContainer>
       <Row style={{flexWrap:'wrap'}}>
         <Col Col md={4} className = "class-row">
        <ClassSideNavigation/>
        </Col>
        <Col className = "class-padding">
           
        <HeaderDiscussion/> 
        <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header className="discussion-unit">
          <CustomToggle eventKey="0">Unit 1</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="discussion-unit" >Lesson 1</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className="discussion-unit">
          <CustomToggle eventKey="1">Unit 2</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body className="discussion-unit">Lesson 1</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
       </Col>
      </Row>
      </MainContainer>
  )
}
export default ClassDiscussion