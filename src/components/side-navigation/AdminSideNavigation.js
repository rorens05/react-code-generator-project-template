import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSideNavigation({active}) {
  return (
    <div className="side-navigation">
      <Link to="school" className={`side-navigation-item ${active === "school-profile" ? "active" : ""}`}>School Profile</Link>
      <Link to="school" className={`side-navigation-item ${active === "students" ? "active" : ""}`}>Students</Link>
      <Link to="school" className={`side-navigation-item ${active === "teachers" ? "active" : ""}`}>Teachers</Link>
      <Link to="school" className={`side-navigation-item ${active === "courses" ? "active" : ""}`}>Courses</Link>
      <Link to="school" className={`side-navigation-item ${active === "classes" ? "active" : ""}`}>Classes</Link>
      <Link to="school" className={`side-navigation-item ${active === "schoadmins" ? "active" : ""}`}>School Admins</Link>
      <Link to="school" className={`side-navigation-item ${active === "profile" ? "active" : ""}`}>Profile</Link>
    </div>
  )
}
