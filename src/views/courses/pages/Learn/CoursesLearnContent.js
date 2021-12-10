import React, { useState, useEffect } from "react";
import { Tab, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';
import CoursesAPI from "../../../../api/CoursesAPI";

export default function CoursesLearnContent({moduleInfo, setModuleInfo, lessonContent, setLessonContent}) {

  const [loading, setLoading] = useState(false)

  const modulename = sessionStorage.getItem('modulename')

  return (
    <React.Fragment>
      <span className="content-pane-title">
        {lessonContent.pageName}
      </span>
      <br></br>
      <span className="course-subtitle"><small>{modulename}</small></span>
      <hr></hr>
      <div dangerouslySetInnerHTML={{__html: lessonContent.content}} />
    </React.Fragment>
  )
}
