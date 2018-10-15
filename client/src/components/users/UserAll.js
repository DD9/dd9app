import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';

import UserTable from './UserTable';
import UserTableControls from './UserTableControls';

class UserAll extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getActiveCompanies();
  }

  render() {
    const { users, activeCompanies } = this.props;
    return (
      <div className="container table-font-size">
        <UserTable key={users} users={users} activeCompanies={activeCompanies} defaultPageSize={users.length} minRows={users.length === 0 ? 20 : users.length} />
        <UserTableControls />
      </div>
    );
  }
}

function mapStateToProps({ users, activeCompanies }) {
  return { users, activeCompanies };
}

export default connect(mapStateToProps, { getUsers, getActiveCompanies })(UserAll);
