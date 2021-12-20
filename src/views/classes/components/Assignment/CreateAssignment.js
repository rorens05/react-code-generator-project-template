import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import { useParams } from 'react-router'
import ClassesAPI from '../../../../api/ClassesAPI'

function CreateAssignment({modal, toggle, module}) {
  const [moduleId, setModuleId] = useState('')
  const [assignmentName, setAssignmentName] = useState('')
  const [instructions, setInstructions] = useState('')
  const {id} = useParams()
 
  const createAssignment = async (e) =>{
    e.preventDefault()
    let response = await new ClassesAPI().createAssignment(moduleId, id, {assignment:{assignmentName, instructions,}, classAssignment:{}} )
    if(response.ok){
      alert('Save Assingment')
      toggle(e)
    }else{
      alert(response.data.errorMessage)
    }
  }

	return (
    <div>
    	<Modal size="lg" show={modal} onHide={toggle} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Create Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createAssignment} > 
            <Form.Group className="mb-3">
              <Form.Label>Unit</Form.Label>
                <Form.Select onChange={(e) => setModuleId(e.target.value)}>
                  <option>-- Select Unit Here --</option>
                    {module.map(item => {
                      return (<option value={item?.id}>{item?.moduleName}</option>)
                    })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Assignment Name</Form.Label>
                  <Form.Control onChange={(e) => setAssignmentName(e.target.value)} type="text" placeholder='Enter Assignment Name here'/>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label >Instructions</Form.Label>
                  <Form.Control onChange={(e) => setInstructions(e.target.value)} type="text" placeholder='Enter instructions here'/>
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
export default CreateAssignment

