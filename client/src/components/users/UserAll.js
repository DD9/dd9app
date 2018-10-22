import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllUsers } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';

import UserAllTable from './UserAllTable';
import UserAllControls from './UserAllControls';

class UserAll extends Component {
  componentDidMount() {
    this.props.getAllUsers();
    this.props.getActiveCompanies();
  }

  render() {
    const { users, activeCompanies } = this.props;
    return (
      <div className="container table-font-size">
        <UserAllTable
          users={users}
          activeCompanies={activeCompanies}
          key={users}
          defaultPageSize={users.length}
          minRows={users.length === 0 ? 20 : users.length} />
        <UserAllControls />
      </div>
    );
  }
}

function mapStateToProps({ users, activeCompanies }) {
  return { users, activeCompanies };
}

export default connect(mapStateToProps, { getAllUsers, getActiveCompanies })(UserAll);
