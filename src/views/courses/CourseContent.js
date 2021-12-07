import React, { useState, useEffect } from "react";
import MainContainer from '../../components/layouts/MainContainer'
import CourseWidget from "./components/CourseWidget";
import CourseBreadcrumbs from "./components/CourseBreadcrumbs";
import CoursesAPI from "../../api/CoursesAPI";

export default function CourseContent() {

  const [loading, setLoading] = useState(false)
  const [moduleInfo, setModuleInfo] = useState([])
  const [examInfo, setExamInfo] = useState([])
  const [display, setDisplay] = useState(false)
  const [examDisplay, setExamDisplay] = useState(false)

  const moduleid = sessionStorage.getItem('moduleid')
  const sessionCourse = sessionStorage.getItem('courseid') 

  const getCourseUnitInformation = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseUnit(sessionCourse)
    setLoading(false)
    if(response.ok){
      setModuleInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all a")
    }
  }

  const getExamInfo = async(e) => {
    setLoading(true)
    let response = await new CoursesAPI().getExamInformation(moduleid)
    setLoading(false)
    if(response.ok){
      setExamInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all a")
    }
  }

  useEffect(() => {
    getCourseUnitInformation()
    getExamInfo()
  }, [])

  return (
    <MainContainer>
      <CourseBreadcrumbs />
      <CourseWidget 
        display={display} 
        setDisplay={setDisplay} 
        examDisplay={examDisplay} 
        setExamDisplay={setExamDisplay} 
        setModuleInfo={setModuleInfo} 
        moduleInfo={moduleInfo}
        examInfo={examInfo}
        setExamInfo={setExamInfo}
      />
    </MainContainer>
  )
}
