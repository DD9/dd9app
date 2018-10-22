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
          <AdminRoute path="/user/all" component={UserAll} />
          <AdminRoute path="/user/:userId/contractorHourLogs" component={UserOneContractorHourLogs} />
          <Route path="/user/:id" component={UserOneEdit} />
          <AdminRoute path="/company/all" component={CompanyAll} />
          <AdminRoute path="/company/:companyId" component={CompanyOne} />
          <AdminRoute path="/hourLog/contractor/all" component={ContractorHourLogAll} />
          <Route path="/hourLog/contractor/:contractorHourLogId" render={(props) => <ContractorHourLogOne {...props} />} />
          <AdminRoute path="/hourLog/company/all" component={CompanyHourLogAll} />
          <AdminRoute path="/hourLog/company/:companyHourLogId" component={CompanyHourLogOne} />
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
