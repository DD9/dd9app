import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import TimeEntryTableEditFormModal from './TimeEntryTableEditFormModal';
import TimeEntryTableActionConfirmModal from './TimeEntryTableActionConfirmModal';

import { rejectTimeEntry, submitTimeEntry, deleteTimeEntry } from '../../actions/timeEntry';

class ContractorTimeEntryTableActions extends Component {
  componentDidUpdate() {
    const { timeEntry } = this.props;
    $(`.contractor-time-entry-table-action-${timeEntry._id}`).attr("disabled", false);
  }

  onRejectTimeEntryClick = e => {
    e.preventDefault();
    const { timeEntry } = this.props;
    $(`.contractor-time-entry-table-action-${timeEntry._id}`).attr("disabled", true);
    $(`.contractor-time-entry-table-bulk-action`).attr("disabled", true);
    $(`#time-entry-confirm-reject-modal-${timeEntry._id}`).modal('hide');
    this.props.rejectTimeEntry(timeEntry._id);
  };

  onSubmitTimeEntryClick = e => {
    e.preventDefault();
    const { timeEntry } = this.props;
    $(`.contractor-time-entry-table-action-${timeEntry._id}`).attr("disabled", true);
    $(`.contractor-time-entry-table-bulk-action`).attr("disabled", true);
    $(`#time-entry-confirm-submit-modal-${timeEntry._id}`).modal('hide');
    this.props.submitTimeEntry(timeEntry._id);
  };

  onDeleteTimeEntryClick = e => {
    e.preventDefault();
    const { timeEntry } = this.props;
    $(`.contractor-time-entry-table-action-${timeEntry._id}`).attr("disabled", true);
    $(`.contractor-time-entry-table-bulk-action`).attr("disabled", true);
    $(`#time-entry-confirm-delete-modal-${timeEntry._id}`).modal('hide');
    this.props.deleteTimeEntry(timeEntry._id);
  };


  renderTimeEntryTableActionButtons() {
    const { auth, timeEntry } = this.props;
    if (timeEntry.status === 'created' && auth.role === 'contractor') {
      return (
        <div className="d-inline">
          <button type="button" className={`btn-link contractor-time-entry-table-action contractor-time-entry-table-action-${timeEntry._id}`} title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link contractor-time-entry-table-action contractor-time-entry-table-action-${timeEntry._id}`} title="Delete" data-toggle="modal" data-target={`#time-entry-confirm-delete-modal-${timeEntry._id}`}>
            <i className="fa fa-trash-o" aria-hidden="true" />
          </button>
        </div>
      );
    } if (timeEntry.status === 'created') {
      return (
        <div className="d-inline">
          <button type="button" className={`btn-link contractor-time-entry-table-action contractor-time-entry-table-action-${timeEntry._id}`} title="Submit" data-toggle="modal" data-target={`#time-entry-confirm-submit-modal-${timeEntry._id}`}>
            <i className="fa fa-paper-plane-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link contractor-time-entry-table-action contractor-time-entry-table-action-${timeEntry._id}`} title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link contractor-time-entry-table-action contractor-time-entry-table-action-${timeEntry._id}`} title="Delete" data-toggle="modal" data-target={`#time-entry-confirm-delete-modal-${timeEntry._id}`}>
            <i className="fa fa-trash-o" aria-hidden="true" />
          </button>
        </div>
      );
    } if (auth.role === 'contractor' || auth.role === 'staff') {
      return null;
    } if (auth.role === 'admin') {
      return (
        <div className="d-inline">
          <button type="button" className={`btn-link contractor-time-entry-table-action contractor-time-entry-table-action-${timeEntry._id}`} title="Reject" data-toggle="modal" data-target={`#time-entry-confirm-reject-modal-${timeEntry._id}`}>
            <i className="fa fa-ban" aria-hidden="true" />
          </button>
        </div>
      );
    }
  }

  render() {
    const { timeEntry, activeUsers, activeCompanies } = this.props;
    return (
      <div>
        {this.renderTimeEntryTableActionButtons()}
        <TimeEntryTableEditFormModal
          timeEntry={timeEntry}
          activeCompanies={activeCompanies}
          form={`time-entry-edit-form-${timeEntry._id}`}
        />
        <TimeEntryTableActionConfirmModal
          modalId={`time-entry-confirm-reject-modal-${timeEntry._id}`}
          modalTitle="Confirm Reject"
          formId={`time-entry-confirm-reject-form-${timeEntry._id}`}
          modalBody="Are you sure you want to reject this time entry?"
          onSubmit={this.onRejectTimeEntryClick}
        />
        <TimeEntryTableActionConfirmModal
          modalId={`time-entry-confirm-submit-modal-${timeEntry._id}`}
          modalTitle="Confirm Submit"
          formId={`time-entry-confirm-submit-form-${timeEntry._id}`}
          modalBody="Are you sure you want to submit this time entry?"
          onSubmit={this.onSubmitTimeEntryClick}
        />
        <TimeEntryTableActionConfirmModal
          modalId={`time-entry-confirm-delete-modal-${timeEntry._id}`}
          modalTitle="Confirm Delete"
          formId={`time-entry-confirm-delete-form-${timeEntry._id}`}
          modalBody="Are you sure you want to delete this time entry?"
          onSubmit={this.onDeleteTimeEntryClick}
        />
      </div>
    );
  }
}

export default connect(null, { rejectTimeEntry, submitTimeEntry, deleteTimeEntry })(ContractorTimeEntryTableActions );
