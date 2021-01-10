import {
  ADD_DEBT,
  DELETE_DEBT,
  UPDATE_DEBT,
  GET_DEBTS,
  DEBT_ERROR,
} from '../../utils/constants';

const debtReducer = (state, action) => {
  switch (action.type) {
    case GET_DEBTS:
      return {
        ...state,
        debts: action.payload,
        loading: false,
      };
    case ADD_DEBT:
      return {
        // spread out current state
        ...state,
        // spread out the debts in state
        debts: [...state.debts, action.payload],
        // set loading to false
        loading: false,
      };
    case UPDATE_DEBT:
      return {
        // spread out current state
        ...state,
        // get the current array of debts from state and filter the results
        // map for each debt - if debt_id is equal to action.payload.id (the action.paylod is the entire debt) so we are just matching the id's
        // if they match - return the updated debt otherwise return debt as is
        debts: state.debts.map((debt) =>
          debt.debt_id === action.payload.id ? action.payload : debt
        ),
        // set loading to false
        loading: false,
      };
    case DELETE_DEBT:
      return {
        // spread out current state
        ...state,
        // get the current array of debts from state and filter the results
        // evalute where the debt ID is not equal to the payload - which will return all debts that are not the current id
        debts: state.debts.map((debt) => debt.debt_id !== action.payload),
        // set loading to false
        loading: false,
      };
    case DEBT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default debtReducer;
