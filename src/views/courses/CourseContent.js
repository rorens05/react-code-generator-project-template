import React, { useState, useEffect } from "react";
import MainContainer from '../../components/layouts/MainContainer'
import CourseWidget from "./components/CourseWidget";
import CourseBreadcrumbs from "./components/CourseBreadcrumbs";
import CoursesAPI from "../../api/CoursesAPI";

export default function CourseContent() {

  const [loading, setLoading] = useState(false)
  const [moduleInfo, setModuleInfo] = useState([])
  const sessionCourse = sessionStorage.getItem('courseid') 
  const [display, setDisplay] = useState(false)

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

  useEffect(() => {
    getCourseUnitInformation()
  }, [])

  return (
    <MainContainer>
      <CourseBreadcrumbs />
      <CourseWidget display={display} setDisplay={setDisplay} setModuleInfo={setModuleInfo} moduleInfo={moduleInfo}/>
    </MainContainer>
  )
}
