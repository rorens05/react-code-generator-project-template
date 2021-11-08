import React, { useState, useEffect } from "react";
import { Breadcrumb } from 'react-bootstrap';
import CourseEdit from "./CourseEdit";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.css"
import { Link } from 'react-router-dom'

export default function CourseBreadcrumbs() {
   
  return (
  <div className="row bread-m-t-b">
		<div className="col-md-3 bread-margin">
			{/* <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
          Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb> */}
      <span>A <i class="fas fa-chevron-right"></i></span>
      <span>B <i class="fas fa-chevron-right"></i></span>
      <span>C</span>
		</div>
  </div>
  )
}
