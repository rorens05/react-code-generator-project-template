import React from "react";
import Essay from "./question-inputs/Essay";
import Identification from "./question-inputs/Identification";
import MultipleChoice from "./question-inputs/MultipleChoice";
import TrueOrFalse from "./question-inputs/TrueOrFalse";


const Enumeration = ({ number }) => {
  return <div>{number} This is enumeration</div>;
};

export default function QuestionInput({
  number,
  part,
  question,
  key,
  onAnswer = () => {},
  onSubmit = () => {},
}) {
  switch (part.questionPart.questionTypeId) {
    case 1:
      return <MultipleChoice number={number} part={part} question={question} onAnswer={onAnswer}/>;
    case 2:
      return <TrueOrFalse number={number} part={part} question={question} onAnswer={onAnswer} />;
    case 3:
      return <Identification number={number} part={part} question={question} onAnswer={onAnswer} />;
    case 4:
      return <Essay number={number} part={part} question={question} onAnswer={onAnswer}  />;
    case 5:
      return <Enumeration number={number} />;
    default:
      return (
        <div>Invalid Question type: {part.questionPart.questionTypeId}</div>
      );
  }
}
