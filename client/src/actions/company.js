import axios from 'axios';
import {
  GET_ALL_COMPANIES, GET_COMPANY, GET_COMPANY_HOUR_LOGS, GET_ACTIVE_COMPANIES, CREATE_COMPANY, EDIT_COMPANY,
} from './types';

export const getAllCompanies = () => async dispatch => {
  const res = await axios.get('/api/v1/companies/all');

  dispatch({ type: GET_ALL_COMPANIES, payload: res.data });
};

export const getCompany = companyId => async dispatch => {
  const res = await axios.get(`/api/v1/company/${companyId}`);

  dispatch({ type: GET_COMPANY, payload: res.data });
};

export const getCompanyHourLogs = companyId => async dispatch => {
  const res = await axios.get(`/api/v1/company/${companyId}/hourLogs`);

  dispatch({ type: GET_COMPANY_HOUR_LOGS, payload: res.data });
};

export const getActiveCompanies = () => async dispatch => {
  const res = await axios.get('/api/v1/companies/active');

  dispatch({ type: GET_ACTIVE_COMPANIES, payload: res.data });
};

export const createCompany = formProps => async dispatch => {
  const res = await axios.post('/api/v1/company/create', formProps);

  dispatch({ type: CREATE_COMPANY, payload: res.data });
};

export const editCompany = (companyId, formProps) => async dispatch => {
  const companyEdit = await axios.post(`/api/v1/company/${companyId}/edit`, formProps);
  const company = await axios.get(`/api/v1/company/${companyId}`);

  await dispatch({ type: EDIT_COMPANY, payload: companyEdit.data });
  await dispatch({ type: GET_COMPANY, payload: company.data });
};
