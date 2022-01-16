import React, {useEffect, useState} from 'react'
import {Accordion, Row, Col} from 'react-bootstrap'
import FilesContent from '../../../files/FilesContent';
import FileHeader from '../../../files/FileHeader'
import FilesAPI from '../../../../api/FilesApi';

function CourseFiles({id}) {
  const [filesToDisplay, setFilesToDisplay] = useState([]);

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
    <div>
      <div className="row m-b-20 file-content">
        <FileHeader type='Course' id={id} doneUpload={()=> handleRefetch()}/>
        <FilesContent data={filesToDisplay} type='Course' id={id}/>
      </div>
    </div>
  )
}

export default CourseFiles
