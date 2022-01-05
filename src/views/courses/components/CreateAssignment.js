import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";
import SubjectAreaAPI from "../../../api/SubjectAreaAPI";

export default function CreateAssignment({openCreateAssignmentModal, setOpenCreateAssignmentModal, setAssignmentInfo}){

	const [loading, setLoading] = useState(false)
  const [modulePages, setModulePages] = useState([])
	const [assignmentName, setAssignmentName] = useState('')
	const [instructions, setInstructions] = useState('')
  let sessionCourse = sessionStorage.getItem('courseid')
  let sessionModule = sessionStorage.getItem('moduleid')


	const handleCloseModal = e => {
    e.preventDefault()
    setOpenCreateAssignmentModal(false)
  }

  const getAssignmentInfo = async(e, data) => {
    setLoading(true)
    sessionStorage.setItem('moduleid', data)
    let response = await new CoursesAPI().getAssignmentInformation(sessionModule)
    setLoading(false)
    if(response.ok){
      setAssignmentInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all assignment")
    }
  }

	const saveAssignmennt = async(e) => {
    e.preventDefault()
    
    setLoading(true)
    let response = await new CoursesAPI().createAssignment(
      sessionModule,
      {assignmentName, instructions}
    )
    if(response.ok){
      alert("Saved")
			handleCloseModal(e)
      getAssignmentInfo(sessionModule)
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
			<Modal size="lg" className="modal-all" show={openCreateAssignmentModal} onHide={()=> setOpenCreateAssignmentModal(!openCreateAssignmentModal)} >
				<Modal.Header className="modal-header" closeButton>
				Create Assignment
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form onSubmit={saveAssignmennt}>
								<Form.Group className="m-b-20">
										<Form.Label for="courseName">
												Assignment Name
										</Form.Label>
										<Form.Control 
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter assignment name"
                      onChange={(e) => setAssignmentName(e.target.value)}
                    />
								</Form.Group>

								<Form.Group className="m-b-20">
										<Form.Label for="description">
												Instructions
										</Form.Label>
										<Form.Control 
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter assignment instructions"
                      onChange={(e) => setInstructions(e.target.value)}
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