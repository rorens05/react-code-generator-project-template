import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import ExamAPI from "../../../../api/ExamAPI";

export default function EditExam({
  showEditModal,
  setShowEditModal,
  onSubmit,
  id,
  exam,
  fetchExams,
  setLoading
}) {
  console.log({ exam });
  const [testInstructions, setTestInstructions] = useState(exam.test.testInstructions);
  const [testName, setTestName] = useState(exam.test.testName);
  
  const updateExam = async(e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      isShared: false,
      testInstructions,
      testName,
    }
    console.log({data})
    let response = await new ExamAPI().updateExam(exam.test.id, data)
    if(response.ok){
      toast.success("Exam updated successfully")
      setShowEditModal(false)
      fetchExams()
    }else{
      toast.error(response?.data?.errorMessage || "Something went wrong while updating the exam")
      setLoading(false)
    }
  }

  return (
    <Modal
      size='lg'
      className='modal-all'
      show={showEditModal}
      onHide={() => setShowEditModal(false)}
    >
      <Modal.Header className='modal-header' closeButton>
        Edit Exam
      </Modal.Header>
      <Modal.Body className='modal-label b-0px'>
        <Form onSubmit={updateExam}>
          <Form.Group className='m-b-20'>
            <Form.Label for='courseName'>Test Name</Form.Label>
            <Form.Control
              defaultValue={""}
              className='custom-input'
              default={testName}
              size='lg'
              type='text'
              placeholder='Enter test name'
              onChange={(e) => setTestName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='m-b-20'>
            <Form.Label for='courseName'>Test Instruction</Form.Label>
            <Form.Control
              defaultValue={""}
              className='custom-input'
              default={testInstructions}
              size='lg'
              type='text'
              placeholder='Enter test instruction'
              onChange={(e) => setTestInstructions(e.target.value)}
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
  );
}
