import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";
import ExamAPI from "../../../../api/ExamAPI";

export default function AssignExam({ showModal, setShowModal, exam, id, setLoading, fetchExams, closeModal }) {
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  useEffect(() => {
    if(exam.classTest){
      let { endDate, endTime, startDate, startTime, timeLimit} = exam?.classTest;
      let startD = moment(startDate).format('YYYY-MM-DD'),
        endD = moment(endDate).format('YYYY-MM-DD');
      setEndDate(endD);
      setEndTime(endTime);
      setStartDate(startD);
      setStartTime(startTime);
      setTimeLimit(timeLimit);
    }
  }, [exam])

  const assignExam = async(e) => {
    e.preventDefault();
    const data = {
      allowLate: true,
      endDate,
      endTime,
      startDate,
      startTime,
      timeLimit,
    };
    console.log({ data }, exam);
    setLoading(true);
    if(exam.classTest){
      let response = await new ExamAPI().reAssignExam(id, exam.test.id, data)
      if(response.ok){
        toast.success("Exam assigned successfully")
        fetchExams()
        closeModal()
      }else{
        toast.error(response?.data?.errorMessage || "Something went wrong while deleting the exam")
        setLoading(false);
      }
    }
    else{
      let response = await new ExamAPI().assignExam(id, exam.test.id, data)
      if(response.ok){
        toast.success("Exam assigned successfully")
        fetchExams()
        closeModal()
      }else{
        toast.error(response?.data?.errorMessage || "Something went wrong while deleting the exam")
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      size='lg'
      className='modal-all'
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header className='modal-header' closeButton>
        {exam.classTest == null ? 'Assign Exam' :' Reassign Exam'}
      </Modal.Header>
      <Modal.Body className='modal-label b-0px'>
        <Form onSubmit={assignExam}>
        <Form.Group className='m-b-20'>
            <Form.Label for='courseName'>Start Date </Form.Label>
            <Form.Control
              defaultValue={""}
              value={startDate}
              className='custom-input'
              size='lg'
              type='date'
              placeholder='Enter test name'
              onChange={(e) => console.log(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='m-b-20'>
            <Form.Label for='courseName'>Start Time </Form.Label>
            <Form.Control
              defaultValue={""}
              value={startTime}
              className='custom-input'
              size='lg'
              type='time'
              placeholder='Enter test name'
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='m-b-20'>
            <Form.Label for='courseName'>End Date </Form.Label>
            <Form.Control
              defaultValue={""}
              value={endDate}
              className='custom-input'
              size='lg'
              type='date'
              placeholder='Enter test name'
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='m-b-20'>
            <Form.Label for='courseName'>End Time </Form.Label>
            <Form.Control
              defaultValue={""}
              value={endTime}
              className='custom-input'
              size='lg'
              type='time'
              placeholder='Enter test name'
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className='m-b-20'>
            <Form.Label for='courseName'>Time Limit</Form.Label>
            <Form.Control
              defaultValue={""}
              value={timeLimit}
              className='custom-input'
              size='lg'
              type='number'
              placeholder='Time limit'
              onChange={(e) => setTimeLimit(e.target.value)}
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
