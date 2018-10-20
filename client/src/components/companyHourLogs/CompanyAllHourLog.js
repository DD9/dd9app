import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOpenCompanyHourLogs, getClosedCompanyHourLogs } from '../../actions/companyHourLog';

import CompanyAllHourLogTable from './CompanyAllHourLogTable';

class CompanyAllHourLog extends Component {
  componentDidMount() {
    this.props.getOpenCompanyHourLogs();
    this.props.getClosedCompanyHourLogs();
  }

  render() {
    const { openCompanyHourLogs, closedCompanyHourLogs } = this.props;
    return (
      <div className="container table-font-size">
        <CompanyAllHourLogTable
          tableTitle="Open Company Hour Logs"
          companyHourLogs={openCompanyHourLogs}
          showPagination={false}
          key={openCompanyHourLogs.length}
          defaultPageSize={openCompanyHourLogs.length}
          minRows={openCompanyHourLogs.length === 0 ? 20 : openCompanyHourLogs.length}
        />
        <div className="m-5" />
        <CompanyAllHourLogTable
          key={closedCompanyHourLogs}
          tableTitle="Closed Company Hour Logs"
          companyHourLogs={closedCompanyHourLogs}
        />
      </div>
    );
  }
}

function mapStateToProps({ openCompanyHourLogs, closedCompanyHourLogs }) {
  return { openCompanyHourLogs, closedCompanyHourLogs };
}

export default connect(mapStateToProps, { getOpenCompanyHourLogs, getClosedCompanyHourLogs })(CompanyAllHourLog);
