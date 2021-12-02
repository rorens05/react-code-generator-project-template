import React, { useState, useEffect } from "react";
import { Button, Form, FormControl, Modal, FloatingLabel } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";
import SubjectAreaAPI from "../../../api/SubjectAreaAPI";

export default function CourseCreate({openModal, setOpenModal}){

	const [loading, setLoading] = useState(false)
	const [course, setCourse] = useState([])
	const [courseName, setCourseName] = useState('')
	const [description, setDescription] = useState('')
	const [subjectAreaId, setSubjectArea] = useState('')
	const [sarea, setSarea] = useState([])
	const [status, setStatus] = useState('')
	const [locked, setLockStatus]= useState('')

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

	const saveCourse = async(e) => {
    e.preventDefault()
    setLoading(true)
		let isTechFactors = true
    let response = await new CoursesAPI().createCourse(
      {courseName, description, subjectAreaId, status, locked, isTechFactors}
    )
    if(response.ok){
      alert("Saved")
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
				<Modal.Header className="modal-header">
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
                      onChange={(e) => setCourseName(e.target.value)}
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
                      onChange={(e) => setDescription(e.target.value)}
                    />
								</Form.Group>
								{' '}

								<Form.Group className="m-b-20">
										<Form.Label for="subjectArea">
												Subject Area
										</Form.Label>
										<Form.Select size="lg" onChange={(e) => setSubjectArea(e.target.value)}>
											<option value="">
												Select subject area
											</option>
										{
											sarea.map(item => {
												return(
													<option value={item.id}>
														{item.subjectAreaName}
													</option>
												)
											})
										}
										</Form.Select>
								</Form.Group>
								{' '}

								<Form.Group className="m-b-20">
										<Form.Label for="status">
												Status
										</Form.Label>
										<Form.Select size="lg" onChange={(e) => setStatus(e.target.value)}>
											<option>
												Select Status
											</option>
											<option value={true}>
												Active
											</option>
											<option value={false}> 
												Inactive
											</option>
										</Form.Select>
								</Form.Group>
								{' '}

								<Form.Group className="m-b-20">
										<Form.Label for="lock">
												Lock Status
										</Form.Label>
										<Form.Select size="lg" onChange={(e) => setLockStatus(e.target.value)}>
											<option>
												Select Lock Status
											</option>
											<option value={true}>
												Locked
											</option>
											<option value={false}> 
												Unlocked
											</option>
										</Form.Select>
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