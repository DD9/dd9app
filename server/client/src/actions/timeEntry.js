import axios from 'axios';
import { GET_CREATED_TIME_ENTRIES, CREATE_NEW_TIME_ENTRY } from './types';

export const getCreatedTimeEntries = () => async dispatch => {
  const res = await axios.get('/api/v1/timeEntries/created');

  dispatch({ type: GET_CREATED_TIME_ENTRIES, payload: res.data });
};

export const createNewTimeEntry = formProps => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/create', formProps);

  dispatch({ type: CREATE_NEW_TIME_ENTRY, payload: res.data });
};
