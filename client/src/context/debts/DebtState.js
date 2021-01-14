import React, { useReducer } from 'react';

import DebtsContext from './debtContext';
import debtReducer from './debtReducer';
import {
  GET_DEBTS,
  ADD_DEBT,
  DELETE_DEBT,
  UPDATE_DEBT,
  DEBT_ERROR,
} from '../../utils/constants';
import axios from 'axios';

const DebtState = (props) => {
  const initialState = {
    debts: [],
    loading: false,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(debtReducer, initialState);

  // get debts
  const getDebts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/debts');
      // dispatch the type and payload to the reducer
      // getting all of the debts (response.data) to the payload
      dispatch({
        type: GET_DEBTS,
        payload: response.data.debts,
      });
    } catch (error) {
      dispatch({
        type: DEBT_ERROR,
        payload: error.response,
      });
    }
  };

  // Add debt
  const addDebt = async (debt) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/debts',
        debt,
        config
      );
      // dispatch the type and payload to the reducer
      // sending the new debt (response.data) to the payload
      dispatch({
        type: ADD_DEBT,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: DEBT_ERROR,
        payload: error.response,
      });
    }
  };

  // Delete debt
  const deleteDebt = async (id) => {
    // dispatch the type and payload to the reducer
    // sending the id to the payload
    dispatch({
      type: DELETE_DEBT,
      payload: id,
    });
  };

  // Update debt
  const updateDebt = async (debt) => {
    // dispatch the type and payload to the reducer
    // sending the debt to the payload
    dispatch({
      type: UPDATE_DEBT,
      payload: debt,
    });
  };

  // Filter debts

  // Clear filter

  return (
    <DebtsContext.Provider
      value={{
        // state values
        debts: state.debts,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        // actions used
        getDebts,
        addDebt,
        deleteDebt,
        updateDebt,
      }}
    >
      {props.children}
    </DebtsContext.Provider>
  );
};

export default DebtState;
