import React from 'react'
import {Card, Row, Col} from 'react-bootstrap'

function ClassCalendar() {
  return (
    <Row>
      <Col>
    <Card
    style={{ width: '20rem' }}
    
  >
    <Card.Header>Calandar</Card.Header>
    <Card.Body>
      <Card.Title>Card Title </Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>
  </Col>
  </Row>
  )
}

export default ClassCalendar
