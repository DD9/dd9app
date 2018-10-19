import React from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

const TimeEntryExportedTable = ({ timeEntries }) => {
  const columns = [{
    Header: () => (
      <span>Approved Time Entries - Public Data, Export Formatted</span>
    ),
    columns: [{
      Header: 'Date',
      accessor: 'publicDate',
      id: 'date',
      Cell: timeEntry =>
        <span title={timeEntry.original.publicDate}>
          {`${timeEntry.original.publicDate.split('T')[0].split('-')[1]}-${timeEntry.original.publicDate.split('T')[0].split('-')[2]}`}
        </span>,
      maxWidth: 95,
    }, {
      Header: 'User',
      id: 'publicUser',
      Cell: timeEntry => `${timeEntry.original.publicUser.lastName}`,
      maxWidth: 125,
    }, {
      Header: 'Hours',
      accessor: 'publicHours',
      maxWidth: 70,
    }, {
      Header: 'Description',
      accessor: 'publicDescription',
      Cell: timeEntry =>
        <span title={timeEntry.original.publicDescription}>
          {timeEntry.original.publicDescription}
        </span>,
    }],
  }];

  return (
    <ReactTable
      data={timeEntries}
      columns={columns}
      showPagination={false}
      defaultPageSize={-1}
      className="-striped -highlight"
      defaultSorted={[
        {
          id: 'date',
          asc: true,
        },
      ]}
    />
  );
};

export default TimeEntryExportedTable;
