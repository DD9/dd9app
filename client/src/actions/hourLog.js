import axios from 'axios';
import { toast } from 'react-toastify';

import {
  GET_OPEN_HOUR_LOGS, GET_CLOSED_HOUR_LOGS, GET_HOUR_LOG, OPEN_HOUR_LOG, CLOSE_HOUR_LOG, GET_COMPANY_HOUR_LOGS, EDIT_HOUR_LOG,
} from './types';

export const getOpenHourLogs = () => async dispatch => {
  const res = await axios.get('/api/v1/hourLogs/company/open');

  dispatch({ type: GET_OPEN_HOUR_LOGS, payload: res.data });
};

export const getClosedHourLogs = () => async dispatch => {
  const res = await axios.get('/api/v1/hourLogs/company/closed');

  dispatch({ type: GET_CLOSED_HOUR_LOGS, payload: res.data });
};

export const getHourLog = hourLogId => async dispatch => {
  const res = await axios.get(`/api/v1/hourLog/company/${hourLogId}`);

  dispatch({ type: GET_HOUR_LOG, payload: res.data });
};

export const openHourLog = (hourLogId, history) => async dispatch => {
  const openHourLogRes = await axios.post(`/api/v1/hourLog/company/${hourLogId}/open`);

  if (openHourLogRes.data._id !== hourLogId) {
    const hourLog = await axios.get(`/api/v1/hourLog/company/${openHourLogRes.data._id}`);
    history.push(`/hourLog/company/${openHourLogRes.data._id}`);
    dispatch({ type: OPEN_HOUR_LOG, payload: openHourLogRes.data });
    dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
  } else {
    const hourLog = await axios.get(`/api/v1/hourLog/company/${hourLogId}`);
    dispatch({ type: OPEN_HOUR_LOG, payload: openHourLogRes.data });
    dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
  }

  toast.success('Successfully opened hour log', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const closeHourLog = (hourLogId, formProps, history) => async dispatch => {
  const closeHourLogRes = await axios.post(`/api/v1/hourLog/company/${hourLogId}/close`, formProps);

  if (closeHourLogRes.data.title === 'Current') {
    toast.error('Error: failed to close hour log', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    const hourLog = await axios.get(`/api/v1/hourLog/company/${hourLogId}`);
    dispatch({ type: CLOSE_HOUR_LOG, payload: closeHourLogRes.data });
    dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
  } else if (closeHourLogRes.data.redirectUrl) {
    toast.success('Successfully deleted hour log', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    const getCompanyHourLogs = await axios.get(`/api/v1/company/${closeHourLogRes.data.companyId}/hourLogs`);
    history.push(closeHourLogRes.data.redirectUrl);
    dispatch({ type: GET_COMPANY_HOUR_LOGS, payload: getCompanyHourLogs.data });
  } else {
    toast.success('Successfully closed hour log', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    const hourLog = await axios.get(`/api/v1/hourLog/company/${hourLogId}`);
    dispatch({ type: CLOSE_HOUR_LOG, payload: closeHourLogRes.data });
    dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
  }
};

export const editHourLog = (hourLogId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/hourLog/company/${hourLogId}/edit`, formProps);

  dispatch({ type: EDIT_HOUR_LOG, payload: res.data });
};
