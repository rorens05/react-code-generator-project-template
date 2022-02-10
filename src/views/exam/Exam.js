import React, { useEffect } from 'react'
import MainContainer from '../../components/layouts/MainContainer'
import ExamHeaders from './components/ExamHeaders'
import ExamList from './components/ExamList'

export default function Exam() {
  useEffect(() => {
    window.location.href = "/"
  }, []);
  
  return (
    <MainContainer activeHeader={'exam'}>
      <div className='containerpages'>
        <ExamHeaders />
        <ExamList />
      </div> 
    </MainContainer>
  )
}
