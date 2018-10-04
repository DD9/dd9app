import axios from 'axios';
import { toast } from 'react-toastify';

import {
  GET_ALL_COMPANIES, GET_COMPANY, GET_COMPANY_HOUR_LOGS, GET_ACTIVE_COMPANIES, CREATE_COMPANY, EDIT_COMPANY, ACTIVATE_COMPANY, DEACTIVATE_COMPANY,
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

  toast.success(`${res.data.name} successfully created`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });

  dispatch({ type: CREATE_COMPANY, payload: res.data });
};

export const editCompany = (companyId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/company/${companyId}/edit`, formProps);

  toast.success(`${res.data.name} successfully edited`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  await dispatch({ type: EDIT_COMPANY, payload: res.data });
};

export const activateCompany = companyId => async dispatch => {
  const res = await axios.post(`/api/v1/company/${companyId}/activate`);

  toast.success(`${res.data.name} successfully activated`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: ACTIVATE_COMPANY, payload: res.data });
};

export const deactivateCompany = companyId => async dispatch => {
  const res = await axios.post(`/api/v1/company/${companyId}/deactivate`);

  if (res.data.status === 'active') {
    toast.error('Error: cannot deactivate a company with an open hour log', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } else {
    toast.success(`${res.data.name} successfully deactivated`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  dispatch({ type: DEACTIVATE_COMPANY, payload: res.data });
};
