import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'

export default function ProfileDropdown({visible}) {
  const userContext = useContext(UserContext)
  const {user} = userContext.data

  const logout = async() => {
    await window.localStorage.clear()
    window.location.href = "/login"
  }

  return (
    <div className={`profile-dropdown-container dropdown-menu shadow ${visible && 'show'}`}>
      <div className="user-header">
        <div className="user-image-container">
          <i class="fas fa-user"></i>
        </div>
        <div className="user-name-container">
          <p className="user-name">{user?.teacher?.id}</p>
          <Link to="#">See your profile</Link>
        </div>
      </div>
      <div className="profile-dropdown-links">
        <Link to="#" className="profile-dropdown-link feedback-link ">
          <div className="profile-dropdown-link-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <div className="feedback-texts">
            <p className="title">Give feedback</p>
            <p className="sub-title">Help us improve TekTeach LMS</p>
          </div>
        </Link>
        <Link to="#" className="profile-dropdown-link">
          <div className="profile-dropdown-link-icon">
            <i class="fas fa-question-circle"></i>
          </div>
          Help & Support
        </Link>
        <Link to="#" className="profile-dropdown-link">
          <div className="profile-dropdown-link-icon">
            <i class="fas fa-tv"></i>
          </div>
          Theme & Display
        </Link>
        <Link to="#" className="profile-dropdown-link" onClick={logout} >
          <div className="profile-dropdown-link-icon">
            <i class="fas fa-sign-out-alt"></i>
          </div>
          Log Out
        </Link>

      </div>
    </div>
  )
}
