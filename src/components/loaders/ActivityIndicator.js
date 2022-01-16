import React from 'react'
import loaderSvg from '../../assets/images/loader.svg'

export default function ActivityIndicator() {
  return (
    <div>
      <div className="absolute-loader">
        <img src={loaderSvg} alt="loading"/>
      </div>
    </div>
  )
}
