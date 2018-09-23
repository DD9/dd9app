import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/partials/tables.css';

import AdminRoute from './HOCRoutes/AdminRoute';
import Header from './Header';
import UserAll from './users/UserAll';
import UserOne from './users/UserOne';
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
        <Switch>
          <AdminRoute path="/user/all" component={UserAll} />
          <Route path="/user/:id" component={UserOne} />
          <AdminRoute path="/company/all" component={CompanyAll} />
          <AdminRoute path="/company/:id" component={CompanyOne} />
          <AdminRoute path="/hourLog/all" component={HourLogAll} />
          <AdminRoute path="/hourLog/one" component={HourLogOne} />
          <Route path="/timeEntry/new" component={TimeEntryNew} />
          <Redirect to="/timeEntry/new" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { user: auth };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
