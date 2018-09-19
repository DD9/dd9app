import axios from 'axios';
import { GET_ALL_COMPANIES, GET_COMPANY, GET_ACTIVE_COMPANIES, CREATE_COMPANY, EDIT_COMPANY } from './types';

export const getAllCompanies = () => async dispatch => {
  const res = await axios.get('/api/v1/companies/all');

  dispatch({ type: GET_ALL_COMPANIES, payload: res.data });
};

export const getCompany = id => async dispatch => {
  const res = await axios.get(`/api/v1/companies/${id}`);

  dispatch({ type: GET_ACTIVE_COMPANIES, payload: res.data });
};

export const getActiveCompanies = () => async dispatch => {
  const res = await axios.get('/api/v1/companies/active');

  dispatch({ type: GET_COMPANY, payload: res.data });
};

export const createCompany = formProps => async dispatch => {
  const res = await axios.post('/api/v1/company/create', formProps);

  dispatch({ type: CREATE_COMPANY, payload: res.data });
};

export const editCompany = formProps => async dispatch => {
  const res = await axios.post('/api/v1/company/:id/edit', formProps);

  dispatch({ type: EDIT_COMPANY, payload: res.data });
};
