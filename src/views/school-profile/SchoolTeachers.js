import React from 'react'
import { Col, Row } from 'react-bootstrap'
import MainContainer from '../../components/layouts/MainContainer'
import AdminSideNavigation from '../../components/side-navigation/AdminSideNavigation'
import SchoolTeachersTable from './components/SchoolTeachersTable'

export default function SchoolTeachers() {
  return (
    <MainContainer title="School" activeHeader={"school"}>
      <Row className="mt-4">
        <Col sm={3}>
          <AdminSideNavigation active="schoolTeacher"/>
        </Col>
        <Col sm={9}>
            {/* <p>sample</p> */}
          <SchoolTeachersTable />
        </Col>
      </Row>
    </MainContainer>
  )
}
