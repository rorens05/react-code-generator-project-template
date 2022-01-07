import React from 'react'
import {InputGroup, FormControl } from 'react-bootstrap';
import TaskReport from './TaskReport';


function TaskHeader({classesModules, setClassesModules, selectedClassId, viewTaskReport, setViewTaskReport}) {

	let taskname = sessionStorage.getItem("taskName")

	return (
		<div>
			<div className="row m-b-20">
				<div className="col-md-8 pages-header"><h1>Grade Report - Task</h1></div>
				<div className="col-md-4 pages-header" style={{float:"right"}}><h1>{taskname}</h1></div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="md">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search activity here..." type="search"/>
						<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
			</div>
			<TaskReport classesModules={classesModules} setClassesModules={setClassesModules} selectedClassId={selectedClassId} viewTaskReport={viewTaskReport} setViewTaskReport={setViewTaskReport}/>
		</div>
	)
}
export default TaskHeader

