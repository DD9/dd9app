import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import TimeEntryNew from './timeEntries/TimeEntryNew';
import HourLogAll from './hourLogs/HourLogAll';
import Footer from './Footer';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route path="/timeEntry/new" component={TimeEntryNew} />
        <Route path="/hourLog/all" component={HourLogAll} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { user: auth };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
