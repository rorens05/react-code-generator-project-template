import React from "react";
import { Accordion } from "react-bootstrap";
import { integerToRoman } from "../../../utils/integerToRoman";
import QuestionInput from "./QuestionInput";

export default function ExamForm({ exam, onAnswer, onSubmit, examStarted }) {
  if (exam == null) return <div />;
  if (!examStarted) return <div />;
  return (
    <div>
      {exam.questionPartDto.map((part, index) => (
        <Accordion defaultActiveKey={null} key={index}>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              <div>
                <p className='primary-title' style={{ fontSize: 24 }}>
                  {`${integerToRoman(index + 1)} ${
                    part.questionPart.instructions
                  }`}
                </p>
                <p
                  className='secondary-title'
                  style={{ fontSize: 16 }}
                >{`${part.questionDtos.length} Question(s)`}</p>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {part.questionDtos.map((question, index) => {
                return (
                  <QuestionInput
                    number={index + 1}
                    part={part}
                    question={question}
                    key={index}
                    onAnswer={onAnswer}
                    onSubmit={onSubmit}
                  />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
}
