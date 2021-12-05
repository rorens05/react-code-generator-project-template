import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, } from 'react-bootstrap'
import CoursesAPI from '../../../../api/CoursesAPI'
import GradeAPI from '../../../../api/GradeAPI';
import ClassesAPI from '../../../../api/ClassesAPI';

function EditClassModal({seletedClass, openEditModal, setOpenEditModal, getClasses }) {

  const [course, setCourse] = useState([])
  const [grade, setGreade] = useState([])
  const [className, setClassName] = useState('')
  const [courseId, setCourseId] = useState('')
  const [gradeLevelId, setGradeLevelId] = useState('')

  const handleCloseModal = (e) =>{
    e.preventDefault()
    setOpenEditModal(false)
  }

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

  const saveEditClasses = async (e) =>{
    e.preventDefault()
    let teacherId = '1'
    let classId = seletedClass.classId
    let academicTermId = '1'
    let classCode = seletedClass.classCode
    let response = await new ClassesAPI().editClasses(
      classId,
      {classCode, className, courseId, gradeLevelId, academicTermId, teacherId }
    )
    if(response.ok){
      alert('Done Edit')
      getClasses()
      handleCloseModal(e)
    }else{
      alert(response.data.errorMessage)
    }
  }
  
  return (
		<div>
			<Modal size="lg" show={openEditModal} onHide={()=> setOpenEditModal(!setOpenEditModal)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Edit Class
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={saveEditClasses}>
          <Form.Group className="mb-3">
            <Form.Label>Grade Level</Form.Label>
            	<Form.Select onChange={(e) => setGradeLevelId(e.target.value)}>
                <option value={seletedClass?.gradeLevelId}>{seletedClass?.gradeName} {seletedClass?.classId}</option>
                  {grade.map(item =>{
                    return(<option value={item.id}>{item.gradeName}</option>)
                    })
                  }
            	</Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Course</Form.Label>
              	<Form.Select onChange={(e) => setCourseId(e.target.value)} >
                  <option value={seletedClass?.courseId}>{seletedClass?.courseName}</option>
                     {course.map(item =>{
                      return(<option value={item.id}>{item.courseName}</option>)
                      })
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
            	<Form.Label >Class Name</Form.Label>
                <Form.Control defaultValue={seletedClass?.className} onChange={(e) => setClassName(e.target.value)} type="text" placeholder='Enter class name here'/>
            </Form.Group>
            <Form.Group className="mb-4">
            	<Form.Label >Class Discription</Form.Label>
                <Form.Control type="text" placeholder='Enter class discription here'/>
            </Form.Group>
              <Form.Group className='mb-4'>
              	<Form.Label >Class Code</Form.Label>{' '}
                	<Button className='tficolorbg-button' disabled>
                    Get class code
                	</Button>
              </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control defaultValue={seletedClass?.classCode}  type="text" placeholder='Enter class Code here' disabled/>
            	</Form.Group>
            <Form.Group className='right-btn'> 
            	<Button className='tficolorbg-button' type='submit'>Save</Button>
            </Form.Group>
         </Form>
				</Modal.Body>
      </Modal>
    </div>
    )
}
export default EditClassModal
