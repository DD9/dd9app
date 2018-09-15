import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

import { fetchCreatedTimeEntries } from '../../actions/timeEntry';

class TimeEntryTable extends Component {
  componentDidMount() {
    this.props.fetchCreatedTimeEntries();
  }

  componentDidUpdate() {
    console.log(this.props.createdTimeEntries);
  }

  render() {
    const columns = [{
      Header: 'Date',
      accessor: 'date',
      Cell: date => (date.value.split('T')[0]),
      maxWidth: 100,
    }, {
      Header: 'Company',
      accessor: 'company.name',
      maxWidth: 200,
    }, {
      Header: 'Hours',
      accessor: 'hours',
      maxWidth: 75,
    }, {
      Header: 'Description',
      accessor: 'description',
    }];

    return (
      <ReactTable
        data={this.props.createdTimeEntries.timeEntries}
        columns={columns}
        className="-striped -highlight"
        defaultPageSize={10}
        minRows={1}
      />
    );
  }
}

function mapStateToProps({ timeEntries }) {
  return { createdTimeEntries: timeEntries };
}

export default connect(mapStateToProps, { fetchCreatedTimeEntries })(TimeEntryTable);
