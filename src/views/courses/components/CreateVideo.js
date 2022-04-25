import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import CoursesAPI from "../../../api/CoursesAPI";
import SubjectAreaAPI from "../../../api/SubjectAreaAPI";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilesAPI from '../../../api/FilesApi';
import FileHeader from './AssignmentFileHeader';
import { useParams } from "react-router";

export default function CreateVideos({openCreateVideoModal, setCreateVideoModal, setVideoInfo, setOpenCreateVideoModal}){

  const [loading, setLoading] = useState(false)
  const [modulePages, setModulePages] = useState([])
  const [fileName, setFileName] = useState('')
	const [sequenceNo, setSequenceNo] = useState('')
  const [title, setTitle] = useState('')
  const [path, setPath] = useState([]);
  const {id} = useParams()
  let sessionCourse = sessionStorage.getItem('courseid')
  let sessionModule = sessionStorage.getItem('moduleid')


	const handleCloseModal = e => {
    e.preventDefault()
    setCreateVideoModal(false)
  }

	const saveVideo = async(e) => {
    e.preventDefault()
    setLoading(true)
    let response = await new CoursesAPI().createVideo(
      sessionCourse, sessionModule,
      {title, sequenceNo, fileName, path}
    )
    if(response.ok){
			handleCloseModal(e)
      getVideoInfo(sessionModule)
      notifySaveVideo()
    }else{
      toast.error(response.data.errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    setLoading(false)
  }

  const getCourseUnitPages = async(e, data, data1) => {
    setLoading(true)
    let response = await new CoursesAPI().getCourseUnitPages(sessionCourse, sessionModule)
    setLoading(false)
    if(response.ok){
      setModulePages(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all pages")
    }
  }

  const getVideoInfo = async(e, data) => {
    setLoading(true)
    let response = await new CoursesAPI().getVideoInformation(sessionModule)
    setLoading(false)
    if(response.ok){
      setVideoInfo(response.data)
      console.log(response.data)
    }else{
      alert("Something went wrong while fetching all task")
    }
  }

  const notifySaveVideo = () => 
  toast.success('Video Saved!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

	useEffect(() => {
  }, [])

	return (
		<div>
			<Modal size="lg" className="modal-all" show={openCreateVideoModal} onHide={()=> setOpenCreateVideoModal(!openCreateVideoModal)} >
				<Modal.Header className="modal-header" closeButton>
				Create Video
				</Modal.Header>
				<Modal.Body className="modal-label b-0px">
						<Form onSubmit={saveVideo}>
								<Form.Group className="m-b-20">
										<Form.Label for="courseName">
												Video Name
										</Form.Label>
										<Form.Control 
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter video name"
                      onChange={(e) => setTitle(e.target.value)}
                    />
								</Form.Group>

								<Form.Group className="m-b-20">
										<Form.Label for="description">
												File Name
										</Form.Label>
										<Form.Control 
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter filename"
                      onChange={(e) => setFileName(e.target.value)}
                    />
								</Form.Group>

								<Form.Group className="m-b-20">
										<Form.Label for="description">
												Sequence No
										</Form.Label>
										<Form.Control 
                      className="custom-input" 
                      size="lg" 
                      type="text" 
                      placeholder="Enter sequence number"
                      onChange={(e) => setSequenceNo(e.target.value)}
                    />
								</Form.Group>

								<span style={{float:"right"}}>
										<Button className="tficolorbg-button" type="submit">
												Save
										</Button>
								</span>
						</Form>
				</Modal.Body>
			</Modal>
		</div>
	)
}