import React from 'react'
import { Form, Button, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

function StudentSubmittedTask({submittedTaskToggle, submittedTaskModal}) {
  return (
    <div>
        <Modal  size="lg" show={submittedTaskModal} onHide={submittedTaskToggle} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header className='class-modal-header' closeButton>
            <Modal.Title id="example-modal-sizes-title-lg" >
             Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form  >  
            <Form.Group className="mb-1">
              <Form.Label>Answer</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control   as="textarea" rows={3} disabled />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Feed Back</Form.Label>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control type='text' disabled  />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Grade</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type='text' disabled  />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>File</Form.Label>&nbsp;&nbsp;&nbsp;
              <i style={{color:'#EE9337', fontSize:'30px'}} class="fas fa-download"></i>
            </Form.Group>
            <Form.Group className='right-btn'>
              <Button className='tficolorbg-button' type='submit' >OK</Button>
            </Form.Group>
          </Form> 
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default StudentSubmittedTask
