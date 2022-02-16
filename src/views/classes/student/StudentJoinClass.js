import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import ClassesAPI from '../../../api/ClassesAPI'
import SweetAlert from 'react-bootstrap-sweetalert';

function StudentJoinClass({joinClassesToggle, joinClassestModal, getPendingClasses}) {
  const [code, setCode] = useState('')
  const [addNotify, setAddNotity] = useState(false)
  const [wrongCodeNotify, setWrongCodeNotify] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const submitRequest = async (e) => {
    e.preventDefault()
    let response = await new ClassesAPI().submitRequest(code, {code})
      if(response.ok){
        getPendingClasses()
        setCode('')
        joinClassesToggle()
        setAddNotity(true)
      }else{
        setWrongCodeNotify(true)
        setErrorMessage(response.data.errorMessage)
      }
  }

  const closeNotify = () =>{
    setAddNotity(false)
  }

  const closeWrongNotify = () => {
    setWrongCodeNotify(false)
  }

  return (
    <div>
      	<Modal size="lg" show={joinClassestModal} onHide={joinClassesToggle} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Join Classes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={submitRequest} >
          <Form.Group className="mb-4">
              <Form.Control onChange={(e) => setCode(e.target.value)} type="text" placeholder='Enter class Code here'/>
          </Form.Group>
          <Form.Group className='right-btn'>
						<Button className='tficolorbg-button' type='submit'>Request</Button>
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
        <SweetAlert 
          warning
          show={wrongCodeNotify} 
          title={errorMessage} 
          onConfirm={closeWrongNotify}>
        </SweetAlert>
    </div>
  )
}

export default StudentJoinClass
