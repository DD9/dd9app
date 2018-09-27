/* eslint no-trailing-spaces:0 */

import { GET_HOUR_LOG, SUBMIT_NEW_TIME_ENTRY_FROM_HOUR_LOG } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_HOUR_LOG:
      return action.payload || false;

    case SUBMIT_NEW_TIME_ENTRY_FROM_HOUR_LOG: {
      return {
        ...state,
        timeEntries: [
          ...state.timeEntries,
          action.payload,
        ],
        totalSubmittedHours: state.totalSubmittedHours += action.payload.hours,
      };
    }

    default:
      return state;
  }
}
