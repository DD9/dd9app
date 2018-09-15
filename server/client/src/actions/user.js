import axios from 'axios';
import { GET_ALL_USERS } from './types';

export const getAllUsers = () => async dispatch => {
  const res = await axios.get('/api/v1/users/all');

  dispatch({ type: GET_ALL_USERS, payload: res.data });
};
