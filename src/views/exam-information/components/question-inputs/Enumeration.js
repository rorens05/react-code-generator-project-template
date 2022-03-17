import React from "react";
import { Button, Form } from "react-bootstrap";
import ContentViewer from "../../../../components/content_field/ContentViewer";

const Enumeration = ({ number, part, question, onAnswer }) => {
  return (
    <div className='question-input d-flex'>
      <div className='question-input-number flex-direction-row'>{number}.</div>
      <div className='question-input-content'>
        <div className='question-input-content-title'>
        <ContentViewer>{question.question.testQuestion}</ContentViewer>
        </div>
        <div className='question-input-content-choices'>
          {(question.studentAnswer || question.choices.map(() => ({answer: ""}))).map((item, index) => {
            let tempAnswer = [...(question.studentAnswer || question.choices.map(() => ({answer: ""})))]
            return (
              <Form.Control
                key={index}
                id='disabledTextInput'
                placeholder=''
                readOnly={part.isDone}
                className='w-100 my-3'
                value={item.answer}
                onChange={(e) => {
                  tempAnswer[index].answer = e.target.value;
                  onAnswer(part.questionPart.id, question.question.id, tempAnswer);
                }}
              />
            );
          })}
          {/* {!part.isDone && (
            <Button
              className='btn btn-primary '
              variant='primary'
              onClick={() => {
                onAnswer(part.questionPart.id, question.question.id, [...(question.studentAnswer || []), 
                  {
                    answer: "",
                  },
                ]);
              }}
            >
              Add answer
            </Button>
          )} */}
          
        </div>
      </div>
    </div>
  );
};

export default Enumeration;
