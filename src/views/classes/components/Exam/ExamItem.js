import React, { useContext, useState, useEffect } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ClassesAPI from "../../../../api/ClassesAPI";
import Status from "../../../../components/utilities/Status";
import { UserContext } from "../../../../context/UserContext";
import AssignExam from "./AssignExam";
import EditExam from "./EditExam";
import PreviewExam from "./PreviewExam";

export default function ExamItem({ exam, deleteExam, setLoading, fetchExams }) {
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const { id } = useParams();
  const [showWarning, setShowWarning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewExamModal, setShowPreviewExamModal] = useState(false)
  const [testItem, setTestItem] = useState([])
  const [questionPartDto, setQuestionPartDto] = useState([]) 
  
  const getInformationExam = async (e, item) => {
    let response = await new ClassesAPI().getInformationExam(item);{
      if(response.ok){
        setTestItem(response.data)
        setQuestionPartDto(response.data.questionPartDto)
        setShowPreviewExamModal(true)
      }else{
        alert("Something went wrong while fetching Exam Item");
      }
    }
  }

  console.log('questionPartDto:', questionPartDto)

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
        <p className='exam-instruction'>{exam.test.testInstructions}</p>
        {user.isStudent && (
          <Status>{exam.isLoggedUserDone ? "Completed" : "Not Started"}</Status>
        )}
        {user.isTeacher && exam.classTest == null && (
          <Status>Unassigned</Status>
        )}
      </div>
      {user.isTeacher && (
        <div className='exam-actions'>
          {/* <Link to={`/exam_creation/${exam.test.id}`}>
            <i class='fas fa-eye'></i>
          </Link> */}

              <a href='#preview'>
                <i
                  class='fas fa-eye'
                  onClick={(e) => {
                    getInformationExam(e, exam?.test?.id)
                    // e.preventDefault();
                    // setShowPreviewExamModal(true);
                    // setTestId(exam?.test?.id)
                  }}
                ></i>
              </a>

          {exam.classTest == null && (
            <>
              <a href='#edit'>
                <i
                  class='fas fa-edit'
                  onClick={(e) => {
                    e.preventDefault();
                    setShowEditModal(true);
                  }}
                ></i>
              </a>

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
      />
      <EditExam
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        id={id}
        exam={exam}
        setLoading={setLoading}
        fetchExams={fetchExams}
      />
      <PreviewExam 
      showPreviewExamModal={showPreviewExamModal}
      setShowPreviewExamModal={setShowPreviewExamModal}
      testItem={testItem}
      questionPartDto={questionPartDto}
      />
    </div>
  );
}