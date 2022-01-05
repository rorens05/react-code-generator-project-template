import React from 'react'
import {InputGroup, FormControl } from 'react-bootstrap';
import ExamReport from './ExamReport';

function ReportHeader({classesModules, setClassesModules, selectedClassId}) {
	return (
		<div>
			<div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Grade Report - Exam</h1></div>
			</div>
			<div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="md">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search activity here..." type="search"/>
						<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
			</div>
			<ExamReport classesModules={classesModules} setClassesModules={setClassesModules} selectedClassId={selectedClassId}/>
		</div>
	)
}
export default ReportHeader

