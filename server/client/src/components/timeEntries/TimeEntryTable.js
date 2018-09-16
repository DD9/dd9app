import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

import { getCreatedTimeEntries } from '../../actions/timeEntry';

class TimeEntryTable extends Component {
  componentDidMount() {
    this.props.getCreatedTimeEntries();
  }

  render() {
    const columns = [{
      Header: 'Date',
      accessor: 'date',
      Cell: data => data.original.date.split('T')[0],
      maxWidth: 95,
    }, {
      Header: 'Company',
      accessor: 'company.name',
      maxWidth: 200,
    }, {
      Header: 'Hours',
      accessor: 'hours',
      maxWidth: 70,
    }, {
      Header: 'Description',
      accessor: 'description',
    }];

    return (
      <ReactTable
        data={this.props.newTimeEntries.createdTimeEntries}
        columns={columns}
        className="-striped -highlight"
        defaultPageSize={10}
      />
    );
  }
}

function mapStateToProps({ newTimeEntries }) {
  return { newTimeEntries };
}

export default connect(mapStateToProps, { getCreatedTimeEntries })(TimeEntryTable);
