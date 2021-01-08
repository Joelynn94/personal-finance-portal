import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import API from '../../utils/API';

import './styles.css';

const SignupForm = () => {
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    isadmin: false,
  });

  const { name, email, password } = signupForm;

  const onSignupInputChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: [e.target.value],
    });
    console.log(signupForm);
  };

  const onSignupFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/users/signup', {
        name,
        email,
        password,
        isadmin: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Card>
        <CardTitle>
          <h2>Signup</h2>
        </CardTitle>

        <CardBody>
          <Form onSubmit={onSignupFormSubmit}>
            <FormGroup>
              <Label htmlFor='name'>Name</Label>
              <Input
                type='text'
                name='name'
                value={name}
                onChange={(e) => onSignupInputChange(e)}
                required
              />
              <small className='name error'></small>
            </FormGroup>

            <FormGroup>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='text'
                name='email'
                value={email}
                onChange={(e) => onSignupInputChange(e)}
                required
              />
              <small className='email error'></small>
            </FormGroup>

            <FormGroup>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                name='password'
                value={password}
                onChange={(e) => onSignupInputChange(e)}
                required
              />
              <small className='password error'></small>
            </FormGroup>

            <Button type='submit' color='primary' size='large' className='mt-3'>
              Sign Up
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default SignupForm;
