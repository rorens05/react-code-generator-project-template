import React from "react";
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

export default function TeacherExamActions({
  exam,
  setShowModal,
  setShowEditModal,
  setShowWarning,
  toggleShare,
  getInformationExam
}) {
  

  return (
    <div className='exam-actions'>
      <a href='#preview'
        title={"Preview"}
      >
        <i
          class='fas fa-eye'
          onClick={(e) => {
            getInformationExam(e, exam?.test?.id)
          }}
        ></i>
      </a>
      {exam.test.classId && (
        <a
          href='#share'
          title={exam.test.isShared ? "Unshare" : "Share"}
          onClick={(e) => {
            e.preventDefault();
            toggleShare();
          }}
        >
          <i class={`fas fa-share ${exam.test.isShared && "rotate"}`}></i>
        </a>
      ) }
      <a
        href='#assign'
        title='Assign'
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        <i class='fas fa-user-clock'></i>
      </a>
      {exam.test.classId != null && !exam.test.isShared && (
        <a
          href='#edit'
          title="Edit"
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
          {exam.test.classId != null && !exam.test.isShared && (
            <a
              href='#delete'
              title="Delete"
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
