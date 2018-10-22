import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { submitFromNewContractorHourLogTimeEntries, deleteFromNewContractorHourLogTimeEntries, rejectFromSubmittedContractorHourLogTimeEntries } from '../../actions/timeEntry';

import TimeEntryTableActionConfirmModal from './TimeEntryTableActionConfirmModal';

class TimeEntryBulkTableActions extends Component {

  onSubmitAllCreatedEntriesClick = e => {
    e.preventDefault();
    $(`.contractor-time-entry-table-action`).attr("disabled", true);
    $(`.contractor-time-entry-table-bulk-action`).attr("disabled", true);
    const { match } = this.props;
    this.props.submitFromNewContractorHourLogTimeEntries(match.params.contractorHourLogId);
    $('#time-entry-confirm-submit-all-new-time-entries-modal').modal('hide');
  };

  onDeleteAllCreatedEntriesClick = e => {
    e.preventDefault();
    $(`.contractor-time-entry-table-action`).attr("disabled", true);
    $(`.contractor-time-entry-table-bulk-action`).attr("disabled", true);
    const { match } = this.props;
    this.props.deleteFromNewContractorHourLogTimeEntries(match.params.contractorHourLogId);
    $('#time-entry-confirm-delete-all-new-time-entries-modal').modal('hide');
  };

  onRejectAllFromSubmittedClick = e => {
    e.preventDefault();
    $(`.contractor-time-entry-table-action`).attr("disabled", true);
    $(`.contractor-time-entry-table-bulk-action`).attr("disabled", true);
    const { match } = this.props;
    this.props.rejectFromSubmittedContractorHourLogTimeEntries(match.params.contractorHourLogId);
    $('#time-entry-confirm-reject-all-from-submitted-modal').modal('hide');
  };

  renderTimeEntryTableBulkActionButtons() {
    const { auth, tableTitle } = this.props;
    if (tableTitle === 'Created Time Entries' && auth.role === 'contractor') {
      return (
        <div className="d-inline text-center">
          <button type="button" className="btn-link contractor-time-entry-table-bulk-action" title="Delete All" data-toggle="modal" data-target="#time-entry-confirm-delete-all-new-time-entries-modal">D</button>
        </div>
      );
    }
    if (tableTitle === 'Created Time Entries') {
      return (
        <div className="d-inline text-center">
          <button type="button" className="btn-link contractor-time-entry-table-bulk-action" title="Submit All" data-toggle="modal" data-target="#time-entry-confirm-submit-all-new-time-entries-modal">S</button>
          <button type="button" className="btn-link contractor-time-entry-table-bulk-action" title="Delete All" data-toggle="modal" data-target="#time-entry-confirm-delete-all-new-time-entries-modal">D</button>
        </div>
      );
    } if (tableTitle === 'Submitted Time Entries' && auth.role === 'contractor' || auth.role === 'staff') {
      return null
    } if (tableTitle === 'Submitted Time Entries') {
      return (
        <div className="d-inline text-center">
          <button type="button" className="btn-link contractor-time-entry-table-bulk-action" title="Reject All" data-toggle="modal" data-target="#time-entry-confirm-reject-all-from-submitted-modal">R</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderTimeEntryTableBulkActionButtons()}
        <div>
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-reject-all-from-submitted-modal"
            modalTitle="Confirm Reject All"
            formId="time-entry-confirm-reject-all-from-submitted-form"
            modalBody="Are you sure you want to reject all time entries in this table?"
            onSubmit={this.onRejectAllFromSubmittedClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-submit-all-new-time-entries-modal"
            modalTitle="Confirm Submit All"
            formId="time-entry-confirm-submit-all-new-time-entries-form"
            modalBody="Are you sure you want to submit all time entries in this table?"
            onSubmit={this.onSubmitAllCreatedEntriesClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-delete-all-new-time-entries-modal"
            modalTitle="Confirm Delete All"
            formId="time-entry-confirm-delete-all-new-time-entries-form"
            modalBody="Are you sure you want to delete all time entries in this table?"
            onSubmit={this.onDeleteAllCreatedEntriesClick}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { submitFromNewContractorHourLogTimeEntries, deleteFromNewContractorHourLogTimeEntries, rejectFromSubmittedContractorHourLogTimeEntries })(TimeEntryBulkTableActions);
