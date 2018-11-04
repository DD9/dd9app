import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const CompanyAllTable = ({ tableTitle, companies, defaultPageSize, minRows }) => {
  if (companies === 'empty') {
    return (
      <ReactTable
        data={[]}
        columns={[{ Header: () => (<span className="table-title-font-size">{tableTitle}</span>) }]}
        showPagination={false}
        minRows={4}
        noDataText="Empty"
      />
    );
  }

  const columns = [{
    Header: () => (
      <span className="table-title-font-size">{tableTitle}</span>
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
