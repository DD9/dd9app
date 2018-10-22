import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyOneCompanyHourLogsTable from './CompanyOneCompanyHourLogsTable';
import CompanyOneControls from './CompanyOneControls';

import {
  getCompany, getCompanyHourLogs, getAllCompanies, clearCompanyHourLogsState,
} from '../../actions/company';

class CompanyOne extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getCompany(match.params.companyId);
    this.props.getCompanyHourLogs(match.params.companyId);
    this.props.getAllCompanies();
  }

  componentWillUnmount() {
    this.props.clearCompanyHourLogsState();
  }

  renderContent() {
    const { company, companyHourLogs, companies } = this.props;

    return (
      <div>
        <CompanyOneCompanyHourLogsTable
          tableTitle={`Company Hour Logs for ${company.name || ''}`}
          companyHourLogs={companyHourLogs}
          key={companyHourLogs}
          defaultPageSize={companyHourLogs.length}
          minRows={companyHourLogs.length}
        />
        <CompanyOneControls
          company={company}
          companies={companies}
          initialValues={{ name: company.name }}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="container table-font-size">
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ company, companyHourLogs, companies }) {
  return { company, companyHourLogs, companies };
}

export default connect(mapStateToProps, {
  getCompany, getCompanyHourLogs, getAllCompanies, clearCompanyHourLogsState,
})(CompanyOne);
