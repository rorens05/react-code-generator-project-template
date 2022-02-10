import moment from "moment";
import React, { useContext, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import AssignExam from "./AssignExam";
import EditExam from "./EditExam";
import ExamStatuses from "./ExamStatuses";

export default function ExamItem({ exam, deleteExam, setLoading, fetchExams }) {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const { id } = useParams();
  const [showWarning, setShowWarning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  let startDate = null;
  let endDate = null;
  if (exam.classTest) {
    startDate = new Date(exam.classTest.startDate);
    startDate.setHours(
      exam.classTest.startTime.split(":")[0],
      exam.classTest.startTime.split(":")[1]
    );
    endDate = new Date(exam.classTest.endDate);
    endDate.setHours(
      exam.classTest.endTime.split(":")[0],
      exam.classTest.endTime.split(":")[1]
    );
    console.log({ startDate, endDate });
  }

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
        <Link
          to={user.isStudent ? `/class/${id}/exam/${exam.test.id}` : `/exam_creation/${exam.test.id}`}
          className='exam-title'
        >
          {exam.test.testName}
        </Link>
        <p className='exam-course-name'>{exam.module?.moduleName}</p>
        <p className='exam-instruction '>{exam.test.testInstructions}</p>
        {startDate && <p className='exam-instruction m-0'><span className="d-inline-block" style={{width: 40}}>Start:</span> <b>{moment(startDate).format('MMMM Do YYYY, h:mm:ss a')}</b></p>}
        {endDate && <p className='exam-instruction m-0 mb-3'><span className="d-inline-block" style={{width: 40}}>End:</span> <b>{moment(endDate).format('MMMM Do YYYY, h:mm:ss a')}</b></p>}
        {<p className='exam-instruction m-0 mb-3'><span className="d-inline-block" style={{width: 80}}>Current:</span> <b>{moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}</b></p>}
        <ExamStatuses exam={exam} user={user} startDate={startDate} endDate={endDate} />
        
        
      </div>
      {user.isTeacher && (
        <div className='exam-actions'>
          {/* <Link to={`/exam_creation/${exam.test.id}`}>
            <i class='fas fa-eye'></i>
          </Link> */}
          <a href='#assign'>
            <i
              class='fas fa-user-clock'
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            ></i>
          </a>
          <a href='#edit'>
            <i
              class='fas fa-edit'
              onClick={(e) => {
                e.preventDefault();
                setShowEditModal(true);
              }}
            ></i>
          </a>
          {exam.classTest == null && (
            <>
              <a href='#assign'>
                <i
                  class='fas fa-user-clock'
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                ></i>
              </a>
              <a
                href='#delete'
                onClick={(e) => {
                  e.preventDefault();
                  setShowWarning(true);
                }}
              >
                <i class='fas fa-trash-alt'></i>
              </a>
            </>
          )}
        </div>
      )}
      <AssignExam
        showModal={showModal}
        setShowModal={setShowModal}
        id={id}
        exam={exam}
        setLoading={setLoading}
        fetchExams={fetchExams}
        closeModal={()=> setShowModal(false)}
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
