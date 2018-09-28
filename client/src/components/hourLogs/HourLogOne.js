import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getHourLog } from '../../actions/hourLog';

import HourLogOneControls from './HourLogOneControls';
import TimeEntryTable from '../timeEntries/TimeEntryTable';
import HourLogOneSubmitTimeEntry from './HourLogOneSubmitTimeEntry';


class HourLogOne extends Component {
  componentDidMount() {
    this.props.getHourLog(this.props.match.params.id);
  }

  render() {
    const { hourLog, match } = this.props;
    if (!hourLog.timeEntries || hourLog._id !== match.params.id) hourLog.timeEntries = [];
    return (
      <div className="container table-font-size">
        <HourLogOneControls />
        <div className="m-5" />
        <TimeEntryTable
          tableTitle="Approved Time Entries"
          timeEntries={hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'approved')}
          defaultPageSize={5}
        />
        <div className="m-5" />
        <TimeEntryTable
          tableTitle="Hidden Time Entries"
          timeEntries={hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'hidden')}
          defaultPageSize={5}
        />
        <div className="m-5" />
        <TimeEntryTable
          tableTitle="Submitted Time Entries"
          timeEntries={hourLog.timeEntries.filter(timeEntry => timeEntry.status === 'submitted')}
          defaultPageSize={5}
        />
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
