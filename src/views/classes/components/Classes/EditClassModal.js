import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import CoursesAPI from '../../../../api/CoursesAPI'
import GradeAPI from '../../../../api/GradeAPI';

function EditClassModal({seletedClass, openEditModal, setOpenEditModal }) {

  const [course, setCourse] = useState([])
  const [grade, setGreade] = useState([])

  const getCourses = async() => {
    let response = await new CoursesAPI().getCourses()
    if(response.ok){
      setCourse(response.data)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }
      
  useEffect(() => {
    getCourses()
  }, [])

  const getGrade = async() =>{
    let response = await new GradeAPI().getGrade()
    if(response.ok){
      setGreade(response.data)
    }else{
      alert("Something went wrong while fetching all Grade")
    }
  }

  useEffect(() => {
    getGrade()
  }, [])
  
  return (
		<div>
			<Modal size="lg" show={openEditModal} onHide={()=> setOpenEditModal(!setOpenEditModal)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Edit Class
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Grade Level</Form.Label>
            	<Form.Select>
                <option value={seletedClass?.gradeLevelId}>{seletedClass?.gradeName}</option>
                  {grade.map(item =>{
                    return(<option value={item.id}>{item.gradeName}</option>)
                    })
                  }
            	</Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Course</Form.Label>
              	<Form.Select >
                  <option value={seletedClass?.courseId}>{seletedClass?.courseName}</option>
                     {course.map(item =>{
                      return(<option value={item.id}>{item.courseName}</option>)
                      })
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
            	<Form.Label >Class Name</Form.Label>
                <Form.Control defaultValue={seletedClass?.className} type="text" placeholder='Enter class name here'/>
            </Form.Group>
            <Form.Group className="mb-4">
            	<Form.Label >Class Discription</Form.Label>
                <Form.Control type="text" placeholder='Enter class discription here'/>
            </Form.Group>
              <Form.Group className='mb-4'>
              	<Form.Label >Class Code</Form.Label>{' '}
                	<Button className='bg-btn' variant="warning" size="lg" disabled>
                    Get class code
                	</Button>
              </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control defaultValue={seletedClass?.classCode} type="text" placeholder='Enter class Code here' disabled/>
            	</Form.Group>
            <Form.Group className='right-btn'> 
            	<Button className='bg-btn'  variant="warning" size="lg" >Save</Button>
            </Form.Group>
				</Modal.Body>
      </Modal>
    </div>
    )
}
export default EditClassModal
