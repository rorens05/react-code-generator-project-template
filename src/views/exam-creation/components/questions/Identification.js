import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import ExamAPI from "../../../../api/ExamAPI";
import QuestionActions from "./QuestionActions";

const IdentificationForm = ({
  showModal,
  setShowModal,
  onSubmit,
  question,
  setQuestion,
  rate,
  setRate,
  answer,
  setAnswer,
}) => {
  return (
    <Modal
      size='lg'
      className='modal-all'
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header className='modal-header' closeButton>
        Question Form
      </Modal.Header>
      <Modal.Body className='modal-label b-0px'>
        <Form onSubmit={onSubmit}>
          <Form.Group className='m-b-20'>
            <Form.Label for='question'>Question</Form.Label>
            <Form.Control
              defaultValue={""}
              value={question}
              className='custom-input'
              size='lg'
              type='text'
              placeholder='Enter test instructions'
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='m-b-20'>
            <Form.Label for='question'>Rate</Form.Label>
            <Form.Control
              defaultValue={""}
              value={rate}
              className='custom-input'
              size='lg'
              type='number'
              placeholder='Enter test instructions'
              onChange={(e) => setRate(e.target.value)}
            />
          </Form.Group>
          <hr />
          <Form.Group className='m-b-20'>
            <Form.Label for='question'>Answer</Form.Label>
            <Form.Control
              defaultValue={""}
              value={answer}
              className='custom-input'
              size='lg'
              type='text'
              placeholder='Enter test instructions'
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Form.Group>
          <span style={{ float: "right" }}>
            <Button className='tficolorbg-button' type='submit'>
              Save
            </Button>
          </span>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default function Identification({
  part,
  questionTypeId,
  getExamInformation,
  setLoading,
  deleteQuestion,
}) {
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [rate, setRate] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const { id } = useParams();

  const submitQuestion = async (e) => {
    e.preventDefault();
    console.log({selectedQuestion})
    setLoading(true);
    const data = {
      question: {
        questionTypeId,
        questionPartId: part.questionPart.id,
        testQuestion: question,
        questionImage: "",
        rate,
      },
      answer,
    };
    if (selectedQuestion != null) {
      updateQuestion(selectedQuestion, data);
    } else {
      addQuestion(data);
    }
  };

  const updateQuestion = async (selectedQuestion, data) => {
    let response = await new ExamAPI().editIdentification(
      selectedQuestion.question.id,
      data.question
    );
    if (response.ok) {
      response = await new ExamAPI().editIdentificationAnswer(selectedQuestion.choices[0].id, {
        isCorrect: true,
        testChoices: data.answer,
      });
      if (response.ok) {
        setShowModal(false);
        toast.success("Question updated successfully");
        getExamInformation();
        setRate(1);
        setQuestion("");
        setSelectedQuestion(null);
      }else{
        toast.error(
          response.data?.errorMessage ||
            "Something went wrong while updating the question"
        );
        setLoading(false);
      }
    } else {
      toast.error(
        response.data?.errorMessage ||
          "Something went wrong while updating the question"
      );
      setLoading(false);
    }
  };

  const addQuestion = async (data) => {
    let response = await new ExamAPI().addIdentification(
      id,
      part.questionPart.id,
      data
    );
    if (response.ok) {
      setShowModal(false);
      toast.success("Question added successfully");
      getExamInformation();
      setRate(1);
      setQuestion("");
      setSelectedQuestion(null);
    } else {
      toast.error(
        response.data?.errorMessage ||
          "Something went wrong while creating the part"
      );
      setLoading(false);
    }
  };

  return (
    <div>
      {part.questionDtos.map((question, index) => (
        <div key={index} className='d-flex hover-link p-3 rounded'>
          <div style={{ flex: 1 }}>
            <p className='primary-title'>
              {index + 1}. {question.question.testQuestion}
            </p>
            <p className=''>Answer: {question.answer}</p>
            <p className=''>Point(s): {question.question.rate}</p>
          </div>
          <QuestionActions
            onDelete={(e) => deleteQuestion(e, question.question.id)}
            onEdit={(e) => {
              setSelectedQuestion(question);
              setQuestion(question.question.testQuestion);
              setAnswer(question.answer);
              setRate(question.question.rate);
              setShowModal(true);
            }}
          />
        </div>
      ))}
      <Button
        className='tficolorbg-button'
        type='submit'
        onClick={() => {
          setSelectedQuestion(null)
          setQuestion("");
          setRate("");
          setAnswer("");
          setShowModal(true);
        }}
      >
        Add question
      </Button>
      <IdentificationForm
        showModal={showModal}
        setShowModal={setShowModal}
        question={question}
        setQuestion={setQuestion}
        rate={rate}
        setRate={setRate}
        answer={answer}
        setAnswer={setAnswer}
        onSubmit={submitQuestion}
      />
    </div>
  );
}
