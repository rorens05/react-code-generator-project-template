import React from 'react'
import { ListGroupItem } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

function ClassSideNavigation() {
  return (
    <div>
      <ListGroup >
          <div className="class-bar">
            <ListGroupItem style={{border:'none',color:'#EE9337'}}>FXC57 <br />
              Grade 1 - Faith  <br />
              Math 1 <br /> 
              Carlos Inigo
            </ListGroupItem>  
          </div>
        </ListGroup>
        <div className="class-bar">
          <ListGroup className='class-side-bar' >
            <ListGroup.Item  className="list-group-item-o">
              <Link to="#">Learn</Link>
          </ListGroup.Item>
          <ListGroup.Item  style={{border:'none',}}>
              <Link to="#">Exam</Link>
          </ListGroup.Item>
            <ListGroup.Item  style={{border:'none',}}>
              <Link to="discussion">Discusssion</Link>
          </ListGroup.Item>
          <ListGroup.Item  style={{border:'none',}}>
            <Link to="#">Assignment</Link>
          </ListGroup.Item>
          <ListGroup.Item  style={{border:'none',}}>
            <Link to="task">Task</Link>
          </ListGroup.Item>
          <ListGroup.Item  style={{border:'none',}}>
            <Link to="links"> Links</Link>
          </ListGroup.Item>
      </ListGroup>
    </div>
  </div>

   
    
  )
}

export default ClassSideNavigation