import React from 'react'
import Header from '../headers/Header'

export default function MainContainer({children, headerVisible = true}) {
  return (
    <div className="main-container">
      {headerVisible && <Header/>}
      {children}
    </div>
  )
}
