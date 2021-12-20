import React from "react";

export default function CourseBreadcrumbs() {
  
  const bread = sessionStorage.getItem('breadname')

  return (
  <div className="row bread-m-t-b">
		<div className="col-md-3 bread-margin">
      <span>Courses <i class="fas fa-chevron-right m-l-10 m-r-10"></i></span>
      <span>{bread} </span>
		</div>
  </div>
  )
}
