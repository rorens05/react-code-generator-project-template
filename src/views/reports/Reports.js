import React, {useState, useEffect, useContext} from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import SideReport from './components/SideReport'
import { UserContext } from './../../context/UserContext'

export default function Reports() {
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  
  console.log(user)

  return (
    <MainContainer activeHeader={'reports'}> 
      <SideReport/>
    </MainContainer>
  )
}
