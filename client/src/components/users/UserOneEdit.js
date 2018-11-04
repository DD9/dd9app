import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpinnerClipLoader from '../SpinnerClipLoader';
import UserOneAdminEditForm from './UserOneAdminEditForm';
import UserOneEditForm from './UserOneEditForm';

import { getUser } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';
import { getCurrentUser } from '../../actions/auth';

class UserOneEdit extends Component {
  componentDidMount() {
    this.props.getUser(this.props.auth._id);
    this.props.getActiveCompanies();
  }

  renderContent() {
    const { user, activeCompanies } = this.props;
    if (!user.permissions) return <SpinnerClipLoader />;
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
              hourlyRate: user.hourlyRate[0].USD,
              firstName: user.name.first,
              lastName: user.name.last,
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
              hourlyRate: user.hourlyRate[0].USD,
              firstName: user.name.first,
              lastName: user.name.last,
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

export default connect(mapStateToProps, { getUser, getActiveCompanies, getCurrentUser })(UserOneEdit);
