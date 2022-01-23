import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function AddPartModal({setShowModal, showModal, setTypeId, setInstructions, addPart}) {
  return (
    <Modal
        size="lg"
        className="modal-all"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header className="modal-header" closeButton>
          Create Exam
        </Modal.Header>
        <Modal.Body className="modal-label b-0px">
          <Form onSubmit={addPart}>
            <Form.Group className="m-b-20">
              <Form.Label for="courseName">Type of Test</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => setTypeId(e.target.value)}>
                <option value="0">Multiple Choice</option>
                <option value="1">True or False</option>
                <option value="2">Identification</option>
                <option value="3">Essay</option>
                <option value="4">Enumeration</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="m-b-20">
              <Form.Label for="description">Test Instructions</Form.Label>
              <Form.Control
                defaultValue={""}
                className="custom-input"
                size="lg"
                type="text"
                placeholder="Enter test instructions"
                onChange={(e) => setInstructions(e.target.value)}
              />
            </Form.Group>
            <span style={{ float: "right" }}>
              <Button className="tficolorbg-button" type="submit">
                Save
              </Button>
            </span>
          </Form>
        </Modal.Body>
        </Modal>
  )
}
