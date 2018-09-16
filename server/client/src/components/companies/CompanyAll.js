import React from 'react';

import CompanyCreate from './CompanyCreate';
import CompanyTable from './CompanyTable';

const CompanyAll = () => (
  <div className="container default-table-font-size">
    <CompanyCreate />
    <div className="m-4" />
    <CompanyTable />
  </div>
);

export default CompanyAll;
