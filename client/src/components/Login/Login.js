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

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginForm;

  const onLoginInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: [e.target.value],
    });
    console.log(loginForm);
  };

  const onLoginFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/users/signup', {
        email,
        password,
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
          <h2>Login</h2>
        </CardTitle>

        <CardBody>
          <Form onSubmit={onLoginFormSubmit}>
            <FormGroup>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='text'
                name='email'
                value={email}
                onChange={(e) => onLoginInputChange(e)}
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
                onChange={(e) => onLoginInputChange(e)}
                required
              />
              <small className='password error'></small>
            </FormGroup>

            <Button type='submit' color='primary' size='large' className='mt-3'>
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default LoginForm;
