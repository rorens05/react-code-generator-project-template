import React from 'react'
import { Row, Col, Accordion } from "react-bootstrap";

function ActivitiesPortFolio() {
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
            <p><b>Exam Quarter Exam</b> </p>
            </div>
            <div style={{fontSize:'20px', color:'#C5C5C5'}}>
              / EQF1
            </div>
          </div>
        </Col>
        <Col sm={1}>
          <div style={{fontSize:'20px'}}>
           <p><b>10/5</b></p>
          </div>
        </Col>
        <Col sm={11} >
          <div className='inline-flex' >
            <div style={{fontSize:'20px', color:'#EE9337'}}>
            <p><b>Exam Quarter Exam</b> </p>
            </div>
            <div style={{fontSize:'20px', color:'#C5C5C5'}}>
              / EQF1
            </div>
          </div>
        </Col>
        <Col sm={1}>
          <div style={{fontSize:'20px'}}>
           <p><b>10/5</b></p>
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
            <p><b>Assignment 1</b> </p>
            </div>
          </div>
        </Col>
        <Col sm={1}>
          <div style={{fontSize:'20px'}}>
           <p><b>10/5</b></p>
          </div>
        </Col>
        <Col sm={11} >
          <div className='inline-flex' >
            <div style={{fontSize:'20px', color:'#EE9337'}}>
            <p><b>Assignment 2</b> </p>
            </div>
          </div>
        </Col>
        <Col sm={1}>
          <div style={{fontSize:'20px'}}>
           <p><b>10/5</b></p>
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
              <p><b>Task 1</b> </p>
              </div>
            </div>
          </Col>
          <Col sm={1}>
            <div style={{fontSize:'20px'}}>
            <p><b>10/5</b></p>
            </div>
          </Col>
          <Col sm={11} >
            <div className='inline-flex' >
              <div style={{fontSize:'20px', color:'#EE9337'}}>
              <p><b>Task 2</b> </p>
              </div>
            </div>
          </Col>
          <Col sm={1}>
            <div style={{fontSize:'20px'}}>
            <p><b>10/5</b></p>
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
              <p><b>Interactive 1</b> </p>
              </div>
            </div>
          </Col>
          <Col sm={1}>
            <div style={{fontSize:'20px'}}>
            <p><b>10/5</b></p>
            </div>
          </Col>
          <Col sm={11} >
            <div className='inline-flex' >
              <div style={{fontSize:'20px', color:'#EE9337'}}>
              <p><b>Interactive 2</b> </p>
              </div>
            </div>
          </Col>
          <Col sm={1}>
            <div style={{fontSize:'20px'}}>
            <p><b>10/5</b></p>
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