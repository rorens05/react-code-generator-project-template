import React from 'react'
import Header from '../headers/Header'

export default function MainContainer({children, headerVisible = true, fluid}) {
  const containerClass = fluid ? "container-fluid" : "container"
  return (
    <div className="main-container">
      {headerVisible && <Header/>}
      <div className={containerClass}>
        {children}
      </div>
    </div>
  )
}
