import React, { useState, useContext,useEffect} from 'react'
import { Form, Button, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'
import { UserContext } from '../../../../context/UserContext'
import SweetAlert from 'react-bootstrap-sweetalert';

function StundentAnswerTask({answerTaskToggle, answerTaskModal, taskId}) {
  const {id} = useParams()
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const  [taskAnswer, setTaskAnswer] = useState('')
  const [files, setFiles] = useState('')
  const [assignNotify, setAssignNotify] = useState(false)

  console.log('taskId:', taskId)

  const closeNotify = () => {
    setAssignNotify(false)
  }

  const submitStudentTaskAnswer = async (e) =>{
    e.preventDefault()
    let studentId = user?.student?.id
    let response = await new ClassesAPI().submitStudentTaskAnswer(studentId, id, taskId, {taskAnswer, fileDetails:[{}]})
      if(response.ok){
        setTaskAnswer('')
        setAssignNotify(true)
        answerTaskToggle(false)
      }else{
        alert(response.data.errorMessage)
      }
  }

  return (
    <div>
       <Modal  size="lg" show={answerTaskModal} onHide={answerTaskToggle} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header className='class-modal-header' closeButton>
            <Modal.Title id="example-modal-sizes-title-lg" >
              Answer Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={submitStudentTaskAnswer} >  
            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control onChange={(e) => setTaskAnswer(e.target.value)}  as="textarea" rows={3}  />
            </Form.Group>
            <Form.Group className="mb-1">
              <Button className='tficolorbg-button' >Attache File</Button>
            </Form.Group>
            <Form.Group className='right-btn'>
              <Button className='tficolorbg-button' type='submit' >Save</Button>
            </Form.Group>
          </Form> 
          </Modal.Body>
        </Modal>
        <SweetAlert 
          success
          show={assignNotify} 
          title="Done!" 
           onConfirm={closeNotify}>
        </SweetAlert>
    </div>
  )
}

export default StundentAnswerTask
