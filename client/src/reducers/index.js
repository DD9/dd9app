import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import { reducer as reduxForm } from 'redux-form';
import userAllReducer from './users/userAllReducer';
import userActiveReducer from './users/userActiveReducer';
import userOneReducer from './users/userOneReducer';
import companyAllReducer from './companies/companyAllReducer';
import companyOneReducer from './companies/companyOneReducer';
import companyHourLogReducer from './companies/companyHourLogReducer';
import companyActiveReducer from './companies/companyActiveReducer';
import hourLogOpenReducer from './hourLogs/hourLogOpenReducer';
import hourLogClosedReducer from './hourLogs/hourLogClosedReducer';
import hourLogOneReducer from './hourLogs/hourLogOneReducer';
import timeEntryNewReducer from './timeEntries/timeEntryNewReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  users: userAllReducer,
  activeUsers: userActiveReducer,
  user: userOneReducer,
  companies: companyAllReducer,
  company: companyOneReducer,
  activeCompanies: companyActiveReducer,
  companyHourLogs: companyHourLogReducer,
  openHourLogs: hourLogOpenReducer,
  closedHourLogs: hourLogClosedReducer,
  hourLog: hourLogOneReducer,
  createdTimeEntries: timeEntryNewReducer,
});
