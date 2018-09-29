import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

import TimeEntryTableActions from './TimeEntryTableActions';
import TimeEntryTableBulkActions from './TimeEntryTableBulkActions'

const TimeEntryTable = ({
  tableTitle, auth, timeEntries, activeUsers, activeCompanies, defaultPageSize,
}) => {
  let columns;
  if (tableTitle === 'New Time Entries') {
    columns = [{
      Header: () => (
        <span className="table-title">{tableTitle}</span>
      ),
      columns: [{
        Header: 'Date',
        id: 'date',
        Cell: timeEntry => <span title={timeEntry.original.publicDate}>{timeEntry.original.publicDate.split('T')[0]}</span>,
        maxWidth: 95,
      }, {
        Header: 'Company',
        accessor: 'publicCompany.name',
        Cell: timeEntry => {
          if (auth.permissions[0].admin) {
            return <span title={timeEntry.original.publicCompany.name}><Link to={`/company/${timeEntry.original.publicCompany._id}`}>{timeEntry.original.publicCompany.name}</Link></span>;
          }
          return <span title={timeEntry.original.publicCompany.name}>{timeEntry.original.publicCompany.name}</span>;
        },
        maxWidth: 175,
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
          <div className="text-center">
            <TimeEntryTableActions
              auth={auth}
              timeEntry={timeEntry}
              activeUsers={activeUsers}
              activeCompanies={activeCompanies}
            />
          </div>
        ),
        maxWidth: 150,
        Footer: (
          <div className="text-center">
            <TimeEntryTableBulkActions
              auth={auth}
              tableTitle={tableTitle}
              activeUsers={activeUsers}
              activeCompanies={activeCompanies}
            />
          </div>
        ),
      }],
    }];
  } else {
    columns = [{
      Header: () => (
        <span className="table-title">{tableTitle}</span>
      ),
      columns: [{
        Header: 'Date',
        id: 'date',
        Cell: timeEntry => <span title={timeEntry.original.publicDate}>{timeEntry.original.publicDate.split('T')[0]}</span>,
        maxWidth: 95,
      }, {
        Header: 'User',
        id: 'publicUser',
        Cell: timeEntry => `${timeEntry.original.publicUser.firstName} ${timeEntry.original.publicUser.lastName}`,
        maxWidth: 125,
      }, {
        Header: 'Company',
        accessor: 'publicCompany.name',
        Cell: timeEntry => <Link to={`/company/${timeEntry.original.publicCompany._id}`}>{timeEntry.original.publicCompany.name}</Link>,
        maxWidth: 175,
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
          <div className="text-center">
            <TimeEntryTableActions
              auth={auth}
              timeEntry={timeEntry}
              activeUsers={activeUsers}
              activeCompanies={activeCompanies}
            />
          </div>
        ),
        maxWidth: 120,
        Footer: (
          <div className="text-center">
            <TimeEntryTableBulkActions
              auth={auth}
              tableTitle={tableTitle}
              activeUsers={activeUsers}
              activeCompanies={activeCompanies}
            />
          </div>
        ),
      }],
    }];
  }

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
