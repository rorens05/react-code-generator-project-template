import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import './Classes.css'
import ClassCard from './components/ClassCard'
import ClassHeader from './components/ClassHeader'



export default function Classes() {
  return (
    <MainContainer>
       <div className='containerClasses'>
          <ClassHeader /> 

          <div className="row" style={{padding: '15px', paddingLeft: '30px'}}>
          <div className="col-md-3" style={{display: 'flex', width:'100%', flexWrap: 'wrap'}}>
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          </div>
          </div>
      </div>
    </MainContainer>
  )
}
