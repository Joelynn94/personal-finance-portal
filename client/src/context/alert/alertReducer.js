import { SET_ALERT, REMOVE_ALERT } from '../../utils/constants';

const alertReducer = (state, action) => {
  switch (action.payload) {
    case SET_ALERT:
      // return the currect state and the action.payload which is the alert
      return [...state, action.payload];
    case REMOVE_ALERT:
      // filter out alerts based on the id
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default alertReducer;
