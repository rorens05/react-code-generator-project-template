import React from 'react'
import FloatingOptions from './components/FloatingOptions'
import HomeLinks from './components/HomeLinks'
import SchoolAdminLinks from './components/SchoolAdminLinks'
import StudentLinks from './components/StudentLinks'
import TeacherLinks from './components/TeacherLinks'

export default function Header({activeHeader}) {
  return (
    <div className="header bg-white">
      <HomeLinks/>
      <TeacherLinks activeHeader={activeHeader}/>
      <StudentLinks activeHeader={activeHeader}/>
      <SchoolAdminLinks activeHeader={activeHeader}/>
      <FloatingOptions/>
    </div>
  )
}
