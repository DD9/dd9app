import { GET_COMPANY_HOUR_LOGS, CLEAR_COMPANY_HOUR_LOG_STATE } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COMPANY_HOUR_LOGS:
      return action.payload || false;
    case CLEAR_COMPANY_HOUR_LOG_STATE:
      return [] || false;
    default:
      return state;
  }
}
