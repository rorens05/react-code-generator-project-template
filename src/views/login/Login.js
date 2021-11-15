import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import MainContainer from '../../components/layouts/MainContainer'

export default function Login() {
  let history = useHistory()

  const login = (e) => {
    e.preventDefault()
    history.push("/classes")
  }

  return (
    <MainContainer headerVisible={false}>
      <div className="auth-container">
        <div className="login-container">
          <h1 className="title"><span className="color-blue-green">Tek</span>Teach Account Login</h1>
          <p className="subtitle">Welcome back to TekTeach! Making learning, a great experience!</p>
          <div className="mt-5">
            <Row>
              <Col>
                <Form onSubmit={login}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="custom-label">E-mail / Username</Form.Label>
                    <Form.Control className="custom-input" size="lg" type="email" placeholder="Enter e-mail or username here" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="custom-label">Password</Form.Label>
                    <Form.Control className="custom-input" size="lg" type="email" placeholder="Enter password here" />
                  </Form.Group>
                  <Link className="link-orange font-24" to="/forgot_password" >Forgot Password</Link>
                  <Button className="btn btn-lg btn-primary btn-auth w-100 d-block mt-5" size="lg" variant="primary" type="submit">Log In</Button>
                </Form>
              </Col>
              <Col className="login-with-qr-container">
                <div className="qr-container">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="qr-code"/>
                </div>
                <div className="mx-3">
                  <p className="qr-text mt-3">Log in with QR code</p>
                  <p className="qr-text">Scan this code with the <a href="https://google.com" target="blank" className="link-orange">TekTeach mobile app</a> to log in instantly</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </MainContainer>
  )
}
