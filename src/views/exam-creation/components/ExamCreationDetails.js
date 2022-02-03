import React from "react";
import { Button } from "react-bootstrap";
import ExamParts from "./ExamParts";

export default function ExamCreationDetails({
  exam,
  selectedPart,
  setSelectedPart,
  getExamInformation,
  setLoading,
  setShowModal,
  deletePart,
}) {
  return exam != null ? (
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
        onClick={() => {
          setSelectedPart(null)
          setShowModal(true)
        }}
      >
        Add Part
      </Button>
      <ExamParts
        selectedPart={selectedPart}
        setSelectedPart={setSelectedPart}
        exam={exam}
        deletePart={deletePart}
        getExamInformation={getExamInformation}
        setLoading={setLoading}
        setShowModal={setShowModal}
      />
    </div>
  ) : (
    <div>Loading Exam Information...</div>
  );
}
