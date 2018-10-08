import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import moment from 'moment';

import UserTableAdminEditFormModal from './UserTableAdminEditFormModal';

import 'react-table/react-table.css';

const UserTable = ({ users, activeCompanies }) => {
  const columns = [{
    Header: () => (
      <span className="table-title">Users</span>
    ),
    columns: [{
      Header: 'Name',
      id: 'name',
      accessor: user => `${user.firstName} ${user.lastName}`,
      maxWidth: 200,
    }, {
      Header: 'Email',
      accessor: 'email',
      maxWidth: 200,
    }, {
      Header: 'Company',
      id: 'company',
      accessor: user => <Link to={`/company/${user.company._id}`}>{user.company.name}</Link>,
      sortMethod: ((a, b) => (a.props.children > b.props.children ? 1 : -1)),
      maxWidth: 150,
    }, {
      Header: 'Role',
      id: 'role',
      accessor: user => user.role.charAt(0).toUpperCase() + user.role.slice(1),
      maxWidth: 75,
    }, {
      Header: 'Status',
      id: 'status',
      accessor: user => user.status.charAt(0).toUpperCase() + user.status.slice(1),
      maxWidth: 75,
    }, {
      Header: 'Last Login',
      id: 'lastLogin',
      accessor: user => {
        if (!user.lastLogin) {
          return '';
        }
        return moment.utc(user.lastLogin).format('dddd, MMMM Do YYYY [at] h:mmA [UTC]');
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
          <UserTableAdminEditFormModal
            user={user}
            activeCompanies={activeCompanies}
            form={`user-admin-edit-form-${user._id}`}
            initialValues={{
              userId: user._id,
              company: user.company._id,
              role: user.role,
              status: user.status,
              firstName: user.firstName,
              lastName: user.lastName,
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
      defaultPageSize={-1}
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

export default UserTable;
