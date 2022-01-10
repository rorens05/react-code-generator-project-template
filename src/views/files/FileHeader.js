import React, {useState, useEffect, useRef} from 'react'
import {InputGroup, FormControl, Button, Modal,Table, ProgressBar, Form } from 'react-bootstrap';
import FilesAPI from '../../api/FilesApi';

function FileHeader(props) {
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [singleUpload, setSingleUpload] = useState({})//just for single file upload
  const filesRef = useRef(files);
  filesRef.current = files;

  const handlefilesUpload = (file) => {
    console.log(file);
    let temp = files, fileName = '', base64String = '', size = '';
    getBase64(file).then(
      data => {
          let toAdd = {
            fileName: file.name,
            base64String: data,
            size: file.size
          },
          singelData ={ //just for single file upload
            fileName: file.name,
            base64String: data,
          }
          setSingleUpload(singelData);  //just for single file upload
          setFiles([...files, toAdd]);
      }
      );
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleUploadSingleFile = async() => { //just for single file upload
    let save = {
      data: singleUpload,
      id: props.id
    }
    if(props.type == 'Course'){
      let response = await new FilesAPI().newCourseFile(save)
      if(response.ok){
        console.log(response.data)
        alert('File already uploaded.')
      }else{
        alert("Something went wrong while creating new file")
      }
    }
    if(props.type == 'Class'){
      let response = await new FilesAPI().newClassFile(save)
      if(response.ok){
        console.log(response.data)
        alert('File already uploaded.')
      }else{
        alert("Something went wrong while creating new file")
      }
    }
  }

  const handelRemoveSelectedFiles = (index) => {
    let temp = files
    temp.splice(index, 1)
    setFiles([...temp])
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
              <input id='inputFile' className='d-none' type='file' placeholder='Choose color' style={{ backgroundColor: 'inherit' }} onChange={(e) => handlefilesUpload(e.target.files[0])} />
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
                <tr>
                  <td>{item.fileName}</td>
                  <td><ProgressBar variant="warning" now={50} /></td>
                  <td>{item.size} KB <i class="fas fa-times td-file-page" onClick={()=> handelRemoveSelectedFiles(index)}></i></td>
                </tr>
              );
             })}
            </tbody>
          </Table>
          <Button size="lg" variant="outline-warning" disabled={files.length == 0 ? true : false} className="file-library file-button-upload" onClick={()=> handleUploadSingleFile()}>Upload</Button>
        </Modal.Body>
      </Modal>
    </div>
	)
}
export default FileHeader

