import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import ExamAPI from "../../../../api/ExamAPI";
import DEFAULT_CHOICES from "../../../../contants/default-choices";
import QuestionActions from "./QuestionActions";

const MultipleChoiceForm = ({
  showModal,
  setShowModal,
  onSubmit,
  question,
  setQuestion,
  rate,
  setRate,
  choices,
  setChoices,
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
            <Form.Label for='question'>Choices</Form.Label>
            <div>
              {choices.map((choice, index) => {

                const onChoiceTextChange = (key, value) => {
                  console.log({key, value})
                  const tempChoices = choices.map((choice, i) => {
                    if (i === key) {
                      return {
                        ...choice,
                        testChoices: value,
                      };
                    }
                    return choice;
                  })
                  setChoices([...tempChoices])
                }

                const onChoiceAnswerChange = (key) => {
                  console.log({key})
                  const tempChoices = choices.map((choice, i) => {
                    if (i === key) {
                      return {
                        ...choice,
                        isCorrect: true,
                      };
                    }
                    return {
                      ...choice,
                      isCorrect: false,
                    };
                  })
                  setChoices([...tempChoices])
                }


                return (
                  <div
                    key={index}
                    className={`choice-item ${choice.isCorrect && "active"}`}
                  >
                    <div
                      onClick={() => onChoiceAnswerChange(index)}
                      className={`hover-link question-radio ${
                        choice.isCorrect && "active"
                      }`}
                    >
                      <div />
                    </div>
                    <Form.Control
                      defaultValue={""}
                      value={choice.testChoices}
                      className='custom-input'
                      size='lg'
                      type='text'
                      placeholder='Enter Choice'
                      onChange={(e) => onChoiceTextChange(index, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
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

export default function MultipleChoice({
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
  const [choices, setChoices] = useState(DEFAULT_CHOICES);
  const { id } = useParams();

  const submitQuestion = async (e) => {
    e.preventDefault();
    console.log({ selectedQuestion });
    setLoading(true);
    const data = {
      question: {
        questionTypeId,
        questionPartId: part.questionPart.id,
        testQuestion: question,
        questionImage: "",
        rate,
      },
      choices,
    };
    if (selectedQuestion != null) {
      updateQuestion(selectedQuestion, data);
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
    setLoading(true);
    let response = await new ExamAPI().editMultipleChoice(
      selectedQuestion.question.id,
      data.question
    );
    if (response.ok) {
      for (let index = 0; index < data.choices.length; index++) {
        const choice = data.choices[index];
        await new ExamAPI().editMultipleChoiceAnswer(choice.id, choice);
      }
      setShowModal(false);
      toast.success("Question updated successfully");
      getExamInformation();
      setRate(1);
      setQuestion("");
      setSelectedQuestion(null);
    } else {
      toast.error(
        response.data?.errorMessage ||
          "Something went wrong while updating the question"
      );
      setLoading(false);
    }
  };

  const addQuestion = async (data) => {
    let response = await new ExamAPI().addMultipleChoice(
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
      setAnswer("");
      setSelectedQuestion(null);
      setChoices(DEFAULT_CHOICES);
    } else {
      toast.error(
        response.data?.errorMessage ||
          "Something went wrong while creating the Question"
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
            <h5>Choices</h5>
            <table>
              {question.choices.map((choice, index) => (
                <tr key={index}>
                  <td>{choice.testChoices}</td>
                </tr>
              ))}
            </table>
            <h5 className='font-weight-bold mt-3'>Answer: {question.answer}</h5>
            <p className=''>Ratings: {question.question.rate}</p>
          </div>
          <QuestionActions
            onDelete={(e) => deleteQuestion(e, question.question.id)}
            onEdit={(e) => {
              console.log({question})
              setChoices(question.choices);
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
          setSelectedQuestion(null);
          setQuestion("");
          setRate("");
          setAnswer("");
          setChoices(DEFAULT_CHOICES);
          setShowModal(true);
        }}
      >
        Add question
      </Button>
      <MultipleChoiceForm
        showModal={showModal}
        setShowModal={setShowModal}
        question={question}
        setQuestion={setQuestion}
        rate={rate}
        setRate={setRate}
        choices={choices}
        setChoices={setChoices}
        onSubmit={submitQuestion}
      />
    </div>
  );
}
