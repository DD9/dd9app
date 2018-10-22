import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid/v1'
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

    if (!contractorHourLog.hourlyRate) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }

    let createdTimeEntries = contractorHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'created');
    let submittedTimeEntries = contractorHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'approved' || timeEntry.status === 'hidden' || timeEntry.status === 'submitted');

    if (!createdTimeEntries[0]) {
      createdTimeEntries = ['createdTimeEntries'];
    }
    if (!submittedTimeEntries[0]) {
      submittedTimeEntries = ['submittedTimeEntries'];
    }

    return (
      <div className="container table-font-size">
        <ContractorHourLogOneControls
          auth={auth}
          contractorHourLog={contractorHourLog}
          initialValues={contractorHourLog.title === 'Current' ? { title: moment.utc().format('YYYY-MM-DD') } : { title: contractorHourLog.title }}
        />
        <div className="m-5" />
        <ContractorTimeEntryTable
          auth={auth}
          contractorHourLogTitle={contractorHourLog.title}
          contractorHourLogHourlyRate={contractorHourLog.hourlyRate[0].USD}
          tableTitle="Created Time Entries"
          timeEntries={createdTimeEntries[0] !== 'createdTimeEntries' ? createdTimeEntries : []}
          match={match}
          key={uuid()}
          defaultPageSize={createdTimeEntries.length}
          minRows={createdTimeEntries.length}
        />
        <div className="m-5" />
        <ContractorTimeEntryTable
          auth={auth}
          contractorHourLogTitle={contractorHourLog.title}
          contractorHourLogHourlyRate={contractorHourLog.hourlyRate[0].USD}
          tableTitle="Submitted Time Entries"
          timeEntries={submittedTimeEntries[0] !== 'submittedTimeEntries' ? submittedTimeEntries : []}
          match={match}
          key={uuid()}
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
