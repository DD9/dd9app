import { FETCH_CREATED_TIME_ENTRIES, CREATE_NEW_TIME_ENTRY } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CREATED_TIME_ENTRIES:
      return action.payload || false;
    case CREATE_NEW_TIME_ENTRY:
      return action.payload || false;
    default:
      return state;
  }
}
