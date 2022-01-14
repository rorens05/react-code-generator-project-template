import React from "react";
import { Link } from "react-router-dom";

export default function ExamItem({exam}) {
  return (
    <div className='exam-item-container'>
      <div className='exam-content'>
        <Link to={`/exam/${exam.test.id}`} className="exam-title">{exam.test.testName}</Link>
        <p className="exam-course-name">{exam.module?.moduleName}</p>
        <p className="exam-instruction">{exam.test.testInstructions}</p>
      </div>
      <div className='exam-actions'>
        <a href="#eye"><i class='fas fa-eye'></i></a>
        <a href="#edit"><i class='fas fa-edit'></i></a>
        <a href="#assign"><i class='fas fa-user-clock'></i></a>
        <a href="#delete"><i class='fas fa-trash-alt'></i></a>
      </div>
    </div>
  );
}
