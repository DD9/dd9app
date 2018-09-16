import React, { Component } from 'react';

import TimeEntryTable from './TimeEntryTable';
import TimeEntryForm from './TimeEntryForm';

const TimeEntryNew = () => (
  <div className="container default-table-font-size">
    <TimeEntryTable />
    <div className="m-4" />
    <TimeEntryForm />
  </div>
);

export default TimeEntryNew;
