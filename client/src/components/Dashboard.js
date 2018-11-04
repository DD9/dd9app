import React, { Component } from 'react';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/partials/tables.scss';

import AdminRoute from './HOCRoutes/AdminRoute';
import Header from './Header';
import UserAll from './users/UserAll';
import UserOneEdit from './users/UserOneEdit';
import UserOneContractorHourLogs from './users/UserOneContractorHourLogs';
import CompanyAll from './companies/CompanyAll';
import CompanyOne from './companies/CompanyOne';
import ContractorHourLogAll from './contractorHourLogs/ContractorHourLogAll';
import ContractorHourLogOne from './contractorHourLogs/ContractorHourLogOne';
import CompanyHourLogAll from './companyHourLogs/CompanyHourLogAll';
import CompanyHourLogOne from './companyHourLogs/CompanyHourLogOne';
import TimeEntryNew from './timeEntries/TimeEntryNew';
import Footer from './Footer';

class Dashboard extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <Header auth={auth} />
        <Switch>
          <AdminRoute path="/users" component={UserAll} />
          <Route path="/user/:userId/contractorHourLogs" render={(props) => <UserOneContractorHourLogs {...props} />} />
          <Route path="/user/:userId" component={UserOneEdit} />
          <AdminRoute path="/companies" component={CompanyAll} />
          <AdminRoute path="/company/:companyId" component={CompanyOne} />
          <AdminRoute path="/contractorHourLogs" component={ContractorHourLogAll} />
          <Route path="/contractorHourLog/:contractorHourLogId" render={(props) => <ContractorHourLogOne {...props} auth={auth} />} />
          <AdminRoute path="/companyHourLogs/:companyHourLogId" component={CompanyHourLogOne} />
          <AdminRoute path="/companyHourLogs" component={CompanyHourLogAll} />
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
