import React, {useState} from 'react'
import {InputGroup, FormControl } from 'react-bootstrap';
import InteractiveReport from './InteractiveReport';


function InteractiveHeader({classesModules, setClassesModules, selectedClassId, viewInteractiveReport, setViewInteractiveReport, setShowInteractiveHeader, showInteractiveHeader}) {
	const [filter, setFilter] = useState("")
	
	const onSearch = (text) => {
    setFilter(text)
  }
	let interactivename = sessionStorage.getItem("interactiveName")
	
	return (
		<div>
			<div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Grade Report - Interactive</h1></div>
				<div className="col-md-4 pages-header" style={{float:"right"}}><h1>{interactivename}</h1></div>
			</div>
			<div className="row m-b-20 m-t-30" onSearch={onSearch}>
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search" onChange={(e) => onSearch(e.target.value)} />
						<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
				</div>
			</div>
			<InteractiveReport filter={filter} setFilter={setFilter} showInteractiveHeader={showInteractiveHeader} setShowInteractiveHeader={setShowInteractiveHeader} classesModules={classesModules} setClassesModules={setClassesModules} selectedClassId={selectedClassId} viewInteractiveReport={viewInteractiveReport} setViewInteractiveReport={setViewInteractiveReport}/>
		</div>
	)
}

export default InteractiveHeader

