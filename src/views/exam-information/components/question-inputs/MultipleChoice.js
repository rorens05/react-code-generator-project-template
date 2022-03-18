import React from "react";
import ContentViewer from "../../../../components/content_field/ContentViewer";

const MultipleChoice = ({ number, part, question, onAnswer }) => {
  return (
    <div className='question-input d-flex'>
      <div className='question-input-number flex-direction-row'>{number}.</div>
      <div className='question-input-content'>
        <div className='question-input-content-title'>
          <ContentViewer>{question.question.testQuestion}</ContentViewer>
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
                  <ContentViewer>{choice.testChoices}</ContentViewer>
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
