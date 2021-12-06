import React, { useState, useEffect } from "react";
import { Button, Form, Modal  } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";

export default function CourseCreateUnit({moduleInfo, setModuleInfo, openCreateUnitModal, setopenCreateUnitModal}){

	const [loading, setLoading] = useState(false)
	const [moduleName, setModuleName] = useState('')
	const [moduleDescription, setModuleDescription] = useState('')
	const [sequenceNo, setSequenceNumber] = useState('')
	let sessionCourse = sessionStorage.getItem('courseid')

	const handleCloseModal = e => {
    e.preventDefault()
    setopenCreateUnitModal(false)
  }

	const getCourseUnitInformation = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseUnit(sessionCourse)
    setLoading(false)
    if(response.ok){
      setModuleInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all a")
    }
  }

	const saveUnit = async(e) => {
    e.preventDefault()
    setLoading(true)
		let sessionCourse = sessionStorage.getItem('courseid')
    let response = await new CoursesAPI().createCourseUnit
		(
			sessionCourse,
      {
			moduleName,
			moduleDescription,
			courseId:sessionCourse,
			sequenceNo
			}
    )
    if(response.ok){
      alert("Saved")
			handleCloseModal(e)
			getCourseUnitInformation()
    }else{
      alert(response.data.errorMessage)
    }
    setLoading(false)
  }

	useEffect(() => {
   
  }, [])
	
	return (
		<div>
			<Modal size="lg" className="modal-all" show={openCreateUnitModal} onHide={()=> setopenCreateUnitModal(!setopenCreateUnitModal)} >
				<Modal.Header className="modal-header" closeButton>
				Create Module
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
					<Form onSubmit={saveUnit}>
						<Form.Group className="m-b-20">
							<Form.Label for="moduleName">
									Module Name
							</Form.Label>
							<Form.Control 
								className="custom-input" 
								size="lg" 
								type="text" 
								placeholder="Enter module name"
								onChange={(e) => setModuleName(e.target.value)}
							/>
						</Form.Group>
						{' '}

						<Form.Group className="m-b-20">
							<Form.Label for="description">
									Module Description
							</Form.Label>
							<Form.Control 
								className="custom-input" 
								size="lg" 
								type="text" 
								placeholder="Enter module description"
								onChange={(e) => setModuleDescription(e.target.value)}
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
								placeholder="Enter sequence"
								onChange={(e) => setSequenceNumber(e.target.value)}
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