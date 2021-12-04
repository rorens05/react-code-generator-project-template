import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FloatingOptions from './components/FloatingOptions'
import HomeLinks from './components/HomeLinks'

export default function Header({activeHeader}) {

  useEffect(() => {
    console.log("TODO: Setup header")
  }, [])

  return (
    <div className="header bg-white">
      <HomeLinks/>
      <div className="header-links">
        <Link className={activeHeader === "courses" && 'active'} to="/courses">Courses</Link>
        <Link className={activeHeader === "classes" && 'active'} to="/classes">Classes</Link>
        <Link className={activeHeader === "exam" && 'active'} to="/exam">Exam</Link>
        <Link className={activeHeader === "files" && 'active'} to="/files">Files</Link>
        <Link className={activeHeader === "reports" && 'active'} to="/reports">Reports</Link>
      </div>
      <FloatingOptions/>

    </div>
  )
}
