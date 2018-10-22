import {
  GET_ALL_COMPANIES, CREATE_COMPANY,
} from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_COMPANIES:
      return action.payload || false;
    case CREATE_COMPANY:
      return [...state, action.payload];
    default:
      return state;
  }
}
