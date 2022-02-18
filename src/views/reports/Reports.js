import React, {useState, useEffect, useContext} from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import SideReport from './components/SideReport'
import { UserContext } from './../../context/UserContext'

export default function Reports() {
  const userContext = useContext(UserContext)
  const {user} = userContext.data

  return (
    <MainContainer activeHeader={'reports'} fluid style='not-scrollable'> 
      <SideReport/>
    </MainContainer>
  )
}
