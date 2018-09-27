import axios from 'axios';
import {
  GET_CREATED_TIME_ENTRIES,
  CREATE_NEW_TIME_ENTRY,
  SUBMIT_NEW_TIME_ENTRY_FROM_HOUR_LOG,
} from './types';

export const getCreatedTimeEntries = () => async dispatch => {
  const res = await axios.get('/api/v1/timeEntries/created');

  dispatch({ type: GET_CREATED_TIME_ENTRIES, payload: res.data });
};

export const createNewTimeEntry = formProps => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/create', formProps);

  dispatch({ type: CREATE_NEW_TIME_ENTRY, payload: res.data });
};

export const submitNewTimeEntryFromHourLog = formProps => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/createAndSubmit', formProps);

  await dispatch({ type: SUBMIT_NEW_TIME_ENTRY_FROM_HOUR_LOG, payload: res.data });
};
