import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import ExamAPI from "../../../../api/ExamAPI";
import QuestionActions from "./QuestionActions";

const EssayForm = ({
  showModal,
  setShowModal,
  onSubmit,
  question,
  setQuestion,
  rate,
  setRate,
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

export default function Essay({
  part,
  questionTypeId,
  getExamInformation,
  setLoading,
  deleteQuestion,
}) {
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [rate, setRate] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const { id } = useParams();

  const submitQuestion = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      questionTypeId,
      questionPartId: part.questionPart.id,
      testQuestion: question,
      questionImage: "",
      rate,
    };
    if(selectedId != null){
      updateQuestion(selectedId, data)
    }else{
      addQuestion(data)
    }
  };

  const updateQuestion = async (questionId, data) => {
    let response = await new ExamAPI().editEssay(questionId, data);
    if (response.ok) {
      setShowModal(false);
      toast.success("Question updated successfully");
      getExamInformation()
      setRate(1)
      setQuestion("")
      setSelectedId(null)
    } else {
      toast.error(
        response.data?.errorMessage ||
          "Something went wrong while updating the question"
      );
      setLoading(false)
    }
  }

  const addQuestion = async (data) => {
    let response = await new ExamAPI().addEssay(id, part.questionPart.id, data);
    if (response.ok) {
      setShowModal(false);
      toast.success("Question added successfully");
      getExamInformation()
      setRate(1)
      setQuestion("")
      setSelectedId(null)
    } else {
      toast.error(
        response.data?.errorMessage ||
          "Something went wrong while creating the part"
      );
      setLoading(false)
    }
  }

  return (
    <div>
      {part.questionDtos.map((question, index) => (
        <div key={index} className='d-flex hover-link p-3 rounded'>
          <div style={{ flex: 1 }}>
            <p className='primary-title'>
              {index + 1}. {question.question.testQuestion}
            </p>
            <p className=''>Point(s): {question.question.rate}</p>
          </div>
          <QuestionActions onDelete={(e) => deleteQuestion(e, question.question.id)} onEdit={(e) => {
            setSelectedId(question.question.id)
            setQuestion(question.question.testQuestion)
            setRate(question.question.rate)
            setShowModal(true)
          }}/>
        </div>
      ))}
      <Button
        className='tficolorbg-button'
        type='submit'
        onClick={() => {
          setQuestion("")
          setRate("")
          setShowModal(true)
        }}
      >
        Add question 
      </Button>
      <EssayForm
        showModal={showModal}
        setShowModal={setShowModal}
        question={question}
        setQuestion={setQuestion}
        rate={rate}
        setRate={setRate}
        onSubmit={submitQuestion}
      />
    </div>
  );
}
