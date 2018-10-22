import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';
import SpinnerClipLoader from '../SpinnerClipLoader';

const UserOneContractorOneHourLogsTable = ({
  tableTitle, contractorHourLogs, defaultPageSize, minRows,
}) => {
  if (contractorHourLogs === 'empty') {
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

  if (!contractorHourLogs[0]) {
    return (
      <div>
        <SpinnerClipLoader outerSpacingClasses="py-3 px-3" innerSpacingClasses="py-0" />
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
        if (data.totalCreatedHours > 0) {
          return <Link to={`/hourLog/contractor/${data._id}`}><b>{data.title}*</b></Link>;
        }
        return <Link to={`/hourLog/contractor/${data._id}`}>{data.title}</Link>;
      },
    }, {
      Header: 'Submitted',
      accessor: 'totalSubmittedHours',
      maxWidth: 80,
    }, {
      Header: 'Created',
      id: 'created',
      Cell: data => <span style={{ color: '#AAAAAA' }}>{data.original.totalCreatedHours}</span>,
      maxWidth: 80,
    }, {
      Header: 'Rate',
      id: 'rate',
      Cell: data => (
        <span>
          {`$${parseInt(data.original.hourlyRate[0].USD).toFixed(2)}`}
        </span>
      ),
      maxWidth: 80,
    }, {
      Header: 'Payment',
      id: 'payment',
      Cell: data => (
        <span style={{ color: '#AAAAAA' }}>
          {`$${((data.original.totalSubmittedHours * parseInt(data.original.hourlyRate[0].USD)) + (data.original.totalCreatedHours * parseInt(data.original.hourlyRate[0].USD))).toFixed(2)}`}
        </span>
      ),
      maxWidth: 80,
    }],
  }];

  return (
    <ReactTable
      data={contractorHourLogs}
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

export default UserOneContractorOneHourLogsTable;
