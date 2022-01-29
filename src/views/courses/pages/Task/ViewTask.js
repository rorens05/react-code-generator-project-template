import React, { useState, useEffect } from "react";
import { Tab, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";

export default function ViewTask({selectedTask, setShowTask}) {

  const [loading, setLoading] = useState(false)
  
  const modulename = sessionStorage.getItem('modulename')

  const backToTask = () => {
    setShowTask(false)
  }

  return (
    <React.Fragment>
      <span className="content-pane-title">
        {selectedTask?.taskName}
      </span>
      <br></br>
      <span className="course-subtitle"><small>{modulename}</small></span>
      <hr></hr>
      <div dangerouslySetInnerHTML={{__html: selectedTask.instructions}} />
    </React.Fragment>
  )
}
