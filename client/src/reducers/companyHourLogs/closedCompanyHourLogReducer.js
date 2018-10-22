import { GET_CLOSED_COMPANY_HOUR_LOGS } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLOSED_COMPANY_HOUR_LOGS:
      return action.payload || false;
    default:
      return state;
  }
}
