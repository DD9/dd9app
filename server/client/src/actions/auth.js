import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const getCurrentUser = () => async dispatch => {
  const res = await axios.get('/api/v1/current_user');

  console.log(res.data);

  try {
    localStorage.setItem('token', res.data._id);
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: 'Error fetching current user' });
  }

  dispatch({ type: AUTH_USER, payload: res.data });
};

export const logout = history => async dispatch => {
  const res = await axios.get('/api/v1/logout');

  try {
    await localStorage.removeItem('token');
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: 'Error logging out' });
  }

  console.log(res.data);

  history.push('/login');
  dispatch({ type: AUTH_USER, payload: res.data });
};
