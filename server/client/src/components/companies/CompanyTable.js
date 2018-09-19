import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const CompanyTable = ({ allCompanies }) => {
  const columns = [{
    Header: () => (
      <span className="table-title">Companies</span>
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
      data={allCompanies}
      columns={columns}
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

export default CompanyTable;
