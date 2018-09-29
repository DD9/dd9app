/* eslint no-trailing-spaces:0 */

import {
  GET_HOUR_LOG,
  CREATE_AND_SUBMIT_TIME_ENTRY,
  ADJUDICATE_TIME_ENTRY,
  APPROVE_TIME_ENTRY,
  HIDE_TIME_ENTRY,
  REJECT_TIME_ENTRY,
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

    default:
      return state;
  }
}
