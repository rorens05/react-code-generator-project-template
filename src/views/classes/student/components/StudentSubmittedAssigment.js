import React from 'react'
import { Form, Button, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

function StudentSubmittedAssigment({submittedAssignmentToggle, submittedAssignment, studentAnswer}) {

  console.log("asignmentAnswer:" ,studentAnswer)

  return (
    <div>
      <Modal  size="lg" show={submittedAssignment} onHide={submittedAssignmentToggle} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Group className="mb-1">
            <Form.Label>Answer</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Control  defaultValue={studentAnswer?.assignmentAnswer} as="textarea" rows={3} disabled />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Feed Back</Form.Label>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control defaultValue={studentAnswer?.feedback} type='text' disabled  />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Grade</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control defaultValue={studentAnswer?.assignmentGrade} type='text' disabled  />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>File</Form.Label>&nbsp;&nbsp;&nbsp;
            <i style={{color:'#EE9337', fontSize:'30px'}} class="fas fa-download"></i>
          </Form.Group>
          <Form.Group className='right-btn'>
            <Button onClick={() => submittedAssignmentToggle()} className='tficolorbg-button' type='submit' >OK</Button>
          </Form.Group>
      
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default StudentSubmittedAssigment
