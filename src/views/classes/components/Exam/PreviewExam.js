import React from 'react';
import { Button, Form, Modal } from "react-bootstrap";

function PreviewExam({showPreviewExamModal, setShowPreviewExamModal}) {
  return (
  <>
   <Modal
      size='lg'
      className='modal-all'
      show={showPreviewExamModal}
      onHide={() => setShowPreviewExamModal(false)}
    >
      <Modal.Header className='modal-header' closeButton>
        Edit Exam
      </Modal.Header>
      <Modal.Body className='modal-label b-0px'>
        <Form >
          <Form.Group className='m-b-20'>
            <Form.Label for='courseName'>Test Name</Form.Label>
            <Form.Control
              defaultValue={""}
              className='custom-input'
              
              size='lg'
              type='text'
              placeholder='Enter test name'
              
            />
          </Form.Group>
          <Form.Group className='m-b-20'>
            <Form.Label for='courseName'>Test Instruction</Form.Label>
            <Form.Control
              defaultValue={""}
              className='custom-input'
              
              size='lg'
              type='text'
              placeholder='Enter test instruction'
              
            />
          </Form.Group>
          <span style={{ float: "right" }}>
            <Button className='tficolorbg-button' type='submit'>
              Save
            </Button>
          </span>
        </Form>
      </Modal.Body>
    </Modal>
  
  </>);
}

export default PreviewExam;
