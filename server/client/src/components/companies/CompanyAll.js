import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getAllCompanies } from '../../actions/company';

import CompanyTableControls from './CompanyTableControls';
import CompanyTable from './CompanyTable';

class CompanyAll extends Component {
  componentDidMount() {
    this.props.getAllCompanies();
  }

  render() {
    return (
      <div className="container table-font-size">
        <CompanyTable allCompanies={this.props.allCompanies} />
        <CompanyTableControls allCompanies={this.props.allCompanies} />
      </div>
    );
  }
}

function mapStateToProps({ companies }) {
  return { allCompanies: companies };
}

export default connect(mapStateToProps, { getAllCompanies })(CompanyAll);
