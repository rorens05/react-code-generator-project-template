import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import CoursesAPI from "../../../api/CoursesAPI";

export default function CreateLesson({openCreateLessonModal, setCreateLessonModal}){

	const [loading, setLoading] = useState(false)
	const [pageName, setPageName] = useState('')
	const [sequenceNo, setSequenceNo] = useState('')
	const [content, setContent] = useState('')

  let sessionCourse = sessionStorage.getItem('courseid')
  let sessionModule = sessionStorage.getItem('moduleid')


	const handleCloseModal = e => {
    e.preventDefault()
    setCreateLessonModal(false)
  }

	const saveLesson = async(e) => {
    e.preventDefault()
    setLoading(true)
    let response = await new CoursesAPI().createLesson(
      sessionCourse,
      sessionStorage.getItem('moduleid'),
      {pageName, sequenceNo, content}
    )
    if(response.ok){
      alert("Saved")
			handleCloseModal(e)
    }else{
      alert(response.data.errorMessage)
    }
    setLoading(false)
  }

  return (
		<div>
			<Modal size="lg" className="modal-all" show={openCreateLessonModal} onHide={()=> setCreateLessonModal(!openCreateLessonModal)} >
				<Modal.Header className="modal-header" closeButton>
				Create Lesson / Page
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form onSubmit={saveLesson}>
								<Form.Group className="m-b-20">
										<Form.Label for="courseName">
												Page Name
										</Form.Label>
										<Form.Control 
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter lesson name"
                      onChange={(e) => setPageName(e.target.value)}
                    />
								</Form.Group>
                {' '}

								<Form.Group className="m-b-20">
										<Form.Label for="description">
												Sequence Number
										</Form.Label>
										<Form.Control 
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter sequence number"
                      onChange={(e) => setSequenceNo(e.target.value)}
                    />
								</Form.Group>
                {' '}

                <Form.Group className="m-b-20">
										<Form.Label for="description">
												Content
										</Form.Label>
										<Form.Control 
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter lesson content"
                      onChange={(e) => setContent(e.target.value)}
                    />
								</Form.Group>
                {' '}
    
								<span style={{float:"right"}}>
										<Button className="tficolorbg-button" type="submit">
												Save
										</Button>
								</span>
						</Form>
				</Modal.Body>
			</Modal>
		</div>
	)
}