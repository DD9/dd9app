import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import companyReducer from './companyReducer';
import timeEntryReducer from './timeEntryReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  companies: companyReducer,
  timeEntries: timeEntryReducer,
});
