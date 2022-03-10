import React, {useEffect, useState} from 'react'
import FilesContent from '../files/FilesContent';
import FileHeader from '../files/FileHeader'
import FilesAPI from '../../api/FilesApi';
const id = window.location.pathname.split('/')[2];

function ClassFiles() {
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
      alert("Something went wrong while fetching class files ---.")
    }
  }

  return (
    <div>
      <div className="row m-b-20 file-content">
        <FileHeader type='Class' id={id} doneUpload={()=> handleRefetch()}/>
        <FilesContent data={filesToDisplay} type='Class' id={id} deleted={()=> handleRefetch()} />
      </div>
    </div>
  )
}

export default ClassFiles
