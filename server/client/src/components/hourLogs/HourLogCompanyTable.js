import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const HourLogCompanyTable = ({ tableTitle, companyHourLogs }) => {
  const columns = [{
    Header: () => (
      <span className="table-title">{tableTitle}</span>
    ),
    columns: [{
      Header: 'Date Opened',
      accessor: 'dateOpened',
      Cell: data => data.original.dateOpened.split('T')[0],
      maxWidth: 120,
    }, {
      Header: 'Date Closed',
      accessor: 'dateClosed',
      Cell: data => {
        if (data.original.dateClosed === '1970-01-01T00:00:00.000Z') {
          return '';
        }
        return data.original.dateClosed.split('T')[0];
      },
      maxWidth: 120,
    }, {
      Header: 'Title',
      id: 'title',
      accessor: data => <Link to={`/hourLog/${data._id}`}>{data.title}</Link>,
    }, {
      Header: 'Hours',
      accessor: 'totalPublicHours',
      maxWidth: 100,
    }, {
      Header: 'Hidden',
      accessor: 'totalHiddenHours',
      maxWidth: 100,
    }],
  }];

  return (
    <ReactTable
      data={companyHourLogs}
      columns={columns}
      className="-striped -highlight"
      noDataText="Loading..."
      defaultSorted={[
        {
          id: 'dateOpened',
          desc: true,
        },
      ]}
    />
  );
};

export default HourLogCompanyTable;
