import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';


import SpinnerClipLoader from '../SpinnerClipLoader';
import ContractorHourLogOneControls from './ContractorHourLogOneControls';
import ContractorTimeEntryTable from '../timeEntries/ContractorTimeEntryTable';

import { getContractorHourLog } from '../../actions/contractorHourLog';


class CompanyHourLogOne extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getContractorHourLog(match.params.contractorHourLogId);
  }

  componentDidUpdate() {
    $('.contractor-time-entry-table-bulk-action').attr('disabled', false);
  }

  render() {
    const {
      auth, contractorHourLog, match,
    } = this.props;

    if (!contractorHourLog.timeEntries || contractorHourLog._id !== match.params.contractorHourLogId) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }

    let createdTimeEntries = contractorHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'created');
    let submittedTimeEntries = contractorHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'submitted');

    if (!createdTimeEntries[0]) {
      createdTimeEntries = ['createdTimeEntries'];
    }
    if (!submittedTimeEntries[0]) {
      submittedTimeEntries = ['submittedTimeEntries'];
    }

    return (
      <div className="container table-font-size">
        {/*<ContractorHourLogOneControls*/}
          {/*contractorHourLog={contractorHourLog}*/}
          {/*initialValues={contractorHourLog.title === 'Current' ? { title: moment.utc().format('YYYY-MM-DD') } : { title: contractorHourLog.title }}*/}
          {/*timeEntries={createdTimeEntries}*/}
        {/*/>*/}
        <div className="m-5" />
        <ContractorTimeEntryTable
          auth={auth}
          contractorHourLogTitle={contractorHourLog.title}
          tableTitle="Created Time Entries"
          timeEntries={createdTimeEntries[0] !== 'createdTimeEntries' ? createdTimeEntries : []}
          match={match}
          key={createdTimeEntries}
          defaultPageSize={createdTimeEntries.length}
          minRows={createdTimeEntries.length}
        />
        <div className="m-5" />
        <ContractorTimeEntryTable
          auth={auth}
          contractorHourLogTitle={contractorHourLog.title}
          tableTitle="Submitted Time Entries"
          timeEntries={submittedTimeEntries[0] !== 'submittedTimeEntries' ? submittedTimeEntries : []}
          match={match}
          key={submittedTimeEntries}
          defaultPageSize={submittedTimeEntries.length}
          minRows={submittedTimeEntries.length}
        />
      </div>
    );
  }
}

function mapStateToProps({ contractorHourLog }) {
  return { contractorHourLog };
}

export default connect(mapStateToProps, { getContractorHourLog })(CompanyHourLogOne);
