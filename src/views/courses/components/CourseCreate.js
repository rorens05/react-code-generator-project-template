import React from "react";
import { Button, Form, FormControl, Modal, FloatingLabel } from 'react-bootstrap';

export default function CourseCreate({openModal, setOpenModal}){
	return (
		<div>
			<Modal size="lg" className="modal-all" show={openModal} onHide={()=> setOpenModal(!openModal)} >
				<Modal.Header className="modal-header">
				Create Course
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form>
								<Form.Group className="m-b-20">
										<Form.Label for="courseName">
												Course Name
										</Form.Label>
										<FloatingLabel label="Course Name">
												<FormControl id="courseName" name="courseName" placeholder="Course Name" type="text"/>
										</FloatingLabel>
								</Form.Group>
								{' '}

								<Form.Group className="m-b-20">
										<Form.Label for="description">
												Description
										</Form.Label>
										<FloatingLabel label="Description">
												<FormControl id="description" name="description" placeholder="Description" type="text"/>
										</FloatingLabel>
								</Form.Group>
								{' '}

								<Form.Group className="m-b-20">
										<Form.Label for="subjectArea">
												Subject Area
										</Form.Label>
										<Form.Select id="subjectAreaId" name="subjectAreaId" size="lg">
												<option>
												1
												</option>
												<option>
												2
												</option>
										</Form.Select>
								</Form.Group>
								{' '}

								<Form.Group className="m-b-20">
										<Form.Label for="status">
												Status
										</Form.Label>
										<Form.Select id="status" name="status" size="lg">
												<option>
												1
												</option>
												<option>
												2
												</option>
										</Form.Select>
								</Form.Group>
								{' '}

								<Form.Group className="m-b-20">
										<Form.Label for="lock">
												Lock Status
										</Form.Label>
										<Form.Select id="lock" name="lock" size="lg">
												<option>
												1
												</option>
												<option>
												2
												</option>
										</Form.Select>
								</Form.Group>
								{' '}
						
								<span style={{float:"right"}}>
										<Button className="tficolorbg-button">
												Save
										</Button>
								</span>
						</Form>
				</Modal.Body>
				<Modal.Footer>
				</Modal.Footer>
			</Modal>
		</div>
	)
}