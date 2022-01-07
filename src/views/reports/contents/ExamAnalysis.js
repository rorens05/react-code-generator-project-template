import React, {useState, useEffect, useContext} from 'react'
import {Accordion, Row, Col, Table, Button} from 'react-bootstrap'
import ClassesAPI from '../../../api/ClassesAPI'

function ExamAnalysis({classesModules, setClassesModules, selectedClassId, examAnalysis, setExamAnalysis}) {
  
  const [showExamAnalysis, setShowExamAnalysis] = useState([])
  const [loading, setLoading] = useState(false)

  return(
  <>
		<div>{examAnalysis.student.fname}</div>

  </> 
  )
}
export default ExamAnalysis