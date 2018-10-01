import { GET_ACTIVE_COMPANIES } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ACTIVE_COMPANIES:
      return action.payload || false;
    default:
      return state;
  }
}
