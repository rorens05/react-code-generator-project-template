import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import SideReport from './components/SideReport'


export default function Reports() {
  return (
    <MainContainer activeHeader={'reports'}> 
      <SideReport/>
    </MainContainer>
  )
}
