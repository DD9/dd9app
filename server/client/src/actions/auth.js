import axios from 'axios';
import { FETCH_CURRENT_USER } from './types';

export const fetchCurrentUser = () => async dispatch => {
  const res = await axios.get('/api/v1/current_user');

  console.log(res.data);

  dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
};
