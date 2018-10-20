import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOpenContractorHourLogs, getClosedContractorHourLogs } from '../../actions/contractorHourLog';

import ContractorAllHourLogTable from './ContractorAllHourLogTable';

class ContractorAllHourLog extends Component {
  componentDidMount() {
    this.props.getOpenContractorHourLogs();
    this.props.getClosedContractorHourLogs();
  }

  render() {
    const { openContractorHourLogs, closedContractorHourLogs } = this.props;
    return (
      <div className="container table-font-size">
        <ContractorAllHourLogTable
          tableTitle="Open Contractor Hour Logs"
          contractorHourLogs={openContractorHourLogs}
          showPagination={false}
          key={openContractorHourLogs.length}
          defaultPageSize={openContractorHourLogs.length}
          minRows={openContractorHourLogs.length === 0 ? 20 : openContractorHourLogs.length}
        />
        <div className="m-5" />
        <ContractorAllHourLogTable
          key={closedContractorHourLogs}
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

export default connect(mapStateToProps, { getOpenContractorHourLogs, getClosedContractorHourLogs })(ContractorAllHourLog);
