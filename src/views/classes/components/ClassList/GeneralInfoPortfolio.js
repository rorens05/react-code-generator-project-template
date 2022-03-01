import React from 'react'
import { Row, Col,  } from "react-bootstrap";

function GeneralInfoPortfolio() {
  return (
    <div style={{margin:'30px'}}>
      <Row>
        <Col sm={8}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>First Name</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>Gil Cristian</p>
          </div>
        </Col>
        <Col sm={4}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Last Name</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>Parayno</p>
          </div>
        </Col>
        <Col sm={10}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Address</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>#101 V.Luna, Village, QC</p>
          </div>
        </Col>
        <Col sm={11}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Contact Number</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>09208372660</p>
          </div>
        </Col>
        <Col sm={11}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Birthday</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>April 19 1988</p>
          </div>
        </Col>
        <Col sm={11}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Gender</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>Male</p>
          </div>
        </Col>
        <Col>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>E-mail Address</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>placia.kent@gmail.com</p>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default GeneralInfoPortfolio