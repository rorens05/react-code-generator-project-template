import React, { useState } from "react";
import ClassExamHeader from "./components/Exam/ClassExamHeader";
import { Row, Col, Accordion } from "react-bootstrap";
import { useEffect } from "react";
import ExamItem from "./components/Exam/ExamItem";
import ExamAPI from "../../api/ExamAPI";
import { useParams } from "react-router-dom";
import ActivityIndicator from "../../components/loaders/ActivityIndicator";

export const ClassExam = () => {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const { id } = useParams();
  const [filter, setFilter] = useState("");
  const [modules, setModules] = useState([]);

  const fetchExams = async () => {
    setLoading(true);
    let response = await new ExamAPI().getExams(id);
    setLoading(false);
    if (response.ok) {
      const filteredExams = response.data.filter(
        (item) => item.classTest != null
      );
      const filteredModules = filteredExams.map((item) => item.module);
      const uniqueModules = [];
      filteredModules.forEach((item, index) => {
        if (!uniqueModules.map((item) => item.id).includes(item.id)) {
          uniqueModules.push(item);
        }
      });
      setExams(filteredExams);
      setModules(uniqueModules);
    } else {
      alert("Something went wrong while fetching exams");
    }
  };

  const onSearch = (text) => {
    setFilter(text);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className='class-container position-relative'>
      {loading && <ActivityIndicator />}
      <ClassExamHeader onSearch={onSearch} />
      <Accordion defaultActiveKey='0'>
        {modules.map((module, index) => {
          if (exams
            .filter(item => module.id === item.module.id)
            .filter((item) =>
              item.test.testName.toLowerCase().includes(filter.toLowerCase())
            ).length == 0){
              return <div/>
            }
          return (
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header >{module.moduleName}</Accordion.Header>
              <Accordion.Body>
                {exams
                  .filter(item => module.id === item.module.id)
                  .filter((item) =>
                    item.test.testName.toLowerCase().includes(filter.toLowerCase())
                  )
                  .map((exam, index) => (
                    <ExamItem key={index} exam={exam} />
                  ))}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      {exams.filter((item) =>
                    item.test.testName.toLowerCase().includes(filter.toLowerCase())
                  )
                .length === 0 && !loading && (
                  <div className='no-exams'>No exams found...</div>
                )}
    </div>
  );
};
export default ClassExam;
