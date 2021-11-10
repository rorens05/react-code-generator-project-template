import React from "react";
import { Button, Form, FormControl, Modal, FloatingLabel } from 'react-bootstrap';

export default function CreateDiscussion({openModal, setOpenModal}){
	return (
		<div>
			<Modal size="lg" className="modal-all" show={openModal} onHide={()=> setOpenModal(!openModal)} >1
				<Modal.Header className="modal-header">
				Create Discussion
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form>
								<Form.Group className="m-b-20">
										<Form.Label for="Unit">	
												Unit
										</Form.Label>
										<FloatingLabel label="Unit">
												<FormControl id="Unit" name="Unit" placeholder="Unit" type="text"/>
										</FloatingLabel>
								</Form.Group>
								{' '}
								<Form.Group className="m-b-20">
										<Form.Label for="DiscussionName">
												Discussion Name
										</Form.Label>
										<FloatingLabel label="DiscussionName">
												<FormControl id="DiscussionName" name="DiscussionName" placeholder="Discussion Name" type="text"/>
										</FloatingLabel>
								</Form.Group>
								{' '}
								<Form.Group className="m-b-20">
										<Form.Label for="Instructions">
												Instructions
										</Form.Label>
										<FloatingLabel label="Instructions">
												<FormControl id="Instructions" name="Instructions" placeholder="Instructions" type="text"/>
										</FloatingLabel>
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