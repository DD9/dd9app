import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import { reducer as reduxForm } from 'redux-form';
import userAllReducer from './users/userAllReducer';
import userOneReducer from './users/userOneReducer';
import companyAllReducer from './companies/companyAllReducer';
import companyHourLogReducer from './companies/companyHourLogReducer';
import companyActiveReducer from './companies/companyActiveReducer';
import hourLogOpenReducer from './hourLogs/hourLogOpenReducer';
import hourLogClosedReducer from './hourLogs/hourLogClosedReducer';
import timeEntryNewReducer from './timeEntries/timeEntryNewReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  users: userAllReducer,
  user: userOneReducer,
  companies: companyAllReducer,
  activeCompanies: companyActiveReducer,
  companyHourLogs: companyHourLogReducer,
  openHourLogs: hourLogOpenReducer,
  closedHourLogs: hourLogClosedReducer,
  createdTimeEntries: timeEntryNewReducer,
});
