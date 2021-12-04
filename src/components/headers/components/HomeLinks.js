import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function HomeLinks() {
  return (
    <div className="home-links">
       <Link className="home-link " to="#">
        <div><i class="fas fa-home"></i></div>
      </Link> 
      <div className="school-year-container">
        <span>S.Y.</span>
        <Dropdown>
          <Dropdown.Toggle variant="reset" id="dropdown-basic" className="school-year-dropdown">
            2021 - 2022
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#">2020 - 2021</Dropdown.Item>
            <Dropdown.Item href="#">2021 - 2022</Dropdown.Item>
            <Dropdown.Item href="#">2022 - 2023</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}
