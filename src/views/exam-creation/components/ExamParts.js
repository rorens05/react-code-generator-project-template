import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { displayQuestionType } from "../../../utils/displayQuestionType";

export default function ExamParts({ exam, deletePart }) {
  return (
    <Accordion defaultActiveKey="0" className="exam-part-creation">
      {exam.questionPartDto.map((part, index) => (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header>
            <div className="accordion-block-header">
              <div className="header-content">
                <h3>
                  {`${part.questionPart.instructions} `}
                </h3>
                <p>
                  {displayQuestionType(part.questionPart.questionTypeId)}
                </p>
                <span>{`${part.questionDtos.length} Question(s)`}</span>
              </div>
              <div className="exam-actions">
                <a href="#delete-part" onClick={e => deletePart(e, part)}>
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
              

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
      ))}
    </Accordion>
  );
}

{
  /* <div
      className='exam-parts-container default-item-container'
      key={index}
    >
      <p className='primary-title' style={{ fontSize: 24 }}>
        
      </p>
      <p
        className='secondary-title'
        style={{ fontSize: 16 }}
      >{`${part.questionDtos.length} Question(s)`}</p>
    </div> */
}
