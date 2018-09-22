import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import moment from 'moment';

import 'react-table/react-table.css';

import { getAllUsers } from '../../actions/user';
import UserTableEditFormModal from './UserTableEditFormModal';

class UserTable extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
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
      }, {
        Header: '',
        id: 'edit',
        accessor: user => (
          <div>
            <UserTableEditFormModal user={user} form={`user-adminEdit-form-${user._id}`} />
          </div>
        ),
        maxWidth: 39,
      }],
    }];

    return (
      <ReactTable
        data={this.props.users}
        columns={columns}
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
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps, { getAllUsers })(UserTable);
