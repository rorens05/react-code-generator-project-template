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
      </MainContainer>
  )
}
export default ClassDiscussion