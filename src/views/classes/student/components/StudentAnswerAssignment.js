import React, { useState, useEffect, useContext} from 'react'
import { Form, Button, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useParams } from 'react-router'
import ClassesAPI from '../../../../api/ClassesAPI'
import { UserContext } from '../../../../context/UserContext'
import SweetAlert from 'react-bootstrap-sweetalert';

function StudentAnswerAssignment({answerAnswerToggle, answerModal, assignmentId}) {
  const {id} = useParams()
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const [assignmentAnswer, setAssignmentAnswer] = useState('')
  const [files, setFiles] = useState('')
  const [assignNotify, setAssignNotify] = useState(false)

  const closeNotify = () => {
    setAssignNotify(false)
  }

  console.log("user:", user?.userId)

  const submitStudentAssignmentAnswer = async (e) => {
    e.preventDefault()
    let studentId = user?.student?.id
    let response = await new ClassesAPI().submitStudentAssignmentAnswer(studentId, id, assignmentId, {assignmentAnswer, fileDetails:[{}]})
      if(response.data){
        setAssignNotify(true)
        setAssignmentAnswer('')
        answerAnswerToggle()
      }else{
        alert(response.data.errorMessage)
      }
  }

  return (
    <div>
       <Modal  size="lg" show={answerModal} onHide={answerAnswerToggle} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header className='class-modal-header' closeButton>
            <Modal.Title id="example-modal-sizes-title-lg" >
              Answer Assignment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={submitStudentAssignmentAnswer} >  
            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control onChange={(e) => setAssignmentAnswer(e.target.value)}  as="textarea" rows={3}  />
            </Form.Group>
            <Form.Group className="mb-1">
              <Button className='tficolorbg-button'  >Attache File</Button>
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

export default StudentAnswerAssignment
