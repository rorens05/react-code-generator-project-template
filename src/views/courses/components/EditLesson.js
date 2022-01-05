import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import CoursesAPI from "../../../api/CoursesAPI";
import SubjectAreaAPI from "../../../api/SubjectAreaAPI";

export default function EditLesson({openEditLessonModal, setOpenEditLessonModal, selectedLesson}){

	const [loading, setLoading] = useState(false)
  const [modulePages, setModulePages] = useState([])
	const [pageName, setPageName] = useState('')
	const [sequenceNo, setSequenceNo] = useState('')
	const [content, setContent] = useState('')
  
  let sessionCourse = sessionStorage.getItem('courseid')
  let sessionModule = sessionStorage.getItem('moduleid')


	const handleCloseModal = e => {
    e.preventDefault()
    setOpenEditLessonModal(false)
  }

	const saveEditLesson = async(e, id) => {
    e.preventDefault()
    setLoading(true)
    let response = await new CoursesAPI().editLesson(
      id,
      {pageName, sequenceNo, content}
    )
    if(response.ok){
      alert("Saved")
      getCourseUnitPages()
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
    if(selectedLesson !== null) {
			setPageName(selectedLesson?.pageName)
			setSequenceNo(selectedLesson?.sequenceNo)
      setContent(selectedLesson?.content)
		}
  }, [selectedLesson])

	return (
		<div>
			<Modal size="xl" className="modal-all" show={openEditLessonModal} onHide={()=> setOpenEditLessonModal(!openEditLessonModal)} >
				<Modal.Header className="modal-header" closeButton>
				Edit Lesson / Page
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form onSubmit={saveEditLesson}>
								<Form.Group className="m-b-20">
										<Form.Label for="courseName">
												Page Name
										</Form.Label>
										<Form.Control 
											defaultValue={selectedLesson?.pageName}
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter lesson name"
                      onChange={(e) => setPageName(e.target.value)}
                    />
								</Form.Group>

								<Form.Group className="m-b-20">
										<Form.Label for="description">
												Sequence Number
										</Form.Label>
										<Form.Control 
                      defaultValue={selectedLesson?.sequenceNo}
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter sequence number"
                      onChange={(e) => setSequenceNo(e.target.value)}
                    />
								</Form.Group>

                <Form.Group className="m-b-20">
                  <Form.Label for="description">
                      Content
                  </Form.Label>
                  <Form.Control 
                    defaultValue={selectedLesson?.content}
                    className="custom-input" 
                    size="lg" 
                    as="textarea"
                    placeholder="Enter lesson content"
                    rows={5}
                    onChange={(e) => setContent(e.target.value)}
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