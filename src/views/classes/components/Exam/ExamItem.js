import React, { useContext, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Status from "../../../../components/utilities/Status";
import { UserContext } from "../../../../context/UserContext";

export default function ExamItem({ exam, deleteExam }) {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  console.log({ exam });
  const { id } = useParams();
  const [showWarning, setShowWarning] = useState(false);
  return (
    <div className="exam-item-container">
      <SweetAlert
        warning
        showCancel
        show={showWarning}
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={async (e) => {
          await deleteExam(exam.test.id);
          setShowWarning(false);
        }}
        onCancel={() => setShowWarning(false)}
        focusCancelBtn
      >
        You will not be able to recover this exam!
      </SweetAlert>
      <div className="exam-content">
        <Link
          to={user.isStudent ? `/class/${id}/exam/${exam.test.id}` : "#"}
          className="exam-title"
        >
          {exam.test.testName}
        </Link>
        <p className="exam-course-name">{exam.module?.moduleName}</p>
        <p className="exam-instruction">{exam.test.testInstructions}</p>
        {user.isStudent && (
          <Status>{exam.isLoggedUserDone ? "Completed" : "Not Started"}</Status>
        )}
        {user.isTeacher && exam.classTest == null && (
          <Status>Unassigned</Status>
        )}
      </div>
      {user.isTeacher && exam.classTest == null && (
        <div className="exam-actions">
          <Link to={`/class/${id}/exam_creation/${exam.test.id}`}>
            <i class="fas fa-eye"></i>
          </Link>
          <a href="#edit">
            <i class="fas fa-edit"></i>
          </a>

          <a href="#assign">
            <i class="fas fa-user-clock" onClick={() => alert("testing")}></i>
          </a>

          <a
            href="#delete"
            onClick={(e) => {
              e.preventDefault();
              setShowWarning(true);
            }}
          >
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      )}
    </div>
  );
}
