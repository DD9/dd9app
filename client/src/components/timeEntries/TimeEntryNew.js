import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCreatedTimeEntries } from '../../actions/timeEntry';
import { getActiveUsers } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';

import TimeEntryTable from './TimeEntryTable';
import TimeEntryForm from './TimeEntryForm';

class TimeEntryNew extends Component {
  componentDidMount() {
    this.props.getCreatedTimeEntries();
    this.props.getActiveUsers();
    this.props.getActiveCompanies();
  }

  render() {
    const { auth, createdTimeEntries, activeUsers, activeCompanies } = this.props;
    return (
      <div className="container table-font-size">
        <TimeEntryTable
          auth={auth}
          tableTitle="New Time Entries"
          timeEntries={createdTimeEntries}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          defaultPageSize={10}
        />
        <TimeEntryForm activeCompanies={activeCompanies} initialValues={{ company: -1 }} />
      </div>
    );
  }
}

function mapStateToProps({ createdTimeEntries, activeUsers, activeCompanies }) {
  return { createdTimeEntries, activeUsers, activeCompanies };
}

export default connect(mapStateToProps, { getCreatedTimeEntries, getActiveUsers, getActiveCompanies })(TimeEntryNew);
