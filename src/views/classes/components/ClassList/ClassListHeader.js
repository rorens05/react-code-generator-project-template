import React, { useState } from 'react'
import {Button, InputGroup, FormControl} from 'react-bootstrap'

function ClassListHeader(handleOpenClassWaiting) {
		
	console.log(handleOpenClassWaiting)

  return (
    <div>
      <div className="row m-b-20">
				<div className="col-md-10 pages-header"><h1>Class List</h1></div>
			</div>
			<div style={{textAlign:'center', paddingBottom:'45px'}}><Button size='lg' variant="outline-warning">Enrolled</Button><Button  onSubmit={handleOpenClassWaiting} size='lg' variant="outline-warning">Waiting List</Button></div>
      
      <div className="row m-b-20">
				<div className="col-md-12">
					<InputGroup size="lg">
						<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
					<InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i></InputGroup.Text>
					</InputGroup>
					</div>
				</div>
    </div>
  )
}
export default ClassListHeader
