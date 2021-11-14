import React from 'react'
import {Card, Row, Col} from 'react-bootstrap'

function ClassCalendar() {
  return (
    <div>
    <Card className='calendar kb-0px'style={{backgroundColor:'white'}}>
      
      <Card.Header className='calendar-header' style={{backgroundColor:'white'}}>
        <div className="row calendar-title">
          <div>
           Calendar
          </div>
        </div>
        <div className="row calendar-subtitle">
          <div>
         <b> <i class="fas fa-arrow-left" style={{color:'#EE9337',paddingRight:'10px'}}></i>Tuesday, November 11<i class="fas fa-arrow-right"style={{color:'#EE9337', paddingLeft:'10px'}}></i> </b>
          </div>
        </div>
      </Card.Header>
      <div >
      <Card.Body >
        <Card.Title tag="h5" className='card-title'>
          Due Tomorrow
        </Card.Title>
        <Card.Subtitle tag="h6" className='card-subtitle'>
            <p> Oct 01 2021 </p>
        </Card.Subtitle>
        <Card.Text className='card-text'>
          <p>Assignment #1 <br />
          Test #1</p>
        </Card.Text>
      </Card.Body>
      </div>
     
    </Card>
      
  </div> 
  )
}

export default ClassCalendar
