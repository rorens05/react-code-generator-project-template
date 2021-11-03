import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';

export default function Header() {

  useEffect(() => {
    console.log("TODO: Setup header")
  }, [])

  return (
    <div>
      <ul>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/classes">Classes</Link>
        </li>
        <li>
          <Link to="/exam">Exam</Link>
        </li>
        <li>
          <Link to="/files">Files</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
      </ul>    
    </div>
  )
}
