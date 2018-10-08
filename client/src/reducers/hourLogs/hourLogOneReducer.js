/* eslint no-trailing-spaces:0 */

import {
  GET_HOUR_LOG,
  OPEN_HOUR_LOG,
  CLOSE_HOUR_LOG,
  EDIT_HOUR_LOG,
  CREATE_AND_SUBMIT_TIME_ENTRY,
  ADJUDICATE_TIME_ENTRY,
  APPROVE_TIME_ENTRY,
  HIDE_TIME_ENTRY,
  REJECT_TIME_ENTRY,
  TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION,
} from '../../actions/types';

const INITIAL_STATE = { timeEntries: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_HOUR_LOG:
      return action.payload || false;

    case OPEN_HOUR_LOG:
      return state;

    case CLOSE_HOUR_LOG:
      return state;

    case EDIT_HOUR_LOG:
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
      let removeTimeEntry = false;
      state.timeEntries.forEach(timeEntry => {
        if ((timeEntry._id === action.payload._id) && (timeEntry.publicCompany._id !== action.payload.publicCompany._id)) {
          removeTimeEntry = true;
        }
      });
      if (removeTimeEntry) {
        return {
          ...state,
          timeEntries: state.timeEntries.filter(timeEntry => timeEntry._id !== action.payload._id),
        };
      } 
      return {
        ...state,
        timeEntries: state.timeEntries.map(timeEntry => {
          if (timeEntry._id === action.payload._id) {
            timeEntry = action.payload;
          }
          return timeEntry;
        }),
      };
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
        timeEntries: state.timeEntries.filter(timeEntry => timeEntry._id !== action.payload._id),
      };

    case TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION:
      return state;

    default:
      return state;
  }
}
