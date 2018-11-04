import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import ContractorHourLogAllTable from './ContractorHourLogAllTable';

import { getOpenContractorHourLogs, getClosedContractorHourLogs } from '../../actions/contractorHourLog';

class ContractorHourLogAll extends Component {
  componentDidMount() {
    this.props.getOpenContractorHourLogs();
    this.props.getClosedContractorHourLogs();
  }

  render() {
    const { openContractorHourLogs, closedContractorHourLogs } = this.props;
    return (
      <div className="container table-font-size">
        <ContractorHourLogAllTable
          tableTitle="Open Contractor Hour Logs"
          contractorHourLogs={openContractorHourLogs}
          showPagination={false}
          key={uuid()}
          defaultPageSize={openContractorHourLogs.length}
          minRows={openContractorHourLogs.length}
        />
        <div className="m-5" />
        <ContractorHourLogAllTable
          key={uuid()}
          tableTitle="Closed Contractor Hour Logs"
          contractorHourLogs={closedContractorHourLogs}
        />
      </div>
    );
  }
}

function mapStateToProps({ openContractorHourLogs, closedContractorHourLogs }) {
  return { openContractorHourLogs, closedContractorHourLogs };
}

export default connect(mapStateToProps, { getOpenContractorHourLogs, getClosedContractorHourLogs })(ContractorHourLogAll);
