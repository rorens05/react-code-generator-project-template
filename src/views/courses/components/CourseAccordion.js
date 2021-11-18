import React from "react";
import { Accordion, Row, Col, Button } from 'react-bootstrap';

export default function CourseAccordion() {
  return (
  <div>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header ><span className="unit-title">Unit 1</span></Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col className="lesson-header" md={9}>
              Lesson 1: Tanjiro Kamado Arc
            </Col>
            <Col className="align-right-content" md={3}>
              <Button className="m-r-5 color-white" variant="warning" size="sm"><i className="fa fa-edit"></i></Button>
              <Button className="m-r-5 color-white" variant="warning" size="sm"><i className="fa fa-trash"></i></Button>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header><span className="unit-title">Unit 2</span></Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div> 
  )
}
