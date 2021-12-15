import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import ClassesAPI from '../../../../api/ClassesAPI'
import { useParams } from 'react-router'

function AccordionEdit({openEditModal, setOpenEditModal, editLinks, getConfe, getVideos, getLinks}) {
  const [description, setEditDescription] = useState('')
  const [url, setEditUrl] = useState('')
  const {id} = useParams()

  console.log('this is LinksId:',editLinks?.classLink?.id)

  const handleCloseModal = (e) =>{
    e.preventDefault()
    setOpenEditModal(false)
  }
  
  const saveEditClassLinks = async (e) =>{
    e.preventDefault()
    let linkId = editLinks?.classLink?.id
    let response = await new ClassesAPI().editClassLinks(id, linkId, {description, url})
    if(response.ok){
      alert('Link Updated')
      handleCloseModal(e)
      getConfe()
      getVideos()
      getLinks()
    }else{
      alert(response.data.errorMessage)
    }
  }
  
  return (
    <div>		
      <Modal size="lg" show={openEditModal} onHide={()=> setOpenEditModal(!setOpenEditModal)} aria-labelledby="example-modal-sizes-title-lg">
    <Modal.Header className='class-modal-header' closeButton>
      <Modal.Title id="example-modal-sizes-title-lg" >
        Edit Links
      </Modal.Title>
    </Modal.Header>
      <Modal.Body>
          <Form onSubmit={saveEditClassLinks} >
            <Form.Group className="mb-3">
              <Form.Label>Unit</Form.Label>
                <Form.Select disabled>
                  <option>-- Select Unit Here --</option>
                 </Form.Select>
              </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
            <Form.Control onChange={(e) => setEditDescription(e.target.value)} defaultValue={editLinks?.classLink?.description} type="text" placeholder='Enter Description name here'/>
            </Form.Group>
             <Form.Group className="mb-4">
              <Form.Label >Url</Form.Label>
              <Form.Control onChange={(e) => setEditUrl(e.target.value)} defaultValue={editLinks?.classLink?.url}  type="text" placeholder='Enter Url here'/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control value={editLinks?.classLink?.type}  type="text" disabled/>
            </Form.Group>
            <Form.Group className='right-btn'>
              <Button className='tficolorbg-button' type='submit' >Save</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AccordionEdit
