import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FloatingOptions from './components/FloatingOptions'

export default function Header() {

  useEffect(() => {
    console.log("TODO: Setup header")
  }, [])

  return (
    <div className="header bg-white">
      <div className="header-links">
        <Link to="/courses" className="active">Courses</Link>
        <Link to="/classes">Classes</Link>
        <Link to="/exam">Exam</Link>
        <Link to="/files">Files</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/discussion">Discussion</Link>
      </div>
      <FloatingOptions/>
    </div>
  )
}
