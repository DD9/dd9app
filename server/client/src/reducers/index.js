import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import { reducer as reduxForm } from 'redux-form';
import userReducer from './users/userReducer';
import companyReducer from './companies/companyReducer';
import openHourLogReducer from './hourLogs/openHourLogReducer';
import closedHourLogReducer from './hourLogs/closedHourLogReducer';
import newTimeEntryReducer from './timeEntries/newTimeEntryReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  users: userReducer,
  companies: companyReducer,
  openHourLogs: openHourLogReducer,
  closedHourLogs: closedHourLogReducer,
  newTimeEntries: newTimeEntryReducer,
});
