import React from 'react'
import { Form, Button, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

function StudentAnswerAssignment({answerAnswerToggle, answerModal}) {
  return (
    <div>
       <Modal  size="lg" show={answerModal} onHide={answerAnswerToggle} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header className='class-modal-header' closeButton>
            <Modal.Title id="example-modal-sizes-title-lg" >
              Answer Assignment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form  >  
            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control   as="textarea" rows={3}  />
            </Form.Group>
            <Form.Group className="mb-1">
              <Button className='tficolorbg-button' type='submit' >Attache File</Button>
            </Form.Group>
            <Form.Group className='right-btn'>
              <Button className='tficolorbg-button' type='submit' >Save</Button>
            </Form.Group>
          </Form> 
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default StudentAnswerAssignment
