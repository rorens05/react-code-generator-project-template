import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExamAPI from "../../api/ExamAPI";
import MainContainer from "../../components/layouts/MainContainer";
import ExamDetails from "./components/ExamDetails";
import ExamForm from "./components/ExamForm";

export default function ExamInformation() {
  const {id} = useParams()
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0)
  const [examStarted, setExamStarted] = useState(false)

  const getExamInformation = async () => {
    setLoading(true);
    let response = await new ExamAPI().getExamInformation(id);
    setLoading(false);
    if (response.ok) {
      setExam(response.data);
    } else {
      alert("Something went wrong while fetching exam information");
    }
  };

  
  const onAnswer = (partId, questionId, answer) => {
    console.log({partId, questionId, answer});
    let questionPartDto = [...exam.questionPartDto];
    questionPartDto = questionPartDto.map(part => {
      console.log({part});
      if (part.questionPart.id === partId) {
        part.questionDtos = part.questionDtos.map(question => {
          console.log({question});
          if (question.question.id === questionId) {
            question.studentAnswer = answer;
          }
          return question;
        });
      }
      return part;
    });
    let newExam = { ...exam };
    newExam.questionPartDto = questionPartDto;
    setExam(newExam);
    console.log({newExam});
  };

  const startExam = () => {
    setExamStarted(true)
    setRemainingTime(600)
  }

  useEffect(() => {
    getExamInformation();
  }, []);

  useEffect(() => {
    if(remainingTime > 0){
      // setTimeout(() => {
      //   setRemainingTime(value => value - 1)
      // }, 1000);
    }else{
      setExamStarted(false)
    }
  }, [remainingTime]);

  return (
    <MainContainer title='Exam Information' loading={loading}>
      <div className='page-container exam-information-container'>
        <div className='containerpages'>
          <ExamDetails exam={exam} loading={loading} startExam={startExam} remainingTime={remainingTime} examStarted={examStarted}/>
          <ExamForm exam={exam} loading={loading} examStarted={examStarted} onAnswer={onAnswer}/>
        </div>
      </div>
    </MainContainer>
  );
}
