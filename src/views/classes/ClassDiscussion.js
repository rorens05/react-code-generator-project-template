
import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import ClassSideNavigation from './components/ClassSideNavigation'
import {Row, Col} from 'react-bootstrap'

function ClassDiscussion() {
  return (

 
      <MainContainer>
     
       <Row style={{flexWrap:'wrap'}}>
         <Col Col md={4} className = "class-row">
        <ClassSideNavigation/>
        </Col>
				
        <Col className = "class-padding">
        <div className = "font-class">
           Class Discussion
			 </div>
       </Col>
			 
      </Row>
      
    
        
      </MainContainer>
    
  )
}

export default ClassDiscussion