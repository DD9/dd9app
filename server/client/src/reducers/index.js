import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import userReducer from './userReducer';
import companyReducer from './companyReducer';
import newTimeEntryReducer from './newTimeEntryReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  users: userReducer,
  companies: companyReducer,
  newTimeEntries: newTimeEntryReducer,
});
