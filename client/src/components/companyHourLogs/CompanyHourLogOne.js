import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid/v1';
import $ from 'jquery';

import SpinnerClipLoader from '../SpinnerClipLoader';
import CompanyHourLogOneControls from './CompanyHourLogOneControls';
import CompanyTimeEntryTable from '../timeEntries/CompanyTimeEntryTable';
import CompanyHourLogOneSubmitTimeEntry from './CompanyHourLogOneSubmitTimeEntry';

import { getCompanyHourLog, clearCompanyHourLogOneState } from '../../actions/companyHourLog';
import { getActiveUsers } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';


class CompanyHourLogOne extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getCompanyHourLog(match.params.companyHourLogId);
    this.props.getActiveUsers();
    this.props.getActiveCompanies();
  }

  componentDidUpdate() {
    $('.company-time-entry-table-bulk-action').attr('disabled', false);
  }

  componentWillUnmount() {
    this.props.clearCompanyHourLogOneState();
  }

  render() {
    const {
      auth, companyHourLog, activeUsers, activeCompanies, match,
    } = this.props;

    if (!companyHourLog.timeEntries[0]) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }

    const approvedTimeEntries = companyHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'approved');
    const hiddenTimeEntries = companyHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'hidden');
    const submittedTimeEntries = companyHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'submitted');

    return (
      <div className="container table-font-size">
        <CompanyHourLogOneControls
          companyHourLog={companyHourLog}
          initialValues={companyHourLog.title === 'Current' ? { title: moment.utc().format('YYYY-MM-DD') } : { title: companyHourLog.title }}
          timeEntries={approvedTimeEntries}
        />
        <div className="m-5" />
        <CompanyTimeEntryTable
          auth={auth}
          companyHourLogTitle={companyHourLog.title}
          tableTitle="Approved Time Entries"
          timeEntries={approvedTimeEntries}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          key={uuid()}
          defaultPageSize={approvedTimeEntries.length}
          minRows={approvedTimeEntries.length}
        />
        <div className="m-5" />
        <CompanyTimeEntryTable
          auth={auth}
          companyHourLogTitle={companyHourLog.title}
          tableTitle="Hidden Time Entries"
          timeEntries={hiddenTimeEntries}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          key={uuid()}
          defaultPageSize={hiddenTimeEntries.length}
          minRows={hiddenTimeEntries.length}
        />
        <div className="m-5" />
        <CompanyTimeEntryTable
          auth={auth}
          companyHourLogTitle={companyHourLog.title}
          tableTitle="Submitted Time Entries"
          timeEntries={submittedTimeEntries}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          key={uuid()}
          defaultPageSize={submittedTimeEntries.length}
          minRows={submittedTimeEntries.length}
        />
        <div className="m-5" />
        <CompanyHourLogOneSubmitTimeEntry
          company={companyHourLog.company || ''}
          companyHourLogTitle={companyHourLog.title}
          companyHourLogId={match.params.companyHourLogId}
        />
      </div>
    );
  }
}

function mapStateToProps({ companyHourLog, activeUsers, activeCompanies }) {
  return { companyHourLog, activeUsers, activeCompanies };
}

export default connect(mapStateToProps, { getCompanyHourLog, clearCompanyHourLogOneState, getActiveUsers, getActiveCompanies })(CompanyHourLogOne);
