import React from 'react'
import loaderSvg from '../../assets/images/loader.svg'
export default function FullScreenLoader() {
  return (
    <div className="full-screen-loader">
      <img src={loaderSvg} alt="loading"/>
    </div>
  )
}
