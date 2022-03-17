import React from 'react'
import { Form } from 'react-bootstrap';
import ContentViewer from '../../../../components/content_field/ContentViewer';

const Identification = ({ number, part, question, onAnswer }) => {
  return (
    <div className='question-input d-flex'>
      <div className='question-input-number flex-direction-row'>{number}.</div>
      <div className='question-input-content'>
        <div className='question-input-content-title'>
          <ContentViewer>{question.question.testQuestion}</ContentViewer>
        </div>
        <div className='question-input-content-choices'>
          <div className='question-input-content-choices-item hover-none'>
            <Form.Control id="disabledTextInput" placeholder="" readOnly={part.isDone} as="textarea" className="w-100" value={question.studentAnswer} onChange={(e) => {
              onAnswer(part.questionPart.id, question.question.id, e.target.value);
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Identification