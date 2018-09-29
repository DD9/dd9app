/* eslint-disable no-trailing-spaces */

import {
  GET_CREATED_TIME_ENTRIES,
  CREATE_NEW_TIME_ENTRY,
  EDIT_TIME_ENTRY,
  APPROVE_TIME_ENTRY,
  HIDE_TIME_ENTRY,
  REJECT_TIME_ENTRY,
  SUBMIT_TIME_ENTRY,
  DELETE_TIME_ENTRY, 
} from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CREATED_TIME_ENTRIES:
      return action.payload || false;

    case CREATE_NEW_TIME_ENTRY:
      return [...state, action.payload];

    case EDIT_TIME_ENTRY: {
      return state.map(timeEntry => {
        if (timeEntry._id === action.payload._id) {
          timeEntry = action.payload;
        }
        return timeEntry;
      });
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
