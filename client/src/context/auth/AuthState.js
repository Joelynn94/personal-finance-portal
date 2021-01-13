import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOGOUT,
} from '../../utils/constants';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const response = await axios.get(
        'http://localhost:3001/api/v1/users/auth',
        null,
        { headers: { 'x-auth-token': localStorage.token } }
      );
      console.log(response.data);
      dispatch({
        type: USER_LOADED,
        payload: response.data,
      });
      console.log(response.data);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Register user
  const registerUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/users/signup',
        formData,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });

      loadUser();
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // login user
  const loginUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/users/login',
        formData,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });

      loadUser();
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  const userLogout = () => {
    dispatch({ type: USER_LOGOUT });
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        // state values
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        // actions used
        registerUser,
        clearErrors,
        loadUser,
        loginUser,
        userLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
