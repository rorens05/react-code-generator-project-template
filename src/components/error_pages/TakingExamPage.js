import React from 'react'
import { Button } from 'react-bootstrap'

export default function TakingExamPage() {
  return (
   <div className='taking-exam'>
      <div className='d-block shadow px-3 py-5 taking-exam-container'>
        <div className='taking-exam-warning-icon'><i class="fas fa-exclamation-triangle"></i></div>
        <h4 className='text-center my-4'>You are currently taking an exam.</h4>
        <h4 className='text-center my-5'>Please return to the tab you started your exam.</h4>
        <Button 
          className="btn btn-primary d-block mt-5 mb-4 mx-auto" 
          size="lg" 
          variant="primary" 
          type="submit"
          onClick={() => window.location.reload()}
        >
          RELOAD PAGE
        </Button>

      </div>
   </div>
  )
}
