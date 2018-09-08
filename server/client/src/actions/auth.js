import axios from 'axios';
import { CURRENT_USER } from './types';

export const currentUser = () => async dispatch => {
  const res = await axios.get('/api/v1/current_user');

  dispatch({ type: CURRENT_USER, payload: res.data });
};
