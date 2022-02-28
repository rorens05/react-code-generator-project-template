import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ClassesAPI from "../../api/ClassesAPI";
import ExamAPI from "../../api/ExamAPI";
import MainContainer from "../../components/layouts/MainContainer";
import { UserContext } from "../../context/UserContext";
import ExamDetails from "./components/ExamDetails";
import ExamForm from "./components/ExamForm";

export default function ExamInformation() {
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [additionalExamInfo, setAdditionalExamInfo] = useState({});

  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const { class_id, id } = useParams();

  const getExamInformation = async () => {
    setLoading(true);
    let response = await new ExamAPI().getExamInformation(id);
    if (response.ok) {
      setExam(response.data);
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

  const onAnswer = (partId, questionId, answer) => {
    let questionPartDto = [...exam.questionPartDto];
    questionPartDto = questionPartDto.map((part) => {
      if (part.questionPart.id === partId) {
        part.questionDtos = part.questionDtos.map((question) => {
          console.log({ question });
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
    console.log({ newExam });
  };

  const completePart = (partParams) => {
    let questionPartDto = [...exam.questionPartDto];
    questionPartDto = questionPartDto.map((part) => {
      if (part.questionPart.id === partParams.questionPart.id) {
        part.isDone = true;
      }
      return part;
    });

    let newExam = { ...exam };
    newExam.questionPartDto = questionPartDto;
    setExam(newExam);
  };

  const submitPartsAnswer = async (part) => {
    console.log("SUBMIT PART", { part });
    let payload = [];
    let unique = true
    let empty = false
    if (part.questionPart.questionTypeId == 5) {

      payload = part.questionDtos.map((question) => {
        let studentAnswers = question.studentAnswer || question.choices.map(() => ({answer: ""}))

        
        studentAnswers.forEach((choice) => {
          if(studentAnswers.filter(c => c.answer == choice.answer).length > 1){
            unique = false
          }
          if(choice.answer == ""){
            empty = true
          }
        })

        return {
          answer: "",
          questionType: 5,
          questionId: question.question.id,
          enumeration: studentAnswers,
          "webEnumerationAnswers": studentAnswers.map(item =>
            item.answer
          )
        };
      });
    } else {
      payload = part.questionDtos.map((question) => {
        return {
          questionId: question.question.id,
          answer: question.studentAnswer || "",
        };
      });
    }
    
    if(empty){
      toast.error("Please answer all questions")
      return
    }
    
    if(!unique){
      toast.error("Please add unique answers")
      return
    }

    console.log({ payload });
    setLoading(true);
    let response = await new ExamAPI().submitTestPerPart(
      user?.student?.id,
      class_id,
      part.questionPart.testId,
      part.questionPart.id,
      payload
    );
    setLoading(false);
    if (response.ok) {
      completePart(part);
    } else {
      alert("Something went wrong in submitting answer");
    }
  };

  const endTest = async (e) => {
    window.onbeforeunload = undefined;
    setLoading(true);
    let response = await new ExamAPI().endTest(
      user.student?.id,
      class_id,
      id
    );
    setLoading(false);
    if (!response.ok) {
      // alert("Something went wrong in ending test");
    }
    window.location.reload();
  };

  const startExam = async () => {
    setLoading(true);
    let response = await new ExamAPI().startTest(
      user.student?.id,
      class_id,
      id
    );
    setLoading(false);

    if (response.ok) {
      setExamStarted(true);
      setRemainingTime((additionalExamInfo.classTest?.timeLimit || 0) * 60);
    } else {
      if (response.statusMessage === "Bad Request") {
        alert("This test has already been ended");
        endTest();
        getExamInformation();
      } else {
        alert("Something went wrong in starting test");
      }
    }
  };

  useEffect(() => {
    if (examStarted) {
      window.onbeforeunload = async (e) => {
        e.preventDefault();
        await endTest();
        return "";
      };
    }
  }, [examStarted]);

  useEffect(() => {
    if (user.isTeacher) return (window.location.href = "/404");
    getExamInformation();
    return () => {
      endTest();
    };
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      setTimeout(() => {
        if (!examStarted) return;
        setRemainingTime((value) => value - 1);
        if (remainingTime == 600) {
          toast.success("You only have 10 minutes left to finish the test");
        }
        if (remainingTime == 300) {
          toast.success("You only have 5 minutes left to finish the test");
        }
        if (remainingTime == 60) {
          toast.success("You only have 1 minute left to finish the test");
        }
        if (remainingTime == 10) {
          toast.success("You only have 10 seconds left to finish the test");
        }
      }, 1000);
    } else {
      if (!examStarted) return;
      endTest();
      setExamStarted(false);
    }
  }, [remainingTime, examStarted]);

  return (
    <MainContainer title='Exam Information' loading={loading}>
      <div className='page-container exam-information-container'>
        <div className='containerpages'>
          <ExamDetails
            exam={exam}
            loading={loading}
            startExam={startExam}
            remainingTime={remainingTime}
            examStarted={examStarted}
            additionalExamInfo={additionalExamInfo}
            isDoneTest={additionalExamInfo.isLoggedUserDone}
            
          />
          <ExamForm
            exam={exam}
            loading={loading}
            examStarted={examStarted}
            onAnswer={onAnswer}
            submitPartsAnswer={submitPartsAnswer}
            onSubmit={endTest}
          />
        </div>
      </div>
      <ToastContainer />
    </MainContainer>
  );
}
