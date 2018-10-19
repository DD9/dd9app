import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './auth/authReducer';
import userAllReducer from './users/userAllReducer';
import userActiveReducer from './users/userActiveReducer';
import userOneReducer from './users/userOneReducer';
import companyAllReducer from './companies/companyAllReducer';
import companyOneReducer from './companies/companyOneReducer';
import companyHourLogReducer from './companies/companyHourLogReducer';
import companyActiveReducer from './companies/companyActiveReducer';
import openCompanyHourLogsReducer from './companyHourLogs/openCompanyHourLogsReducer';
import closedCompanyHourLogsReducer from './companyHourLogs/closedCompanyHourLogsReducer';
import companyOneHourLogReducer from './companyHourLogs/companyOneHourLogReducer';
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
  openCompanyHourLogs: openCompanyHourLogsReducer,
  closedCompanyHourLogs: closedCompanyHourLogsReducer,
  companyHourLog: companyOneHourLogReducer,
  createdTimeEntries: timeEntryNewReducer,
});
