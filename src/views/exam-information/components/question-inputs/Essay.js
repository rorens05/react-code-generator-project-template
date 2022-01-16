import React from 'react'
import { Form } from 'react-bootstrap';

const Essay = ({ number, part, question, onAnswer }) => {
  return (
    <div className='question-input d-flex'>
      <div className='question-input-number flex-direction-row'>{number}.</div>
      <div className='question-input-content'>
        <div className='question-input-content-title'>
          {question.question.testQuestion}
        </div>
        <div className='question-input-content-choices'>
          <div className='question-input-content-choices-item hover-none'>
            <Form.Control id="disabledTextInput" placeholder="" as="textarea" className="w-100" value={question.studentAnswer} onChange={(e) => {
              onAnswer(part.questionPart.id, question.question.id, e.target.value);
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Essay