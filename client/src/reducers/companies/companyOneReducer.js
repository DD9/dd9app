import { GET_COMPANY, EDIT_COMPANY } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COMPANY:
      return action.payload || false;
    case EDIT_COMPANY:
      return action.payload || false;
    default:
      return state;
  }
}
