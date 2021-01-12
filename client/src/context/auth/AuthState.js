import React, { useReducer } from 'react';

import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
} from '../../utils/constants';
import axios from 'axios';

const AuthState = (props) => {
  const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/v1/users/auth'
      );
      dispatch({
        type: USER_LOADED,
        payload: response.data,
      });
      console.log(response.data);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
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
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response && error.response.data.msg,
      });
      console.log(error.response.data.msg);
    }
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        // state values
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        // actions used
        registerUser,
        clearErrors,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
