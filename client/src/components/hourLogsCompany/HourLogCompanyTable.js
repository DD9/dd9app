import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const HourLogCompanyTable = ({ tableTitle, hourLogs, showPagination, defaultPageSize }) => {
  const columns = [{
    Header: () => (
      <span className="table-title">{tableTitle}</span>
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
      Header: 'Company',
      id: 'company',
      accessor: data => <Link to={`/company/${data.company._id}`}>{data.company.name}</Link>,
      sortMethod: ((a, b) => (a.props.children > b.props.children ? 1 : -1)),
    }, {
      Header: 'Title',
      id: 'title',
      accessor: data => {
        if (data.totalSubmittedHours > 0) {
          return <Link to={`/hourLog/company/${data._id}`}><b>{data.title}*</b></Link>;
        }
        return <Link to={`/hourLog/company/${data._id}`}>{data.title}</Link>;
      },
      sortMethod: ((a, b) => (a.props.children > b.props.children ? 1 : -1)),
    }, {
      Header: 'Hours',
      accessor: 'totalPublicHours',
      maxWidth: 70,
    }, {
      Header: 'Hidden',
      accessor: 'totalHiddenHours',
      Cell: data => <span style={{ color: '#AAAAAA' }}>{data.original.totalHiddenHours}</span>,
      maxWidth: 70,
    }],
  }];

  return (
    <ReactTable
      data={hourLogs}
      columns={columns}
      showPagination={showPagination}
      defaultPageSize={defaultPageSize}
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

export default HourLogCompanyTable;
