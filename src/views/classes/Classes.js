import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import MainContainer from '../../components/layouts/MainContainer'
import ClassCard from './components/ClassCard'
import ClassHeader from './components/ClassHeader'



export default function Classes() {
  return (
    <MainContainer>
      <div className='page-container'>
        <div className='containerpages'>
        <ClassHeader />
          <CardGroup>
              <ClassCard />
              <ClassCard />
              <ClassCard />
              
          </CardGroup>
        </div>
      </div>
    </MainContainer>
  )
}
