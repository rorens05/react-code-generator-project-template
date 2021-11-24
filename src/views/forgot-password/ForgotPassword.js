import React from 'react'
import Button from '@restart/ui/esm/Button'
import { Col, Form, Row } from 'react-bootstrap'
import MainContainer from '../../components/layouts/MainContainer'

export default function ForgotPassword() {
  return (
    <MainContainer headerVisible={false}>
    <div className="auth-container">
      <div className="login-container">
        <div className="my-5 py-5">
          <Row>
            <Col md={{span: 6, offset: 3}}>
              <h1 className="title mb-4">Reset Your Password</h1>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className="custom-label">E-mail / Username</Form.Label>
                  <Form.Control className="custom-input" size="lg" type="email" placeholder="Enter e-mail or username here" />
                </Form.Group>
                <Button className="btn btn-lg btn-primary btn-auth w-100 d-block mt-5" size="lg" variant="primary" type="submit">Reset Password</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </MainContainer>
  )
}