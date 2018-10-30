import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

import TimeEntryTableActions from './TimeEntryTableActions';
import TimeEntryTableBulkActions from './TimeEntryTableBulkActions';

const CompanyTimeEntryTable = ({
  auth, companyHourLogTitle, tableTitle, timeEntries, match, activeUsers, activeCompanies, defaultPageSize, minRows,
}) => {
  const columns = [{
    Header: () => (
      <span className="table-title-font-size">{tableTitle}</span>
    ),
    columns: [{
      Header: 'Date',
      accessor: 'publicDate',
      Cell: data => <span title={data.original.publicDate}>{data.original.publicDate.split('T')[0]}</span>,
      maxWidth: 95,
    }, {
      Header: 'User',
      accessor: 'publicUser',
      Cell: data => <Link to={`/user/${data.original.publicUser._id}/contractorHourLogs`}>{data.original.publicUser.name.full}</Link>,
      maxWidth: 125,
    }, {
      Header: 'Company',
      accessor: 'publicCompany.name',
      Cell: data => {
        if (auth.permissions[0].admin) {
          return (
            <span title={data.original.publicCompany.name}><Link to={`/company/${data.original.publicCompany._id}`}>{data.original.publicCompany.name}</Link></span>
          );
        }
        return <span title={data.original.publicCompany.name}>{data.original.publicCompany.name}</span>;
      },
      maxWidth: 175,
    }, {
      Header: 'Hours',
      accessor: 'publicHours',
      maxWidth: 70,
      Footer: (
        <span>
          {timeEntries.reduce((prev, next) => prev + next.publicHours, 0)}
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

  if (tableTitle === 'New Time Entries') {
    delete columns[0].columns[1];
    if (auth.permissions[0].admin) {
      columns[0].columns[5].maxWidth = 150;
    }
  } else if (companyHourLogTitle !== 'Current') {
    delete columns[0].columns[5];
  }

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
          id: 'publicDate',
          desc: true,
        },
      ]}
      sortable={false}
      SubComponent={tableTitle !== 'New Time Entries'
        ? row => (
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
                  <td>{row.original.user.name.full}</td>
                  <td>{row.original.company.name}</td>
                  <td>{row.original.hours}</td>
                  <td>{row.original.description}</td>
                </tr>
              </tbody>
            </table>
          </div>)
        : false
        }
    />
  );
};

export default CompanyTimeEntryTable;
