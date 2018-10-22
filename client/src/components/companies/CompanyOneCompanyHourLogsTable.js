import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import SpinnerClipLoader from '../SpinnerClipLoader';

import 'react-table/react-table.css';

const CompanyOneCompanyHourLogsTable = ({ tableTitle, companyHourLogs, defaultPageSize, minRows }) => {
  if (companyHourLogs === 'empty') {
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

  if (!companyHourLogs[0]) {
    return (
      <div>
        <SpinnerClipLoader />
      </div>
    );
  }

  const columns = [{
    Header: () => (
      <span className="table-title-font-size">{tableTitle}</span>
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
      accessor: data => {
        if (data.totalSubmittedHours > 0) {
          return <Link to={`/hourLog/company/${data._id}`}><b>{data.title}*</b></Link>;
        }
        return <Link to={`/hourLog/company/${data._id}`}>{data.title}</Link>;
      },
    }, {
      Header: 'Hours',
      accessor: 'totalPublicHours',
      maxWidth: 100,
    }, {
      Header: 'Hidden',
      accessor: 'totalHiddenHours',
      Cell: data => <span style={{ color: '#AAAAAA' }}>{data.original.totalHiddenHours}</span>,
      maxWidth: 100,
    }],
  }];

  return (
    <ReactTable
      data={companyHourLogs}
      columns={columns}
      showPagination={false}
      defaultPageSize={defaultPageSize}
      minRows={minRows}
      className="-striped -highlight"
      noDataText="Empty"
      defaultSorted={[
        {
          id: 'dateOpened',
          desc: true,
        },
      ]}
    />
  );
};

export default CompanyOneCompanyHourLogsTable;