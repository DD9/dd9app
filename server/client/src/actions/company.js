import axios from 'axios';
import { ACTIVE_COMPANIES } from './types';

export const fetchActiveCompanies = () => async dispatch => {
  const res = await axios.get('/api/v1/companies/active');

  dispatch({ type: ACTIVE_COMPANIES, payload: res.data });
};
