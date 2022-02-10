import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import ExamAPI from "../../../../api/ExamAPI";
import QuestionActions from "./QuestionActions";

const TrueOrFalseForm = ({
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
              placeholder='Enter test question'
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='m-b-20'>
            <Form.Label for='question'>Points</Form.Label>
            <Form.Control
              defaultValue={""}
              value={rate}
              className='custom-input'
              size='lg'
              type='number'
              placeholder='Enter test points'
              onChange={(e) => setRate(e.target.value)}
            />
          </Form.Group>
          <hr />
          <Form.Group className='m-b-20'>
            <Form.Label for='question'>Answer</Form.Label>
            {/* <Form.Control
              defaultValue={""}
              value={answer}
              className='custom-input'
              size='lg'
              type='text'
              placeholder='Enter test instructions'
              onChange={(e) => setAnswer(e.target.value)}
            /> */}
            <Form.Select
              aria-label='Default select example'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              <option value='true'>True</option>
              <option value='false'>False</option>
            </Form.Select>
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

export default function TrueOrFalse({
  part,
  questionTypeId,
  getExamInformation,
  setLoading,
  deleteQuestion,
  editable,
}) {
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [rate, setRate] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState("true");
  const { id } = useParams();

  const submitQuestion = async (e) => {
    e.preventDefault();
    console.log({ selectedQuestion });
    setLoading(true);
    const data = {
      question: {
        testQuestion: question,
        rate,
      },
      answer,
    };
    if (selectedQuestion != null) {
      if(rate > 0 && rate < 101){
        updateQuestion(selectedQuestion, data);
      }else{
        setLoading(false)
        toast.error('Rate should be greater than 1 and less than 100.')
      }
    } else {
      if(rate > 0 && rate < 101){
        addQuestion(data);
      }else{
        setLoading(false)
        toast.error('Rate should be greater than 1 and less than 100.')
      }
    }
  };

  const updateQuestion = async (selectedQuestion, data) => {
    let response = await new ExamAPI().editTrueOrFalse(
      selectedQuestion.question.id,
      data.question
    );
    if (response.ok) {
      response = await new ExamAPI().editTrueOrFalseAnswer(
        selectedQuestion.choices[0].id,
        {
          isCorrect: true,
          testChoices: data.answer,
        }
      );
      if (response.ok) {
        setShowModal(false);
        toast.success("Question updated successfully");
        getExamInformation();
        setRate(1);
        setQuestion("");
        setAnswer("true");
        setSelectedQuestion(null);
      } else {
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
    let response = await new ExamAPI().addTrueOrFalse(
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
      {editable && (
        <Button
          className='tficolorbg-button'
          type='submit'
          onClick={() => {
            setSelectedQuestion(null);
            setQuestion("");
            setRate("");
            setAnswer("true");
            setShowModal(true);
          }}
        >
          Add question
        </Button>
      )}
      <TrueOrFalseForm
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
