import React, { useState } from "react";
import CoursesItem from "../../views/courses/components/CourseItem";
import CourseCreate from "../../views/courses/components/CourseCreate";
import MainContainer from '../../components/layouts/MainContainer'
import { Button, InputGroup, FormControl } from 'react-bootstrap';

export default function Courses() {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = e => {
      e.preventDefault()
      setOpenModal(true)
  }
  return (
    <MainContainer>
      <div className="page-container">
        <div className="containerpages">
          <div className="row m-b-20">
              <div className="col-md-10 pages-header"><h1>Courses <Button variant="outline-warning" onClick={handleOpenModal}><i className="fa fa-plus"></i> Create Course</Button></h1></div>
              <div className="col-md-2">
              </div>
          </div>
          <div className="row m-b-20">
              <div className="col-md-12">
              <InputGroup size="lg">
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
                <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
              </InputGroup>
              </div>
          </div>
          <div className="row">
              <CoursesItem />
              <CourseCreate openModal={openModal} setOpenModal={setOpenModal} /> 
              {/* <CourseEdit openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />  */}
          </div>
        </div>
      </div>
    </MainContainer>
  )
}
