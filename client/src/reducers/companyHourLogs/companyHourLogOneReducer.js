/* eslint no-trailing-spaces:0 */

import {
  GET_COMPANY_HOUR_LOG,
  OPEN_COMPANY_HOUR_LOG,
  CLOSE_COMPANY_HOUR_LOG,
  EDIT_COMPANY_HOUR_LOG,
  CREATE_AND_SUBMIT_TIME_ENTRY,
  ADJUDICATE_TIME_ENTRY,
  APPROVE_TIME_ENTRY,
  HIDE_TIME_ENTRY,
  REJECT_TIME_ENTRY,
  TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION,
  CLEAR_COMPANY_HOUR_LOG_ONE_STATE,
} from '../../actions/types';

const INITIAL_STATE = { timeEntries: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COMPANY_HOUR_LOG:
      return action.payload || false;

    case OPEN_COMPANY_HOUR_LOG:
      return state;

    case CLOSE_COMPANY_HOUR_LOG:
      return state;

    case EDIT_COMPANY_HOUR_LOG:
      return {
        ...state,
        title: action.payload.title,
      };

    case CREATE_AND_SUBMIT_TIME_ENTRY: {
      return {
        ...state,
        timeEntries: [
          ...state.timeEntries,
          action.payload,
        ],
      };
    }

    case ADJUDICATE_TIME_ENTRY: {
      const newState = {
        ...state,
        timeEntries: state.timeEntries.filter(timeEntry => timeEntry._id !== action.payload._id),
      };

      if (!newState.timeEntries) {
        newState.timeEntries.push('empty');
      }
      return newState;
    }

    case APPROVE_TIME_ENTRY:
      return {
        ...state,
        timeEntries: state.timeEntries.map(timeEntry => {
          if (timeEntry._id === action.payload._id) {
            timeEntry = action.payload;
          }
          return timeEntry;
        }),
      };

    case HIDE_TIME_ENTRY:
      return {
        ...state,
        timeEntries: state.timeEntries.map(timeEntry => {
          if (timeEntry._id === action.payload._id) {
            timeEntry = action.payload;
          }
          return timeEntry;
        }),
      };

    case REJECT_TIME_ENTRY:
      return {
        ...state,
        timeEntries: state.timeEntries.map(timeEntry => {
          if (timeEntry._id === action.payload.rejectedTimeEntry._id) {
            timeEntry = action.payload.rejectedTimeEntry;
          }
          return timeEntry;
        }),
      };

    case TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION:
      return state;

    case CLEAR_COMPANY_HOUR_LOG_ONE_STATE:
      return INITIAL_STATE || false;

    default:
      return state;
  }
}
