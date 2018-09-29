import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import {
  editTimeEntry, adjudicateTimeEntry, approveTimeEntry, hideTimeEntry, rejectTimeEntry, submitTimeEntry, deleteTimeEntry,
} from '../../actions/timeEntry';

import TimeEntryTableEditFormModal from './TimeEntryTableEditFormModal';

class TimeEntryTableActions extends Component {
  onApproveTimeEntryClick() {
    this.props.approveTimeEntry(this.props.timeEntry._id);
  }

  onHideTimeEntryClick() {
    this.props.hideTimeEntry(this.props.timeEntry._id);
  }

  onRejectTimeEntryClick(e) {
    e.preventDefault();
    $(`#time-entry-confirm-reject-modal-${this.props.timeEntry._id}`).modal('hide');
    this.props.rejectTimeEntry(this.props.timeEntry._id);
  }

  onSubmitTimeEntryClick(e) {
    e.preventDefault();
    $(`#time-entry-confirm-submit-modal-${this.props.timeEntry._id}`).modal('hide');
    this.props.submitTimeEntry(this.props.timeEntry._id);
  }

  onDeleteTimeEntryClick(e) {
    e.preventDefault();
    $(`#time-entry-confirm-delete-modal-${this.props.timeEntry._id}`).modal('hide');
    this.props.deleteTimeEntry(this.props.timeEntry._id);
  }


  renderTimeEntryTableActionButtons() {
    const { auth, timeEntry } = this.props;
    if (auth.permissions[0].admin && timeEntry.status === 'created') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link" title="Approve" onClick={this.onApproveTimeEntryClick.bind(this)}>
            <i className="fa fa-check-circle-o" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Hide" onClick={this.onHideTimeEntryClick.bind(this)}>
            <i className="fa fa-eye-slash" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Submit" data-toggle="modal" data-target={`#time-entry-confirm-submit-modal-${timeEntry._id}`}>
            <i className="fa fa-paper-plane-o" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Delete" data-toggle="modal" data-target={`#time-entry-confirm-delete-modal-${timeEntry._id}`}>
            <i className="fa fa-trash-o" aria-hidden="true" />
          </button>
        </div>
      );
    } if (timeEntry.status === 'created') {
      return (
        <div className="d-inline text-center">
          <button type="button" className="btn-link" title="Submit" data-toggle="modal" data-target={`#time-entry-confirm-submit-modal-${timeEntry._id}`}>
            <i className="fa fa-paper-plane-o" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Delete" data-toggle="modal" data-target={`#time-entry-confirm-delete-modal-${timeEntry._id}`}>
            <i className="fa fa-trash-o" aria-hidden="true" />
          </button>
        </div>
      );
    } if (timeEntry.status === 'approved') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link" title="Submit" onClick={this.onHideTimeEntryClick.bind(this)}>
            <i className="fa fa-eye-slash" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Reject" data-toggle="modal" data-target={`#time-entry-confirm-reject-modal-${timeEntry._id}`}>
            <i className="fa fa-ban" aria-hidden="true" />
          </button>
        </div>
      );
    } if (timeEntry.status === 'hidden') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link" title="Approve" onClick={this.onApproveTimeEntryClick.bind(this)}>
            <i className="fa fa-check-circle-o" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Reject" data-toggle="modal" data-target={`#time-entry-confirm-reject-modal-${timeEntry._id}`}>
            <i className="fa fa-ban" aria-hidden="true" />
          </button>
        </div>
      );
    } if (timeEntry.status === 'submitted') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link" title="Approve" onClick={this.onApproveTimeEntryClick.bind(this)}>
            <i className="fa fa-check-circle-o" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Hide" onClick={this.onHideTimeEntryClick.bind(this)}>
            <i className="fa fa-eye-slash" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Edit" data-toggle="modal" data-target={`#time-entry-edit-modal-${timeEntry._id}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button type="button" className="btn-link" title="Reject" data-toggle="modal" data-target={`#time-entry-confirm-reject-modal-${timeEntry._id}`}>
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
        <div>
          <div className="modal fade" id={`time-entry-confirm-submit-modal-${timeEntry._id}`} tabIndex={-1} role="dialog" aria-labelledby={`#time-entry-confirm-submit-modal-${timeEntry._id}`} aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Submit</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id={`time-entry-confirm-submit-form-${timeEntry._id}`} className="form" onSubmit={this.onSubmitTimeEntryClick.bind(this)}>
                    <p className="text-center">Are you sure you want to submit this time entry?</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form={`time-entry-confirm-submit-form-${timeEntry._id}`}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id={`time-entry-confirm-reject-modal-${timeEntry._id}`} tabIndex={-1} role="dialog" aria-labelledby={`#time-entry-confirm-reject-modal-${timeEntry._id}`} aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Reject</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id={`time-entry-confirm-reject-form-${timeEntry._id}`} className="form" onSubmit={this.onRejectTimeEntryClick.bind(this)}>
                    <p className="text-center">Are you sure you want to reject this time entry?</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form={`time-entry-confirm-reject-form-${timeEntry._id}`}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id={`time-entry-confirm-delete-modal-${timeEntry._id}`} tabIndex={-1} role="dialog" aria-labelledby={`#time-entry-confirm-delete-modal-${timeEntry._id}`} aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id={`time-entry-confirm-delete-form-${timeEntry._id}`} className="form" onSubmit={this.onDeleteTimeEntryClick.bind(this)}>
                    <p className="text-center">Are you sure you want to delete this time entry?</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form={`time-entry-confirm-delete-form-${timeEntry._id}`}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  editTimeEntry, adjudicateTimeEntry, approveTimeEntry, hideTimeEntry, rejectTimeEntry, submitTimeEntry, deleteTimeEntry,
})(TimeEntryTableActions);
