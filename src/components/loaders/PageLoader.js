import React from 'react'
import loaderSvg from '../../assets/images/loader.svg'
export default function PageLoader() {
  return (
    <div className="page-loader">
      <img src={loaderSvg} alt="loading"/>
    </div>
  )
}
