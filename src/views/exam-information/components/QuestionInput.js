import React from "react";
import Enumeration from "./question-inputs/Enumeration";
import Essay from "./question-inputs/Essay";
import Identification from "./question-inputs/Identification";
import MultipleChoice from "./question-inputs/MultipleChoice";
import TrueOrFalse from "./question-inputs/TrueOrFalse";

export default function QuestionInput({
  number,
  part,
  question,
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
      return <Enumeration number={number} part={part} question={question} onAnswer={onAnswer}  />;
    default:
      return (
        <div>Invalid Question type: {part.questionPart.questionTypeId}</div>
      );
  }
}
