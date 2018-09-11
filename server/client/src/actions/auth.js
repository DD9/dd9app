import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const fetchCurrentUser = () => async dispatch => {
  const res = await axios.get('/api/v1/current_user');

  try {
    localStorage.setItem('token', res.data._id);
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
  dispatch({ type: AUTH_USER, payload: res.data });
};

export const logout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: '',
  };
};
