import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

function ClassExamHeader() {
  return (
  	<div>	
		<div className="row m-b-20" style={{paddingTop:'15px'}}>
			<div className="col-md-10 pages-header"><p className='title-header'>Exam </p>
				<Button className='btn-create-exam' Button variant="link" > <i className="fa fa-plus"></i>  Create Exam  </Button>
					<h4 className='exam-or'>OR</h4>
				<Button className='btn-create-exam' Button variant="link" > <i className="fa fa-plus"></i>  Import Exam  </Button>
    	</div>
			</div>
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
export default ClassExamHeader
