import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllCompanies } from '../../actions/company';

import SpinnerClipLoader from '../SpinnerClipLoader';
import CompanyAllTable from './CompanyAllTable';
import CompanyAllControls from './CompanyAllControls';

class CompanyAll extends Component {
  componentDidMount() {
    this.props.getAllCompanies();
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
          companies={companies}
          key={companies}
          defaultPageSize={companies.length}
          minRows={companies.length === 0 ? 20 : companies.length}
        />
        <CompanyAllControls companies={companies} />
      </div>
    );
  }
}

function mapStateToProps({ companies }) {
  return { companies };
}

export default connect(mapStateToProps, { getAllCompanies })(CompanyAll);
