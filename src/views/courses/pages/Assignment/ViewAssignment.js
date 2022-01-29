import React, { useState, useEffect } from "react";
import { Tab, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";

export default function ViewAssignment({selectedAssignment, setShowAssignment, assignmentInfo}) {

  const [loading, setLoading] = useState(false)
  const [assignmentName, setAssignmentName] = useState('')
	const [instructions, setInstructions] = useState('')
  const modulename = sessionStorage.getItem('modulename')

  const backToAssignment = () => {
    setShowAssignment(false)
  }

  return (
    <React.Fragment>
      <span className="content-pane-title">
        {selectedAssignment?.assignmentName}
      </span>
      <br></br>
      <span className="course-subtitle"><small>{modulename}</small></span>
      <hr></hr>
      <div dangerouslySetInnerHTML={{__html: selectedAssignment.instructions}} />
    </React.Fragment>
  )
}
