import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const ContractorTimeEntryTable = ({
  auth, contractorHourLogTitle, contractorHourLogHourlyRate, tableTitle, timeEntries, match, defaultPageSize, minRows,
}) => {
  let columns;

  /**
   * Open contractorHourLog Time Entries Table
   */
  if (contractorHourLogTitle !== 'Current') {
    columns = [{
      Header: () => (
        <span className="table-title-font-size">{tableTitle}</span>
      ),
      columns: [{
        Header: 'Date',
        id: 'date',
        accessor: 'date',
        Cell: timeEntry => <span title={timeEntry.original.date}>{timeEntry.original.date.split('T')[0]}</span>,
        maxWidth: 95,
      }, {
        Header: 'Company',
        accessor: 'company.name',
        Cell: timeEntry => <span title={timeEntry.original.company.name}><Link
          to={`/company/${timeEntry.original.company._id}`}>{timeEntry.original.company.name}</Link></span>,
        maxWidth: 175,
      }, {
        Header: 'Hours',
        accessor: 'hours',
        maxWidth: 70,
        Footer: (
          <span>
            {timeEntries.map(timeEntry => timeEntry.hours).reduce((prev, next) => prev + next, 0)}
          </span>
        ),
      }, {
        Header: 'Rate',
        id: 'rate',
        accessor: timeEntry =>
          <span style={{ color: '#AAAAAA' }}>
            {`$${((timeEntry.hours * contractorHourLogHourlyRate.toFloat) + (timeEntry.hours * contractorHourLogHourlyRate.toFloat)).toFixed(2)}`}
          </span>,
        maxWidth: 80,
      }, {
        Header: 'Description',
        id: 'description',
        accessor: timeEntry =>
          <span title={timeEntry.description}>{timeEntry.description}</span>,
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
          <div style={{padding: '10px'}}>
            <em>Adjudicated, Public Time Entry Data</em>
            <table className="table">
              <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">User</th>
                <th scope="col">Company</th>
                <th scope="col">Hours</th>
                <th scope="col">Rate</th>
                <th scope="col">Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{row.original.publicDate}</td>
                <td>{row.original.publicUser.name.full}</td>
                <td>{row.original.publicCompany.name}</td>
                <td>{row.original.publicHours}</td>
                <td>{`$${((row.original.hours * contractorHourLogHourlyRate.toFloat) + (row.original.hours * contractorHourLogHourlyRate.toFloat)).toFixed(2)}`}</td>
                <td>{row.original.publicDescription}</td>
              </tr>
              </tbody>
            </table>
          </div>
        )}
      />
    );
  }

  /**
   * Closed contractorHourLog Time Entries Table
   */
  columns = [{
    Header: () => (
      <span className="table-title-font-size">{tableTitle}</span>
    ),
    columns: [{
      Header: 'Date',
      id: 'date',
      accessor: 'date',
      Cell: timeEntry => <span title={timeEntry.original.date}>{timeEntry.original.date.split('T')[0]}</span>,
      maxWidth: 95,
    }, {
      Header: 'Company',
      accessor: 'company.name',
      Cell: timeEntry => <span title={timeEntry.original.company.name}><Link
        to={`/company/${timeEntry.original.company._id}`}>{timeEntry.original.company.name}</Link></span>,
      maxWidth: 175,
    }, {
      Header: 'Hours',
      accessor: 'hours',
      maxWidth: 70,
      Footer: (
        <span>
            {timeEntries.map(timeEntry => timeEntry.hours).reduce((prev, next) => prev + next, 0)}
          </span>
      ),
    }, {
      Header: 'Rate',
      id: 'rate',
      accessor: timeEntry =>
        <span style={{ color: '#AAAAAA' }}>
          {`$${((timeEntry.hours * contractorHourLogHourlyRate) + (timeEntry.original.hours * timeEntry.original.user.hourlyRate[0].USD)).toFixed(2)}`}
        </span>,
      maxWidth: 80,
    }, {
      Header: 'Description',
      id: 'description',
      accessor: timeEntry =>
        <span title={timeEntry.original.description}>{timeEntry.original.description}</span>,
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
};

export default ContractorTimeEntryTable;
