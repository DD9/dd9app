import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getHourLog } from '../../actions/hourLog';

import HourLogOneControls from './HourLogOneControls';
import TimeEntryTable from '../timeEntries/TimeEntryTable';
import HourLogOneSubmitTimeEntry from './HourLogOneSubmitTimeEntry';

import { getActiveUsers } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';
import $ from "jquery";


class HourLogOne extends Component {
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
      hourLog.timeEntries = [];
      hourLog.title = '';
    }
    return (
      <div className="container table-font-size">
        <HourLogOneControls hourLog={hourLog} initialValues={{ title: moment.utc().format('YYYY-MM-DD') }} />
        <div className="m-5" />
        <TimeEntryTable
          auth={auth}
          tableTitle="Approved Time Entries"
          timeEntries={hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'approved')}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          defaultPageSize={5}
        />
        <div className="m-5" />
        <TimeEntryTable
          auth={auth}
          tableTitle="Hidden Time Entries"
          timeEntries={hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'hidden')}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          defaultPageSize={5}
        />
        <div className="m-5" />
        <TimeEntryTable
          auth={auth}
          tableTitle="Submitted Time Entries"
          timeEntries={hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'submitted')}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          defaultPageSize={5}
        />
        <div className="m-5" />
        <HourLogOneSubmitTimeEntry company={hourLog.company || ''} hourLogId={match.params.id} />
      </div>
    );
  }
}

function mapStateToProps({ hourLog, activeUsers, activeCompanies }) {
  return { hourLog, activeUsers, activeCompanies };
}

export default connect(mapStateToProps, { getHourLog, getActiveUsers, getActiveCompanies })(HourLogOne);
