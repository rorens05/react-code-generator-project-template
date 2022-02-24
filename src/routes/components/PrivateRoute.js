import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router'
import { UserContext } from '../../context/UserContext'
import { onExamRoute } from '../../utils/windowLocationHelper'

export default function PrivateRoute(props) {

  const userContext = useContext(UserContext)
  const {user, connect, takingExam} = userContext.data

  
  useEffect(() => {
    if(user == null){
      window.location.href = '/login?message=Please login to continue'
      return
    }
    if(user.isStudent){
      console.log("Try connecting to socket")
      connect()
    }
  }, [user])


  if(user?.isStudent && takingExam && !onExamRoute()){
    return (<div>You are taking exam</div>)
  }

  if(user != null) return (
    <Route {...props}/>
  )

  return <div/>
}
