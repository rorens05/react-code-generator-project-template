import React, { useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import SweetAlert from 'react-bootstrap-sweetalert';

function EditTask({modal, toggle, module, editTask, getTaskModule, moduleId}){
  const [taskName, setTaskName] = useState('')
  const [instructions, setInstructions] = useState('')
  const isShared = null
  const [editNotufy, setEditNotify] = useState(false)

  const closeNotify = () =>{
    setEditNotify(false)
  }

  const updateTask = async (e) =>{
    e.preventDefault()
    let id = editTask?.task?.id
    let response = await new ClassesAPI().updateTask(id, {taskName, instructions, isShared})
      if(response.ok){
        // alert('Task Updated')
        setEditNotify(true)
        getTaskModule(null, moduleId)
        toggle(e)
      }else{
        alert(response.data.errorMessage)
      }
  }

  useEffect(() => {
    if(editTask !== null) {
      setTaskName(editTask?.task?.taskName)
      setInstructions(editTask?.task?.instructions)
		}
  }, [editTask])

  return (
    <div>
        <Modal  size="lg" show={modal} onHide={toggle} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
             Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={updateTask}>  
          <Form.Group className="mb-3">
          <Form.Label>Unit</Form.Label>
            <Form.Select disabled>
              <option>{editTask?.module?.moduleName} </option>
              {module.map(item => {
                  return(<option value={item?.id}>{item?.moduleName} {item.id}</option>)
                })} 
            </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Task Name</Form.Label>
              <Form.Control onChange={(e) => setTaskName(e.target.value)}  type="text" defaultValue={editTask?.task?.taskName}/>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label >Instruction</Form.Label>
                    <Form.Control onChange={(e) => setInstructions(e.target.value)} type="text"  defaultValue={editTask?.task?.instructions}/>
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

export default EditTask
