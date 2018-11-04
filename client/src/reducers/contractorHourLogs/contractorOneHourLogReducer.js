/* eslint no-trailing-spaces:0 */

import {
  GET_CONTRACTOR_HOUR_LOG,
  CLOSE_CONTRACTOR_HOUR_LOG,
  EDIT_CONTRACTOR_HOUR_LOG,
  REJECT_TIME_ENTRY,
  SUBMIT_TIME_ENTRY,
  DELETE_TIME_ENTRY,
  CLEAR_CONTRACTOR_HOUR_LOG_ONE_STATE,
} from '../../actions/types';

const INITIAL_STATE = { timeEntries: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CONTRACTOR_HOUR_LOG:
      return action.payload || false;

    case CLOSE_CONTRACTOR_HOUR_LOG:
      return state;

    case EDIT_CONTRACTOR_HOUR_LOG:
      return {
        ...state,
        title: action.payload.title,
      };

    case REJECT_TIME_ENTRY:
      return {
        ...state,
        timeEntries: state.timeEntries.map(timeEntry => {
          if (timeEntry._id === action.payload.rejectedTimeEntry._id) {
            timeEntry = action.payload.newTimeEntry;
          }
          return timeEntry;
        }),
      };

    case SUBMIT_TIME_ENTRY:
      return {
        ...state,
        timeEntries: state.timeEntries.map(timeEntry => {
          if (timeEntry._id === action.payload._id) {
            timeEntry = action.payload;
          }
          return timeEntry;
        }),
      };

    case DELETE_TIME_ENTRY:
      return {
        ...state,
        timeEntries: state.timeEntries.filter(timeEntry => timeEntry._id !== action.payload._id),
      };

    case CLEAR_CONTRACTOR_HOUR_LOG_ONE_STATE:
      return INITIAL_STATE || false;

    default:
      return state;
  }
}
