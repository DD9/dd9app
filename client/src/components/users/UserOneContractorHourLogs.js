import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpinnerClipLoader from '../SpinnerClipLoader';
import UserOneContractorOneHourLogsTable from './UserOneContractorOneHourLogsTable';

import { getUser, getContractorHourLogs, clearContractorHourLogState } from '../../actions/user';

class ContractorOne extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getUser(match.params.userId);
    this.props.getContractorHourLogs(match.params.userId);
  }

  componentWillUnmount() {
    this.props.clearContractorHourLogState();
  }

  renderContent() {
    const { user, contractorHourLogs } = this.props;

    if (!user.hourlyRate) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }

    return (
      <div>
        <UserOneContractorOneHourLogsTable
          tableTitle={`Contractor Hour Logs for ${user.name.full || ''}`}
          contractorHourLogs={contractorHourLogs}
          key={contractorHourLogs}
          defaultPageSize={contractorHourLogs.length}
          minRows={contractorHourLogs.length}
        />
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

function mapStateToProps({ user, contractorHourLogs }) {
  return { user, contractorHourLogs };
}

export default connect(mapStateToProps, { getUser, getContractorHourLogs, clearContractorHourLogState })(ContractorOne);
