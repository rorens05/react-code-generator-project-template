import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";
import SubjectAreaAPI from "../../../api/SubjectAreaAPI";

export default function CourseCreate({setCourse, openModal, setOpenModal}){

	const [loading, setLoading] = useState(false)
	const [courseName, setCourseName] = useState('')
	const [description, setDescription] = useState('')
	const [subjectAreaId, setSubjectArea] = useState('')
	const [sarea, setSarea] = useState([])
	const [status, setStatus] = useState('')
	const [locked, setLockStatus]= useState('')

	const handleCloseModal = e => {
    e.preventDefault()
    setOpenModal(false)
  }

	const viewSubjectArea = async() => {
    setLoading(true)
    let response = await new SubjectAreaAPI().getSubjectArea()
    setLoading(false)
    if(response.ok){
      setSarea(response.data)
			console.log(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

	const getCourses = async() => {
    setLoading(true)
    let response = await new CoursesAPI().getCourses()
    setLoading(false)
    if(response.ok){
      setCourse(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

	const saveCourse = async(e) => {
    e.preventDefault()
    setLoading(true)
		let isTechFactors = true
    let response = await new CoursesAPI().createCourse(
      {courseName, description, subjectAreaId, status, locked, isTechFactors}
    )
    if(response.ok){
      alert("Saved")
	  handleCloseModal(e)
	  getCourses()
    }else{
      alert(response.data.errorMessage)
    }
    setLoading(false)
  }

	useEffect(() => {
    viewSubjectArea()
  }, [])

	return (
		<div>
			<Modal size="lg" className="modal-all" show={openModal} onHide={()=> setOpenModal(!openModal)} >
				<Modal.Header className="modal-header" closeButton>
				Create Course
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form onSubmit={saveCourse}>
								<Form.Group className="m-b-20">
										<Form.Label for="courseName">
												Course Name
										</Form.Label>
										<Form.Control 
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter course name"
                      // onChange={(e) => setCourseName(e.target.value)}
                    />
								</Form.Group>
								{' '}

								<Form.Group className="m-b-20">
										<Form.Label for="description">
												Description
										</Form.Label>
										<Form.Control 
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter course description"
                      // onChange={(e) => setDescription(e.target.value)}
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