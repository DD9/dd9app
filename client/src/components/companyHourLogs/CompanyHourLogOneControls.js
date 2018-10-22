import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';

import { openCompanyHourLog, closeCompanyHourLog, editCompanyHourLog } from '../../actions/companyHourLog';
import TimeEntryExportedTable from '../timeEntries/TimeEntryExportedTable';

class CompanyHourLogOneControls extends Component {
  onHourLogOpenFormSubmit() {
    this.props.openCompanyHourLog(this.props.companyHourLog._id, this.props.history);
    $('#openCompanyHourLogModal').modal('hide');
  }

  onHourLogCloseFormSubmit(formProps) {
    this.props.closeCompanyHourLog(this.props.companyHourLog._id, formProps, this.props.history);
    $('#closeCompanyHourLogModal').modal('hide');
  }

  onHourLogEditFormSubmit(formProps) {
    this.props.editCompanyHourLog(this.props.companyHourLog._id, formProps);
    $('#editCompanyHourLogModal').modal('hide');
  }

  renderHourLogTitle() {
    const { companyHourLog } = this.props;
    if (companyHourLog.title) {
      if (companyHourLog.title === 'Current') {
        return (
          <div>
            <h3 className="d-inline"><span style={{ textDecoration: 'underline' }}>{companyHourLog.title}</span> Hour Log for </h3>
            <Link className="nav-link d-inline p-0" to={`/company/${companyHourLog.company._id}`} style={{ fontSize: '24px' }}><i>{companyHourLog.company.name}</i></Link>
            <button type="button" className="btn btn-primary pull-right" data-toggle="modal" data-target="#closeCompanyHourLogModal">Close</button>
          </div>
        );
      }
      return (
        <div>
          <h3 className="d-inline"><span style={{ textDecoration: 'underline' }}>{companyHourLog.title}</span> Hour Log for </h3>
          <Link className="nav-link d-inline p-0" to={`/company/${companyHourLog.company._id}`} style={{ fontSize: '24px' }}><i>{companyHourLog.company.name}</i></Link>
          <div className="pull-right">
            <button type="button" className="btn btn-primary mr-2" data-toggle="modal" data-target="#exportApprovedHoursModal">Export</button>
            <button type="button" className="btn btn-primary mr-2" data-toggle="modal" data-target="#editCompanyHourLogModal">Edit</button>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#openCompanyHourLogModal">Open</button>
          </div>
        </div>
      );
    }
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label className="col-form-label" htmlFor={field.name}>{field.label}</label>
        <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="text" />
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit, timeEntries } = this.props;
    return (
      <div className="py-1 px-3 bg-white rounded box-shadow">
        <div className="py-2">
          {this.renderHourLogTitle()}
        </div>
        <div>
          <div className="modal fade" id="openCompanyHourLogModal" tabIndex={-1} role="dialog" aria-labelledby="openCompanyHourLogModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Open Hour Log</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="openCompanyHourLogForm" className="form" onSubmit={handleSubmit(this.onHourLogOpenFormSubmit.bind(this))}>
                    <p className="text-center">All time entries will be reassigned to the current hour log.</p>
                    <p className="text-center">A new current hour log will be made for this company if one does not exist.</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                  <button className="btn btn-primary" type="submit" form="openCompanyHourLogForm">Open</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id="closeCompanyHourLogModal" tabIndex={-1} role="dialog" aria-labelledby="closeCompanyHourLogModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Close Hour Log</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="closeCompanyHourLogForm" className="form" onSubmit={handleSubmit(this.onHourLogCloseFormSubmit.bind(this))}>
                    <Field
                      label="Title"
                      name="title"
                      component={this.renderField}
                    />
                    <p className="text-center">Submitted time entries will be moved to a new Current hour log.</p>
                    <p className="text-center">Closing an empty hour log will trigger its deletion.</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                  <button className="btn btn-primary" type="submit" form="closeCompanyHourLogForm">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id="editCompanyHourLogModal" tabIndex={-1} role="dialog" aria-labelledby="editCompanyHourLogModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Hour Log</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="editCompanyHourLogForm" className="form" onSubmit={handleSubmit(this.onHourLogEditFormSubmit.bind(this))}>
                    <Field
                      label="Title"
                      name="title"
                      component={this.renderField}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                  <button className="btn btn-primary" type="submit" form="editCompanyHourLogForm">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id="exportApprovedHoursModal" tabIndex={-1} role="dialog" aria-labelledby="exportApprovedHoursModal" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Export Hour Log</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <TimeEntryExportedTable timeEntries={timeEntries} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter an hour log title.';
  }

  if (values.title === 'Current' || values.title === 'current') {
    errors.title = 'Hour log title cannot be name \'Current\'.';
  }

  return errors;
}

export default withRouter(connect(null, { closeCompanyHourLog, openCompanyHourLog, editCompanyHourLog })(reduxForm({
  form: 'editCompanyHourLog',
  enableReinitialize: true,
  validate,
})(CompanyHourLogOneControls)));
