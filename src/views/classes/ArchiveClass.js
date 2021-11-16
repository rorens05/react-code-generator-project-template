import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import MainContainer from '../../components/layouts/MainContainer'
import ClassCard from './components/ClassCard'
import ClassHeader from './components/ClassHeader'
import HeaderArchive from './components/HeaderArchive'

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
