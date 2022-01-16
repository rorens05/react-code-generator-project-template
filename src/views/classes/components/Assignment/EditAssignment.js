import React, { useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import SweetAlert from 'react-bootstrap-sweetalert';

function EditAssignment({modal, toggle, editAssignment, getAssignmentList, moduleId}) {
  const [assignmentName, setAssignmentName] = useState('')
  const [instructions, setInstructions] = useState('')
  const [editNotufy, setEditNotify] = useState(false)
  const isShared = null

  const closeNotify = () =>{
    setEditNotify(false)
  }

  const updateTask = async (e) =>{
    e.preventDefault()
    let id = editAssignment?.assignment?.id
    let mId = editAssignment?.module?.id
    let response = await new ClassesAPI().updateAssignment(id, {assignmentName, instructions, isShared})
      if(response.ok){
        // alert('Assingment Updated')
        setEditNotify(true)
        getAssignmentList(null, mId)
        toggle(e)
      }else{
        alert(response.data.errorMessage)
      }
  }

  useEffect(() => {
    if(editAssignment !== null) {
      setAssignmentName(editAssignment?.assignment?.assignmentName)
      setInstructions(editAssignment?.assignment?.instructions)
		}
  }, [editAssignment])

  return (
    <div>
        <Modal  size="lg" show={modal} onHide={toggle} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header className='class-modal-header' closeButton>
            <Modal.Title id="example-modal-sizes-title-lg" >
              Edit Assignment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={updateTask} >  
            <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
              <Form.Select disabled>
                <option>{editAssignment?.module?.moduleName}</option>
              </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Assignment Name</Form.Label>
                <Form.Control defaultValue={editAssignment?.assignment?.assignmentName} type="text" onChange={(e) => setAssignmentName(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label >Instruction</Form.Label>
                      <Form.Control defaultValue={editAssignment?.assignment?.instructions} type="text" onChange={(e) => setInstructions(e.target.value)} />
                    </Form.Group>
                <Form.Group className='right-btn'>
                <Button className='tficolorbg-button' type='submit' >Save</Button>
              </Form.Group>
          </Form> 
          </Modal.Body>
        </Modal>
        <SweetAlert 
            success
            show={editNotufy} 
            title="Done!" 
            onConfirm={closeNotify}>
          </SweetAlert>
    </div>
  )
}

export default EditAssignment
