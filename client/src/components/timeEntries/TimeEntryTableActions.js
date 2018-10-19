import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import {
  editTimeEntry, adjudicateTimeEntry, approveTimeEntry, hideTimeEntry, rejectTimeEntry, submitTimeEntry, deleteTimeEntry,
} from '../../actions/timeEntry';

import TimeEntryTableEditFormModal from './TimeEntryTableEditFormModal';
import TimeEntryTableActionConfirmModal from './TimeEntryTableActionConfirmModal';

class TimeEntryTableActions extends Component {
  componentDidUpdate() {
    const { timeEntry } = this.props;
    $(`.time-entry-table-action-${timeEntry._id}`).attr("disabled", false);
  }

  onApproveTimeEntryClick() {
    const { timeEntry } = this.props;
    $(`.time-entry-table-action-${timeEntry._id}`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    this.props.approveTimeEntry(timeEntry._id);
  }

  onHideTimeEntryClick() {
    const { timeEntry } = this.props;
    $(`.time-entry-table-action-${timeEntry._id}`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    this.props.hideTimeEntry(timeEntry._id);
  }

  onRejectTimeEntryClick = e => {
    e.preventDefault();
    const { timeEntry } = this.props;
    $(`.time-entry-table-action-${timeEntry._id}`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    $(`#time-entry-confirm-reject-modal-${timeEntry._id}`).modal('hide');
    this.props.rejectTimeEntry(timeEntry._id);
  };

  onSubmitTimeEntryClick = e => {
    e.preventDefault();
    const { timeEntry } = this.props;
    $(`.time-entry-table-action-${timeEntry._id}`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    $(`#time-entry-confirm-submit-modal-${timeEntry._id}`).modal('hide');
    this.props.submitTimeEntry(timeEntry._id);
  };

  onDeleteTimeEntryClick = e => {
    e.preventDefault();
    const { timeEntry } = this.props;
    $(`.time-entry-table-action-${timeEntry._id}`).attr("disabled", true);
    $(`.time-entry-table-bulk-action`).attr("disabled", true);
    $(`#time-entry-confirm-delete-modal-${timeEntry._id}`).modal('hide');
    this.props.deleteTimeEntry(timeEntry._id);
  };


  renderTimeEntryTableActionButtons() {
    const { auth, timeEntry } = this.props;
    if (auth.permissions[0].admin && timeEntry.status === 'created') {
      return (
        <div className="d-inline">
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Approve" onClick={this.onApproveTimeEntryClick.bind(this)}>
            <i className="fa fa-check-circle-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Hide" onClick={this.onHideTimeEntryClick.bind(this)}>
            <i className="fa fa-eye-slash" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Submit" data-toggle="modal" data-target={`#time-entry-confirm-submit-modal-${timeEntry._id}`}>
            <i className="fa fa-paper-plane-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Delete" data-toggle="modal" data-target={`#time-entry-confirm-delete-modal-${timeEntry._id}`}>
            <i className="fa fa-trash-o" aria-hidden="true" />
          </button>
        </div>
      );
    } if (timeEntry.status === 'created') {
      return (
        <div className="d-inline text-center">
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Delete" data-toggle="modal" data-target={`#time-entry-confirm-delete-modal-${timeEntry._id}`}>
            <i className="fa fa-trash-o" aria-hidden="true" />
          </button>
        </div>
      );
    } if (timeEntry.status === 'approved') {
      return (
        <div className="d-inline">
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Hide" onClick={this.onHideTimeEntryClick.bind(this)}>
            <i className="fa fa-eye-slash" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Reject" data-toggle="modal" data-target={`#time-entry-confirm-reject-modal-${timeEntry._id}`}>
            <i className="fa fa-ban" aria-hidden="true" />
          </button>
        </div>
      );
    } if (timeEntry.status === 'hidden') {
      return (
        <div className="d-inline">
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Approve" onClick={this.onApproveTimeEntryClick.bind(this)}>
            <i className="fa fa-check-circle-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Reject" data-toggle="modal" data-target={`#time-entry-confirm-reject-modal-${timeEntry._id}`}>
            <i className="fa fa-ban" aria-hidden="true" />
          </button>
        </div>
      );
    } if (timeEntry.status === 'submitted') {
      return (
        <div className="d-inline">
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Approve" onClick={this.onApproveTimeEntryClick.bind(this)}>
            <i className="fa fa-check-circle-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Hide" onClick={this.onHideTimeEntryClick.bind(this)}>
            <i className="fa fa-eye-slash" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className={`btn-link time-entry-table-action time-entry-table-action-${timeEntry._id}`} title="Reject" data-toggle="modal" data-target={`#time-entry-confirm-reject-modal-${timeEntry._id}`}>
            <i className="fa fa-ban" aria-hidden="true" />
          </button>
        </div>
      );
    }
  }

  render() {
    const {
      auth, timeEntry, activeUsers, activeCompanies,
    } = this.props;
    return (
      <div>
        {this.renderTimeEntryTableActionButtons()}
        <TimeEntryTableEditFormModal
          auth={auth}
          timeEntry={timeEntry}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          form={`time-entry-edit-form-${timeEntry._id}`}
          initialValues={{
            date: timeEntry.publicDate.split('T')[0],
            user: timeEntry.publicUser._id,
            company: timeEntry.publicCompany._id,
            hours: timeEntry.publicHours,
            description: timeEntry.publicDescription,
          }}
        />
        <TimeEntryTableActionConfirmModal
          modalId={`time-entry-confirm-submit-modal-${timeEntry._id}`}
          modalTitle="Confirm Submit"
          formId={`time-entry-confirm-submit-form-${timeEntry._id}`}
          modalBody="Are you sure you want to submit this time entry?"
          onSubmit={this.onSubmitTimeEntryClick}
        />
        <TimeEntryTableActionConfirmModal
          modalId={`time-entry-confirm-reject-modal-${timeEntry._id}`}
          modalTitle="Confirm Reject"
          formId={`time-entry-confirm-reject-form-${timeEntry._id}`}
          modalBody="Are you sure you want to reject this time entry?"
          onSubmit={this.onRejectTimeEntryClick}
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

export default connect(null, {
  editTimeEntry, adjudicateTimeEntry, approveTimeEntry, hideTimeEntry, rejectTimeEntry, submitTimeEntry, deleteTimeEntry,
})(TimeEntryTableActions);
