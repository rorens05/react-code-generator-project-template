import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'

function CreateTask({modal, toggle, module, getTaskModule}) {
  const [moduleId, setModuleId] = useState('')
  const [taskName, setTaskName] = useState('')
  const [instructions, setInstructions] = useState('')
  const allowLate = true
  const {id} = useParams()

  const saveTask = async (e) =>{
    e.preventDefault()
    let response = await new ClassesAPI().creatTask(moduleId, id, {task:{taskName, instructions,}, taskAssignment:{allowLate}} )
    if(response.ok){
      alert('Save Task')
      toggle(e)
      getTaskModule()
    }else{
      alert(response.data.errorMessage)
    }
  }

  console.log('this is modules:', module)
	return (
    <div>
    	<Modal size="lg" show={modal} onHide={toggle} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Create Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={saveTask} >  
          <Form.Group className="mb-3">
          <Form.Label>Unit</Form.Label>
            <Form.Select onChange={(e) => setModuleId(e.target.value)}>
              <option>-- Select Unit Here -- </option>
                {module.map(item => {
                  return(<option value={item.id}>{item.moduleName} {item.id}</option>)
                })}
            </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Task Name</Form.Label>
              <Form.Control onChange={(e) => setTaskName(e.target.value)} type="text" placeholder='Enter discussion name here'/>
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
export default CreateTask

