import moment from "moment";
import React, { useContext, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import getStartAndEndDateFromClassTest from "../../../../utils/getStartAndEndDateFromClassTest";
import AssignExam from "./AssignExam";
import EditExam from "./EditExam";
import ExamItemContent from "./ExamItemContent";
import ExamStatuses from "./ExamStatuses";
import TeacherExamActions from "./TeacherExamActions";

export default function ExamItem({ exam, deleteExam, setLoading, fetchExams }) {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const { id } = useParams();
  const [showWarning, setShowWarning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const {startDate, endDate} = getStartAndEndDateFromClassTest(exam)

  return (
    <div className='exam-item-container'>
      <SweetAlert
        warning
        showCancel
        show={showWarning}
        confirmBtnText='Yes, delete it!'
        confirmBtnBsStyle='danger'
        title='Are you sure?'
        onConfirm={async (e) => {
          await deleteExam(exam.test.id);
          setShowWarning(false);
        }}
        onCancel={() => setShowWarning(false)}
        focusCancelBtn
      >
        You will not be able to recover this exam!
      </SweetAlert>
      <div className='exam-content'>
        <ExamItemContent
          id={id}
          exam={exam}
          user={user}
          startDate={startDate}
          endDate={endDate}
        />
        <ExamStatuses
          exam={exam}
          user={user}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      {user.isTeacher && (
        <TeacherExamActions
          exam={exam}
          setShowModal={setShowModal}
          setShowEditModal={setShowEditModal}
          setShowWarning={setShowWarning}
        />
      )}
      <AssignExam
        showModal={showModal}
        setShowModal={setShowModal}
        id={id}
        exam={exam}
        setLoading={setLoading}
        fetchExams={fetchExams}
        closeModal={() => setShowModal(false)}
      />
      <EditExam
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        id={id}
        exam={exam}
        setLoading={setLoading}
        fetchExams={fetchExams}
      />
    </div>
  );
}
