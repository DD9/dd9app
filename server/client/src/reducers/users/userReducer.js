/* eslint no-trailing-spaces:0 */

import {ADMINEDIT_USER, GET_ALL_USERS} from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload || false;

    case ADMINEDIT_USER: {
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
