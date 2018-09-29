import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import {
  editTimeEntry, adjudicateTimeEntry, approveTimeEntry, hideTimeEntry, rejectTimeEntry, submitTimeEntry, deleteTimeEntry,
} from '../../actions/timeEntry';

class TimeEntryBulkTableActions extends Component {
  onApproveAllTimeEntriesClick(e) {
    e.preventDefault();
    $('#time-entry-confirm-approve-all-modal').modal('hide');
  }

  onHideAllTimeEntriesClick(e) {
    e.preventDefault();
    $('#time-entry-confirm-hide-all-modal').modal('hide');
  }

  onRejectAllTimeEntriesClick(e) {
    e.preventDefault();
    $('#time-entry-confirm-hide-all-modal').modal('hide');
  }

  onSubmitAllTimeEntriesClick(e) {
    e.preventDefault();
    $('#time-entry-confirm-submit-all-modal').modal('hide');
  }

  onDeleteAllTimeEntriesClick(e) {
    e.preventDefault();
    $('#time-entry-confirm-delete-all-modal').modal('hide');
    // this.props.deleteAllTimeEntries();
  }

  renderTimeEntryTableActionButtons() {
    const { auth, tableTitle } = this.props;
    if (auth.permissions[0].admin && tableTitle === 'New Time Entries') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link" title="Approve All" data-toggle="modal" data-target="#time-entry-confirm-approve-all-modal">A</button>
          <button type="button" className="btn-link" title="Hide All" data-toggle="modal" data-target="#time-entry-confirm-hide-all-modal">H</button>
          <button type="button" className="btn-link" title="Submit All" data-toggle="modal" data-target="#time-entry-confirm-submit-all-modal">S</button>
          <button type="button" className="btn-link" title="Delete All" data-toggle="modal" data-target="#time-entry-confirm-delete-all-modal">D</button>
        </div>
      );
    } if (tableTitle === 'New Time Entries') {
      return (
        <div className="d-inline text-center">
          <button type="button" className="btn-link" title="Submit All" data-toggle="modal" data-target="#time-entry-confirm-submit-all-modal">S</button>
          <button type="button" className="btn-link" title="Delete All" data-toggle="modal" data-target="#time-entry-confirm-delete-all-modal">D</button>
        </div>
      );
    } if (tableTitle === 'Approved Time Entries') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link" title="Submit All" data-toggle="modal" data-target="#time-entry-confirm-hide-all-modal">H</button>
          <button type="button" className="btn-link" title="Reject All" data-toggle="modal" data-target="#time-entry-confirm-reject-all-modal">R</button>
        </div>
      );
    } if (tableTitle === 'Hidden Time Entries') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link" title="Approve All" data-toggle="modal" data-target="#time-entry-confirm-approve-all-modal">A</button>
          <button type="button" className="btn-link" title="Reject All" data-toggle="modal" data-target="#time-entry-confirm-reject-all-modal">R</button>
        </div>
      );
    } if (tableTitle === 'Submitted Time Entries') {
      return (
        <div className="d-inline">
          <button type="button" className="btn-link" title="Approve All" data-toggle="modal" data-target="#time-entry-confirm-approve-all-modal">A</button>
          <button type="button" className="btn-link" title="Hide All" data-toggle="modal" data-target="#time-entry-confirm-hide-all-modal">H</button>
          <button type="button" className="btn-link" title="Reject All" data-toggle="modal" data-target="#time-entry-confirm-reject-all-modal">R</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderTimeEntryTableActionButtons()}
        <div>
          <div className="modal fade" id="time-entry-confirm-approve-all-modal" tabIndex={-1} role="dialog" aria-labelledby="#time-entry-confirm-approve-all-modal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Approve All</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="time-entry-confirm-approve-all-form" className="form" onSubmit={this.onApproveAllTimeEntriesClick.bind(this)}>
                    <p className="text-center">Are you sure you want to approve all time entries in this table?</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form="time-entry-confirm-approve-all-form">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id="time-entry-confirm-hide-all-modal" tabIndex={-1} role="dialog" aria-labelledby="#time-entry-confirm-hide-all-modal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Hide All</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="time-entry-confirm-hide-all-form" className="form" onSubmit={this.onHideAllTimeEntriesClick.bind(this)}>
                    <p className="text-center">Are you sure you want to hide all time entries in this table?</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form="time-entry-confirm-hide-all-form">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id="time-entry-confirm-reject-all-modal" tabIndex={-1} role="dialog" aria-labelledby="#time-entry-confirm-reject-all-modal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Reject</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="time-entry-confirm-reject-all-form" className="form" onSubmit={this.onRejectAllTimeEntriesClick.bind(this)}>
                    <p className="text-center">Are you sure you want to reject all time entries in this table?</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form="time-entry-confirm-reject-all-form">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id="time-entry-confirm-submit-all-modal" tabIndex={-1} role="dialog" aria-labelledby="#time-entry-confirm-submit-all-modal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Submit All</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="time-entry-confirm-submit-all-form" className="form" onSubmit={this.onSubmitAllTimeEntriesClick.bind(this)}>
                    <p className="text-center">Are you sure you want to submit all time entries in this table?</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form="time-entry-confirm-submit-all-form">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id="time-entry-confirm-delete-all-modal" tabIndex={-1} role="dialog" aria-labelledby="#time-entry-confirm-delete-all-modal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete All</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="time-entry-confirm-delete--all-form" className="form" onSubmit={this.onDeleteAllTimeEntriesClick.bind(this)}>
                    <p className="text-center">Are you sure you want to delete all time entries in this table?</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form="time-entry-confirm-delete-all-form">Submit</button>
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
})(TimeEntryBulkTableActions);
