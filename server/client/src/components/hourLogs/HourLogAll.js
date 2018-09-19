import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOpenHourLogs, getClosedHourLogs } from '../../actions/hourLog';

import HourLogTable from './HourLogTable';

class HourLogAll extends Component {
  componentDidMount() {
    this.props.getOpenHourLogs();
    this.props.getClosedHourLogs();
  }

  render() {
    return (
      <div className="container table-font-size">
        <HourLogTable tableTitle="Open Hour Logs" hourLogs={this.props.openHourLogs} />
        <div className="m-5" />
        <HourLogTable tableTitle="Closed Hour Logs" hourLogs={this.props.closedHourLogs} />
      </div>
    );
  }
}

function mapStateToProps({ openHourLogs, closedHourLogs }) {
  return { openHourLogs, closedHourLogs };
}

export default connect(mapStateToProps, { getOpenHourLogs, getClosedHourLogs })(HourLogAll);
