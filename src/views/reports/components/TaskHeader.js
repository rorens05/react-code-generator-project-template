import React, {useState} from 'react'
import {InputGroup, FormControl } from 'react-bootstrap';
import TaskReport from './TaskReport';


function TaskHeader({classesModules, setClassesModules, selectedClassId, viewTaskReport, setViewTaskReport,  showTaskHeader, setShowTaskHeader}) {

	const [filter, setFilter] = useState("")
	
	const onSearch = (text) => {
    setFilter(text)
  }

	let taskname = sessionStorage.getItem("taskName")

	return (
		<>
		{showTaskHeader === false ?
		<div>
			<div className="row m-b-20">
				<div className="col-md-8 pages-header"><h1>Grade Report - Task</h1></div>
				<div className="col-md-4 pages-header" style={{float:"right"}}><h1>{taskname}</h1></div>
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
		<div className="col-md-4 pages-header"><h1>{taskname}</h1></div>
		}
		<TaskReport filter={filter} setFilter={setFilter} showTaskHeader={showTaskHeader} setShowTaskHeader={setShowTaskHeader} classesModules={classesModules} setClassesModules={setClassesModules} selectedClassId={selectedClassId} viewTaskReport={viewTaskReport} setViewTaskReport={setViewTaskReport}/>
	</>
	)
}
export default TaskHeader

