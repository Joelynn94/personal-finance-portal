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

const Register = () => {
  const history = useHistory();
  const { registerUser, isAuthenticated, error, clearErrors } = useContext(
    AuthContext
  );
  const { setAlert } = useContext(AlertContext);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const { name, email, password, cpassword } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }

    if (error === `User with the email ${email} already exists`) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const onRegisterInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== cpassword) {
      console.log('Passwords do not match');
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser({
        name,
        email,
        password,
      });
    }
  };

  return (
    <>
      <Card>
        <CardTitle>
          <h2>Register a new account</h2>
        </CardTitle>

        <CardBody>
          <Form onSubmit={onRegisterSubmit}>
            <FormGroup>
              <Label htmlFor='name'>Name</Label>
              <Input
                type='text'
                name='name'
                value={name}
                onChange={(e) => onRegisterInputChange(e)}
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
                onChange={(e) => onRegisterInputChange(e)}
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
                minLength='6'
                onChange={(e) => onRegisterInputChange(e)}
                required
              />
              <small className='password error'></small>
            </FormGroup>

            <FormGroup>
              <Label htmlFor='cpassword'>Confirm Password</Label>
              <Input
                type='password'
                name='cpassword'
                value={cpassword}
                minLength='6'
                onChange={(e) => onRegisterInputChange(e)}
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

export default Register;
