import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCompanyHourLogs } from '../../actions/company';

import HourLogTable from './HourLogTable';

class HourLogOne extends Component {
  componentDidMount() {
    this.props.getCompanyHourLogs();
  }

  render() {
    const { openHourLogs, closedHourLogs } = this.props;
    return (
      <div className="container table-font-size">
        <HourLogTable tableTitle="Open Hour Logs" hourLogs={openHourLogs} />
        <div className="m-5" />
        <HourLogTable tableTitle="Closed Hour Logs" hourLogs={closedHourLogs} />
      </div>
    );
  }
}

function mapStateToProps({ openHourLogs, closedHourLogs }) {
  return { openHourLogs, closedHourLogs };
}

export default connect(mapStateToProps, { getCompanyHourLogs })(HourLogOne);
