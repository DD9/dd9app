import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const CompanyTable = ({ allCompanies }) => {
  const columns = [{
    Header: 'Name',
    accessor: 'name',
    Cell: data => <Link to={`/company/${JSON.stringify(data.original._id)}`}>{data.original.name}</Link>,
  }, {
    Header: 'Status',
    accessor: 'status',
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
    />
  );
};

export default CompanyTable;
