import React, { useState, useEffect } from "react";
import { Tab, ListGroup, Row, Col, Button, InputGroup, FormControl, Accordion } from 'react-bootstrap';

function ClassSideNavigation() {
  return (
   <>
    <Col className="row-course-bg course-widget-font" sm={3}>
			<ListGroup.Item className="list-group-item-o">
				<Row>
					<Col className="" sm={9} >
						Math
						{/* {courseInfo.courseName} */}
						{/* <div className="course-subtitle">{courseInfo.authorName}</div> */}
						{/* <div className="course-subtitle">{courseInfo.subjectArea.subjectAreaName}</div> */}
					</Col>
					<Col className="t-a-r" sm={3}>
						<i className="fa fa-ellipsis-v s"></i>
					</Col>
				</Row>
			</ListGroup.Item> 
			<ListGroup>
				<ListGroup.Item className="list-group-item-o " action href="#link1">
				Learn
				</ListGroup.Item>
				<ListGroup.Item className="list-group-item-o "action href="#link2">
				Exam
				</ListGroup.Item>
				<ListGroup.Item  className="list-group-item-o "action href="#link3">
				Discussion
				</ListGroup.Item>
				<ListGroup.Item className="list-group-item-o " action href="#link4">
				Assignment
				</ListGroup.Item>
				<ListGroup.Item className="list-group-item-o " action href="#link5">
				Task
				</ListGroup.Item>
				<ListGroup.Item className="list-group-item-o " action href="#link6">
				Links
				</ListGroup.Item>
			</ListGroup>
    </Col>
   </>
  )
}
export default ClassSideNavigation




