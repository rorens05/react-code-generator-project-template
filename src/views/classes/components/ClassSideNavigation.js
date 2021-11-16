import React from 'react'
import {ListGroup, Tab, Row, Col} from 'react-bootstrap'
import ClassExam from '../ClassExam'
import ClassFeed from '../ClassFeed'
import ClassCalendar from './ClassCalendar'

function ClassSideNavigation() {
  return (
    <Tab.Container className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
        <div className="row">
          <div className="row-course-bg course-widget-font col-md-3">
              <ListGroup.Item className="list-group-item-o">
                <Row>
                  <Col className="" sm={9} >
                    
                    <div className="class-subtitle-code" > <i class="fas fa-expand"></i> {' '}FXC57</div>
                    <div className="class-subtitle-section">Grade 1 - Faith</div>
                    <div className="class-subtitle-subject">Math 1</div>
                    <div className="class-subtitle-name">Carlos Inigo</div>
                  </Col>
                  <Col className="ellipsis-top-right" sm={3}>
                    <i className="fa fa-ellipsis-v fa-1x cursor-pointer"></i>
                    <div className='fa-user-size'>
                    <i className="fas fa-user"></i> 30
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item> 
            
            <ListGroup style={{paddingLeft:'15px'}}>
              <ListGroup.Item className="list-group-item-o " action href="#link1">
                Feed
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o "action href="#link2">
                Learn
              </ListGroup.Item>
              <ListGroup.Item  className="list-group-item-o "action href="#link3">
                Exam
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link4">
               Discussion
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5">
                Assignment
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6">
                Task
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link7">
                Interactive Games
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link8">
                Links
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link9">
                Class List
              </ListGroup.Item>
            </ListGroup>
          </div>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
              <Row>
                <Col>
               <ClassFeed />
               </Col>
               <Col md="auto">
               <ClassCalendar />
               </Col>
             </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                v
              </Tab.Pane>
              <Tab.Pane className='content-pane' eventKey="#link3">
                <ClassExam />
              </Tab.Pane>
            </Tab.Content> 
          </Col> 
        </div>
      </Tab.Container>
  )
}

export default ClassSideNavigation