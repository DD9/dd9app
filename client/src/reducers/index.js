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
import openCompanyHourLogReducer from './companyHourLogs/openCompanyHourLogReducer';
import closedCompanyHourLogReducer from './companyHourLogs/closedCompanyHourLogReducer';
import openContractorHourLogReducer from './contractorHourLogs/openContractorHourLogReducer';
import closedContractorHourLogReducer from './contractorHourLogs/closedContractorHourLogReducer';
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
  openCompanyHourLogs: openCompanyHourLogReducer,
  closedCompanyHourLogs: closedCompanyHourLogReducer,
  openContractorHourLogs: openContractorHourLogReducer,
  closedContractorHourLogs: closedContractorHourLogReducer,
  companyHourLog: companyOneHourLogReducer,
  createdTimeEntries: timeEntryNewReducer,
});
