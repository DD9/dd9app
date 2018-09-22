import axios from 'axios';
import { GET_ALL_USERS, ADMINEDIT_USER } from './types';

export const getAllUsers = () => async dispatch => {
  const res = await axios.get('/api/v1/users/all');

  dispatch({ type: GET_ALL_USERS, payload: res.data });
};

export const adminEditUser = (formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/user/${formProps.userId}/adminEdit`, formProps);

  dispatch({ type: ADMINEDIT_USER, payload: res.data });
};
