import React from "react";
import { Button } from "react-bootstrap";
import ExamTimer from "./ExamTimer";

const ExamParts = ({exam}) => {
  return exam.questionPartDto.map((part, index) => (
    <div
      className='exam-parts-container default-item-container'
      key={index}
    >
      <p className='primary-title' style={{ fontSize: 24 }}>
        {part.questionPart.instructions}
      </p>
      <p
        className='secondary-title'
        style={{ fontSize: 16 }}
      >{`${part.questionDtos.length} Question(s)`}</p>
    </div>
  ))
}

export default function ExamDetails({ exam, loading, remainingTime, startExam, examStarted }) {
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
          {!examStarted && <Button
            className='btn btn-primary my-4 mx-3'
            variant='primary'
            size='lg'
            onClick={() => startExam()}
          >
            START TEST
          </Button>}
        </div>
        {examStarted && <ExamTimer remainingTime={remainingTime} />}
        
      </div>
      <hr />
      <p className='secondary-title mt-4'>Exam Parts</p>
      { !examStarted && <ExamParts exam={exam}/>}
    </div>
  ) : (
    <div>Loading Exam Information...</div>
  );
}
