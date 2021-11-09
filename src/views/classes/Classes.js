import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import ClassCard from './components/ClassCard'
import ClassHeader from './components/ClassHeader'



export default function Classes() {
  return (
    <MainContainer>
      <div className='page-container'>
        <div className='containerpages'>
        <ClassHeader />
          <div className="row card-main-container">
            <div className="col-md-3 card-container">
              <ClassCard />
              <ClassCard />
              <ClassCard />
              <ClassCard />
              <ClassCard />
              <ClassCard />
              <ClassCard />
              <ClassCard />
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  )
}
