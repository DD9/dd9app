import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllCompanies } from '../../actions/company';

import CompanyTableControls from './CompanyTableControls';
import CompanyTable from './CompanyTable';

class CompanyAll extends Component {
  componentDidMount() {
    this.props.getAllCompanies();
  }

  render() {
    const { companies } = this.props;
    return (
      <div className="container table-font-size">
        <CompanyTable
          companies={companies}
          key={companies}
          defaultPageSize={companies.length}
          minRows={companies.length === 0 ? 20 : companies.length}
        />
        <CompanyTableControls companies={companies} />
      </div>
    );
  }
}

function mapStateToProps({ companies }) {
  return { companies };
}

export default connect(mapStateToProps, { getAllCompanies })(CompanyAll);
