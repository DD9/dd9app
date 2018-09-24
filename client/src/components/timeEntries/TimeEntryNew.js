import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getActiveCompanies } from '../../actions/company';
import { getCreatedTimeEntries } from '../../actions/timeEntry';

import TimeEntryCreatedTable from './timeEntryTables/TimeEntryCreatedTable';
import TimeEntryForm from './TimeEntryForm';

class TimeEntryNew extends Component {
  componentDidMount() {
    this.props.getActiveCompanies();
    this.props.getCreatedTimeEntries();
  }

  render() {
    const { createdTimeEntries, activeCompanies } = this.props;
    return (
      <div className="container table-font-size">
        <TimeEntryCreatedTable timeEntries={createdTimeEntries} />
        <TimeEntryForm activeCompanies={activeCompanies} initialValues={{ company: -1 }} />
      </div>
    );
  }
}

function mapStateToProps({ activeCompanies, createdTimeEntries }) {
  return { activeCompanies, createdTimeEntries };
}

export default connect(mapStateToProps, { getActiveCompanies, getCreatedTimeEntries })(TimeEntryNew);
