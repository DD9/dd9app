import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import SpinnerClipLoader from '../SpinnerClipLoader';
import CompanyAllTable from './CompanyAllTable';
import CompanyAllControls from './CompanyAllControls';

import { getCompanies } from '../../actions/company';

class CompanyAll extends Component {
  componentDidMount() {
    this.props.getCompanies();
  }

  render() {
    const { companies } = this.props;

    if (!companies[0]) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }

    return (
      <div className="container table-font-size">
        <CompanyAllTable
          tableTitle="Companies"
          companies={companies}
          key={uuid()}
          defaultPageSize={companies.length}
          minRows={companies.length}
        />
        <CompanyAllControls companies={companies} />
      </div>
    );
  }
}

function mapStateToProps({ companies }) {
  return { companies };
}

export default connect(mapStateToProps, { getCompanies })(CompanyAll);
