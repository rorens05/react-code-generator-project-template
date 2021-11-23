import React, { useState } from 'react'
import ClassEnrolled from './components/ClassEnrolled'
import ClassWaiting from './components/ClassWaiting'
import {Button, InputGroup, FormControl} from 'react-bootstrap'

function ClassList() {
  const [openClass, setOpenClass] = useState(false)

  const handleOpenClassWaiting = e =>{
		e.preventDefault()
		setOpenClass(true)

	}

  const handleOpenClassEnrolled = e =>{
    e.preventDefault()
    setOpenClass(false)
  }

  return (
    <div>
      <div className="row m-b-20">
        <div className="col-md-10 pages-header"><h1>Class List</h1>
        </div>
      </div>
      <div className='btn-class-list'>
        <Button onClick={handleOpenClassEnrolled} size='lg' variant="outline-warning">Enrolled</Button>
        <Button  onClick={handleOpenClassWaiting} size='lg' variant="outline-warning">Waiting List</Button>
      </div>
      <div className="row m-b-20">
        <div className="col-md-12">
          <InputGroup size="lg">
            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." type="search"/>
            <InputGroup.Text id="basic-addon2" className="search-button"><i className="fas fa-search fa-1x"></i>
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>
        {openClass == false?(<ClassEnrolled />):<ClassWaiting />}
    </div>
  )
}
export default ClassList
