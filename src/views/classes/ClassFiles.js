import React, {useEffect, useState} from 'react'
import FilesContent from '../files/FilesContent';
import { useParams } from 'react-router';
import FileHeader from '../files/FileHeader'
import FilesAPI from '../../api/FilesApi';
import ClassSideNavigation from './components/ClassSideNavigation';
import ClassBreadcrumbs from './components/ClassBreedCrumbs';

function ClassFiles() {
  const {id} = useParams();
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
    <ClassSideNavigation>
      <ClassBreadcrumbs title='' clicked={() => console.log('')} />
      <div className="row m-b-20 file-content">
        <FileHeader type='Class' id={id} doneUpload={()=> handleRefetch()}/>
        <FilesContent data={filesToDisplay} type='Class' id={id} deleted={()=> handleRefetch()} />
      </div>
    </ClassSideNavigation>
  )
}

export default ClassFiles
