import React, { useEffect, useState } from 'react'
import { Button, InputGroup, FormControl, Col, Modal, Form} from 'react-bootstrap'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ExamAPI from '../../../api/ExamAPI';
import { toast } from 'react-toastify'

function UploadQuestion({partId}) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState({});
  const [examPart, setExamPart] = useState({})
  const { id } = useParams();

  // useEffect( async()=>{
  //   let response = await new ExamAPI().getPartInfo(id, 500001844);
  //   if(response.ok){
  //     console.log(response, '??????????????????????????')
  //     setExamPart(response.data);
  //   }else{
  //     alert("Something went wrong while fetching exam info...");
  //   }
  // }, [])

  const handleGetUploadedFile = (file) => {
    getBase64(file).then(
      data => {
        console.log(file.name)
        let toUpload = {
          "base64String": data,
          "fileName": file.name
        };
        setFilesToUpload(toUpload)
      }
    );
  }
  
  const handleUploadFile = async(e) => {
    e.preventDefault();
    // let tempData = examPart[2];
      let data = {
        questionPart: {
          createdBy: 21,
          createdDate: "2022-03-01T00:00:00",
          deleted: null,
          deletedBy: null,
          deletedDate: null,
          instructions: "sample instruction",
          questionTypeId: 2,
          testId: 56384
        },
        excelFile: filesToUpload
      }
      let response = await new ExamAPI().uploadTestPart(56384, 2, data)
      console.log(response, '----------');
      if(response.ok){
        setShowUploadModal(false);
        toast.success("Test part was successfully uploaded.")
      }else{
        setShowUploadModal(false);
        toast.error(response.data?.ErrorMessage ? response.data?.ErrorMessage : "Something went wrong while uploading exam part")
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

  const handleShowUploadModal = () => {
    return (
      <Modal  size="lg" show={showUploadModal} onHide={()=> setShowUploadModal(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Upload
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleUploadFile(e)} >  
            <Form.Group className="mb-3">
              <Form.Control type="file" accept=".xls,.xlsx," onChange={(e) => handleGetUploadedFile(e.target.files[0])} />
            </Form.Group>
            <Form.Group className='right-btn'>
              <Button className='tficolorbg-button' type='submit'>Upload</Button>
            </Form.Group>
          </Form> 
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <>
      <Button
        className='tficolorbg-button'
        type='submit'
        onClick={() => {
          setShowUploadModal(true)
          console.log(examPart)
        }}
      >
          Upload Excel
        </Button>
        {handleShowUploadModal()}
    </>
  )
}
export default UploadQuestion
