import React, { useState } from "react";
import ClassExamHeader from "./components/Exam/ClassExamHeader";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import ExamItem from "./components/Exam/ExamItem";
import ExamAPI from "../../api/ExamAPI";
import { useParams } from "react-router-dom";
import ActivityIndicator from "../../components/loaders/ActivityIndicator";

export const ClassExam = () => {

  const [loading, setLoading] = useState(true)
  const [exams, setExams] = useState([])
  const {id} = useParams()
  const [filter, setFilter] = useState("")

  const fetchExams = async() => {
    setLoading(true)
    let response = await new ExamAPI().getExams(id)
    setLoading(false)
    if(response.ok) {
      setExams(response.data.filter(item => item.classTest != null))
    }else{
      alert("Something went wrong while fetching exams")
    }
  }

  const onSearch = (text) => {
    setFilter(text)
  }

  useEffect(() => {
    fetchExams()
  }, []);

  return (
    <div className="class-container position-relative">
      {loading && <ActivityIndicator/>}
      <ClassExamHeader onSearch={onSearch} />
      {exams.filter(item => 
        item.test.testName.toLowerCase().includes(filter.toLowerCase())
      ).map((exam, index) => (<ExamItem key={index} exam={exam}/>))}
      {exams.length == 0 && !loading && <div className="no-exams">No exams found...</div>}
    </div>
  );
};
export default ClassExam;
