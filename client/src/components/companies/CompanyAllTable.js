import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const CompanyAllTable = ({ companies, defaultPageSize, minRows }) => {
  const columns = [{
    Header: () => (
      <span className="table-title-font-size">Companies</span>
    ),
    columns: [{
      Header: 'Name',
      accessor: 'name',
      Cell: data => <Link to={`/company/${data.original._id}`}>{data.original.name}</Link>,
    }, {
      Header: 'Status',
      accessor: 'status',
    }],
  }];

  return (
    <ReactTable
      data={companies}
      columns={columns}
      showPagination={false}
      defaultPageSize={defaultPageSize}
      minRows={minRows}
      className="-striped -highlight"
      defaultSorted={[
        {
          id: 'status',
          asc: true,
        },
        {
          id: 'name',
          asc: true,
        },
      ]}
      noDataText="Loading..."
    />
  );
};

export default CompanyAllTable;