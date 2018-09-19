import axios from 'axios';
import { GET_OPEN_HOUR_LOGS, GET_CLOSED_HOUR_LOGS } from './types';

export const getOpenHourLogs = () => async dispatch => {
  const res = await axios.get('/api/v1/hourLogs/open');

  dispatch({ type: GET_OPEN_HOUR_LOGS, payload: res.data });
};

export const getClosedHourLogs = () => async dispatch => {
  const res = await axios.get('/api/v1/hourLogs/closed');

  dispatch({ type: GET_CLOSED_HOUR_LOGS, payload: res.data });
};