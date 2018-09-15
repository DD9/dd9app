import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

import { getAllUsers } from '../../actions/user';

class TimeEntryTable extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const columns = [{
      Header: 'Name',
      accessor: 'name',
      maxWidth: 100,
    }, {
      Header: 'Email',
      accessor: 'email',
      maxWidth: 200,
    }, {
      Header: 'Company',
      accessor: 'company',
      maxWidth: 75,
    }, {
      Header: 'Role',
      accessor: 'role',
    }, {
      Header: 'Last Login',
      accessor: 'lastLogin',
    }];

    return (
      <ReactTable
        // data={this.props.users}
        columns={columns}
        className="-striped -highlight"
        defaultPageSize={10}
        minRows={10}
      />
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps, { getAllUsers })(TimeEntryTable);
