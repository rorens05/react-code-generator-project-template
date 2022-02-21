import React, { useState } from "react";
import {Col} from 'react-bootstrap'
import FilesContent from '../FilesContent';
import FileHeader from '../FileHeader'
export default function Files(props) {
  const [show, setShow] = useState(false)

  return (
    <Col className="card p-3 my-3 border-radius-15">
      <p className="mb-0" onClick={()=> props.clicked()}>{props.name} <i className={` ${props.show ? 'fa fa-angle-up' : 'fa fa-angle-down' } px-3 float-right`} /></p>
      {
        props.show && <div className="row m-b-20 file-content m-4">
          <FileHeader type={props.type} id={props.id} doneUpload={()=> props.refetch()}/>
          <FilesContent data={props.data} type={props.type} id={props.id}/>
        </div>
      }
    </Col>
  )
}
