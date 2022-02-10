import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import FloatingOptions from './components/FloatingOptions'
import HomeLinks from './components/HomeLinks'

export default function Header({activeHeader}) {

  const userContext = useContext(UserContext)
  const { user } = userContext.data
  useEffect(() => {
    console.log("TODO: Setup header")
  }, [])

  return (
    <div className="header bg-white">
      <HomeLinks/>
      <div className="header-links">
        {user.isTeacher && <Link className={activeHeader === "courses" && 'active'} to="/courses">Courses</Link> }
        <Link className={activeHeader === "classes" && 'active'} to="/classes">Classes</Link>
        {/* {user.isTeacher && <Link className={activeHeader === "exam" && 'active'} to="/exam">Exam</Link> } */}
        {user.isTeacher && <Link className={activeHeader === "files" && 'active'} to="/files">Files</Link> }
        {user.isTeacher && <Link className={activeHeader === "reports" && 'active'} to="/reports">Reports</Link>}
    </div>
      <FloatingOptions/>

    </div>
  )
}
