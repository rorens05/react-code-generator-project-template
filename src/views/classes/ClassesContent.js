import React, { useState } from 'react'
import ClassSideNavigation from './components/ClassSideNavigation'
import MainContainer from '../../components/layouts/MainContainer'
import ClassBreedCrumbs from './components/ClassBreedCrumbs'
import {  Col, Row } from 'react-bootstrap';


function ClassesContent() {
  const [loading, setLoading] = useState(true)
  return (
    <div>
      <MainContainer loading={loading} fluid>
        
          
            <ClassBreedCrumbs />
         
       
      
        <ClassSideNavigation setLoading={setLoading}/>
      </MainContainer>
    </div>
  )
}

export default ClassesContent
