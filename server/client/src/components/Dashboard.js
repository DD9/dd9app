import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/partials/tables.css';

import Header from './Header';
import UserAll from './users/UserAll';
import CompanyAll from './companies/CompanyAll';
import CompanyOne from './companies/CompanyOne';
import HourLogAll from './hourLogs/HourLogAll';
import TimeEntryNew from './timeEntries/TimeEntryNew';
import Footer from './Footer';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route path="/user/all" component={UserAll} />
        <Route path="/company/all" component={CompanyAll} />
        <Route path="/company/:id" component={CompanyOne} />
        <Route path="/hourLog/all" component={HourLogAll} />
        <Route path="/timeEntry/new" component={TimeEntryNew} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { user: auth };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
