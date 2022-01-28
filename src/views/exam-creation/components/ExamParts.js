import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { displayQuestionType } from "../../../utils/displayQuestionType";
import Questions from "./questions/Questions";

export default function ExamParts({
  exam,
  deletePart,
  getExamInformation,
  setLoading,
}) {
  return (
    <Accordion defaultActiveKey='0' className='exam-part-creation'>
      {exam.questionPartDto.map((part, index) => (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header>
            <div className='accordion-block-header'>
              <div className='header-content'>
                <h3>{`${part.questionPart.instructions} `}</h3>
                <p>{displayQuestionType(part.questionPart.questionTypeId)}</p>
                <span>{`${part.questionDtos.length} Question(s)`}</span>
              </div>
            </div>
          </Accordion.Header>
          <div className='exam-actions exam-absolute-actions'>
            <a href='#edit-part' onClick={(e) => alert("Ongoing Development")}>
              <i class='fas fa-edit'></i>
            </a>
            <a href='#delete-part' onClick={(e) => deletePart(e, part)}>
              <i class='fas fa-trash-alt'></i>
            </a>
          </div>
          <Accordion.Body>
            <Questions part={part} 
            getExamInformation={getExamInformation}
            setLoading={setLoading} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
      {exam.questionPartDto.length == 0 && (
        <p>Exam parts will be displayed here...</p>
      )}
    </Accordion>
  );
}
