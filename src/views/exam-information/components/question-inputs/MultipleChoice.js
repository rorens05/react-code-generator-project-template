import React from "react";

const MultipleChoice = ({ number, part, question, onAnswer }) => {
  return (
    <div className='question-input d-flex'>
      <div className='question-input-number flex-direction-row'>{number}.</div>
      <div className='question-input-content'>
        <div className='question-input-content-title'>
          {question.question.testQuestion}
        </div>
        <div className='question-input-content-choices'>
          {question.choices.map((choice, index) => {
            return (
              <div
                className='question-input-content-choices-item'
                key={index}
                onClick={() => {
                  if (!part.isDone) {
                    onAnswer(
                      part.questionPart.id,
                      question.question.id,
                      choice.testChoices
                    );
                  }
                }}
              >
                <div
                  className={`question-radio ${
                    choice.testChoices === question.studentAnswer
                      ? "active"
                      : ""
                  }`}
                >
                  <div />
                </div>
                <p className='question-choice-title m-0'>
                  {choice.testChoices}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
