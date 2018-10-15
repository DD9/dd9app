import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';


import SpinnerClipLoader from '../SpinnerClipLoader';
import HourLogCompanyOneControls from './HourLogCompanyOneControls';
import TimeEntryTable from '../timeEntries/TimeEntryTable';
import HourLogCompanyOneSubmitTimeEntry from './HourLogCompanyOneSubmitTimeEntry';

import { getHourLog } from '../../actions/hourLog';
import { getActiveUsers } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';


class HourLogCompanyOne extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getHourLog(match.params.id);
    this.props.getActiveUsers();
    this.props.getActiveCompanies();
  }

  componentDidUpdate() {
    $('.time-entry-table-bulk-action').attr('disabled', false);
  }

  render() {
    const {
      auth, hourLog, activeUsers, activeCompanies, match,
    } = this.props;

    if (!hourLog.timeEntries || hourLog._id !== match.params.id) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }

    const approvedTimeEntries = hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'approved');
    const hiddenTimeEntries = hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'hidden');
    const submittedTimeEntries = hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'submitted');


    return (
      <div className="container table-font-size">
        <HourLogCompanyOneControls
          hourLog={hourLog}
          initialValues={hourLog.title === 'Current' ? { title: moment.utc().format('YYYY-MM-DD') } : { title: hourLog.title }}
          timeEntries={approvedTimeEntries}
        />
        <div className="m-5" />
        <TimeEntryTable
          auth={auth}
          hourLogTitle={hourLog.title}
          tableTitle="Approved Time Entries"
          timeEntries={approvedTimeEntries}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          defaultPageSize={approvedTimeEntries.length}
          minRows={approvedTimeEntries.length}
        />
        <div className="m-5" />
        <TimeEntryTable
          auth={auth}
          hourLogTitle={hourLog.title}
          tableTitle="Hidden Time Entries"
          timeEntries={hiddenTimeEntries}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          defaultPageSize={hiddenTimeEntries.length}
          minRows={hiddenTimeEntries.length}
        />
        <div className="m-5" />
        <TimeEntryTable
          auth={auth}
          hourLogTitle={hourLog.title}
          tableTitle="Submitted Time Entries"
          timeEntries={submittedTimeEntries}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          defaultPageSize={submittedTimeEntries.length}
          minRows={submittedTimeEntries.length}
        />
        <div className="m-5" />
        <HourLogCompanyOneSubmitTimeEntry company={hourLog.company || ''} hourLogTitle={hourLog.title} hourLogId={match.params.id} />
      </div>
    );
  }
}

function mapStateToProps({ hourLog, activeUsers, activeCompanies }) {
  return { hourLog, activeUsers, activeCompanies };
}

export default connect(mapStateToProps, { getHourLog, getActiveUsers, getActiveCompanies })(HourLogCompanyOne);
