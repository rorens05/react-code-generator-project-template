import React, { useState, useEffect, useContext } from "react";
import MainContainer from '../../components/layouts/MainContainer'
import {Button, Row, Col, Accordion, Form} from 'react-bootstrap'
import FilesContent from './FilesContent';
import FileHeader from './FileHeader'
import CoursesAPI from "../../api/CoursesAPI";
import ClassesAPI from '../../api/ClassesAPI';
import FilesAPI from '../../api/FilesApi';
import { UserContext } from '../../context/UserContext';
import FileItem from './components/FileItems';
import { toast } from "react-toastify";

export default function Files() {
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState('');
  const [selected, setSelected] = useState('');
  const [optionsDisplayed, setOptionsDisplayed] = useState([]);
  const [filesToDisplay, setFilesToDisplay] = useState([]);
  const userContext = useContext(UserContext)
  const {user} = userContext.data;
  const [active, setActive] = useState('course');
  const [allCourse, setAllCourse] = useState([])
  const [allClass, setAllClass] = useState([])
  const [courseFiles, setCourseFiles] = useState([]);
  const [classFiles, setClassFiles] = useState([]);

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
    let datata = await new FilesAPI().getAllCourseFiles();
    // let data1 = Object.entries(datata.data)
    let dataaaa = await new FilesAPI().getAllClassFiles();
    console.log(datata.data, dataaaa.data, '----------------------------')
    setCourseFiles(datata.data);
    setClassFiles(dataaaa.data);
    setLoading(true)
    let response = await new CoursesAPI().getCourses()
    setLoading(false)
    if(response.ok){
      setAllCourse(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  const getClasses = async() => {
    setLoading(true)
    let response = await new ClassesAPI().getClasses(user?.teacher?.id)
    setLoading(false)
    if(response.ok){
      setAllClass(response.data)
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

  useEffect(()=>{
    getClasses(); 
    getCourses();
  }, [])

  return (
    <MainContainer loading={loading} fluid activeHeader={'files'}>
        <Row className="row">
          <Col className="col-md-1 file-sidenav">
            <Col className={`${active == 'course' ? 'active-file-tab' : 'inactive-file-tab'} p-2`} onClick={()=> setActive('course')}>
              Course
            </Col>
            <Col className={`${active == 'class' ? 'active-file-tab' : 'inactive-file-tab'} p-2`} onClick={()=> setActive('class')}>
              Class
            </Col>
            {/* <div style={{textAlign:'center', paddingBottom:'45px', paddingTop:'25px'}}><Button onClick={() => toast.error("Feature under development")} className="file-library" size='lg' variant="outline-warning"><i class="fas fa-folder"></i> File Library</Button></div> */}
          </Col>
          <Col className='mt-5 pt-4'>
            {
              active == 'course' ?
              <Col>
                {allCourse.map((item, index) => {
                  // console.log(item)
                  let data = courseFiles.filter(x => x.courseId === item.id);
                  return(
                    <>
                      <FileItem key={index+item.courseName} id={item.id} name={item.courseName} data={data}/>
                      {/* <p>{item.courseName}</p> */}
                    </>
                  )
                })}
              </Col>
              :
              <Col>
                {allClass.map((item, index) => {
                  console.log(item, '------------')
                  let data = classFiles.filter(x => x.classFiles.classId === item.id);
                  return(
                    <>
                      <FileItem key={index+item.className} id={item.id} name={item.className} data={data}/>
                      {/* <p>{item.courseName}</p> */}
                    </>
                  )
                })}
              </Col>
            }
            {/* <Row>
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
            </Row> */}
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
