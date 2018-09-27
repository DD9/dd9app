import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getHourLog } from '../../actions/hourLog';

import HourLogOneControls from './HourLogOneControls';
import TimeEntryApprovedTable from '../timeEntries/timeEntryTables/TimeEntryApprovedTable';
import TimeEntryHiddenTable from '../timeEntries/timeEntryTables/TimeEntryHiddenTable';
import TimeEntrySubmittedTable from '../timeEntries/timeEntryTables/TimeEntrySubmittedTable';
import HourLogOneSubmitTimeEntry from './HourLogOneSubmitTimeEntry';


class HourLogOne extends Component {
  componentDidMount() {
    this.props.getHourLog(this.props.match.params.id);
  }

  componentDidUpdate() {
    console.log('component updating');
    console.log(this.props.hourLog);
  }

  render() {
    const { hourLog, match } = this.props;
    if (!hourLog.timeEntries || hourLog._id !== match.params.id) hourLog.timeEntries = [];
    return (
      <div className="container table-font-size">
        <HourLogOneControls />
        <div className="m-5" />
        <TimeEntryApprovedTable timeEntries={hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'approved')} />
        <div className="m-5" />
        <TimeEntryHiddenTable timeEntries={hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'hidden')} />
        <div className="m-5" />
        <TimeEntrySubmittedTable timeEntries={hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'submitted')} />
        <div className="m-5" />
        <HourLogOneSubmitTimeEntry company={hourLog.company || ''} hourLogId={match.params.id} />
      </div>
    );
  }
}

function mapStateToProps({ hourLog }) {
  return { hourLog };
}

export default connect(mapStateToProps, { getHourLog })(HourLogOne);
