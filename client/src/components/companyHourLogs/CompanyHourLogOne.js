import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';

import CompanyHourLogOneControls from './CompanyHourLogOneControls';
import CompanyTimeEntryTable from '../timeEntries/CompanyTimeEntryTable';
import CompanyHourLogOneSubmitTimeEntry from './CompanyHourLogOneSubmitTimeEntry';

import { getCompanyHourLog } from '../../actions/companyHourLog';
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

  render() {
    const {
      auth, companyHourLog, activeUsers, activeCompanies, match,
    } = this.props;

    let approvedTimeEntries = companyHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'approved');
    let hiddenTimeEntries = companyHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'hidden');
    let submittedTimeEntries = companyHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'submitted');

    if (!approvedTimeEntries[0]) {
      approvedTimeEntries = ['approvedTimeEntries'];
    }
    if (!hiddenTimeEntries[0]) {
      hiddenTimeEntries = ['hiddenTimeEntries'];
    }
    if (!submittedTimeEntries[0]) {
      submittedTimeEntries = ['submittedTimeEntries'];
    }

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
          timeEntries={approvedTimeEntries[0] !== 'approvedTimeEntries' ? approvedTimeEntries : []}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          key={approvedTimeEntries}
          defaultPageSize={approvedTimeEntries.length}
          minRows={approvedTimeEntries.length}
        />
        <div className="m-5" />
        <CompanyTimeEntryTable
          auth={auth}
          companyHourLogTitle={companyHourLog.title}
          tableTitle="Hidden Time Entries"
          timeEntries={hiddenTimeEntries[0] !== 'hiddenTimeEntries' ? hiddenTimeEntries : []}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          key={hiddenTimeEntries}
          defaultPageSize={hiddenTimeEntries.length}
          minRows={hiddenTimeEntries.length}
        />
        <div className="m-5" />
        <CompanyTimeEntryTable
          auth={auth}
          companyHourLogTitle={companyHourLog.title}
          tableTitle="Submitted Time Entries"
          timeEntries={submittedTimeEntries[0] !== 'submittedTimeEntries' ? submittedTimeEntries : []}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          key={submittedTimeEntries}
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

export default connect(mapStateToProps, { getCompanyHourLog, getActiveUsers, getActiveCompanies })(CompanyHourLogOne);
