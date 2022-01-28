import React from "react";

export default function QuestionActions({onEdit = () => alert("Ongoing development"), onDelete = () => alert("Ongoing development")}) {
  return (
    <div className='exam-actions '>
      <a href='#delete-part' onClick={onEdit}>
        <i class='fas fa-edit'></i>
      </a>
      <a href='#delete-part' onClick={onDelete}>
        <i class='fas fa-trash-alt'></i>
      </a>
    </div>
  );
}
