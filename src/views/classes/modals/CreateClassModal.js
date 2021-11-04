import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'

function CreateClassModal({modal, toggle}) {
    return (
        <div>
        <Modal
                size="lg"
                show={modal}
                onHide={toggle}
                aria-labelledby="example-modal-sizes-title-lg"
        >
        <Modal.Header style={{boxShadow : '0px 3px 6px #00000029'}} closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Create Class
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3">
                <Form.Label>Grade Level</Form.Label>
                <Form.Select>
                    <option>-- Select Grade Level Here --</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Course</Form.Label>
                <Form.Select>
                    <option>-- Select Course Level Here --</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
            <Form.Label >Class Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Enter class name here'
                    />
            </Form.Group>
            <Form.Group className="mb-4">
            <Form.Label >Class Discription</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Enter class discription here'
                    />
            </Form.Group>
                <Form.Group className='mb-4'>
                <Form.Label >Class Code</Form.Label>{' '}
                <Button variant="warning" size="lg" style={{color: 'white'}}>
                    Get class code
                </Button>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder='Enter class Code here'
                    />
            </Form.Group>
            <Form.Group style={{textAlign: 'right'}}>
                
            <Button className='float-left'  variant="warning" size="lg" style={{color: 'white',}} >Save</Button>
            </Form.Group>
            
        </Modal.Body>
      </Modal>
        </div>
    )
}

export default CreateClassModal

