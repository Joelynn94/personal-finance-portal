import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import './styles.css';

const LoginForm = () => {
  const history = useHistory();
  const { loginUser, isAuthenticated, error, clearErrors } = useContext(
    AuthContext
  );
  const { setAlert } = useContext(AlertContext);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginForm;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }

    if (error === `Invalid credentials`) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const onLoginInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
    console.log(loginForm);
  };

  const onLoginFormSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      loginUser({
        email,
        password,
      });
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
                minLength='6'
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
