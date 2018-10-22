import axios from 'axios';
import { toast } from 'react-toastify';

import {
  GET_OPEN_CONTRACTOR_HOUR_LOGS,
  GET_CLOSED_CONTRACTOR_HOUR_LOGS,
  GET_CONTRACTOR_HOUR_LOG,
} from './types';

export const getOpenContractorHourLogs = () => async dispatch => {
  const res = await axios.get('/api/v1/hourLogs/contractor/open');

  dispatch({ type: GET_OPEN_CONTRACTOR_HOUR_LOGS, payload: res.data });
};

export const getClosedContractorHourLogs = () => async dispatch => {
  const res = await axios.get('/api/v1/hourLogs/contractor/closed');

  dispatch({ type: GET_CLOSED_CONTRACTOR_HOUR_LOGS, payload: res.data });
};

export const getContractorHourLog = contractorHourLogId => async dispatch => {
  const res = await axios.get(`/api/v1/hourLog/contractor/${contractorHourLogId}`);

  dispatch({ type: GET_CONTRACTOR_HOUR_LOG, payload: res.data });
};
