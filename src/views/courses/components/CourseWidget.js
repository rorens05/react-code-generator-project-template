import React from "react";
import { Tab, ListGroup, Row, Col } from 'react-bootstrap';

export default function CourseWidget() {
  return (
      <Tab.Container className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
        <div className="row">
          <div className="row-course-bg course-widget-font col-md-3">
              <ListGroup.Item className="list-group-item-o">
                <Row>
                  <Col className="" sm={9} >
                    Math 1
                    <div className="course-subtitle">Math</div>
                    <div className="course-subtitle">Carlos Inigo</div>
                  </Col>
                  <Col className="t-a-r" sm={3}>
                    <i className="fa fa-ellipsis-v s"></i>
                  </Col>
                </Row>
              </ListGroup.Item> 
            
            <ListGroup>
              <ListGroup.Item className="list-group-item-o " action href="#link1">
                Learn
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o "action href="#link2">
                Exam
              </ListGroup.Item>
              <ListGroup.Item  className="list-group-item-o "action href="#link3">
                Discussion
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link4">
                Assignment
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5">
                Task
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6">
                Links
              </ListGroup.Item>
            </ListGroup>
          </div>
          <Col sm={9}>
            <Tab.Content className="content-pane">
              <Tab.Pane eventKey="#link1">
                a
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                v
              </Tab.Pane>
            </Tab.Content> 
          </Col> 
        </div>
      </Tab.Container>
      
  )
}
