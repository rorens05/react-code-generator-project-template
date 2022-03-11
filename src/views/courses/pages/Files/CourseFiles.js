import React, {useEffect, useState} from 'react'
import {Accordion, Row, Col} from 'react-bootstrap'
import FilesContent from '../../../files/FilesContent';
import FileHeader from '../../../files/FileHeader'
import FilesAPI from '../../../../api/FilesApi';
import CourseContent from "../../CourseContent";
import {useParams} from 'react-router';
import CourseBreadcrumbs from "../../components/CourseBreadcrumbs";

function CourseFiles() {
  const [filesToDisplay, setFilesToDisplay] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    handleGetCourseFiles()
  }, [])

  const handleRefetch = () => {
    handleGetCourseFiles()
  }

  const handleGetCourseFiles = async() => {
    // setLoading(true)
    let response = await new FilesAPI().getCourseFiles(id)
    // setLoading(false)
    if(response.ok){
      setFilesToDisplay(response.data)
    }else{
      alert("Something went wrong while fetching Course files.")
    }
  }

  return (
    <CourseContent>
      <CourseBreadcrumbs title={''} clicked={() => console.log('')}/>
      <div className="row m-b-20 file-content">
        <FileHeader type='Course' id={id} doneUpload={()=> handleRefetch()}/>
        <FilesContent data={filesToDisplay} type='Course' id={id}/>
      </div>
    </CourseContent>
  )
}

export default CourseFiles
