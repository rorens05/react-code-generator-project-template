import React, {useEffect, useState} from 'react'
import ClassExamHeader from './components/Exam/ClassExamHeader'
import {Accordion, Row, Col} from 'react-bootstrap'
import FilesContent from '../files/FilesContent';
import FileHeader from '../files/FileHeader'
import FilesAPI from '../../api/FilesApi';

function ClassFiles({id}) {
  const [filesToDisplay, setFilesToDisplay] = useState([]);

  useEffect(() => {
    handleGetClassFiles()
  }, [])

  const handleRefetch = () => {
    handleGetClassFiles()
  }

  const handleGetClassFiles = async() => {
    // setLoading(true)
    let response = await new FilesAPI().getClassFiles(id)
    // setLoading(false)
    if(response.ok){
      setFilesToDisplay(response.data)
    }else{
      alert("Something went wrong while fetching class files.")
    }
  }

  return (
    <div>
      <div className="row m-b-20 file-content">
        <FileHeader type='Class' id={id} doneUpload={()=> handleRefetch()}/>
        <FilesContent data={filesToDisplay} type='Class' id={id}/>
      </div>
    </div>
  )
}

export default ClassFiles
