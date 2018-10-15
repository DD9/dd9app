import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOpenHourLogs, getClosedHourLogs } from '../../actions/hourLog';

import HourLogCompanyTable from './HourLogCompanyTable';

class HourLogCompanyAll extends Component {
  componentDidMount() {
    this.props.getOpenHourLogs();
    this.props.getClosedHourLogs();
  }

  render() {
    const { openHourLogs, closedHourLogs } = this.props;
    return (
      <div className="container table-font-size">
        <HourLogCompanyTable
          tableTitle="Open Hour Logs"
          hourLogs={openHourLogs}
          showPagination={false}
          key={openHourLogs.length}
          defaultPageSize={openHourLogs.length}
          minRows={openHourLogs.length === 0 ? 20 : openHourLogs.length}
        />
        <div className="m-5" />
        <HourLogCompanyTable
          key={closedHourLogs}
          tableTitle="Closed Hour Logs"
          hourLogs={closedHourLogs}
        />
      </div>
    );
  }
}

function mapStateToProps({ openHourLogs, closedHourLogs }) {
  return { openHourLogs, closedHourLogs };
}

export default connect(mapStateToProps, { getOpenHourLogs, getClosedHourLogs })(HourLogCompanyAll);
