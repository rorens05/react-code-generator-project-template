import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSideNavigation({active}) {
  return (
    <div className="side-navigation">
      <Link to="school" className={`side-navigation-item ${active === "school-profile" ? "active" : ""}`}>School Profile</Link>
      <Link to="studentsList" className={`side-navigation-item ${active === "students" ? "active" : ""}`}>Students</Link>
      <Link to="schoolTeacher" className={`side-navigation-item ${active === "schoolTeacher" ? "active" : ""}`}>Teachers</Link>
      <Link to="school" className={`side-navigation-item ${active === "courses" ? "active" : ""}`}>Courses</Link>
      <Link to="school" className={`side-navigation-item ${active === "classes" ? "active" : ""}`}>Classes</Link>
      <Link to="schoolAdmin" className={`side-navigation-item ${active === "schooladmins" ? "active" : ""}`}>School Admins</Link>
    </div>
  )
}
