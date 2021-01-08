import React from 'react';
import { Col, Row } from 'reactstrap';
import SignupForm from '../components/Signup/SignupForm';

const SignupPage = () => {
  return (
    <Row>
      <Col>
        <SignupForm />
      </Col>
    </Row>
  );
};

export default SignupPage;
