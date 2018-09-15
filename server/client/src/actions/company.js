import axios from 'axios';
import { GET_ACTIVE_COMPANIES } from './types';

export const getActiveCompanies = () => async dispatch => {
  const res = await axios.get('/api/v1/companies/active');

  dispatch({ type: GET_ACTIVE_COMPANIES, payload: res.data });
};
