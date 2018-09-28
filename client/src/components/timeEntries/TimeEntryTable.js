import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

import TimeEntryTableEditFormModal from './TimeEntryTableEditFormModal';

const TimeEntryTable = ({ tableTitle, timeEntries, defaultPageSize }) => {
  const columns = [{
    Header: () => (
      <span className="table-title">{tableTitle}</span>
    ),
    columns: [{
      Header: 'Date',
      id: 'date',
      Cell: timeEntry => timeEntry.original.publicDate.split('T')[0],
      maxWidth: 95,
    }, {
      Header: 'Company',
      accessor: 'publicCompany.name',
      Cell: timeEntry => <Link to={`/company/${timeEntry.original.publicCompany._id}`}>{timeEntry.original.publicCompany.name}</Link>,
      maxWidth: 150,
    }, {
      Header: 'User',
      id: 'publicUser',
      Cell: timeEntry => `${timeEntry.original.publicUser.firstName} ${timeEntry.original.publicUser.lastName}`,
      maxWidth: 150,
    }, {
      Header: 'Hours',
      accessor: 'publicHours',
      maxWidth: 70,
      Footer: (
        <span>
          {timeEntries.map(timeEntry => timeEntry.publicHours).reduce((prev, next) => prev + next, 0)}
        </span>
      ),
    }, {
      Header: 'Description',
      accessor: 'publicDescription',
    }, {
      Header: '',
      id: 'timeEntryTableRowActions',
      accessor: timeEntry => (
        <div>
          <TimeEntryTableEditFormModal
            user={user}
            activeCompanies={activeCompanies}
            form={`time-entry-edit-form-${timeEntry._id}`}
            initialValues={{
              userId: user._id,
              company: user.company._id,
              role: user.role,
              status: user.status,
              firstName: user.firstName,
              lastName: user.lastName,
            }}
          />
        </div>
      ),
      maxWidth: 120,
    }],
  }];



  return (
    <ReactTable
      data={timeEntries}
      columns={columns}
      className="-striped -highlight"
      defaultPageSize={defaultPageSize}
      noDataText="Empty"
      defaultSorted={[
        {
          id: 'date',
          asc: true,
        },
      ]}
    />
  );
};

export default TimeEntryTable;
