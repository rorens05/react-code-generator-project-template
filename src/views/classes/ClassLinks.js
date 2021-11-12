import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import ClassSideNavigation from './components/ClassSideNavigation'
import {Row, Col} from 'react-bootstrap'
import HeaderLinks from './components/HeaderLinks'

function ClassLinks() {
  return (
      <MainContainer>
       <Row style={{flexWrap:'wrap'}}>
         <Col Col md={4} className = "class-row">
        <ClassSideNavigation/>
        </Col>
      <Col className = "class-padding">
        <div className = "font-class">
        <HeaderLinks/>
			 </div>
      </Col>
      </Row>
    </MainContainer>
  )
}
export default ClassLinks