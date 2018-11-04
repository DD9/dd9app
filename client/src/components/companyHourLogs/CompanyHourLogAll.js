import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import CompanyHourLogAllTable from './CompanyHourLogAllTable';

import { getOpenCompanyHourLogs, getClosedCompanyHourLogs } from '../../actions/companyHourLog';

class CompanyHourLogAll extends Component {
  componentDidMount() {
    this.props.getOpenCompanyHourLogs();
    this.props.getClosedCompanyHourLogs();
  }

  render() {
    const { openCompanyHourLogs, closedCompanyHourLogs } = this.props;
    return (
      <div className="container table-font-size">
        <CompanyHourLogAllTable
          tableTitle="Open Company Hour Logs"
          companyHourLogs={openCompanyHourLogs}
          showPagination={false}
          key={uuid()}
          defaultPageSize={openCompanyHourLogs.length}
          minRows={openCompanyHourLogs.length}
        />
        <div className="m-5" />
        <CompanyHourLogAllTable
          tableTitle="Closed Company Hour Logs"
          companyHourLogs={closedCompanyHourLogs}
          key={uuid()}
        />
      </div>
    );
  }
}

function mapStateToProps({ openCompanyHourLogs, closedCompanyHourLogs }) {
  return { openCompanyHourLogs, closedCompanyHourLogs };
}

export default connect(mapStateToProps, { getOpenCompanyHourLogs, getClosedCompanyHourLogs })(CompanyHourLogAll);
