import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../actions/auth';

import '../styles/partials/header.scss';

const Header = ({ auth, logout, history }) => {
  const renderContent = () => {
    if (!auth.permissions) return;
    switch (auth.permissions[0].admin) {
      case null:
        return;
      case false:
        return [
          <li key="1" className="nav-item"><Link className="nav-link" to={`/user/${auth._id}/contractorHourLogs`}>Hour Logs</Link></li>,
          <li key="2" className="nav-item"><Link className="nav-link" to="/timeEntry/new">Time Entries</Link></li>,
        ];
      default:
        return [
          <li key="1" className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>,
          <li key="2" className="nav-item"><Link className="nav-link" to="/companies">Companies</Link></li>,
          <li key="3" className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Hour Logs
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className="nav-link" to="/companyHourLogs/all">Company Hour Logs</Link>
              <Link className="nav-link" to="/contractorHourLogs">Contractor Hour Logs</Link>
            </div>
          </li>,
          <li key="4" className="nav-item"><Link className="nav-link" to="/timeEntry/new">Time Entries</Link></li>,
        ];
    }
  };

  const logoutClick = () => {
    logout(history);
  };

  return (
    <div className="container mt-4 mb-5 px-1">
      <nav className="navbar bg-dd9-solid-red text-white shadow-sm px-0 py-0">
        <ul className="nav">
          {renderContent()}
        </ul>
        <ul className="nav justify-content-end">
          <li className="nav-item"><Link className="nav-link text-white" to={`/user/${auth._id}`}>{auth.email}</Link></li>
          <li className="nav-item"><a className="nav-link" onClick={() => logoutClick()}>logout</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default withRouter(connect(null, actions)(Header));
