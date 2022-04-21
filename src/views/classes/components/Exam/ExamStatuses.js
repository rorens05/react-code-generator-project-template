import React from "react";
import { Link } from "react-router-dom";
import Status from "../../../../components/utilities/Status";

export default function ExamStatuses({ user, exam, startDate, endDate, noAssigned }) {
  const openModalShowResutl = (testId) => {
    console.log('testId.', testId)
  }
  return (
    <div className='exam-status'>
      {exam?.test?.classId == null ? (<Status>Created in Course</Status>) : (<Status>Created in Class</Status>)}
      {user.isTeacher && exam?.classTest == null && !noAssigned && <Status>Unassigned</Status>}
      {exam?.classTest && (
        <>
          {startDate > new Date() && <Status>Upcoming</Status>}
          {startDate < new Date() && endDate > new Date() && <Status>Ongoing</Status>}
          {endDate < new Date() && <Status>Ended</Status>}
        </>
      )}
      {user.isStudent && (
        <>
          <Status>{exam?.isLoggedUserDone ? "Completed" : "Not Completed"}</Status>
          <Status>{exam?.classTest?.showAnalysis ? <div onClick={() => openModalShowResutl(exam?.test?.id)}> Show Result </div> : ''}</Status>
        </> 
      )}
      {user.isTeacher && exam?.test?.classId && exam?.test?.isShared && <Status>Shared</Status>}
    </div>
  );
}
