import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpinnerClipLoader from '../SpinnerClipLoader';
import CompanyHourLogTable from './CompanyHourLogTable';
import CompanyHourLogTableControls from './CompanyHourLogTableControls';

import { getCompany, getCompanyHourLogs, getAllCompanies, clearCompanyHourLogsState } from '../../actions/company';

class CompanyOne extends Component {
  componentDidMount() {
    this.props.getCompany(this.props.match.params.companyId);
    this.props.getCompanyHourLogs(this.props.match.params.companyId);
    this.props.getAllCompanies();
  }

  componentWillUnmount() {
    this.props.clearCompanyHourLogsState();
  }

  renderContent() {
    const {
      company, companyHourLogs, companies,
    } = this.props;
    if (!companyHourLogs[0]) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }
    return (
      <div>
        <CompanyHourLogTable
          tableTitle={`${company.name || ''} - ${company.status.toString().toUpperCase() || ''}`}
          companyHourLogs={companyHourLogs}
          key={companyHourLogs}
          defaultPageSize={companyHourLogs.length}
          minRows={companyHourLogs.length}
        />
        <CompanyHourLogTableControls company={company} companies={companies} initialValues={{ name: company.name }} />
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

export default connect(mapStateToProps, { getCompany, getCompanyHourLogs, getAllCompanies, clearCompanyHourLogsState })(CompanyOne);
