import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";

function Login() {
  return (
    <div className="container">
      <Form className="mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <Alert variant="primary">
              Enter your email and password to login
            </Alert>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Login;
