import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import SpinnerClipLoader from '../SpinnerClipLoader';
import CompanyOneCompanyHourLogsTable from './CompanyOneCompanyHourLogsTable';
import CompanyOneControls from './CompanyOneControls';

import {
  getCompany, getCompanyHourLogs, getCompanies, clearCompanyOneState,
} from '../../actions/company';

class CompanyOne extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getCompany(match.params.companyId);
    this.props.getCompanyHourLogs(match.params.companyId);
    this.props.getCompanies();
  }

  componentWillUnmount() {
    this.props.clearCompanyOneState();
  }

  renderContent() {
    const { company, companyHourLogs, companies } = this.props;
    if (!companyHourLogs[0]) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }

    return (
      <div>
        <CompanyOneCompanyHourLogsTable
          tableTitle={`Company Hour Logs for ${company.name}`}
          companyHourLogs={companyHourLogs}
          key={uuid()}
          defaultPageSize={companyHourLogs.length}
          minRows={companyHourLogs.length}
        />
        <CompanyOneControls
          company={company}
          companyHourLogs={companyHourLogs}
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
  getCompany, getCompanyHourLogs, getCompanies, clearCompanyOneState,
})(CompanyOne);
