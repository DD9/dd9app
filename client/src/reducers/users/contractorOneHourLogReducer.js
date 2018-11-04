import { GET_CONTRACTOR_HOUR_LOGS, CLEAR_USER_ONE_CONTRACTOR_HOUR_LOGS_STATE } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CONTRACTOR_HOUR_LOGS:
      return action.payload || false;
    case CLEAR_USER_ONE_CONTRACTOR_HOUR_LOGS_STATE:
      return INITIAL_STATE || false;
    default:
      return state;
  }
}
