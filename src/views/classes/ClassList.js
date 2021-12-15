import React, { useState, useEffect } from 'react'
import ClassEnrolled from './components/ClassList/ClassEnrolled'
import ClassWaiting from './components/ClassList/ClassWaiting'
import {Button, InputGroup, FormControl, Row, Col} from 'react-bootstrap'
import ClassesAPI from '../../api/ClassesAPI'
import { useParams } from 'react-router'

function ClassList() {
  const [openClass, setOpenClass] = useState(false)
  const [waitingStudent, setWaitingStudent] = useState([])
  const [enrolledStudent, setEnrolledStudent] = useState([{}])
  const {id} = useParams()

  const handleOpenClassWaiting = e =>{
		e.preventDefault()
		setOpenClass(true)

	}

  const handleOpenClassEnrolled = e =>{
    e.preventDefault()
    setOpenClass(false)
  }

  const getStudentWaiting = async() =>{
    let isAccepted = false
    let response = await new ClassesAPI().getStudentList(id, isAccepted)
    if(response.ok){
      setWaitingStudent(response.data)
    }else{
      alert("Something went wrong while fetching all Waiting Student")
    }
    
  } 

  useEffect(() => {
    getStudentWaiting()
    
  }, [])

  const getStudentEnrolled = async() =>{
    let isAccepted = true
    let response = await new ClassesAPI().getStudentEnrolledList(id, isAccepted)
    if(response.ok){
      setEnrolledStudent(response.data)
    }else{
      alert("Something went wrong while fetching all Waiting Student")
    }
    
  } 

  useEffect(() => {
    getStudentEnrolled()
    
  }, [])

  console.log('this is Enrolled Student', enrolledStudent)

  return (
    <div>
    <Row>
      <Col style={{color:'#707070'}}>
       <h1> Class List </h1>
      </Col>
      <Col style={{textAlign:'right'}}>
        <Button onClick={handleOpenClassEnrolled} size='lg' variant="outline-warning">Enrolled</Button>
        <Button  onClick={handleOpenClassWaiting} size='lg' variant="outline-warning">Waiting List</Button>
      </Col>
    </Row>
    <div className="row m-b-20" style={{marginTop:'50px'}}>
        <div className="col-md-12">
          <InputGroup size="lg">
            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
            <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i>
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>
        {openClass === false?(<ClassEnrolled getStudentWaiting={getStudentWaiting} getStudentEnrolled={getStudentEnrolled} enrolledStudent={enrolledStudent}  />):<ClassWaiting getStudentEnrolled={getStudentEnrolled} getStudentWaiting={getStudentWaiting} waitingStudent={waitingStudent} />}
    </div>
  )
}
export default ClassList
