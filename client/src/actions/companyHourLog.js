import axios from 'axios';
import { toast } from 'react-toastify';

import {
  GET_OPEN_COMPANY_HOUR_LOGS,
  GET_CLOSED_COMPANY_HOUR_LOGS,
  GET_COMPANY_HOUR_LOG,
  GET_COMPANY_HOUR_LOGS,
  OPEN_COMPANY_HOUR_LOG,
  CLOSE_COMPANY_HOUR_LOG,
  EDIT_COMPANY_HOUR_LOG,
  CLEAR_COMPANY_HOUR_LOG_ONE_STATE,
} from './types';

export const getOpenCompanyHourLogs = () => async dispatch => {
  const res = await axios.get('/api/v1/companyHourLogs/open');

  dispatch({ type: GET_OPEN_COMPANY_HOUR_LOGS, payload: res.data });
};

export const getClosedCompanyHourLogs = () => async dispatch => {
  const res = await axios.get('/api/v1/companyHourLogs/closed');

  dispatch({ type: GET_CLOSED_COMPANY_HOUR_LOGS, payload: res.data });
};

export const getCompanyHourLog = companyHourLogId => async dispatch => {
  const res = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);

  dispatch({ type: GET_COMPANY_HOUR_LOG, payload: res.data });
};

export const openCompanyHourLog = (companyHourLogId, history) => async dispatch => {
  const openCompanyHourLogRes = await axios.post(`/api/v1/companyHourLog/${companyHourLogId}/open`);

  if (openCompanyHourLogRes.data._id !== companyHourLogId) {
    const companyHourLog = await axios.get(`/api/v1/companyHourLog/${openCompanyHourLogRes.data._id}`);
    history.push(`/companyHourLogs/${openCompanyHourLogRes.data._id}`);
    dispatch({ type: OPEN_COMPANY_HOUR_LOG, payload: openCompanyHourLogRes.data });
    dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
  } else {
    const companyHourLog = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);
    dispatch({ type: OPEN_COMPANY_HOUR_LOG, payload: openCompanyHourLogRes.data });
    dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
  }

  toast.success('Successfully opened hour log');
};

export const closeCompanyHourLog = (companyHourLogId, formProps, history) => async dispatch => {
  const closeCompanyHourLogRes = await axios.post(`/api/v1/companyHourLog/${companyHourLogId}/close`, formProps);

  if (closeCompanyHourLogRes.data.title === 'Current') {
    toast.error('Error: failed to close hour log');
    const companyHourLog = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);
    dispatch({ type: CLOSE_COMPANY_HOUR_LOG, payload: closeCompanyHourLogRes.data });
    dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
  } else if (closeCompanyHourLogRes.data.redirectUrl) {
    toast.success('Successfully deleted hour log');
    const getCompanyHourLogs = await axios.get(`/api/v1/company/${closeCompanyHourLogRes.data.companyId}/hourLogs`);
    history.push(closeCompanyHourLogRes.data.redirectUrl);
    dispatch({ type: GET_COMPANY_HOUR_LOGS, payload: getCompanyHourLogs.data });
  } else {
    toast.success('Successfully closed hour log');
    const companyHourLog = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);
    dispatch({ type: CLOSE_COMPANY_HOUR_LOG, payload: closeCompanyHourLogRes.data });
    dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
  }
};

export const editCompanyHourLog = (companyHourLogId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/companyHourLog/${companyHourLogId}/edit`, formProps);
  toast.success('Successfully edited hour log');
  dispatch({ type: EDIT_COMPANY_HOUR_LOG, payload: res.data });
};

export const clearCompanyHourLogOneState = () => async dispatch => {
  dispatch({ type: CLEAR_COMPANY_HOUR_LOG_ONE_STATE, payload: {} });
};
