/* eslint no-trailing-spaces:0 */

import { GET_USERS, ADMIN_EDIT_USERS } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload || false;

    case ADMIN_EDIT_USERS: {
      return state.map(user => {
        if (user._id === action.payload._id) {
          user = action.payload;
        }
        return user;
      });
    }

    default:
      return state;
  }
}
