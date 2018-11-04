import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';

import CompanyHourLogOneControlsModal from './CompanyHourLogOneControlsModal';
import CompanyTimeEntryExportedTable from '../timeEntries/CompanyTimeEntryExportedTable';

import { openCompanyHourLog, closeCompanyHourLog, editCompanyHourLog } from '../../actions/companyHourLog';

class CompanyHourLogOneControls extends Component {
  onCompanyHourLogOpenFormSubmit = () => {
    this.props.openCompanyHourLog(this.props.companyHourLog._id, this.props.history);
    $('#openCompanyHourLogModal').modal('hide');
  };

  onCompanyHourLogCloseFormSubmit = formProps => {
    this.props.closeCompanyHourLog(this.props.companyHourLog._id, formProps, this.props.history);
    $('#closeCompanyHourLogModal').modal('hide');
  };

  onCompanyHourLogEditFormSubmit = formProps => {
    this.props.editCompanyHourLog(this.props.companyHourLog._id, formProps);
    $('#editCompanyHourLogModal').modal('hide');
  };

  renderHourLogTitle() {
    const { companyHourLog } = this.props;
    if (companyHourLog.title) {
      if (companyHourLog.title === 'Current') {
        return (
          <div>
            <h3 className="d-inline"><span style={{ textDecoration: 'underline' }}>{companyHourLog.title}</span> Company Hour Log for </h3>
            <Link className="nav-link d-inline p-0" to={`/company/${companyHourLog.company._id}`} style={{ fontSize: '24px' }}><i>{companyHourLog.company.name}</i></Link>
            <button type="button" className="btn btn-primary pull-right" data-toggle="modal" data-target="#closeCompanyHourLogModal">Close</button>
          </div>
        );
      }
      return (
        <div>
          <h3 className="d-inline"><span style={{ textDecoration: 'underline' }}>{companyHourLog.title}</span> Company Hour Log for </h3>
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
        <CompanyHourLogOneControlsModal
          modalId="openCompanyHourLogModal"
          modalTitle="Open Hour Log"
          formId="openCompanyHourLogForm"
          modalBody="All time entries will be reassigned to the current hour log. A new current hour log will be made for this company if one does not exist."
          onSubmit={handleSubmit(this.onCompanyHourLogOpenFormSubmit)}
        />
        <CompanyHourLogOneControlsModal
          modalId="closeCompanyHourLogModal"
          modalTitle="Close Hour Log"
          formId="closeCompanyHourLogForm"
          modalField={<Field label="Title" name="title" component={this.renderField} />}
          modalBody="Submitted time entries will be moved to a new Current hour log. Closing an hour log with no approved or hidden time entries will trigger its deletion."
          onSubmit={handleSubmit(this.onCompanyHourLogCloseFormSubmit)}
        />
        <CompanyHourLogOneControlsModal
          modalId="editCompanyHourLogModal"
          modalTitle="Edit Hour Log"
          formId="editCompanyHourLogForm"
          modalField={<Field label="Title" name="title" component={this.renderField} />}
          onSubmit={handleSubmit(this.onCompanyHourLogEditFormSubmit)}
        />
        <div>
          <div className="modal fade" id="exportApprovedHoursModal" tabIndex={-1} role="dialog" aria-labelledby="exportApprovedHoursModal" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Export Hour Log</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <CompanyTimeEntryExportedTable timeEntries={timeEntries} />
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
