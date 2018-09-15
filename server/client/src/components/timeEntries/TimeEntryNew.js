import React, { Component } from 'react';

import TimeEntryTable from './TimeEntryTable';
import TimeEntryForm from './TimeEntryForm';

import '../../styles/timeEntry/timeEntryNew.css';

const TimeEntryNew = () => (
  <div className="container time-entry-new-container">
    <TimeEntryTable />
    <TimeEntryForm />
  </div>
);

export default TimeEntryNew;
