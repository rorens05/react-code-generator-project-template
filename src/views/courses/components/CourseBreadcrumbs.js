import React from "react";

export default function CourseBreadcrumbs({setShowAssignment, setShowTask, setShowDiscussion}) {

  
  const bread = sessionStorage.getItem('breadname')

  const backToActivities = () => {
    setShowAssignment(false)
    setShowTask(false)
    setShowDiscussion(false)
  }

  return (
  <div className="row bread-m-t-b">
		<div className="bread-margin">
      <span>Courses <i class="fas fa-chevron-right m-l-10 m-r-10"></i></span>
      <span className="tfi-font-color" onClick={backToActivities}>{bread} </span>
		</div>
  </div>
  )
}
