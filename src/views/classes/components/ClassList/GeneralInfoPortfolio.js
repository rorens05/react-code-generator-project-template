import React from 'react'
import { Row, Col,  } from "react-bootstrap";
import moment from 'moment';

function GeneralInfoPortfolio({studentInformation}) {
  console.log('studentinfo:', studentInformation)
  return (
    <div style={{margin:'30px'}}>
      <Row>
        <Col sm={8}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>First Name</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>{studentInformation?.student?.fname}</p>
          </div>
        </Col>
        <Col sm={4}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Last Name</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>{studentInformation?.student?.lname}</p>
          </div>
        </Col>
        <Col sm={10}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Student Number</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>{studentInformation?.student?.studentNo}</p>
          </div>
        </Col>
        <Col sm={10}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Address</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>{studentInformation?.student?.permanentAddress}</p>
          </div>
        </Col>
        <Col sm={11}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Contact Number</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>{studentInformation?.student?.contactNo}</p>
          </div>
        </Col>
        <Col sm={11}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Birthday</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>{moment(studentInformation?.student?.bday).format('LL')}</p>
          </div>
        </Col>
        <Col sm={11}>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>Gender</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>{studentInformation?.student?.sex}</p>
          </div>
        </Col>
        <Col>
          <div style={{fontSize:'24px', color:'#BCBCBC'}}>
            <p>E-mail Address</p>
          </div>
          <div style={{fontSize:'24px', color:'#7D7D7D'}}>
            <p>{studentInformation?.student?.emailAdd}</p>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default GeneralInfoPortfolio