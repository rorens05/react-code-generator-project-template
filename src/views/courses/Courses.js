import React, { useState, useEffect, useContext } from "react";
import CoursesItem from "../../views/courses/components/CourseItem";
import CourseCreate from "../../views/courses/components/CourseCreate";
import MainContainer from '../../components/layouts/MainContainer'
import { Button, InputGroup, FormControl, CardGroup } from 'react-bootstrap';
import CourseEdit from "./components/CourseEdit";
import CoursesAPI from "../../api/CoursesAPI";
import { UserContext } from './../../context/UserContext'


export default function Courses() {

  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [course, setCourse] = useState([])
  const [filter, setFilter] = useState("")
	
	const onSearch = (text) => {
    setFilter(text)
  }

  const handleOpenModal = e => {
      e.preventDefault()
      setOpenModal(true)
  }

  const getCourses = async() => {
    setLoading(true)
    let response = await new CoursesAPI().getCourses()
    setLoading(false)
    if(response.ok){
      const sorted = response.data.sort((a, b) => a.subjectArea.subjectAreaName > b.subjectArea.subjectAreaName ? 1:-1);
      setCourse(sorted);
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  useEffect(() => {
    if (user.isStudent) return (window.location.href = "/404");
  }, []);
  
  return (
    <MainContainer loading={loading} activeHeader={'courses'}>
      <div className="page-container">
        <div className="containerpages">
          <div className="row m-b-20">
              <div className="col-md-10 pages-header"><h1>Courses <Button variant="outline-warning" onClick={handleOpenModal}><i className="fa fa-plus"></i> Create Course</Button></h1></div>
              <div className="col-md-2">
              </div>
          </div>
          <div className="row m-b-20 m-t-30" onSearch={onSearch}>
            <div className="col-md-12">
              <InputGroup size="lg">
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search" onChange={(e) => onSearch(e.target.value)} />
                <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
              </InputGroup>
            </div>
          </div>
          <div className="row m-b-20 justify-content-center">
            <CoursesItem filter={filter} setFilter={setFilter} course={course} setLoading={setLoading} setOpenEditModal={setOpenEditModal} setSelectedCourse={setSelectedCourse}/>
            <CourseCreate setCourse={setCourse} openModal={openModal} setOpenModal={setOpenModal} /> 
            <CourseEdit setCourse={setCourse} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} selectedCourse={selectedCourse} /> 
          </div>
        </div>
      </div>
    </MainContainer>
  )
}
