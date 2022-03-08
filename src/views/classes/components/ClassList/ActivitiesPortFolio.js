import React from 'react'
import { Row, Col, Accordion } from "react-bootstrap";

function ActivitiesPortFolio({studentInformation}) {
  return (
    <div>
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header> 
      <Row>  
        <Col className='icon-post'>
          <i class="fas fa-file-alt" style={{color:'#EE9337', fontSize:'24px',}}></i>
        </Col>
        <Col  style={{fontSize:'20px', color:'#EE9337'}}>
          <p>Exam</p>
        </Col>
      </Row>  
    </Accordion.Header>
    <Accordion.Body>
      <Row>  
        <Col sm={11} >
          <div className='inline-flex' >
            <div style={{fontSize:'20px', color:'#EE9337'}}>
            <p><b>Total Done Exam</b> </p>
            </div>
          </div>
        </Col>
        <Col sm={1}>
          <div style={{fontSize:'20px'}}>
           <p><b>{studentInformation?.noOfTotalDoneTests}/{studentInformation?.noOfTotalAssignedTests}</b></p>
          </div>
        </Col>
      </Row>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>
    <Row>  
        <Col className='icon-post'>
          <i class="fas fa-file-alt" style={{color:'#EE9337', fontSize:'24px',}}></i>
        </Col>
        <Col  style={{fontSize:'20px', color:'#EE9337'}}>
          <p>Assignment</p>
        </Col>
      </Row> 
    </Accordion.Header>
    <Accordion.Body>
      <Row>
        <Col sm={11} >
          <div className='inline-flex' >
            <div style={{fontSize:'20px', color:'#EE9337'}}>
            <p><b>Total Done Assignment</b> </p>
            </div>
          </div>
        </Col>
        <Col sm={1}>
          <div style={{fontSize:'20px'}}>
           <p><b>{studentInformation?.noOfTotalDoneAssignments}/{studentInformation?.noOfTotalAssignedAssignments}</b></p>
          </div>
        </Col>
      </Row>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header>      <Row>  
        <Col className='icon-post'>
          <i class="fas fa-file-alt" style={{color:'#EE9337', fontSize:'24px',}}></i>
        </Col>
        <Col  style={{fontSize:'20px', color:'#EE9337'}}>
          <p>Task</p>
        </Col>
      </Row> </Accordion.Header>
    <Accordion.Body>
      <Row>
        <Col sm={11} >
            <div className='inline-flex' >
              <div style={{fontSize:'20px', color:'#EE9337'}}>
              <p><b>Total Done Task</b> </p>
              </div>
            </div>
          </Col>
          <Col sm={1}>
            <div style={{fontSize:'20px'}}>
            <p><b>{studentInformation?.noOfTotalDoneTasks}/{studentInformation?.noOfTotalAssignedTasks}</b></p>
            </div>
          </Col>
      </Row>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header>
    <Row>  
        <Col className='icon-post'>
          <i class="fas fa-file-alt" style={{color:'#EE9337', fontSize:'24px',}}></i>
        </Col>
        <Col  style={{fontSize:'20px', color:'#EE9337'}}>
          <p>Interactive</p>
        </Col>
      </Row> 
    </Accordion.Header>
    <Accordion.Body>
    <Row>
        <Col sm={11} >
            <div className='inline-flex' >
              <div style={{fontSize:'20px', color:'#EE9337'}}>
              <p><b>Total Done Interactive</b> </p>
              </div>
            </div>
          </Col>
          <Col sm={1}>
            <div style={{fontSize:'20px'}}>
            <p><b>{studentInformation?.noOfTotalDoneInteractives}/{studentInformation?.noOfTotalAssignedInteractives}</b></p>
            </div>
          </Col>
      </Row>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
    </div>
  )
}

export default ActivitiesPortFolio