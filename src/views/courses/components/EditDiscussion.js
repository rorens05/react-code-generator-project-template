import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";

export default function EditDiscussion({openEditDiscussionModal, setOpenEditDiscussionModal, selectedDiscussion}){

	const [loading, setLoading] = useState(false)
  const [modulePages, setModulePages] = useState([])
	const [discussionName, setDiscussionName] = useState('')
	const [instructions, setInstructions] = useState('')
  
  let sessionCourse = sessionStorage.getItem('courseid')
  let sessionModule = sessionStorage.getItem('moduleid')


	const handleCloseModal = e => {
    e.preventDefault()
    setOpenEditDiscussionModal(false)
  }

	const saveEditDiscussion = async(e) => {
    e.preventDefault()
    setLoading(true)
    let response = await new CoursesAPI().EditDiscussion(
      sessionModule,
      {discussionName, instructions}
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

  useEffect(() => {
    if(selectedDiscussion !== null) {
			setDiscussionName(selectedDiscussion?.discussionName)
			setInstructions(selectedDiscussion?.instructions)
		}
  }, [selectedDiscussion])

	return (
		<div>
			<Modal size="lg" className="modal-all" show={openEditDiscussionModal} onHide={()=> setOpenEditDiscussionModal(!openEditDiscussionModal)} >
				<Modal.Header className="modal-header" closeButton>
				Edit Discussion
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form onSubmit={saveEditDiscussion}>
								<Form.Group className="m-b-20">
										<Form.Label for="courseName">
												Discussion Name
										</Form.Label>
										<Form.Control 
                      defaultValue={selectedDiscussion?.discussion.discussionName}
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter test name"
                      onChange={(e) => setDiscussionName(e.target.value)}
                    />
								</Form.Group>

								<Form.Group className="m-b-20">
										<Form.Label for="description">
												Instructions
										</Form.Label>
										<Form.Control 
                      defaultValue={selectedDiscussion?.discussion.instructions}
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter test instructions"
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