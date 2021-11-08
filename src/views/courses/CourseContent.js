import React from "react";
import MainContainer from '../../components/layouts/MainContainer'
import CourseWidget from "./components/CourseWidget";
import CourseBreadcrumbs from "./components/CourseBreadcrumbs";

export default function CourseContent() {

  return (
    <MainContainer>
      <CourseBreadcrumbs />
      <CourseWidget />
    </MainContainer>
  )
}
