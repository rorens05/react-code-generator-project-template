import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'

function CreateAssignment({modal, toggle}) {
	return (
    <div>
    	<Modal size="lg" show={modal} onHide={toggle} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Create Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
              <Form.Select>
                <option>-- Select Unit Here --</option>
              </Form.Select>
            </Form.Group>
          	<Form.Group className="mb-4">
            	<Form.Label>Assignment Name</Form.Label>
				<Form.Control type="text" placeholder='Enter discussion name here'/>
            </Form.Group>
            <Form.Group className="mb-4">
          		<Form.Label >Instructions</Form.Label>
                <Form.Control type="text" placeholder='Enter instructions here'/>
            </Form.Group>  
			  <Form.Group className='right-btn'>
							<Button className='bg-btn'  variant="warning" size="lg" >Save</Button>
            </Form.Group>
        </Modal.Body>
      </Modal>
    </div>
    )
}
export default CreateAssignment

