import React, { useState, useEffect } from "react";
import CoursesItem from "../../views/courses/components/CourseItem";
import CourseCreate from "../../views/courses/components/CourseCreate";
import MainContainer from '../../components/layouts/MainContainer'
import CourseWidget from "./components/CourseWidget";
import CourseBreadcrumbs from "./components/CourseBreadcrumbs";
import { Button, InputGroup, FormControl, Col, Tab } from 'react-bootstrap';

export default function CourseContent() {

  return (
    <MainContainer>
			  <CourseBreadcrumbs />
          <CourseWidget />
    </MainContainer>
  )
}
