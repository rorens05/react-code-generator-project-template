import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert';

function CreateTask({modal, toggle, module, getTaskModule, refModuleId}) {
  const [moduleId, setModuleId] = useState('')
  const [taskName, setTaskName] = useState('')
  const [instructions, setInstructions] = useState('')
  const [addNotify, setAddNotity] = useState(false)
  const allowLate = true
  const {id} = useParams()

  const closeNotify = () =>{
    setAddNotity(false)
  }

  const saveTask = async (e) =>{
    e.preventDefault()
    let response = await new ClassesAPI().creatTask(moduleId, id, {task:{taskName, instructions,}, taskAssignment:{allowLate}} )
    if(response.ok){
      // alert('Save Task')
      setAddNotity(true)
      setModuleId("")
      setTaskName("")
      setInstructions("")
      getTaskModule(null, refModuleId)
      toggle(e)
    }else{
      alert(response.data.errorMessage)
    }
  }

  console.log('ModuleId:', refModuleId)

  useEffect(() => {
    getTaskModule(null, refModuleId)
  }, [])

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
                  <Form.Label >Instruction</Form.Label>
                    <Form.Control onChange={(e) => setInstructions(e.target.value)} type="text" placeholder='Enter instruction here'/>
                  </Form.Group>
              <Form.Group className='right-btn'>
              <Button className='tficolorbg-button' type='submit' >Save</Button>
            </Form.Group>
        </Form> 
        </Modal.Body>
      </Modal>
      <SweetAlert 
          success
          show={addNotify} 
          title="Done!" 
          onConfirm={closeNotify}>
        </SweetAlert>
    </div>
    )
}
export default CreateTask