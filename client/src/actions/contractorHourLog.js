import axios from 'axios';
import { toast } from 'react-toastify';

import {
  GET_OPEN_CONTRACTOR_HOUR_LOGS,
  GET_CLOSED_CONTRACTOR_HOUR_LOGS,
  GET_CONTRACTOR_HOUR_LOG,
  CLOSE_CONTRACTOR_HOUR_LOG,
  GET_CONTRACTOR_HOUR_LOGS,
  EDIT_CONTRACTOR_HOUR_LOG,
} from './types';

export const getOpenContractorHourLogs = () => async dispatch => {
  const res = await axios.get('/api/v1/contractorHourLogs/open');

  dispatch({ type: GET_OPEN_CONTRACTOR_HOUR_LOGS, payload: res.data });
};

export const getClosedContractorHourLogs = () => async dispatch => {
  const res = await axios.get('/api/v1/contractorHourLogs/closed');

  dispatch({ type: GET_CLOSED_CONTRACTOR_HOUR_LOGS, payload: res.data });
};

export const getContractorHourLog = contractorHourLogId => async dispatch => {
  const res = await axios.get(`/api/v1/contractorHourLog/${contractorHourLogId}`);

  dispatch({ type: GET_CONTRACTOR_HOUR_LOG, payload: res.data });
};

export const closeContractorHourLog = (contractorHourLogId, formProps, history) => async dispatch => {
  const closeContractorHourLogRes = await axios.post(`/api/v1/contractorHourLog/${contractorHourLogId}/close`, formProps);

  if (closeContractorHourLogRes.data.error) {
    toast.error(`Error: ${closeContractorHourLogRes.data.error}`);
    const contractorHourLog = await axios.get(`/api/v1/contractorHourLog/${contractorHourLogId}`);
    dispatch({ type: CLOSE_CONTRACTOR_HOUR_LOG, payload: closeContractorHourLogRes.data });
    dispatch({ type: GET_CONTRACTOR_HOUR_LOG, payload: contractorHourLog.data });
  } else if (closeContractorHourLogRes.data.redirectUrl) {
    toast.success('Successfully deleted hour log');
    const openContractorHourLogsRes = await axios.get('/api/v1/contractorHourLogs/open');
    const closedContractorHourLogsRes = await axios.get('/api/v1/contractorHourLogs/closed');

    history.push(closeContractorHourLogRes.data.redirectUrl);

    dispatch({ type: GET_OPEN_CONTRACTOR_HOUR_LOGS, payload: openContractorHourLogsRes.data });
    dispatch({ type: GET_CLOSED_CONTRACTOR_HOUR_LOGS, payload: closedContractorHourLogsRes.data });
  } else {
    toast.success('Successfully closed hour log');
    const contractorHourLog = await axios.get(`/api/v1/contractorHourLog/${contractorHourLogId}`);
    dispatch({ type: CLOSE_CONTRACTOR_HOUR_LOG, payload: closeContractorHourLogRes.data });
    dispatch({ type: GET_CONTRACTOR_HOUR_LOG, payload: contractorHourLog.data });
  }
};

export const editContractorHourLog = (contractorHourLogId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/contractorHourLog/${contractorHourLogId}/edit`, formProps);

  dispatch({ type: EDIT_CONTRACTOR_HOUR_LOG, payload: res.data });
};
