import React, { useState, useEffect, useContext } from "react";
import MainContainer from '../../components/layouts/MainContainer'
import {Button, Row, Col, Accordion, Form} from 'react-bootstrap'
import FilesContent from './FilesContent';
import FileHeader from './FileHeader'
import CoursesAPI from "../../api/CoursesAPI";
import ClassesAPI from '../../api/ClassesAPI';
import FilesAPI from '../../api/FilesApi';
import { UserContext } from '../../context/UserContext';
import { toast } from "react-toastify";

export default function Files() {
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState('');
  const [selected, setSelected] = useState('');
  const [optionsDisplayed, setOptionsDisplayed] = useState([]);
  const [filesToDisplay, setFilesToDisplay] = useState([]);
  const userContext = useContext(UserContext)
  const {user} = userContext.data

  const HandleSelected = (selectedType) => {
    setSelectedFile(selectedType);
    setSelected('')
    if(selectedType){
      if(selectedType === 'Class'){
        getClasses()
      }
      if(selectedType === 'Course'){
        getCourses();
      }
    }
  }
  const getCourses = async() => {
    setLoading(true)
    let response = await new CoursesAPI().getCourses()
    setLoading(false)
    if(response.ok){
      setOptionsDisplayed(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  const getClasses = async() => {
    setLoading(true)
    let response = await new ClassesAPI().getClasses(user?.teacher?.id)
    setLoading(false)
    if(response.ok){
      setOptionsDisplayed(response.data)
    }else{
      alert("Something went wrong while fetching all classes")
    }
  }

  const handleGetCourseFiles = async(id) => {
    setSelected(id)
    setLoading(true)
    let response = await new FilesAPI().getCourseFiles(id)
    setLoading(false)
    if(response.ok){
      setFilesToDisplay(response.data)
    }else{
      alert("Something went wrong while fetching course files.")
    }
  }

  const handleGetClassFiles = async(id) => {
    setSelected(id)
    setLoading(true)
    let response = await new FilesAPI().getClassFiles(id)
    setLoading(false)
    if(response.ok){
      setFilesToDisplay(response.data)
    }else{
      alert("Something went wrong while fetching class files.")
    }
  }

  const handleRefetch = () => {
    if(selectedFile == 'Course'){
      handleGetCourseFiles(selected)
    }
    if(selectedFile == 'Class'){
      handleGetClassFiles(selected)
    }
  }

  return (
    <MainContainer loading={loading} activeHeader={'files'}>
        <Row className="row">
          <Col className="col-md-3 file-sidenav">
            <div style={{textAlign:'center', paddingBottom:'45px', paddingTop:'25px'}}><Button onClick={() => toast.error("Feature under development")} className="file-library" size='lg' variant="outline-warning"><i class="fas fa-folder"></i> File Library</Button></div>
          </Col>
          <Col className='mt-5 pt-4'>
            <Row>
              <Col>
                <Form.Select onChange={(e) => HandleSelected(e.target.value)}>
                  <option value=''>-- Select Here --</option>
                  <option value='Class'>Class</option>
                  <option value='Course'>Course</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className={selectedFile == 'Class' ? 'd-block' : 'd-none'} onChange={(e) => handleGetClassFiles(e.target.value)}>
                  <option>-- Select {selectedFile} Here --</option>
                  {optionsDisplayed.map(item => {
                    return(
                      <option key={item.classId} value={item.classId}>{item.className}</option>
                    )
                  })}
                </Form.Select>
                <Form.Select onChange={(e) => handleGetCourseFiles(e.target.value)} className={selectedFile == 'Course' ? 'd-block' : 'd-none'}>
                  <option>-- Select {selectedFile} Here --</option>
                  {optionsDisplayed.map(item => {
                    return(
                      <option value={item.id}>{item.courseName}</option>
                    )
                  })}
                </Form.Select>
              </Col>
            </Row>
            <div className={selected ? 'd-block' : 'd-none'}>
              <div className="row m-b-20 file-content">
                <FileHeader type={selectedFile} id={selected} doneUpload={()=> handleRefetch()}/>
                <FilesContent data={filesToDisplay} type={selectedFile} id={selected}/>
              </div>
            </div>
          </Col>
        </Row>
    </MainContainer>
  )
}
