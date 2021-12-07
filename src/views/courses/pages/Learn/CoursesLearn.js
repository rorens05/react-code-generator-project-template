import React, { useState, useEffect } from "react";
import { Tab, ListGroup, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";

export default function CourseLearn() {

  return (
    <Col sm={9}>
      <Tab.Content className="content-pane">
        <span className="content-pane-title">
          Learn <Button variant="outline-warning"><i className="fa fa-plus"></i> Add Unit</Button>
        </span>
        <div className="row m-b-20 m-t-30">
          <div className="col-md-12">
            <InputGroup size="lg">
              <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
              <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
            </InputGroup>
          </div>
        </div>
        <Tab.Pane eventKey="#link1">
          <Accordion defaultActiveKey="0">
            <Accordion.Item> 
              <Accordion.Header >
              </Accordion.Header>
              <Accordion.Body>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Tab.Pane>
        </Tab.Content>
    </Col> 
  )
}
