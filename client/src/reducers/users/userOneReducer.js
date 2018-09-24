import { GET_USER, ADMIN_EDIT_USER, EDIT_USER } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload || false;
    case ADMIN_EDIT_USER:
      return action.payload || false;
    case EDIT_USER:
      return action.payload || false;
    default:
      return state;
  }
}
