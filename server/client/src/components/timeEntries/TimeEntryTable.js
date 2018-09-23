import React from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';


const TimeEntryTable = ({ createdTimeEntries }) => {
  const columns = [{
    Header: () => (
      <span className="table-title">New Time Entries</span>
    ),
    columns: [{
      Header: 'Date',
      id: 'date',
      accessor: 'date',
      Cell: data => data.original.date.split('T')[0],
      maxWidth: 95,
    }, {
      Header: 'Company',
      accessor: 'company.name',
      maxWidth: 200,
    }, {
      Header: 'Hours',
      accessor: 'hours',
      maxWidth: 70,
    }, {
      Header: 'Description',
      accessor: 'description',
    }],
  }];

  return (
    <ReactTable
      data={createdTimeEntries}
      columns={columns}
      className="-striped -highlight"
      defaultPageSize={10}
      noDataText="Loading..."
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
