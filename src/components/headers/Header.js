import React, { useEffect } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
      </div>
    </div>
  )
}
