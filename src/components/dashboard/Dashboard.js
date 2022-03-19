import React, { useEffect } from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../../context/UserContext';
import MainContainer from '../layouts/MainContainer'

export default function Dashboard() {

  const userContext = useContext(UserContext)
  const {user} = userContext.data

  useEffect(() => {
    if (user.isStudent) return (window.location.href = "/404");
  }, [])
  

  if(user.isSchoolAdmin){
    return (
      <MainContainer title="Dashboard" activeHeader={"dashboard"}>This is dashboard</MainContainer>
    )
  }

  return <Redirect to="/404"/>
}
