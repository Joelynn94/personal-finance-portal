import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
} from '../../utils/constants';

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      // add the token to local storage
      localStorage.setItem('token', action.payload.token);
      return {
        // get the current state
        ...state,
        // this is the token, put it in state
        ...action.payload,
        // set is auth to true
        isAuthenticated: true,
        // loading it false
        loading: false,
      };
    case REGISTER_FAIL:
      // remove the token from local storage
      localStorage.removeItem('token');
      return {
        // get the current state
        ...state,
        // reset the user state
        user: null,
        // reset the token state
        token: null,
        // reset the auth state
        isAuthenticated: false,
        // set loading to false
        loading: false,
        // this error will come from the msg response - set in the state
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
