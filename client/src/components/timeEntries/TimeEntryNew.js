import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import uuid from 'uuid/v1';

import CompanyTimeEntryTable from './CompanyTimeEntryTable';
import TimeEntryForm from './TimeEntryForm';

import { getCreatedTimeEntries } from '../../actions/timeEntry';
import { getActiveUsers } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';

class TimeEntryNew extends Component {
  componentDidMount() {
    this.props.getCreatedTimeEntries();
    this.props.getActiveUsers();
    this.props.getActiveCompanies();
  }

  componentDidUpdate() {
    $('.company-time-entry-table-bulk-action').attr('disabled', false);
  }

  render() {
    const {
      auth, createdTimeEntries, activeUsers, activeCompanies,
    } = this.props;

    return (
      <div className="container table-font-size">
        <CompanyTimeEntryTable
          auth={auth}
          tableTitle="New Time Entries"
          timeEntries={createdTimeEntries}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          key={uuid()}
          defaultPageSize={createdTimeEntries.length}
          minRows={createdTimeEntries.length}
        />
        <TimeEntryForm activeCompanies={activeCompanies} />
      </div>
    );
  }
}

function mapStateToProps({ createdTimeEntries, activeUsers, activeCompanies }) {
  return { createdTimeEntries, activeUsers, activeCompanies };
}

export default connect(mapStateToProps, { getCreatedTimeEntries, getActiveUsers, getActiveCompanies })(TimeEntryNew);
