import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';
import { getCurrentUser } from '../../actions/auth';

import UserOneAdminEditForm from './UserOneAdminEditForm';
import UserOneEditForm from './UserOneEditForm';


class UserOne extends Component {
  componentDidMount() {
    this.props.getUser(this.props.auth._id);
    this.props.getActiveCompanies();
  }

  renderContent() {
    const { user, activeCompanies } = this.props;
    if (!user.permissions) return;
    switch (user.permissions[0].admin) {
      case null:
        return;
      case false:
        return (
          <UserOneEditForm
            user={user}
            activeCompanies={activeCompanies}
            initialValues={{
              userId: user._id,
              company: user.company._id,
              role: user.role,
              status: user.status,
              firstName: user.firstName,
              lastName: user.lastName,
            }}
          />
        );
      default:
        return (
          <UserOneAdminEditForm
            user={user}
            activeCompanies={activeCompanies}
            initialValues={{
              userId: user._id,
              company: user.company._id,
              role: user.role,
              status: user.status,
              firstName: user.firstName,
              lastName: user.lastName,
            }}
          />
        );
    }
  }

  render() {
    return (
      <div className="container">
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth, user, activeCompanies }) {
  return { auth, user, activeCompanies };
}

export default connect(mapStateToProps, { getUser, getActiveCompanies, getCurrentUser })(UserOne);
