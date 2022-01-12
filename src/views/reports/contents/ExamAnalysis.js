import React, {useState, useEffect, useContext} from 'react'
import {Accordion, Row, Col, Table, Button, Form, Modal} from 'react-bootstrap'
import ClassesAPI from '../../../api/ClassesAPI'

function ExamAnalysis({classesModules, setClassesModules, selectedClassId, examAnalysis, setExamAnalysis, testPartAnswers, showReportHeader, setShowReportHeader}) {
  
  const [showExamAnalysis, setShowExamAnalysis] = useState([])
  const [considerAnswer, setConsiderAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState([])
  const [selectedRate, setSelectedRate] = useState("")
  const [selectedQuestionId, setSelectedQuestionId] = useState("")
  const [selectedAnswerId, setSelectedAnswerId] = useState("")
  const [selectedStudentId, setSelectedStudentId] = useState("")
  const [selectedTestId, setSelectedTestId] = useState("")

  let testname = sessionStorage.getItem('testName')
  let classid = sessionStorage.getItem('classId')

  const handleOpenModal = (e, questionid, answerid, studentid, testid, rate) => {
    e.preventDefault()
    setOpenModal(true)
    setSelectedRate(rate)
    setSelectedStudentId(studentid)
    setSelectedTestId(testid)
    setSelectedAnswerId(answerid)
    setSelectedQuestionId(questionid)
    console.log(answerid)
}

  const getExamAnalysis = async(e, studentid, classid, testid) => {
    console.log(selectedClassId)
    setShowExamAnalysis(true)
    console.log(showExamAnalysis)
    let response = await new ClassesAPI().getExamAnalysis(studentid, classid, testid)
    if(response.ok){
      setExamAnalysis(response.data)
      console.log(response.data)
      
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  const considerAnswerExamT = async(e, questionid, answerid, studentid, testid, rate) => {
    let isConsider = true
    let response = await new ClassesAPI().considerAnswerExamTrue
    (
      studentid, classid, testid, answerid, {isConsider}
    )
    if(response.ok){
      console.log(response.data)
    }else{
      alert(response.data.errorMessage)
    }
  }



  const considerAnswerExamF = async(e, questionid, answerid, studentid, testid, rate) => {
    let isConsider = false
    let response = await new ClassesAPI().considerAnswerExamTrue
    (
      studentid, classid, testid, answerid, {isConsider}
    )
    if(response.ok){
      console.log(response.data)
    }else{
      alert(response.data.errorMessage)
    }
  }

  const updatePoints = async(e, questionid, answerid, studentid, testid, rate) => {
    let isConsider = false
    let response = await new ClassesAPI().updateExamPoints
    (
      studentid, classid, testid, answerid, {isConsider, rate}
    )
    if(response.ok){
      console.log(response.data)
    }else{
      alert(response.data.errorMessage)
    }
  }


  const handleInputChange = (e, questionid, answerid, studentid, testid, rate) => {
    setConsiderAnswer(true)
    console.log(studentid)
    isChecked(e, e.target.checked, questionid, answerid, studentid, testid, rate);
  }

  const isChecked = (e, etc, questionid, answerid, studentid, testid, rate) => {
    let haru = etc
        if(haru === true){
          considerAnswerExamT(e, questionid, answerid, studentid, testid, rate)
          handleOpenModal(e, questionid, answerid, studentid, testid, rate)
        }else{
          considerAnswerExamF(e, questionid, answerid, studentid, testid, rate)
        }
  }

  useEffect(() => {
    setShowReportHeader(false)
  }, [])

  return(
  <>
		<Row>
      <Col md={6}>
        <span className='font-exam-analysis-header'>{examAnalysis.student?.lname},  {examAnalysis.student?.fname}</span>
      </Col>
      <Col md={6}>
        <span className='font-exam-analysis-header float-right'>{examAnalysis.score} / {examAnalysis.rawScore}</span>
      </Col>
      <Col md={6}>
        <p className='font-exam-analysis-content-24-tfi'>{testname} </p>
      </Col>
      <Col md={6}>
        <p className='font-exam-analysis-content-24-tfi float-right'>{examAnalysis.classTest?.startDate} </p>
      </Col>
    </Row>
      {examAnalysis.testPartAnswers?.map((item, index) => {
        return(
            <div>
            <p className='font-exam-analysis-content-24-tfi'>{index + 1}. {item.testPart.instructions}</p>
              {item.questionDetails.map((qd, index) => {
                return(
                qd.answerDetails.map((ad, index) => {
                  return(
                    <>
                      
                      <span className='font-exam-analysis-content-24-tfi'>{index + 1}.  <span className='font-exam-analysis-content-24'>{ad.assignedQuestion}</span></span>
                      <div>
                        <span className='font-exam-analysis-content-24' style={{marginRight:10}}>Student Answer :</span><span className='font-exam-analysis-content-24'>
                          {ad.studentAnswer}
                        </span>
                          {ad.studentAnswer?.toLowerCase() == ad.assignedAnswer.toLowerCase() && <i className="fa fa-check-circle" style={{color:"green", marginLeft:"10px"}}></i>}
                      </div>
                      <div>
                        <span className='font-exam-analysis-content-24' style={{marginRight:10}}>Correct Answer :</span>
                        <span className='font-exam-analysis-content-24' style={{marginRight:10}}>{ad.assignedAnswer}</span>
                        <Form>
                          <Form.Group className="m-b-20">
                            <Form.Check
                            label="Consider"
                            name={"answerid" + ad.id}
                            type="checkbox"
                            checked={ad.isConsider}
                            onChange={(e) => handleInputChange(e, ad.questionId, ad.id, ad.studentId, item.testPart.testId, qd.questionRate)}
                            /> 
                          </Form.Group>
                          {' '}
                        </Form>
                      </div>
                      
                      <hr></hr>
                    </>
                  )
                })
                )
              })}
            </div>
        )
      })}
      <Modal size="lg" className="modal-all" show={openModal} onHide={()=> setOpenModal(!openModal)} backdrop="static">
				<Modal.Header className="modal-header" closeButton>
				Update Points
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form onSubmit={updatePoints}>
								<Form.Group className="m-b-20">
										<Form.Label for="courseName">
												Rate / Points
										</Form.Label>
										<Form.Control 
                      defaultValue={selectedRate}
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter points"
                      // onChange={(e) => setDiscussionName(e.target.value)}
                    />
								</Form.Group>
								Rate:{selectedRate}, Answerid: {selectedAnswerId}, Studentid: {selectedStudentId}, Testid: {selectedTestId}
								<span style={{float:"right"}}>
										<Button className="tficolorbg-button" type="submit">
												Save
										</Button>
								</span>
						</Form>
				</Modal.Body>
			</Modal>
  </> 
  )
}
export default ExamAnalysis