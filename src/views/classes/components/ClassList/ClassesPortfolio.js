import React from 'react'
import {Card, InputGroup, FormControl, Row, Col,Button, Form} from 'react-bootstrap'

function ClassesPortfolio({studentInformation}) {
  return (
    <div>
      {studentInformation?.classStatus?.map(item =>{
        return(
          <Card className='post-card'>
          <Row>
            <Col sm={9}>
            <div className='inline-flex'>
              <div style={{color:'#EE9337', fontSize:'40px', paddingLeft:'20px', paddingTop:'25px'}}>
                  <i class="fas fa-chalkboard-teacher"></i>
              </div>
              <div style={{paddingLeft:'17px'}}>
                <div style={{paddingTop:'10px', fontSize:'20px'}}>
                  {item?.classInfo?.classCode}
                </div>
                <div style={{fontSize:'20px', color:'#EE9337'}} >
                  {item?.classInfo?.gradeName} - {item?.classInfo?.className}
                </div>
                <div style={{fontSize:'17px', color:'#BCBCBC'}} >
                  {item?.classInfo?.courseName}
                </div>
              </div>
              </div>
            </Col>
            <Col>
              <div style={{paddingTop:'45px', color:'#707070', fontSize:'17px'}}>
                <b>{item?.classInfo?.teacherName}</b>
              </div>
            </Col>
            </Row>
          </Card>
        )
      })}
      
    </div>
  )
}

export default ClassesPortfolio