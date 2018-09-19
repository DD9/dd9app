import {
  GET_ALL_COMPANIES, GET_COMPANY, GET_ACTIVE_COMPANIES, CREATE_COMPANY, EDIT_COMPANY,
} from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_COMPANIES:
      return action.payload || false;
    case GET_COMPANY:
      return action.payload || false;
    case GET_ACTIVE_COMPANIES:
      return action.payload || false;
    case CREATE_COMPANY:
      return [...state, action.payload];
    case EDIT_COMPANY:
      return action.payload || false;
    default:
      return state;
  }
}
