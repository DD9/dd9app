import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import {
  approveAllNewTimeEntries, hideAllNewTimeEntries, submitAllNewTimeEntries, deleteAllNewTimeEntries,
  hideFromApprovedTimeEntries, rejectFromApprovedTimeEntries, approveFromHiddenTimeEntries,
  rejectFromHiddenTimeEntries, approveFromSubmittedTimeEntries, hideFromSubmittedTimeEntries,
  rejectFromSubmittedTimeEntries,
} from '../../actions/timeEntry';

import TimeEntryTableActionConfirmModal from './TimeEntryTableActionConfirmModal';

class TimeEntryBulkTableActions extends Component {
  onApproveAllNewTimeEntriesClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    this.props.approveAllNewTimeEntries();
    $('#time-entry-confirm-approve-all-new-time-entries-modal').modal('hide');
  };

  onHideAllNewTimeEntriesClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    this.props.hideAllNewTimeEntries();
    $('#time-entry-confirm-hide-all-new-time-entries-modal').modal('hide');
  };

  onSubmitAllNewTimeEntriesClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    this.props.submitAllNewTimeEntries();
    $('#time-entry-confirm-submit-all-new-time-entries-modal').modal('hide');
  };

  onDeleteAllNewTimeEntriesClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    this.props.deleteAllNewTimeEntries();
    $('#time-entry-confirm-delete-all-new-time-entries-modal').modal('hide');
  };

  onHideAllFromApprovedClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    const { match } = this.props;
    this.props.hideFromApprovedTimeEntries(match.params.companyHourLogId);
    $('#time-entry-confirm-hide-all-from-approved-modal').modal('hide');
  };

  onRejectAllFromApprovedClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    const { match } = this.props;
    this.props.rejectFromApprovedTimeEntries(match.params.companyHourLogId);
    $('#time-entry-confirm-reject-all-from-approved-modal').modal('hide');
  };

  onApproveAllFromHiddenClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    const { match } = this.props;
    this.props.approveFromHiddenTimeEntries(match.params.companyHourLogId);
    $('#time-entry-confirm-approve-all-from-hidden-modal').modal('hide');
  };

  onRejectAllFromHiddenClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    const { match } = this.props;
    this.props.rejectFromHiddenTimeEntries(match.params.companyHourLogId);
    $('#time-entry-confirm-reject-all-from-hidden-modal').modal('hide');
  };

  onApproveAllFromSubmittedClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    const { match } = this.props;
    this.props.approveFromSubmittedTimeEntries(match.params.companyHourLogId);
    $('#time-entry-confirm-approve-all-from-submitted-modal').modal('hide');
  };

  onHideAllFromSubmittedClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    const { match } = this.props;
    this.props.hideFromSubmittedTimeEntries(match.params.companyHourLogId);
    $('#time-entry-confirm-hide-all-from-submitted-modal').modal('hide');
  };

  onRejectAllFromSubmittedClick = e => {
    e.preventDefault();
    $(`.time-entry-table-action`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    const { match } = this.props;
    this.props.rejectFromSubmittedTimeEntries(match.params.companyHourLogId);
    $('#time-entry-confirm-reject-all-from-submitted-modal').modal('hide');
  };

  renderTimeEntryTableBulkActionButtons() {
    const { auth, tableTitle } = this.props;
    if (auth.permissions[0].admin && tableTitle === 'New Time Entries') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Approve All" data-toggle="modal" data-target="#time-entry-confirm-approve-all-new-time-entries-modal">A</button>
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Hide All" data-toggle="modal" data-target="#time-entry-confirm-hide-all-new-time-entries-modal">H</button>
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Submit All" data-toggle="modal" data-target="#time-entry-confirm-submit-all-new-time-entries-modal">S</button>
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Delete All" data-toggle="modal" data-target="#time-entry-confirm-delete-all-new-time-entries-modal">D</button>
        </div>
      );
    } if (tableTitle === 'New Time Entries') {
      return (
        <div className="d-inline text-center">
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Delete All" data-toggle="modal" data-target="#time-entry-confirm-delete-all-new-time-entries-modal">D</button>
        </div>
      );
    } if (tableTitle === 'Approved Time Entries') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Hide All" data-toggle="modal" data-target="#time-entry-confirm-hide-all-from-approved-modal">H</button>
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Reject All" data-toggle="modal" data-target="#time-entry-confirm-reject-all-from-approved-modal">R</button>
        </div>
      );
    } if (tableTitle === 'Hidden Time Entries') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Approve All" data-toggle="modal" data-target="#time-entry-confirm-approve-all-from-hidden-modal">A</button>
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Reject All" data-toggle="modal" data-target="#time-entry-confirm-reject-all-from-hidden-modal">R</button>
        </div>
      );
    } if (tableTitle === 'Submitted Time Entries') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Approve All" data-toggle="modal" data-target="#time-entry-confirm-approve-all-from-submitted-modal">A</button>
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Hide All" data-toggle="modal" data-target="#time-entry-confirm-hide-all-from-submitted-modal">H</button>
          <button type="button" className="btn-link time-entry-table-bulk-action" title="Reject All" data-toggle="modal" data-target="#time-entry-confirm-reject-all-from-submitted-modal">R</button>
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
            modalId="time-entry-confirm-approve-all-new-time-entries-modal"
            modalTitle="Confirm Approve All"
            formId="time-entry-confirm-approve-all-new-time-entries-form"
            modalBody="Are you sure you want to approve all time entries in this table?"
            onSubmit={this.onApproveAllNewTimeEntriesClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-hide-all-new-time-entries-modal"
            modalTitle="Confirm Hide All"
            formId="time-entry-confirm-hide-all-new-time-entries-form"
            modalBody="Are you sure you want to hide all time entries in this table?"
            onSubmit={this.onHideAllNewTimeEntriesClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-submit-all-new-time-entries-modal"
            modalTitle="Confirm Submit All"
            formId="time-entry-confirm-submit-all-new-time-entries-form"
            modalBody="Are you sure you want to submit all time entries in this table?"
            onSubmit={this.onSubmitAllNewTimeEntriesClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-delete-all-new-time-entries-modal"
            modalTitle="Confirm Delete All"
            formId="time-entry-confirm-delete-all-new-time-entries-form"
            modalBody="Are you sure you want to delete all time entries in this table?"
            onSubmit={this.onDeleteAllNewTimeEntriesClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-hide-all-from-approved-modal"
            modalTitle="Confirm Hide All"
            formId="time-entry-confirm-hide-all-from-approved-form"
            modalBody="Are you sure you want to hide all time entries in this table?"
            onSubmit={this.onHideAllFromApprovedClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-reject-all-from-approved-modal"
            modalTitle="Confirm Reject All"
            formId="time-entry-confirm-reject-all-from-approved-form"
            modalBody="Are you sure you want to reject all time entries in this table?"
            onSubmit={this.onRejectAllFromApprovedClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-approve-all-from-hidden-modal"
            modalTitle="Confirm Approve All"
            formId="time-entry-confirm-approve-all-from-hidden-form"
            modalBody="Are you sure you want to approve all time entries in this table?"
            onSubmit={this.onApproveAllFromHiddenClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-reject-all-from-hidden-modal"
            modalTitle="Confirm Reject All"
            formId="time-entry-confirm-reject-all-from-hidden-form"
            modalBody="Are you sure you want to reject all time entries in this table?"
            onSubmit={this.onRejectAllFromHiddenClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-approve-all-from-submitted-modal"
            modalTitle="Confirm Approve All"
            formId="time-entry-confirm-approve-all-from-submitted-form"
            modalBody="Are you sure you want to approve all time entries in this table?"
            onSubmit={this.onApproveAllFromSubmittedClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-hide-all-from-submitted-modal"
            modalTitle="Confirm Hide All"
            formId="time-entry-confirm-hide-all-from-submitted-form"
            modalBody="Are you sure you want to hide all time entries in this table?"
            onSubmit={this.onHideAllFromSubmittedClick}
          />
          <TimeEntryTableActionConfirmModal
            modalId="time-entry-confirm-reject-all-from-submitted-modal"
            modalTitle="Confirm Reject All"
            formId="time-entry-confirm-reject-all-from-submitted-form"
            modalBody="Are you sure you want to reject all time entries in this table?"
            onSubmit={this.onRejectAllFromSubmittedClick}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, {
  approveAllNewTimeEntries,
  hideAllNewTimeEntries,
  submitAllNewTimeEntries,
  deleteAllNewTimeEntries,
  hideFromApprovedTimeEntries,
  rejectFromApprovedTimeEntries,
  approveFromHiddenTimeEntries,
  rejectFromHiddenTimeEntries,
  approveFromSubmittedTimeEntries,
  hideFromSubmittedTimeEntries,
  rejectFromSubmittedTimeEntries,
})(TimeEntryBulkTableActions);
