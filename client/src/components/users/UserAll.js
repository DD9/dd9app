import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import SpinnerClipLoader from '../SpinnerClipLoader';
import UserAllTable from './UserAllTable';
import UserAllControls from './UserAllControls';

import { getAllUsers } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';

class UserAll extends Component {
  componentDidMount() {
    this.props.getAllUsers();
    this.props.getActiveCompanies();
  }

  render() {
    const { users, activeCompanies } = this.props;

    if (!users[0]) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }

    return (
      <div className="container table-font-size">
        <UserAllTable
          users={users}
          activeCompanies={activeCompanies}
          key={uuid()}
          defaultPageSize={users.length}
          minRows={users.length}
        />
        <UserAllControls />
      </div>
    );
  }
}

function mapStateToProps({ users, activeCompanies }) {
  return { users, activeCompanies };
}

export default connect(mapStateToProps, { getAllUsers, getActiveCompanies })(UserAll);
