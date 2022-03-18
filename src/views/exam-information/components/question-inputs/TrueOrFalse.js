import React from 'react'
import ContentViewer from '../../../../components/content_field/ContentViewer';

const TrueOrFalse = ({ number, part, question, onAnswer }) => {
  return (
    <div className='question-input d-flex'>
      <div className='question-input-number flex-direction-row'>{number}.</div>
      <div className='question-input-content'>
        <div className='question-input-content-title'>
          <ContentViewer>{question.question.testQuestion}</ContentViewer>
        </div>
        <div className='question-input-content-choices'>
          <div className='question-input-content-choices-item' onClick={() => {
              if (!part.isDone) {
                onAnswer(part.questionPart.id, question.question.id, "TRUE")}
              }
            }>
            <div className={`question-radio ${"TRUE" === question.studentAnswer ? "active" : ""}`}><div/></div>
            <p className="question-choice-title m-0">{"TRUE"}</p>
          </div>
          <div className='question-input-content-choices-item' onClick={() => {
              if (!part.isDone) {
                onAnswer(part.questionPart.id, question.question.id, "FALSE")}
              }
            }>
            <div className={`question-radio ${"FALSE" === question.studentAnswer ? "active" : ""}`}><div/></div>
            <p className="question-choice-title m-0">{"FALSE"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueOrFalse