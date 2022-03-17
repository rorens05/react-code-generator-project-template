import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import FilesAPI from '../../../../api/FilesApi';
import FileHeader from '../../../files/FileHeader';
import { useParams } from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert';

function CreateTask({modal, toggle, module, getTaskModule, classId}) {
  const [moduleId, setModuleId] = useState('')
  const [taskName, setTaskName] = useState('')
  const [instructions, setInstructions] = useState('')
  const [addNotify, setAddNotity] = useState(false);
  const [displayFiles, setDisplayFiles] = useState([]);
  const [showFiles, setShowFiles] = useState(false)
  const allowLate = true
  const {id} = useParams();

  const closeNotify = () =>{
    setAddNotity(false)
  }

  useEffect(() => {
    handleGetClassFiles()
    console.log(module, '-----------')
  }, [])
  const handleGetClassFiles = async() => {
    // setLoading(true)
    let response = await new FilesAPI().getClassFiles(classId)
    // setLoading(false)
    if(response.ok){
      setDisplayFiles(response.data)
    }else{
      alert("Something went wrong while fetching class files ;;.")
    }
  } 

  const saveTask = async (e) =>{
    e.preventDefault()
    let response = await new ClassesAPI().creatTask(moduleId, id, {task:{taskName, instructions,}, taskAssignment:{allowLate}} )
    if(response.ok){
      setAddNotity(true)
      setModuleId("")
      setTaskName("")
      setInstructions("")
      getTaskModule(null, moduleId)
      toggle(e)
    }else{
      alert(response.data.errorMessage)
    }
  }

	return (
    <div>
    	<Modal size="lg" show={modal} onHide={toggle} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Create Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={saveTask} >  
          <div className={showFiles ? 'mb-3' : 'd-none'}>
            <FileHeader type='Class' id={classId} doneUpload={()=> handleGetClassFiles()} />
            {
              displayFiles.map( (item,ind) => {
                return(
                  <img src={item.path_Base.replace('http:', 'https:')} className='p-1' alt={item.fileName} height={30} width={30}/>
                )
              })
            }
          </div>
          <Form.Group className="mb-3">
          <Form.Label>Unit</Form.Label>
            <Form.Select onChange={(e) => setModuleId(e.target.value)}>
              <option value=''>-- Select Unit Here -- </option>
                {module.map(item => {
                  return(<option value={item.id}>{item.moduleName}</option>)
                })}
            </Form.Select>
            <div>
              <Button className='float-right my-2' onClick={()=> setShowFiles(!showFiles)}>File Library</Button>
            </div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Task Name</Form.Label>
              <Form.Control onChange={(e) => setTaskName(e.target.value)} type="text" placeholder='Enter discussion name here'/>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label >Instruction</Form.Label>
                    <Form.Control onChange={(e) => setInstructions(e.target.value)} type="text" placeholder='Enter instruction here'/>
                  </Form.Group>
              <Form.Group className='right-btn'>
              <Button className={moduleId == '' ? 'disabled' : 'tficolorbg-button'} type='submit' >Save</Button>
            </Form.Group>
        </Form> 
        </Modal.Body>
      </Modal>
      <SweetAlert 
          success
          show={addNotify} 
          title="Done!" 
          onConfirm={closeNotify}>
        </SweetAlert>
    </div>
    )
}
export default CreateTask