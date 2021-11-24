import React from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import ExamHeaders from './components/ExamHeaders'
import ExamList from './components/ExamList'

export default function Exam() {
  return (
    <MainContainer>
      <div className='containerpages'>
        <ExamHeaders />
        <ExamList />
      </div> 
    </MainContainer>
  )
}
