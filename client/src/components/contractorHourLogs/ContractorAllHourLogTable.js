import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const ContractorAllHourLogTable = ({ tableTitle, companyHourLogs, showPagination, defaultPageSize, minRows }) => {
  const columns = [{
    Header: () => (
      <span className="table-title-font-size">{tableTitle}</span>
    ),
    columns: [{
      Header: 'Date Opened',
      accessor: 'dateOpened',
      Cell: data => data.original.dateOpened.split('T')[0],
      maxWidth: 100,
    }, {
      Header: 'Date Closed',
      accessor: 'dateClosed',
      Cell: data => {
        if (data.original.dateClosed === '1970-01-01T00:00:00.000Z') {
          return '';
        }
        return data.original.dateClosed.split('T')[0];
      },
      maxWidth: 100,
    }, {
      Header: 'Contractor',
      id: 'contractor',
      accessor: data => <Link to={`/contractor/${data.user._id}`}>`${data.firstName} ${data.lastName}`</Link>,
      sortMethod: ((a, b) => (a.props.children > b.props.children ? 1 : -1)),
    }, {
      Header: 'Title',
      id: 'title',
      accessor: data => {
        if (data.totalSubmittedHours > 0) {
          return <Link to={`/hourLog/contractor/${data._id}`}><b>{data.title}*</b></Link>;
        }
        return <Link to={`/hourLog/contractor/${data._id}`}>{data.title}</Link>;
      },
      sortMethod: ((a, b) => (a.props.children > b.props.children ? 1 : -1)),
    }, {
      Header: 'Submitted',
      accessor: 'totalSubmittedHours',
      maxWidth: 70,
    }, {
      Header: 'Pending',
      id: 'pending',
      Cell: data => <span style={{ color: '#AAAAAA' }}>0</span>,
      maxWidth: 70,
    }, {
      Header: 'Payment',
      id: 'payment',
      Cell: data => <span style={{ color: '#AAAAAA' }}>0</span>,
      maxWidth: 70,
    }],
  }];

  return (
    <ReactTable
      data={companyHourLogs}
      columns={columns}
      showPagination={showPagination}
      defaultPageSize={defaultPageSize}
      minRows={minRows}
      className="-striped -highlight"
      noDataText="Loading..."
      defaultSorted={[
        {
          id: 'dateOpened',
          desc: true,
        },
        {
          id: 'company',
          asc: true,
        },
      ]}
    />
  );
};

export default ContractorAllHourLogTable;
