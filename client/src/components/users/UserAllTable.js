import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import moment from 'moment';

import 'react-table/react-table.css';

import UserAllTableAdminEditFormModal from './UserAllTableAdminEditFormModal';

const UserAllTable = ({ users, activeCompanies, defaultPageSize, minRows }) => {
  const columns = [{
    Header: () => (
      <span className="table-title-font-size">Users</span>
    ),
    columns: [{
      Header: 'Name',
      id: 'name',
      accessor: user => <Link to={`/user/${user._id}/contractorHourLogs`}>{user.name.full}</Link>,
      sortMethod: ((a, b) => (a.props.children > b.props.children ? 1 : -1)),
      maxWidth: 190,
    }, {
      Header: 'Email',
      accessor: 'email',
      maxWidth: 175,
    }, {
      Header: 'Company',
      id: 'company',
      accessor: user => <Link to={`/company/${user.company._id}`}>{user.company.name}</Link>,
      sortMethod: ((a, b) => (a.props.children > b.props.children ? 1 : -1)),
      maxWidth: 120,
    }, {
      Header: 'Role',
      id: 'role',
      accessor: user => user.role.charAt(0).toUpperCase() + user.role.slice(1),
      maxWidth: 80,
    }, {
      Header: 'Status',
      id: 'status',
      accessor: user => user.status.charAt(0).toUpperCase() + user.status.slice(1),
      maxWidth: 75,
    }, {
      Header: 'Hourly Rate',
      id: 'hourlyRate',
      accessor: user => `$${parseFloat(user.hourlyRate[0].USD).toFixed(2)}`,
      maxWidth: 100,
    }, {
      Header: 'Last Login',
      id: 'lastLoginDate',
      accessor: user => {
        if (!user.lastLoginDate) {
          return '';
        }
        return moment.utc(user.lastLoginDate).format('dddd, MMMM Do YYYY [at] h:mmA [UTC]');
      },
      sortMethod: ((a, b) => {
        if (!a || !b) return 0;
        const aEpoch = moment(a, 'dddd, MMMM Do YYYY [at] h:mmA [UTC]').unix();
        const bEpoch = moment(b, 'dddd, MMMM Do YYYY [at] h:mmA [UTC]').unix();
        return aEpoch > bEpoch ? 1 : -1;
      }),
    }, {
      Header: '',
      id: 'editUser',
      accessor: user => (
        <div>
          <UserAllTableAdminEditFormModal
            user={user}
            activeCompanies={activeCompanies}
            form={`user-admin-edit-form-${user._id}`}
            initialValues={{
              userId: user._id,
              company: user.company._id,
              role: user.role,
              status: user.status,
              hourlyRate: user.hourlyRate[0].USD,
              firstName: user.name.first,
              lastName: user.name.last,
            }}
          />
        </div>
      ),
      maxWidth: 39,
    }],
  }];

  return (
    <ReactTable
      data={users}
      columns={columns}
      showPagination={false}
      sortable={false}
      defaultPageSize={defaultPageSize}
      minRows={minRows}
      className="-striped -highlight"
      noDataText="Loading..."
      defaultSorted={[
        {
          id: 'name',
          asc: true,
        },
      ]}
    />
  );
};

export default UserAllTable;
