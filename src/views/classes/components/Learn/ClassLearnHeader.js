import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
function ClassLearnHeader() {
  return (
    <div>
      <div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Learn </h1>
				</div>
			</div>
      <Row>
        <Col sm={1} style={{textAlign:'center', fontSize:'20px', paddingTop:'4px', color:'#7D7D7D'}}>
        <Form.Label>Unit 1</Form.Label>
        </Col>
        <Col>
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        </Col>
        <Col sm={1} style={{textAlign:'center', fontSize:'20px', paddingTop:'4px', color:'#7D7D7D'}}>
        <Form.Label>Pages</Form.Label>
        </Col>
        <Col>
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        </Col>
      </Row>
    </div>
  )
}
export default ClassLearnHeader
