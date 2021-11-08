
import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import ClassSideNavigation from './components/ClassSideNavigation'
import {Row, Col} from 'react-bootstrap'

function ClassTask() {
  return (
 
      <MainContainer>
     
       <Row style={{flexWrap:'wrap'}}>
         <Col Col md={4} style={{backgroundColor: '#FFFFFF', marginRight:'30px', marginTop: '70px', padding: '20px', width:'300px', height: '567px'}}>
        <ClassSideNavigation/>
        </Col>
        <Col style={{backgroundColor: '#FFFFFF', marginTop: '70px', padding: '20px', width:'976px', height: '560px'}}>
        <div className="font-class">
           Class Task
       </div>
       </Col>
      </Row>
      
    
        
      </MainContainer>
    
  )
}

export default ClassTask