import React from "react";
import { Button } from "react-bootstrap";
import ExamParts from "./ExamParts";


export default function ExamCreationDetails({ exam, loading, setShowModal, deletePart }) {
  return exam != null && !loading ? (
    <div className='exam-information-container'>
      <div className='d-flex justify-content-between '>
        <div>
          <p style={{ fontSize: 36, color: "#707070", margin: 0 }}>
            Exam Information
          </p>
          <p className='primary-title' style={{ fontSize: 24 }}>
            {exam.test.testName}
          </p>
          <p className='secondary-title mb-2'>{`${exam.totalItems} Total Item(s)`}</p>
        </div>
      </div>
      <hr />
      <p className='secondary-title mt-4'>Exam Parts</p>
        <Button
            className='btn btn-primary my-4'
            variant='primary'
            size='lg'
            onClick={() => setShowModal(true)}
          >
            Add Part
        </Button>
      <ExamParts exam={exam} deletePart={deletePart}/>
    </div>
  ) : (
    <div>Loading Exam Information...</div>
  );
}
