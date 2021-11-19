import React from 'react'
import {ListGroup, Tab, Row, Col, Form} from 'react-bootstrap'
import ReportHeader from './ReportHeader'
import AssignmentReport from './AssignmentReport'
import AssignmentHeader from './AssignmentHeader'

function SideReport() {
  return (
    <Tab.Container className="course-widget-font" id="list-group-tabs-example " defaultActiveKey="#link1">
        <div className="row">
          <div className="report-sidenav col-md-3">
              <ListGroup.Item className="list-group-item-o">
                <Row>
								<Form.Select>
                <option>-- Select Class Here --</option>
              </Form.Select>
                </Row>
              </ListGroup.Item>
            <ListGroup style={{paddingLeft:'15px'}}>
              <ListGroup.Item  className="list-group-item-o "action href="#link3">
                Exam
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link5">
                Assignment
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link6">
                Task
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-o " action href="#link7">
                Interactive
              </ListGroup.Item>
            </ListGroup>
          </div>
					<Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
              </Tab.Pane>
              <Tab.Pane className='content-pane report-content'  eventKey="#link3">
                <ReportHeader/>
              </Tab.Pane>
              <Tab.Pane className='content-pane report-content' eventKey="#link5">
              <AssignmentHeader />
                <AssignmentReport />
              </Tab.Pane>
            </Tab.Content> 
          </Col> 
        </div>
      </Tab.Container>
  )
}
export default SideReport