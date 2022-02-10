import React from "react";

export default function TeacherExamActions({
  exam,
  setShowModal,
  setShowEditModal,
  setShowWarning,
}) {
  return (
    <div className='exam-actions'>
      <a
        href='#assign'
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        <i class='fas fa-user-clock'></i>
      </a>
      {exam.test.classId != null && (
        <a
          href='#edit'
          onClick={(e) => {
            e.preventDefault();
            setShowEditModal(true);
          }}
        >
          <i class='fas fa-edit'></i>
        </a>
      )}
      {exam.classTest == null && (
        <>
          {exam.test.classId != null && (
            <a
              href='#delete'
              onClick={(e) => {
                e.preventDefault();
                setShowWarning(true);
              }}
            >
              <i class='fas fa-trash-alt'></i>
            </a>
          )}
        </>
      )}
    </div>
  );
}
