/* eslint no-trailing-spaces:0 */

import {
  GET_HOUR_LOG,
  CREATE_AND_SUBMIT_TIME_ENTRY,
  ADJUDICATE_TIME_ENTRY,
  APPROVE_TIME_ENTRY,
  HIDE_TIME_ENTRY,
  REJECT_TIME_ENTRY,
  SUBMIT_TIME_ENTRY,
  DELETE_TIME_ENTRY,
} from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_HOUR_LOG:
      return action.payload || false;

    case CREATE_AND_SUBMIT_TIME_ENTRY: {
      return {
        ...state,
        timeEntries: [
          ...state.timeEntries,
          action.payload,
        ],
        totalSubmittedHours: state.totalSubmittedHours += action.payload.hours,
      };
    }

    case ADJUDICATE_TIME_ENTRY: {
      return {
        ...state,
        timeEntries: state.timeEntries.map(timeEntry => {
          if (timeEntry._id === action.payload._id) {
            timeEntry = action.payload;
          }
          return timeEntry;
        }),
        totalSubmittedHours: state.totalSubmittedHours += action.payload.hours,
      };
    }

    case APPROVE_TIME_ENTRY:
      return state.filter(timeEntry => timeEntry._id !== action.payload._id);

    case HIDE_TIME_ENTRY:
      return state.filter(timeEntry => timeEntry._id !== action.payload._id);

    case REJECT_TIME_ENTRY:
      return state.filter(timeEntry => timeEntry._id !== action.payload._id);

    case SUBMIT_TIME_ENTRY:
      return state.filter(timeEntry => timeEntry._id !== action.payload._id);

    case DELETE_TIME_ENTRY:
      return state.filter(timeEntry => timeEntry._id !== action.payload._id);

    default:
      return state;
  }
}
