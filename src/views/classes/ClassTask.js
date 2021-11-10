import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import ClassSideNavigation from './components/ClassSideNavigation'
import {Row, Col, Button, Form} from 'react-bootstrap'
import ClassHeader from './components/ClassHeader'
import HeaderTask from './components/HeaderTask'

function ClassTask({handleOpenModal}) {
  return (
      <MainContainer>
       <Row style={{flexWrap:'wrap'}}>
         <Col Col md={4} className = "class-row">
        <ClassSideNavigation/>
        </Col>
        <Col className = "class-padding">
        <div className = "font-class">
        <HeaderTask/>
        <Form.Group className="m-b-20">	
					<Form.Select id="subjectAreaId" name="subjectAreaId" size="lg">
												<option>
												Unit 1
												</option>
						</Form.Select>
			  </Form.Group>
        <Form.Group className="m-b-20">	
					<Form.Select id="subjectAreaId" name="subjectAreaId" size="lg">
												<option>
												Unit 2
												</option>
				  </Form.Select>
				</Form.Group>
			 </div>
       </Col>
      </Row>
      </MainContainer>
  )
}
export default ClassTask