import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Status from "../../../../components/utilities/Status";
import { UserContext } from "../../../../context/UserContext";

export default function ExamItem({ exam }) {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  console.log({ exam });
  const {id} = useParams();

  return (
    <div className='exam-item-container'>
      <div className='exam-content'>
        <Link
          to={user.isStudent ? `/class/${id}/exam/${exam.test.id}` : "#"}
          className='exam-title'
        >
          {exam.test.testName}
        </Link>
        <p className='exam-course-name'>{exam.module?.moduleName}</p>
        <p className='exam-instruction'>{exam.test.testInstructions}</p>
        {user.isStudent && (
          <Status>{exam.isLoggedUserDone ? "Completed" : "Not Started"}</Status>
        )}
      </div>
      {user.isTeacher && (
        <div className='exam-actions'>
          <a href='#eye'>
            <i class='fas fa-eye'></i>
          </a>
          <a href='#edit'>
            <i class='fas fa-edit'></i>
          </a>
          <a href='#assign'>
            <i class='fas fa-user-clock'></i>
          </a>
          <a href='#delete'>
            <i class='fas fa-trash-alt'></i>
          </a>
        </div>
      )}
    </div>
  );
}
