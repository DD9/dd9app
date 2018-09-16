import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getAllCompanies } from '../../actions/company';

import CompanyCreate from './CompanyCreate';
import CompanyTable from './CompanyTable';

class CompanyAll extends Component {
  componentDidMount() {
    this.props.getAllCompanies();
  }

  render() {
    return (
      <div className="container default-table-font-size">
        <CompanyCreate allCompanies={this.props.allCompanies} />
        <div className="m-4" />
        <CompanyTable allCompanies={this.props.allCompanies} />
      </div>
    );
  }
}

function mapStateToProps({ companies }) {
  return { allCompanies: companies };
}

export default connect(mapStateToProps, { getAllCompanies })(CompanyAll);
