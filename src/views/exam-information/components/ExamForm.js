import React from "react";
import { Accordion } from "react-bootstrap";
import { integerToRoman } from "../../../utils/integerToRoman";

export default function ExamForm({exam, onChange, onSubmit, examStarted}) {
  if(exam == null) return <div/>
  if(!examStarted) return <div/>
  return (
    <div>
      {exam.questionPartDto.map((part, index) => (
        <Accordion defaultActiveKey={null} key={index}>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            <div>
              <p className='primary-title' style={{ fontSize: 24 }}>
                {`${integerToRoman(index + 1)} ${part.questionPart.instructions}`}
              </p>
              <p
                className='secondary-title'
                style={{ fontSize: 16 }}
              >{`${part.questionDtos.length} Question(s)`}</p>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      ))}
    </div>
  );
}
