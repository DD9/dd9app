import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCompanyHourLogs, getAllCompanies } from '../../actions/company';

import CompanyHourLogTable from '../hourLogs/HourLogCompanyTable';
import CompanyHourLogTableControls from '../hourLogs/HourLogCompanyTableControls';

class CompanyOne extends Component {
  componentDidMount() {
    this.props.getCompanyHourLogs(this.props.match.params.id);
    this.props.getAllCompanies();
  }

  renderContent() {
    const { companyHourLogs, match, companies } = this.props;
    if (!companyHourLogs[0] || companyHourLogs[0].company._id !== match.params.id) {
      return (
        <div>
          <CompanyHourLogTable tableTitle="Loading..." companyHourLogs={[]} />
          <CompanyHourLogTableControls companies={[]} companyId={match.params} initialValues={{ name: '' }} />
        </div>
      );
    }
    return (
      <div>
        <CompanyHourLogTable tableTitle={`${companyHourLogs[0].company.name} Hour Logs`} companyHourLogs={companyHourLogs} />
        <CompanyHourLogTableControls companies={companies} companyId={match.params.id} initialValues={{ name: companyHourLogs[0].company.name }} />
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

function mapStateToProps({ companyHourLogs, companies }) {
  return { companyHourLogs, companies };
}

export default connect(mapStateToProps, { getCompanyHourLogs, getAllCompanies })(CompanyOne);
