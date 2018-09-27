import React from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import {Link} from "react-router-dom";


const TimeEntrySubmittedTable = ({ timeEntries }) => {
  const columns = [{
    Header: () => (
      <span className="table-title">Submitted Time Entries</span>
    ),
    columns: [{
      Header: 'Date',
      id: 'date',
      Cell: data => data.original.publicDate.split('T')[0],
      maxWidth: 95,
    }, {
      Header: 'Company',
      accessor: 'publicCompany.name',
      Cell: data => <Link to={`/company/${data.original.publicCompany._id}`}>{data.original.publicCompany.name}</Link>,
      maxWidth: 200,
    }, {
      Header: 'Hours',
      accessor: 'publicHours',
      maxWidth: 70,
    }, {
      Header: 'Description',
      accessor: 'publicDescription',
    }],
  }];

  return (
    <ReactTable
      data={timeEntries}
      columns={columns}
      className="-striped -highlight"
      defaultPageSize={5}
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

export default TimeEntrySubmittedTable;
