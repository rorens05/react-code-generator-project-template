import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ClassesAPI from "../../api/ClassesAPI";
import ExamAPI from "../../api/ExamAPI";
import MainContainer from "../../components/layouts/MainContainer";
import { UserContext } from "../../context/UserContext";
import AddPartModal from "./components/AddPartModal";
import ExamCreationDetails from "./components/ExamCreationDetails";

export default function ExamCreation() {
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [additionalExamInfo, setAdditionalExamInfo] = useState({});
  const [showModal, setShowModal] = useState(false)
  const [instructions, setInstructions] = useState("")
  const [typeId, setTypeId] = useState(1)
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const { class_id, id } = useParams();

  const getExamInformation = async () => {
    setLoading(true);
    let response = await new ExamAPI().getExamInformation(id);
    if (response.ok) {
      let tempExam = response.data
      response = await new ExamAPI().getParts(id)
      console.log({response, tempExam})
      response.data.forEach(item => {
        if(!tempExam.questionPartDto.map(temp_part => temp_part.questionPart.id).includes(item.id)){
          tempExam.questionPartDto.push({questionPart: item, questionDtos: []})
        }
      })
      
      setExam(tempExam);
    } else {
      alert("Something went wrong while fetching exam information");
    }
    response = await new ExamAPI().getExams(class_id);
    setLoading(false);
    if (response.ok) {
      const examInfo = response.data.find(
        (item) => item.test.id.toString() === id.toString()
      );
      console.log({ examInfo });
      setAdditionalExamInfo(examInfo);
      setRemainingTime((examInfo.classTest?.timeLimit || 0) * 60);
    } else {
      alert("Something went wrong while fetching exams");
    }
  };
  
  const addPart = async(e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      instructions
    }
    let response = await new ExamAPI().addPart(id, typeId, data)
    if(response.ok){
      toast.success("Part created")
      getExamInformation()
    }else{
      toast.error(response.data?.errorMessage || "Something went wrong while creating the part")
    }
    setLoading(false)
  }

  const deletePart = async(e, part) => {
    e.preventDefault()
    console.log({part})
    alert(part.questionPart.id)
  }


  useEffect(() => {
    if (user.isStudent) return (window.location.href = "/404");
    getExamInformation();
    return () => {

    };
  }, []);

  return (
    <MainContainer title='Exam Information' loading={loading}>
      <div className='page-container exam-information-container'>
        <div className='containerpages'>
          <ExamCreationDetails
            exam={exam}
            loading={loading}
            remainingTime={remainingTime}
            examStarted={examStarted}
            isDoneTest={additionalExamInfo.isLoggedUserDone}
            setShowModal={setShowModal}
            deletePart={deletePart}
          />
        </div>
      </div>
      <AddPartModal 
        setShowModal={setShowModal}
        showModal={showModal}
        setTypeId={setTypeId}
        setInstructions={setInstructions}
        addPart={addPart}/>
    </MainContainer>
  );
}
