import React from 'react';

import TimeEntryTable from './TimeEntryTable';
import TimeEntryForm from './TimeEntryForm';

const TimeEntryNew = () => (
  <div className="container table-font-size">
    <TimeEntryTable />
    <TimeEntryForm />
  </div>
);

export default TimeEntryNew;
