import axios from 'axios';
import {
  GET_CREATED_TIME_ENTRIES,
  CREATE_NEW_TIME_ENTRY,
  CREATE_AND_SUBMIT_TIME_ENTRY,
  EDIT_TIME_ENTRY,
  ADJUDICATE_TIME_ENTRY,
  APPROVE_TIME_ENTRY,
  HIDE_TIME_ENTRY,
  REJECT_TIME_ENTRY,
  SUBMIT_TIME_ENTRY,
  DELETE_TIME_ENTRY,
  NEW_TIME_ENTRY_BULK_ACTION,
  TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, GET_HOUR_LOG,
} from './types';

export const getCreatedTimeEntries = () => async dispatch => {
  const res = await axios.get('/api/v1/timeEntries/created');

  dispatch({ type: GET_CREATED_TIME_ENTRIES, payload: res.data });
};

export const createNewTimeEntry = formProps => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/create', formProps);

  dispatch({ type: CREATE_NEW_TIME_ENTRY, payload: res.data });
};

export const createAndSubmitTimeEntry = formProps => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/createAndSubmit', formProps);

  await dispatch({ type: CREATE_AND_SUBMIT_TIME_ENTRY, payload: res.data });
};

export const editTimeEntry = (timeEntryId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/edit`, formProps);

  dispatch({ type: EDIT_TIME_ENTRY, payload: res.data });
};

export const adjudicateTimeEntry = (timeEntryId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/adjudicate`, formProps);

  dispatch({ type: ADJUDICATE_TIME_ENTRY, payload: res.data });
};

export const approveTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/approve`);

  dispatch({ type: APPROVE_TIME_ENTRY, payload: res.data });
};

export const hideTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/hide`);

  dispatch({ type: HIDE_TIME_ENTRY, payload: res.data });
};

export const rejectTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/reject`);

  dispatch({ type: REJECT_TIME_ENTRY, payload: res.data });
};

export const submitTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/submit`);

  dispatch({ type: SUBMIT_TIME_ENTRY, payload: res.data });
};

export const deleteTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/delete`);

  dispatch({ type: DELETE_TIME_ENTRY, payload: res.data });
};

export const approveAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/approveAll/approved');

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const hideAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/hideAll/hidden');

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const submitAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/submitAll/submitted');

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const deleteAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/deleteAll/deleted');

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const hideFromApprovedTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/approved/hidden`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const rejectFromApprovedTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/approved/rejected`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const approveFromHiddenTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/hidden/approved`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const rejectFromHiddenTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/hidden/rejected`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const approveFromSubmittedTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/submitted/approved`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const hideFromSubmittedTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/submitted/hidden`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const rejectFromSubmittedTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/submitted/rejected`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};
