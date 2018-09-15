import { GET_ACTIVE_COMPANIES } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_ACTIVE_COMPANIES:
      return action.payload || false;
    default:
      return state;
  }
}
