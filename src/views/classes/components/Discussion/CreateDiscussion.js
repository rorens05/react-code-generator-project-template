import React, { useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import ClassesAPI from "../../../../api/ClassesAPI";
import { useParams } from 'react-router'

export default function CreateDiscussion({modal, toggle}) {
  const [disc, setdisc] = useState([])
  const {id} = useParams()
  
  const getDiscussionUnit = async() => {
    let response = await new ClassesAPI().getDiscussionUnit(id)
    if(response.ok){
      setdisc(response.data)
    }
  }
  useEffect(() => {
    getDiscussionUnit()
  }, [])
  const [selectedUnit, setSelectedUnit] = useState([])
  const handleSelectedUnit = (e, item) => {
    e.preventDefault()
    setSelectedUnit(item)
}
	return (
    <div>
    	<Modal size="lg" show={modal} onHide={toggle} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Create Discussion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Select >
            <option value="">--Select Unit--</option>
          {disc.map(item =>{
            return (<option value={item?.id}> {item?.moduleName}</option>)
          })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Discussion Name</Form.Label>
				    <Form.Control type="text" placeholder='Enter discussion name here'/>
          </Form.Group>
            <Form.Group className="mb-4">
          		<Form.Label >Instructions</Form.Label>
                <Form.Control type="text" placeholder='Enter instructions here'/>
            </Form.Group>
			    <Form.Group className='right-btn'>
							<Button className='bg-btn'  variant="warning" size="lg" >Save</Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </div>
    )
}