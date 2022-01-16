import React from 'react'

const TrueOrFalse = ({ number, part, question, onAnswer }) => {
  return (
    <div className='question-input d-flex'>
      <div className='question-input-number flex-direction-row'>{number}.</div>
      <div className='question-input-content'>
        <div className='question-input-content-title'>
          {question.question.testQuestion}
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