import React from 'react'
import { Link } from 'react-router-dom'

export default function FloatingOptions() {
  return (
    <div className="floating-options">
      <Link to="#">
        <div><i class="far fa-calendar"></i></div>
      </Link>
      <Link to="#">
        <div><i class="fas fa-bell"></i></div>
      </Link>
      <Link to="#">
        <div><i class="fas fa-user"></i></div>
      </Link>
    </div>
  )
}
