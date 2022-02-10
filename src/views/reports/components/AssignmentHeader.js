import React, {useState} from 'react'
import {InputGroup, FormControl } from 'react-bootstrap';
import AssignmentReport from './AssignmentReport';


function AssignmentHeader({classesModules, setClassesModules, selectedClassId, viewAssignmentReport, setViewAssignmentReport, showAssignmentHeader, setShowAssignmentHeader}) {
	const [filter, setFilter] = useState("")
	
	const onSearch = (text) => {
    setFilter(text)
  }

	let assignmentname = sessionStorage.getItem("assignmentName")
	
	return (
		<>
		{showAssignmentHeader === false ?
		<div>
			<div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Grade Report - Assignment</h1></div>
				<div className="col-md-4 pages-header" style={{float:"right"}}><h1>{assignmentname}</h1></div>
			</div>
			<div className="row m-b-20 m-t-30" onSearch={onSearch}>
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search" onChange={(e) => onSearch(e.target.value)} />
						<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
			</div>
		</div>
		:
			<div className="col-md-4 pages-header"><h1>{assignmentname}</h1></div>
		}
		<AssignmentReport filter={filter} setFilter={setFilter} showAssignmentHeader={showAssignmentHeader} setShowAssignmentHeader={setShowAssignmentHeader} classesModules={classesModules} setClassesModules={setClassesModules} selectedClassId={selectedClassId} viewAssignmentReport={viewAssignmentReport} setViewAssignmentReport={setViewAssignmentReport}/>
	</>
	)
}

export default AssignmentHeader

