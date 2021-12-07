import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";
import SubjectAreaAPI from "../../../api/SubjectAreaAPI";

export default function CreateExam({setCourse, openCreateExamModal, setOpenCreateExamModal}){

	const [loading, setLoading] = useState(false)
  const [modulePages, setModulePages] = useState([])
	const [testName, setTestName] = useState('')
	const [testInstructions, setTestInstructions] = useState('')
  let sessionCourse = sessionStorage.getItem('courseid')
  let sessionModule = sessionStorage.getItem('moduleid')


	const handleCloseModal = e => {
    e.preventDefault()
    setOpenCreateExamModal(false)
  }

	const saveExam = async(e) => {
    e.preventDefault()
    setLoading(true)
    let response = await new CoursesAPI().createExam(
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

  const getCourseUnitPages = async(e, data, data1) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseUnitPages(sessionCourse, sessionModule)
    setLoading(false)
    if(response.ok){
      setModulePages(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all pages")
    }
  }

	useEffect(() => {
  }, [])

	return (
		<div>
			<Modal size="lg" className="modal-all" show={openCreateExamModal} onHide={()=> setOpenCreateExamModal(!openCreateExamModal)} >
				<Modal.Header className="modal-header" closeButton>
				Create Exam
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form onSubmit={saveExam}>
								<Form.Group className="m-b-20">
										<Form.Label for="courseName">
												Test Name
										</Form.Label>
										<Form.Control 
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
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter test instructions"
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