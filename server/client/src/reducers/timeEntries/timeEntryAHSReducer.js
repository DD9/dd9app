import { GET_AHS_TIME_ENTRIES } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_AHS_TIME_ENTRIES:
      return action.payload || false;
    default:
      return state;
  }
}
