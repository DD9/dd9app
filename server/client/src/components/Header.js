import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../actions/auth';

import '../styles/partials/header.css';

const Header = ({ user, logout, history }) => {
  const renderContent = () => {
    if (!user.permissions) return;
    switch (user.permissions[0].admin) {
      case null:
        return;
      case false:
        return [
          <li key="1" className="nav-item"><Link className="nav-link" to="/timeEntry/new">Time Entries</Link></li>,
        ];
      default:
        return [
          <li key="1" className="nav-item"><Link className="nav-link" to="/user/all">Users</Link></li>,
          <li key="2" className="nav-item"><Link className="nav-link" to="/company/all">Companies</Link></li>,
          <li key="3" className="nav-item"><Link className="nav-link" to="/hourLog/all">Hour Logs</Link></li>,
          <li key="4" className="nav-item"><Link className="nav-link" to="/timeEntry/new">Time Entries</Link></li>,
        ];
    }
  };

  return (
    <div className="container mb-4 mt-3 px-1">
      <nav className="navbar bg-dd9-solid-red text-white shadow-sm px-0 py-0">
        <ul className="nav">
          {renderContent()}
        </ul>
        <ul className="nav justify-content-end">
          <li className="nav-item"><Link className="nav-link text-white" to={`/user/${user.id}`}>{user.email}</Link></li>
          <li className="nav-item"><a className="nav-link" onClick={() => logout(history)}>logout</a></li>
        </ul>
      </nav>
    </div>
  );
};

function mapStateToProps({ auth }) {
  return { user: auth };
}

export default withRouter(connect(mapStateToProps, actions)(Header));
