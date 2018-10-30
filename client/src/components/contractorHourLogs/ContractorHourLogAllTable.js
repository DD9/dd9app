import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import SpinnerClipLoader from '../SpinnerClipLoader';

import 'react-table/react-table.css';

const ContractorHourLogAllTable = ({
  tableTitle, contractorHourLogs, showPagination, defaultPageSize, minRows,
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
      accessor: 'user.name.first',
      Cell: data => <Link to={`/user/${data.original.user._id}/contractorHourLogs`}>{data.original.user.name.full}</Link>,
    }, {
      Header: 'Title',
      id: 'title',
      accessor: data => {
        if (data.totalCreatedHours > 0) {
          return <Link to={`/contractorHourLog/${data._id}`}><b>{data.title}*</b></Link>;
        }
        return <Link to={`/contractorHourLog/${data._id}`}>{data.title}</Link>;
      },
      sortMethod: ((a, b) => (a.props.children > b.props.children ? 1 : -1)),
    }, {
      Header: 'Submitted',
      accessor: 'totalSubmittedHours',
      maxWidth: 80,
    }, {
      Header: 'Created',
      accessor: 'totalCreatedHours',
      Cell: data => <span style={{ color: '#AAAAAA' }}>{data.original.totalCreatedHours}</span>,
      maxWidth: 80,
    }, {
      Header: 'Rate',
      accessor: 'hourlyRate[0].USD',
      Cell: data => (
        <span>
          {`$${parseInt(data.original.hourlyRate[0].USD).toFixed(2)}`}
        </span>
      ),
      maxWidth: 80,
    }, {
      Header: 'Pay',
      id: 'pay',
      Cell: data => (
        tableTitle === ('Open Contractor Hour Logs')
          ? <span style={{ color: '#AAAAAA' }}> {`$${(data.original.totalCreatedHours * parseInt(data.original.hourlyRate[0].USD)).toFixed(2)}`}</span>
          : <span> {`$${(data.original.totalSubmittedHours * parseInt(data.original.hourlyRate[0].USD)).toFixed(2)}`}</span>
      ),
      sortMethod: ((a, b) => (a > b ? 1 : -1)),
      maxWidth: 80,
    }],
  }];

  return (
    <ReactTable
      data={contractorHourLogs}
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
          id: 'user.name.first',
          asc: true,
        },
      ]}
    />
  );
};

export default ContractorHourLogAllTable;
