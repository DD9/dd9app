import axios from 'axios';
import { toast } from 'react-toastify';

import {
  GET_ALL_USERS, GET_ACTIVE_USERS, GET_USER, ADMIN_EDIT_USERS, ADMIN_EDIT_USER, EDIT_USER, AUTH_USER, GET_CONTRACTOR_HOUR_LOGS, CLEAR_CONTRACTOR_HOUR_LOGS_STATE,
} from './types';

export const getAllUsers = () => async dispatch => {
  const res = await axios.get('/api/v1/users');

  dispatch({ type: GET_ALL_USERS, payload: res.data });
};

export const getActiveUsers = () => async dispatch => {
  const res = await axios.get('/api/v1/activeUsers');

  dispatch({ type: GET_ACTIVE_USERS, payload: res.data });
};

export const getUser = userId => async dispatch => {
  const res = await axios.get(`/api/v1/user/${userId}`);

  dispatch({ type: GET_USER, payload: res.data });
};

export const adminEditUser = (userId, authId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/user/${userId}/adminEdit`, formProps);

  await dispatch({ type: ADMIN_EDIT_USER, payload: res.data });

  if (authId === res.data._id) {
    await dispatch({ type: AUTH_USER, payload: res.data });
  }

  toast.success(`${res.data.name.full} successfully edited`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};


export const adminEditUsers = (userId, authId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/user/${userId}/adminEdit`, formProps);

  await dispatch({ type: ADMIN_EDIT_USERS, payload: res.data });

  if (authId === res.data._id) {
    await dispatch({ type: AUTH_USER, payload: res.data });
  }

  toast.success(`${res.data.name.full} successfully edited`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const editUser = formProps => async dispatch => {
  const res = await axios.post(`/api/v1/user/${formProps.userId}/edit`, formProps);

  toast.success(`${res.data.name.full} successfully edited`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: EDIT_USER, payload: res.data });
};

export const getContractorHourLogs = userId => async dispatch => {
  const res = await axios.get(`/api/v1/user/${userId}/contractorHourLogs`);

  dispatch({ type: GET_CONTRACTOR_HOUR_LOGS, payload: res.data });
};

export const clearContractorHourLogState = () => async dispatch => {
  dispatch({ type: CLEAR_CONTRACTOR_HOUR_LOGS_STATE, payload: {} });
};
