import axios from 'axios';
import {
  GET_USERS, GET_USER, ADMIN_EDIT_USERS, ADMIN_EDIT_USER, EDIT_USER, AUTH_USER,
} from './types';

export const getUsers = () => async dispatch => {
  const res = await axios.get('/api/v1/users/all');

  dispatch({ type: GET_USERS, payload: res.data });
};

export const getUser = userId => async dispatch => {
  const res = await axios.get(`/api/v1/user/${userId}`);

  dispatch({ type: GET_USER, payload: res.data });
};

export const adminEditUser = (formProps, authId) => async dispatch => {
  const res = await axios.post(`/api/v1/user/${formProps.userId}/adminEdit`, formProps);

  await dispatch({ type: ADMIN_EDIT_USER, payload: res.data });

  if (authId === res.data._id) {
    await dispatch({ type: AUTH_USER, payload: res.data });
  }
};


export const adminEditUsers = (formProps, authId) => async dispatch => {
  const res = await axios.post(`/api/v1/user/${formProps.userId}/adminEdit`, formProps);

  await dispatch({ type: ADMIN_EDIT_USERS, payload: res.data });

  if (authId === res.data._id) {
    await dispatch({ type: AUTH_USER, payload: res.data });
  }
};

export const editUser = formProps => async dispatch => {
  const res = await axios.post(`/api/v1/user/${formProps.userId}/edit`, formProps);

  dispatch({ type: EDIT_USER, payload: res.data });
};
