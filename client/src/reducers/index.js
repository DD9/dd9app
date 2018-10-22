import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './auth/authReducer';
import userAllReducer from './users/userAllReducer';
import userActiveReducer from './users/userActiveReducer';
import userOneReducer from './users/userOneReducer';
import contractorOneHourLogReducer from './users/contractorOneHourLogReducer';
import companyAllReducer from './companies/companyAllReducer';
import companyOneReducer from './companies/companyOneReducer';
import companyOneHourLogReducer from './companies/companyOneHourLogReducer';
import companyActiveReducer from './companies/companyActiveReducer';
import openContractorHourLogReducer from './contractorHourLogs/openContractorHourLogReducer';
import closedContractorHourLogReducer from './contractorHourLogs/closedContractorHourLogReducer';
import contractorHourLogOneReducer from './contractorHourLogs/contractorOneHourLogReducer'
import openCompanyHourLogReducer from './companyHourLogs/openCompanyHourLogReducer';
import closedCompanyHourLogReducer from './companyHourLogs/closedCompanyHourLogReducer';
import companyHourLogOneReducer from './companyHourLogs/companyHourLogOneReducer';
import timeEntryNewReducer from './timeEntries/timeEntryNewReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  users: userAllReducer,
  activeUsers: userActiveReducer,
  user: userOneReducer,
  contractorHourLogs: contractorOneHourLogReducer,
  companies: companyAllReducer,
  company: companyOneReducer,
  activeCompanies: companyActiveReducer,
  companyHourLogs: companyOneHourLogReducer,
  openContractorHourLogs: openContractorHourLogReducer,
  closedContractorHourLogs: closedContractorHourLogReducer,
  contractorHourLog: contractorHourLogOneReducer,
  openCompanyHourLogs: openCompanyHourLogReducer,
  closedCompanyHourLogs: closedCompanyHourLogReducer,
  companyHourLog: companyHourLogOneReducer,
  createdTimeEntries: timeEntryNewReducer,
});
