import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../../utils/constants';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set alert
  const setAlert = (msg, type, timeout = 5000) => {
    // get a random id
    const id = uuidv4();
    // send a dispatch to out reducer with the type and send a payload - which is an object with the msg, type and id
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    // so the alert goes away
    // payload will be the id because we need to know which alert to remove
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
