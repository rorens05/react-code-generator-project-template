import React, {useEffect, useState} from 'react'
import {Accordion, Row, Col} from 'react-bootstrap'
import FilesContent from '../../../files/FilesContent';
import FileHeader from '../../../files/FileHeader'
import FilesAPI from '../../../../api/FilesApi';

function CourseFiles() {
  const [filesToDisplay, setFilesToDisplay] = useState([]);
  const courseid = sessionStorage.getItem('courseid')

  useEffect(() => {
    handleGetCourseFiles()
  }, [])

  const handleRefetch = () => {
    handleGetCourseFiles()
  }

  const handleGetCourseFiles = async() => {
    // setLoading(true)
    let response = await new FilesAPI().getCourseFiles(courseid)
    // setLoading(false)
    if(response.ok){
      setFilesToDisplay(response.data)
    }else{
      alert("Something went wrong while fetching Course files.")
    }
  }

  return (
    <div>
      <div className="row m-b-20 file-content">
        <FileHeader type='Course' id={courseid} doneUpload={()=> handleRefetch()}/>
        <FilesContent data={filesToDisplay} type='Course' id={courseid}/>
      </div>
    </div>
  )
}

export default CourseFiles
