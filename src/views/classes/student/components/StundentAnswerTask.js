import React, { useState, useContext,useEffect} from 'react'
import { Form, Button, Table} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'
import { UserContext } from '../../../../context/UserContext'
import SweetAlert from 'react-bootstrap-sweetalert';

function StundentAnswerTask({answerTaskToggle, answerTaskModal, taskId}) {
  const {id} = useParams()
  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const  [taskAnswer, setTaskAnswer] = useState('')
  // const [files, setFiles] = useState('')
  const [assignNotify, setAssignNotify] = useState(false);
  const [files, setFiles] = useState([]);

  console.log('taskId:', taskId)

  const closeNotify = () => {
    setAssignNotify(false)
  }

  const submitStudentTaskAnswer = async (e) =>{
    e.preventDefault()
    let studentId = user?.student?.id
    let response = await new ClassesAPI().submitStudentTaskAnswer(studentId, id, taskId, {taskAnswer, fileDetails: files})
      if(response.ok){
        setTaskAnswer('')
        setAssignNotify(true)
        answerTaskToggle(false)
        setFiles([])
      }else{
        alert(response.data.errorMessage)
      }
  }

  const handlefilesUpload = (file) => {
    if(file != ''){
      getBase64(file).then(
        data => {
          let toAdd = {
            fileName: file.name,
            base64String: data,
            size: file.size,
            // progress: 0
          };
          setFiles([...files, toAdd]);
        }
      );
    }
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handelRemoveSelectedFiles = (index) => {
    let temp = files
    temp.splice(index, 1)
    setFiles([...temp])
  }

  return (
    <div>
       <Modal  size="lg" show={answerTaskModal} onHide={answerTaskToggle} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header className='class-modal-header' closeButton>
            <Modal.Title id="example-modal-sizes-title-lg" >
              Answer Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={submitStudentTaskAnswer} >  
            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control onChange={(e) => setTaskAnswer(e.target.value)}  as="textarea" rows={3}  />
            </Form.Group>
            <Form.Group className="mb-1">
              <Button className='tficolorbg-button' onClick={() => { document.getElementById('attachedFile').click() }}>Attache File</Button>
              <input id='attachedFile' className='d-none' type='file' placeholder='Choose color' style={{ backgroundColor: 'inherit' }} onChange={(e) => handlefilesUpload(e.target.files[0])} />
            </Form.Group>
            <Table responsive="sm" className={files.length == 0 ? 'd-none' : ''}>
              <thead>
                <tr>
                  <th>File Name</th>
                  {/* <th>Progress</th> */}
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
              {files?.map((item, index) => {
                return(
                  <tr key={item.fileName}>
                    <td>{item.fileName}</td>
                    {/* <td><ProgressBar variant="warning" now={item.progress} /></td> */}
                    <td>{item.size} KB <i class="fas fa-times td-file-page" onClick={()=> handelRemoveSelectedFiles(index)}></i></td>
                  </tr>
                );
              })}
              </tbody>
            </Table>
            <Form.Group className='right-btn'>
              <Button className='tficolorbg-button' type='submit' >Save</Button>
            </Form.Group>
          </Form> 
          </Modal.Body>
        </Modal>
        <SweetAlert 
          success
          show={assignNotify} 
          title="Done!" 
           onConfirm={closeNotify}>
        </SweetAlert>
    </div>
  )
}

export default StundentAnswerTask