import React, {useState, useEffect, useContext} from 'react'
import {InputGroup, FormControl } from 'react-bootstrap';
import ExamReport from './ExamReport';

function ReportHeader({classesModules, setClassesModules, selectedClassId, viewTestReport, setViewTestReport, viewAssignmentReport, setViewAssignmentReport, showReportHeader, setShowReportHeader}) {
	const [filter, setFilter] = useState("")
	
	const onSearch = (text) => {
    setFilter(text)
  }
	let testname = sessionStorage.getItem("testName")

	return (
		<>
		{showReportHeader === false ?
			<div>
				<div className="row m-b-20">
					<div className="col-md-10 pages-header"><h1>Grade Report - Exam</h1></div>
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
			<div className="col-md-4 pages-header"><h1>{testname}</h1></div>
		}
		<ExamReport filter={filter} setFilter={setFilter} showReportHeader={showReportHeader} setShowReportHeader={setShowReportHeader} classesModules={classesModules} setClassesModules={setClassesModules} selectedClassId={selectedClassId} viewTestReport={viewTestReport} setViewTestReport={setViewTestReport}/>
	</>
	)
}
export default ReportHeader

