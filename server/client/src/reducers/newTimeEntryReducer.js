/* eslint-disable no-trailing-spaces */
import { GET_CREATED_TIME_ENTRIES, CREATE_NEW_TIME_ENTRY } from '../actions/types';

const INITIAL_STATE = { createdTimeEntries: [], totalCreatedTimeEntryHours: 0 };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CREATED_TIME_ENTRIES:
      return action.payload || false;

    case CREATE_NEW_TIME_ENTRY: {
      const { createdTimeEntries } = state;
      let { totalCreatedTimeEntryHours } = state;
      createdTimeEntries.push(action.payload.timeEntry);
      totalCreatedTimeEntryHours += action.payload.timeEntry.hours;
      return { createdTimeEntries, totalCreatedTimeEntryHours };
    }

    default:
      return state;
  }
}
