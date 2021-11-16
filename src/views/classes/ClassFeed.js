import React from 'react'
import {Card, InputGroup, FormControl, Row, Col} from 'react-bootstrap'

function ClassFeed() {
  return (
    <div>
    <Card className='calendar-card'>
      <Card.Body>
      <InputGroup  size="lg">
      <InputGroup.Text id="basic-addon2" style={{outLine:'none', border:'none', background:'none'}}  className="feed-button"><i class="fas fa-user-circle fas-1x" ></i></InputGroup.Text>
						<FormControl style={{outLine:'none', border:'none', background:'none'}}  aria-label="small" aria-describedby="inputGroup-sizing-sm" placeholder="Type Announcement for the class here" type="text"/>
			</InputGroup>
      </Card.Body>
    </Card>
    <div className='post-date'>
    <p>November 11, 2021</p>
    </div>
    <Card className='post-card'>
      <Card.Body>
        <Row>  
          <Col sm={1}>
            <i class="fas fa-file-alt" style={{color:'#EE9337', fontSize:'30px', paddingRight:'15px'}}></i>
          </Col>
          <Col sm={11} style={{fontSize:'20px', color:'#707070'}}>
            Carlos Inigo has posted a New Assignment: Assignment
          </Col>
       </Row>
      </Card.Body>
    </Card>
    <Card className='post-card'>
      <Card.Body>
        <Row>  
          <Col sm={1}>
            <i class="fas fa-file-alt" style={{color:'#EE9337', fontSize:'30px', paddingRight:'15px'}}></i>
          </Col>
          <Col sm={11} style={{fontSize:'20px', color:'#707070'}}>
            Carlos Inigo has posted a New Assignment: Assignment
          </Col>
       </Row>
      </Card.Body>
    </Card>
    <div className='post-date'>
    <p>November 8, 2021</p>
    </div>
    <Card className='post-card'>
      <Card.Body>
        <Row>  
          <Col sm={1}>
            <i class="fas fa-file-alt" style={{color:'#EE9337', fontSize:'30px', paddingRight:'15px'}}></i>
          </Col>
          <Col sm={11} style={{fontSize:'20px', color:'#707070'}}>
            Carlos Inigo has posted a New Assignment: Assignment
          </Col>
       </Row>
      </Card.Body>
    </Card>
    </div>
  )
}
export default ClassFeed
