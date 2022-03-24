import React, { useState, useEffect, useContext } from "react";
import CoursesItem from "../../views/courses/components/CourseItem";
import CourseCreate from "../../views/courses/components/CourseCreate";
import MainContainer from '../../components/layouts/MainContainer'
import { Button, InputGroup, FormControl, CardGroup, Row, Col } from 'react-bootstrap';
import CourseEdit from "./components/CourseEdit";
import CoursesAPI from "../../api/CoursesAPI";
import { UserContext } from './../../context/UserContext'
import Ict from "./subjectarea/Ict";
import English from "./subjectarea/English";


export default function Courses() {

  const userContext = useContext(UserContext)
  const {user} = userContext.data
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [course, setCourse] = useState([])
  const [filter, setFilter] = useState("")
  const [ictItem, setIctItem] = useState([])
  const [englishItem, setEnglishItem] = useState([])
	
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

      const dataIct = response.data.filter((item) => item.subjectArea.subjectAreaName == 'ICT')
      setIctItem(dataIct)
      const dataEnglish = response.data.filter((item) => item.subjectArea.subjectAreaName == 'English')
      setEnglishItem(dataEnglish)
    }else{
      alert("Something went wrong while fetching all courses")
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  console.log('englishItem:', englishItem)

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
          <Row>
            <Col sm={10}>
          <div className='btn-subject-area' >
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">All</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">ICT</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">English</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">Math</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">Filipino</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">Science</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">Aralin</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">STEM</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">APPLIED</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">HUMMS</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">Robotics</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">TLE</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">HELE</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">MAPEH</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">CLE</Button>
          </div>
          <div style={{color:'#EE9337', fontSize:'18px',paddingTop:'4px',paddingBottom:'20px'}}> 
             <Button className="m-r-5 color-white tficolorbg-button" size="sm">God's Park</Button>
          </div>
          </div>
          </Col>
          </Row> 
          <div className="row m-b-20 justify-content-center">
            <English englishItem={englishItem} filter={filter} setFilter={setFilter} course={course} setLoading={setLoading} setOpenEditModal={setOpenEditModal} setSelectedCourse={setSelectedCourse}/>
            {/* <Ict ictItem={ictItem} filter={filter} setFilter={setFilter} course={course} setLoading={setLoading} setOpenEditModal={setOpenEditModal} setSelectedCourse={setSelectedCourse}/> */}
            {/* <CoursesItem filter={filter} setFilter={setFilter} course={course} setLoading={setLoading} setOpenEditModal={setOpenEditModal} setSelectedCourse={setSelectedCourse}/> */}
            <CourseCreate setCourse={setCourse} openModal={openModal} setOpenModal={setOpenModal} /> 
            <CourseEdit setCourse={setCourse} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} selectedCourse={selectedCourse} /> 
          </div>
        </div>
      </div>
    </MainContainer>
  )
}
