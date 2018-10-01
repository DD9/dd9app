import axios from 'axios';
import { toast } from 'react-toastify';

import { AUTH_USER, AUTH_ERROR } from './types';

export const getCurrentUser = () => async dispatch => {
  const res = await axios.get('/api/v1/user/current');

  try {
    localStorage.setItem('token', res.data._id);
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: 'Error fetching current user' });
  }

  if (res.data) {
    toast.info(`Welcome ${res.data.firstName} ${res.data.lastName}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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

  await history.push('/login');

  toast.info('Goodbye!', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: AUTH_USER, payload: res.data });
};
