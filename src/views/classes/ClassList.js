import React from 'react'
import ClassListHeader from './components/ClassListHeader'
import ClassEnrolled from './components/ClassEnrolled'
import ClassWaiting from './components/ClassWaiting'

function ClassList() {
  return (
    <div>
      <ClassListHeader />
      <ClassEnrolled />
      <ClassWaiting />

  </div>
  )
}
export default ClassList
