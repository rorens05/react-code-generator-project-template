import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import CoursesAPI from "../../../api/CoursesAPI";
import SubjectAreaAPI from "../../../api/SubjectAreaAPI";

export default function EditTest({examInfo, openEditTestModal, setOpenEditTestModal, selectedCourse}){

	const [loading, setLoading] = useState(false)
	const [testName, setTestName] = useState('')
	const [testInstructions, setTestInstructions] = useState('')
  let sessionCourse = sessionStorage.getItem('courseid')
  let sessionModule = sessionStorage.getItem('moduleid')


	const handleCloseModal = e => {
    e.preventDefault()
    setOpenEditTestModal(false)
  }

	const saveEditTest = async(e) => {
    e.preventDefault()
    setLoading(true)
    let response = await new CoursesAPI().editLesson(
      sessionModule,
      {testName, testInstructions}
    )
    if(response.ok){
      alert("Saved")
			handleCloseModal(e)
    }else{
      alert(response.data.errorMessage)
    }
    setLoading(false)
  }

	useEffect(() => {
    if(examInfo !== null) {
			setTestName(examInfo?.testName)
			setTestInstructions(examInfo?.testInstructions)
		}
  }, [examInfo])

	return (
		<div>
			<Modal size="xl" className="modal-all" show={openEditTestModal} onHide={()=> setOpenEditTestModal(!openEditTestModal)} >
				<Modal.Header className="modal-header" closeButton>
				Edit Test
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form onSubmit={saveEditTest}>
								<Form.Group className="m-b-20">
										<Form.Label for="courseName">
												Test Name
										</Form.Label>
										<Form.Control 
											defaultValue={examInfo?.testName}
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter test name"
                      onChange={(e) => setTestName(e.target.value)}
                    />
								</Form.Group>

								<Form.Group className="m-b-20">
										<Form.Label for="description">
											Test Instructions
										</Form.Label>
										<Form.Control 
                      defaultValue={examInfo?.testInstructions}
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter instructions"
                      onChange={(e) => setTestInstructions(e.target.value)}
                    />
								</Form.Group>

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