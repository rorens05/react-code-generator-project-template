import React  from 'react'
import {  Form } from 'react-bootstrap'


function ClassHeader() {

		

    return (
    		<div>
          
          
            <div >
                <Form>
                    <Form.Group className="mb-3" >
                    <Form.Control className='search-classes' style={{font: 'normal normal normal 20px/27px Segoe UI'}} placeholder="Search here for available classes" />
                    </Form.Group>
                </Form>
            </div>

                	
				</div>
        )
}
export default ClassHeader