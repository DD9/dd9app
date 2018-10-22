/* eslint no-trailing-spaces:0 */

import {
  GET_CONTRACTOR_HOUR_LOG,
} from '../../actions/types';

const INITIAL_STATE = { timeEntries: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CONTRACTOR_HOUR_LOG:
      return action.payload || false;
    default:
      return state;
  }
}
