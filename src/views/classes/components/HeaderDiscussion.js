import React  from 'react'
import {  Form } from 'react-bootstrap'


function HeaderDiscussion() {
    return (
    	<div>
          <div >
          	 <Form>
                <Form.Group className="mb-3" >
                  <Form.Control className='search-discussion' placeholder="Search discussion here" />
                </Form.Group>
              </Form>
          </div>  	
			</div>
        )
}
export default HeaderDiscussion