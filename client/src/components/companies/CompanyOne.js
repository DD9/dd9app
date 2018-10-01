import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCompany, getCompanyHourLogs, getAllCompanies } from '../../actions/company';

import HourLogCompanyOneTable from '../hourLogsCompany/HourLogCompanyOneTable';
import HourLogCompanyOneTableControls from '../hourLogsCompany/HourLogCompanyOneTableControls';

class CompanyOne extends Component {
  componentDidMount() {
    this.props.getCompany(this.props.match.params.id);
    this.props.getCompanyHourLogs(this.props.match.params.id);
    this.props.getAllCompanies();
  }

  renderContent() {
    const { company, companyHourLogs, match, companies } = this.props;
    if (!companyHourLogs[0] || companyHourLogs[0].company._id !== match.params.id) {
      return (
        <div>
          <HourLogCompanyOneTable tableTitle={''} companyHourLogs={[]} />
          <HourLogCompanyOneTableControls company={company} companies={[]} initialValues={{ name: company.name }} />
        </div>
      );
    }
    return (
      <div>
        <HourLogCompanyOneTable tableTitle={`${company.name || ''} - ${company.status.toString().toUpperCase() || ''}`} companyHourLogs={companyHourLogs} />
        <HourLogCompanyOneTableControls company={company} companies={companies} initialValues={{ name: company.name }} />
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

export default connect(mapStateToProps, { getCompany, getCompanyHourLogs, getAllCompanies })(CompanyOne);
