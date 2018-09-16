import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import moment from 'moment';

import 'react-table/react-table.css';

import { getAllUsers } from '../../actions/user';

class UserTable extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const columns = [{
      Header: 'Name',
      id: 'name',
      accessor: data => `${data.firstName} ${data.lastName}`,
      maxWidth: 200,
    }, {
      Header: 'Email',
      accessor: 'email',
      maxWidth: 200,
    }, {
      Header: 'Company',
      id: 'company',
      accessor: data => <Link to={`/company/${data.company._id}`}>{data.company.name}</Link>,
      maxWidth: 150,
    }, {
      Header: 'Role',
      accessor: 'role',
      maxWidth: 75,
    }, {
      Header: 'Status',
      accessor: 'status',
      maxWidth: 75,
    }, {
      Header: 'Last Login',
      id: 'lastLogin',
      accessor: data => moment.utc(data.lastLogin).format("dddd, MMMM Do YYYY [at] h:mmA [UTC]"),
    }, {
      Header: '',
      id: 'edit',
      cell: data => moment.utc(data.lastLogin).format("dddd, MMMM Do YYYY [at] h:mmA [UTC]"),
    }];

    return (
      <ReactTable
        data={this.props.users}
        columns={columns}
        className="-striped -highlight"
        defaultPageSize={20}
        minRows={10}
      />
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps, { getAllUsers })(UserTable);
