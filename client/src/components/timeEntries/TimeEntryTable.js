import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

import TimeEntryTableActions from './TimeEntryTableActions';
import TimeEntryTableBulkActions from './TimeEntryTableBulkActions';

const TimeEntryTable = ({
  auth, companyHourLogTitle, tableTitle, timeEntries, match, activeUsers, activeCompanies, defaultPageSize, minRows,
}) => {

  let columns;

  /**
   * New Time Entries Table
   */
  if (tableTitle === 'New Time Entries') {
    columns = [{
      Header: () => (
        <span className="table-title-font-size">{tableTitle}</span>
      ),
      columns: [{
        Header: 'Date',
        id: 'date',
        accessor: 'publicDate',
        Cell: timeEntry => <span title={timeEntry.original.publicDate}>{timeEntry.original.publicDate.split('T')[0]}</span>,
        maxWidth: 95,
      }, {
        Header: 'Company',
        accessor: 'publicCompany.name',
        Cell: timeEntry => {
          if (auth.permissions[0].admin) {
            return (
              <span title={timeEntry.original.publicCompany.name}><Link to={`/company/${timeEntry.original.publicCompany._id}`}>{timeEntry.original.publicCompany.name}</Link></span>
            );
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
        Cell: timeEntry => <span title={timeEntry.original.publicDescription}>{timeEntry.original.publicDescription}</span>,
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
    return (
      <ReactTable
        data={timeEntries}
        columns={columns}
        showPagination={false}
        defaultPageSize={defaultPageSize}
        minRows={minRows}
        className="-striped -highlight"
        noDataText="Empty"
        defaultSorted={[
          {
            id: 'date',
            desc: true,
          },
        ]}
        sortable={false}
      />
    );
  }

  /**
   * Closed CompanyHourLog timeEntry tables
   */
  if (companyHourLogTitle !== 'Current') {
    columns = [{
      Header: () => (
        <span className="table-title-font-size">{tableTitle}</span>
      ),
      columns: [{
        Header: 'Date',
        id: 'date',
        accessor: 'publicDate',
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
        Cell: timeEntry => <span title={timeEntry.original.publicCompany.name}><Link to={`/company/${timeEntry.original.publicCompany._id}`}>{timeEntry.original.publicCompany.name}</Link></span>,
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
        Cell: timeEntry => <span title={timeEntry.original.publicDescription}>{timeEntry.original.publicDescription}</span>,
      }],
    }];
    return (
      <ReactTable
        data={timeEntries}
        columns={columns}
        showPagination={false}
        defaultPageSize={defaultPageSize}
        minRows={minRows}
        className="-striped -highlight"
        noDataText="Empty"
        sortable={false}
        SubComponent={row => (
          <div style={{ padding: '10px' }}>
            <em>Original, Non-public Time Entry Data</em>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">User</th>
                  <th scope="col">Company</th>
                  <th scope="col">Hours</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{row.original.date}</td>
                  <td>{row.original.user.firstName} {row.original.user.lastName}</td>
                  <td>{row.original.company.name}</td>
                  <td>{row.original.hours}</td>
                  <td>{row.original.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      />
    );
  }

  /**
   * Open CompanyHourLog timeEntry tables default
   */
  columns = [{
    Header: () => (
      <span className="table-title-font-size">{tableTitle}</span>
    ),
    columns: [{
      Header: 'Date',
      accessor: 'publicDate',
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
      Cell: timeEntry => <span title={timeEntry.original.publicCompany.name}><Link to={`/company/${timeEntry.original.publicCompany._id}`}>{timeEntry.original.publicCompany.name}</Link></span>,
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
      Cell: timeEntry => <span title={timeEntry.original.publicDescription}>{timeEntry.original.publicDescription}</span>,
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
            match={match}
            activeUsers={activeUsers}
            activeCompanies={activeCompanies}
          />
        </div>
      ),
    }],
  }];
  return (
    <ReactTable
      data={timeEntries}
      columns={columns}
      showPagination={false}
      defaultPageSize={defaultPageSize}
      minRows={minRows}
      className="-striped -highlight"
      noDataText="Empty"
      sortable={false}
      SubComponent={row => (
        <div style={{ padding: '10px' }}>
          <em>Original, Non-public Time Entry Data</em>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">User</th>
                <th scope="col">Company</th>
                <th scope="col">Hours</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{row.original.date}</td>
                <td>{row.original.user.firstName} {row.original.user.lastName}</td>
                <td>{row.original.company.name}</td>
                <td>{row.original.hours}</td>
                <td>{row.original.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    />
  );
};

export default TimeEntryTable;
