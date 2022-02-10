import React, {useState, useEffect, useRef} from 'react'
import {Button, Modal,Table, ProgressBar, Form } from 'react-bootstrap';
import FilesAPI from '../../api/FilesApi';

function FileHeader(props) {
  const [lgShow, setLgShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [doneUpload, setDoneUpload] = useState(false)
  const [uploadStarted, setUploadStarted] = useState(false)
  const allUploaded = files.filter(itm => { //check if all items is already 100% uploaded
    return itm.progress != 100
  })

  const handlefilesUpload = (file) => {
    console.log(file)
    if(file != ''){
      
      Object.values(file).map((itm, index) => {
        console.log(itm, index)
        let temp = []
        getBase64(itm).then(
          data => {
            let toAdd = {
              fileName: itm.name,
              base64String: data,
              size: itm.size,
              progress: 0
            };
            files.push(toAdd)
            setFiles([...files]);
          }
        );
      })
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

  const handleUploadFile = async() => {
    setUploadStarted(true)
    //course uploading
    if(props.type == 'Course'){
      files.map( async(item, index) => {
        if(item.progress == 0){
          let tempData = {
            fileName: item.fileName,
            base64String: item.base64String,
          },
          toSave = {
            data: tempData,
            id: props.id
          }
          files[index].progress = 30;
          setFiles([...files])
          let response = await new FilesAPI().newCourseFile(toSave)
          if(response.ok){
            files[index].progress = 100;
            setFiles([...files])
            let allUploaded = files.filter(itm => { //check if all items is already 100% uploaded
              return itm.progress != 100
            })
            setDoneUpload(allUploaded.length == 0 ? true : false)
            setUploadStarted(allUploaded.length == 0 ? false : true)
          }else{
            setLgShow(false)
            setFiles([])
            setDoneUpload(false)
            setUploadStarted(false)
            alert("Something went wrong while creating new file")
          }
        }
      })
    }
    // class uploading
    if(props.type == 'Class'){
      files.map( async(item, index) => {
        if(item.progress == 0){
          let tempData = {
            fileName: item.fileName,
            base64String: item.base64String,
          },
          toSave = {
            data: tempData,
            id: props.id
          }
          files[index].progress = 30;
          setFiles([...files])
          let response = await new FilesAPI().newClassFile(toSave)
          if(response.ok){
            files[index].progress = 100;
            setFiles([...files])
            let allUploaded = files.filter(itm => { //check if all items is already 100% uploaded
              return itm.progress != 100
            })
            setDoneUpload(allUploaded.length == 0 ? true : false)
            setUploadStarted(allUploaded.length == 0 ? false : true)
          }else{
            setLgShow(false)
            setFiles([])
            setDoneUpload(false)
            setUploadStarted(false)
            alert("Something went wrong while creating new file")
          }
        }
      })
    }
  }

  const handelRemoveSelectedFiles = (index) => {
    let temp = files
    temp.splice(index, 1)
    setFiles([...temp])
  }

  const handleDoneUpload = () => {
    setLgShow(false)
    setFiles([])
    props.doneUpload()
    setDoneUpload(false)
    setUploadStarted(false)
    setUploadStarted(false)
  }

  return (
    <div>
      <div className="row m-b-20">
        <div className="col-md-10 pages-header file-content"><h1>Files<i class="fas fa-folder-plus file-upload-content td-file-page"></i></h1>
            {/* <h1 className="file-upload-content"><Button size="sm" variant="outline-warning"><i class="fas fa-folder file-upload-content "></i> New Folder</Button></h1> <h5 className="fileupload"> OR </h5> */}
            <h1 className="file-upload-content"><Button className="file-upload-content" size='sm' variant="outline-warning" onClick={() => setLgShow(true)}> +Upload File</Button></h1>
        </div>
      </div>
      <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Upload File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ paddingBottom:'45px', paddingTop:'25px'}}>
            <Button size='lg' variant="outline-warning" className="file-library" onClick={() => { document.getElementById('inputFile').click() }}>
              <i class="fas fa-paperclip"></i>
                Choose Files
              </Button>
              <input id='inputFile' className='d-none' multiple type='file' placeholder='Choose color' style={{ backgroundColor: 'inherit' }} onChange={(e) => handlefilesUpload(e.target.files)} />
          </div>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Progress</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
             {files?.map((item, index) => {
              return(
                <tr key={item.fileName}>
                  <td>{item.fileName}</td>
                  <td><ProgressBar variant="warning" now={item.progress} /></td>
                  <td>{item.size} KB <i class="fas fa-times td-file-page" onClick={()=> handelRemoveSelectedFiles(index)}></i></td>
                </tr>
              );
             })}
            </tbody>
          </Table>
          <Button size="lg" variant="outline-warning" disabled={allUploaded.length == 0 ? true : false} className={"file-library file-button-upload mx-3" } onClick={()=> handleUploadFile()}>{uploadStarted ? 'Uploading...' : 'Upload'}</Button>
          <Button size="lg" variant="outline-warning" className={ doneUpload ? "file-library file-button-upload" : 'd-none'} onClick={()=> handleDoneUpload()}>Done</Button>
        </Modal.Body>
      </Modal>
    </div>
	)
}
export default FileHeader

