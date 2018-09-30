import { GET_COMPANY, EDIT_COMPANY, ACTIVATE_COMPANY, DEACTIVATE_COMPANY } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COMPANY:
      return action.payload || false;
    case EDIT_COMPANY:
      return action.payload || false;
    case ACTIVATE_COMPANY:
      return action.payload || false;
    case DEACTIVATE_COMPANY:
      return action.payload || false;
    default:
      return state;
  }
}
