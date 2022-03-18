import React, { useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import SweetAlert from 'react-bootstrap-sweetalert';
import ContentField from '../../../../components/content_field/ContentField';
import ContentViewer from '../../../../components/content_field/ContentViewer';

function EditAssignment({setModal, modal, editAssignment, getAssignmentList, moduleId, instructions, setInstructions, setAssignmentName, assignmentName, unit, assignmentId}) {
  const [editNotufy, setEditNotify] = useState(false)
  const isShared = null
  const [qwert, setQwert] = useState(editAssignment?.assignment?.instructions)
  let mId = moduleId


  const closeNotify = () =>{
    setEditNotify(false)
  }

  console.log('xmoduleId:', moduleId)

  const updateTask = async (e) =>{
    e.preventDefault()
    let id = assignmentId
    let mId = moduleId
    let response = await new ClassesAPI().updateAssignment(id, {assignmentName, instructions, isShared})
      if(response.ok){
        // alert('Assingment Updated')
        setEditNotify(true)
        getAssignmentList(null, mId)
        setModal(false)
      }else{
        alert(response.data.errorMessage)
      }
  }

  useEffect(() => {
    if(assignmentName !== '') {
      setAssignmentName(editAssignment?.assignment?.assignmentName)
      setInstructions(editAssignment?.assignment?.instructions)
		}
  }, [assignmentName])


  useEffect(() => {
    if(instructions !== '') {
      setAssignmentName(assignmentName)
      setInstructions(instructions)
		}
  }, [assignmentName])
  
  console.log('qwert:', qwert)

  return (
    <div>
        <Modal  size="lg" show={modal} onHide={() => setModal(false)} aria-labelledby="example-modal-sizes-title-lg">
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
                <option>{unit}</option>
              </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Assignment Name</Form.Label>
                <Form.Control defaultValue={assignmentName} type="text" onChange={(e) => setAssignmentName(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label >Instruction</Form.Label>
                      <ContentField value={instructions} onChange={value => setInstructions(value)} />
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
