import React, { useState, useEffect, useContext } from "react";
import {Button, Row, Col, Accordion, Form} from 'react-bootstrap'
// import FilesContent from './FilesContent';
// import FileHeader from './FileHeader'
// import CoursesAPI from "../../api/CoursesAPI";
// import ClassesAPI from '../../api/ClassesAPI';
// import FilesAPI from '../../api/FilesApi';
// import { UserContext } from '../../context/UserContext';
// import { toast } from "react-toastify";

export default function Files(props) {
 

  useEffect(()=>{
  }, [])
  // console.log(props.data, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaasss')
  return (
    <Col>
      <p>{props.name} <i className="fa fa-angle-down px-3" /></p>
    </Col>
  )
}
