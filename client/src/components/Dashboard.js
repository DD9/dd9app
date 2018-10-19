import React, { Component } from 'react';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/partials/tables.scss';

import AdminRoute from './HOCRoutes/AdminRoute';
import Header from './Header';
import UserAll from './users/UserAll';
import UserOne from './users/UserOne';
import CompanyAll from './companies/CompanyAll';
import CompanyOne from './companies/CompanyOne';
import CompanyAllHourLog from './companyHourLogs/CompanyAllHourLog';
import CompanyOneHourLog from './companyHourLogs/CompanyOneHourLog';
import ContractorAllHourLog from './contractorHourLogs/ContractorAllHourLog';
import TimeEntryNew from './timeEntries/TimeEntryNew';
import Footer from './Footer';

class Dashboard extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <Header auth={auth} />
        <Switch>
          <AdminRoute path="/user/all" component={UserAll} />
          <Route path="/user/:id" component={UserOne} />
          <AdminRoute path="/company/all" component={CompanyAll} />
          <AdminRoute path="/company/:companyId" component={CompanyOne} />
          <AdminRoute path="/hourLog/company/all" component={CompanyAllHourLog} />
          <AdminRoute path="/hourLog/contractor/all" component={ContractorAllHourLog} />
          <AdminRoute path="/hourLog/company/:companyHourLogId" component={CompanyOneHourLog} />
          <Route path="/timeEntry/new" render={(props) => <TimeEntryNew {...props} auth={auth} />} />
          <Redirect to="/timeEntry/new" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
