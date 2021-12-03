import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import HeaderArchive from './components/Archive/HeaderArchive'

export default function Classes() {
  return (
    <MainContainer>
      <div className='page-container'>
        <div className='containerpages'>
        <HeaderArchive />
        </div>
      </div>
    </MainContainer>
  )
}
