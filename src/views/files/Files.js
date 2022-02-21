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
  const [openIndexCourse, setOpenIndexCourse] = useState(null)
  const [openIndexClass, setOpenIndexClass] = useState(null)

  
  const getCourses = async() => {
    setLoading(true)
    let response = await new CoursesAPI().getCourses()
    setLoading(false)
    if(response.ok){
      setAllCourse(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  const getCourseAllFiles = async() => {
    setLoading(true)
    let response = await new FilesAPI().getAllCourseFiles()
    setLoading(false)
    if(response.ok){
      setCourseFiles(response.data)
    }else{
      alert("Something went wrong while fetching all course files")
    }
  }

  const getClassAllFiles = async() => {
    setLoading(true)
    let response = await new FilesAPI().getAllClassFiles()
    setLoading(false)
    if(response.ok){
      setClassFiles(response.data)
    }else{
      alert("Something went wrong while fetching all class files")
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

  const handleRefetch = (type) => {
    if(type == 'Course'){
      getCourseAllFiles();
    }
    if(type == 'Class'){
      getClassAllFiles();
    }
  }

  useEffect(()=>{
    getClasses();
    getClassAllFiles();
    getCourses();
    getCourseAllFiles();
  }, [])

  return (
    <MainContainer loading={loading} fluid activeHeader={'files'} style='not-scrollable'>
        <Row className="row">
          <Col className="col-md-1 file-sidenav">
            <Col className={`${active == 'course' ? 'active-file-tab' : 'inactive-file-tab'} p-2`} onClick={()=> setActive('course')}>
              Course
            </Col>
            <Col className={`${active == 'class' ? 'active-file-tab' : 'inactive-file-tab'} p-2`} onClick={()=> setActive('class')}>
              Class
            </Col>
          </Col>
          <Col className='mt-5 scrollable pb-3 vh-85'>
            {
              active == 'course' ?
              <Col>
                {allCourse.map((item, index) => {
                  let data = courseFiles.filter(x => x.courseId === item.id);
                  return(
                    <FileItem key={index+item.courseName} type='Course' show={openIndexCourse == index ? true : false} id={item.id} name={item.courseName} data={data} refetch={() => handleRefetch('Course')} clicked={() => setOpenIndexCourse(openIndexCourse == index ? null : index)}/>
                  )
                })}
              </Col>
              :
              <Col>
                {allClass.map((item, index) => {
                  let filteredCourseFiles = classFiles.filter(x => x.courseFiles?.courseId === item.course.id); //courses files inside class
                  let data = classFiles.filter(x => x.classFiles?.classId === item.classId);
                  return(
                    <FileItem key={index+item.className} type='Class' show={openIndexClass == index ? true : false} id={item.classId} name={item.className} data={[...data, ...filteredCourseFiles]} refetch={() => handleRefetch('Class')} clicked={() => setOpenIndexClass(openIndexClass == index ? null : index)}/>
                  )
                })}
              </Col>
            }
          </Col>
        </Row>
    </MainContainer>
  )
}
