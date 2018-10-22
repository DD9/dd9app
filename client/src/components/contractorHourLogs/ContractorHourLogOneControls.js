import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';

import { closeContractorHourLog, editContractorHourLog } from '../../actions/contractorHourLog';

class ContractorHourLogOneControls extends Component {
  onContractorHourLogCloseFormSubmit(formProps) {
    this.props.closeContractorHourLog(this.props.contractorHourLog._id, formProps, this.props.history);
    $('#closeContractorHourLogModal').modal('hide');
  }

  onContractorHourLogEditFormSubmit(formProps) {
    this.props.editContractorHourLog(this.props.contractorHourLog._id, formProps);
    $('#editContractorHourLogModal').modal('hide');
  }

  renderHourLogTitle() {
    const { auth, contractorHourLog } = this.props;
    if (contractorHourLog.title) {
      if (contractorHourLog.title === 'Current' && auth.permissions[0].admin) {
        return (
          <div>
            <h3 className="d-inline"><span style={{ textDecoration: 'underline' }}>{contractorHourLog.title}</span> Contractor Hour Log for </h3>
            <Link className="nav-link d-inline p-0" to={`/user/${contractorHourLog.user._id}/contractorHourLogs`} style={{ fontSize: '24px' }}><i>{contractorHourLog.user.name.full}</i></Link>
            <button type="button" className="btn btn-primary pull-right" data-toggle="modal" data-target="#closeContractorHourLogModal">Close</button>
          </div>
        );
      }
      if (auth.permissions[0].admin) {
        return (
          <div>
            <h3 className="d-inline"><span style={{textDecoration: 'underline'}}>{contractorHourLog.title}</span> Contractor Hour Log for </h3>
            <Link className="nav-link d-inline p-0" to={`/user/${contractorHourLog.user._id}/contractorHourLogs`} style={{fontSize: '24px'}}><i>{contractorHourLog.user.name.full}</i></Link>
            <div className="pull-right">
              <button type="button" className="btn btn-primary mr-2" data-toggle="modal" data-target="#editContractorHourLogModal">Edit</button>
            </div>
          </div>
        );
      }
      return (
        <div>
          <h3 className="d-inline"><span style={{textDecoration: 'underline'}}>{contractorHourLog.title}</span> Contractor Hour Log for </h3>
          <Link className="nav-link d-inline p-0" to={`/user/${contractorHourLog.user._id}/contractorHourLogs`} style={{fontSize: '24px'}}><i>{contractorHourLog.user.name.full}</i></Link>
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
    const { handleSubmit } = this.props;

    return (
      <div className="py-1 px-3 bg-white rounded box-shadow">
        <div className="py-2">
          {this.renderHourLogTitle()}
        </div>
        <div>
          <div className="modal fade" id="closeContractorHourLogModal" tabIndex={-1} role="dialog" aria-labelledby="closeContractorHourLogModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Close Hour Log</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="closeContractorHourLogForm" className="form" onSubmit={handleSubmit(this.onContractorHourLogCloseFormSubmit.bind(this))}>
                    <Field
                      label="Title"
                      name="title"
                      component={this.renderField}
                    />
                    <p className="text-center">Cannot close an hour log with created time entries.</p>
                    <p className="text-center">Closing an empty hour log will trigger its deletion.</p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                  <button className="btn btn-primary" type="submit" form="closeContractorHourLogForm">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="modal fade" id="editContractorHourLogModal" tabIndex={-1} role="dialog" aria-labelledby="editContractorHourLogModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Hour Log</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="editContractorHourLogForm" className="form" onSubmit={handleSubmit(this.onContractorHourLogEditFormSubmit.bind(this))}>
                    <Field
                      label="Title"
                      name="title"
                      component={this.renderField}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                  <button className="btn btn-primary" type="submit" form="editContractorHourLogForm">Submit</button>
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

export default withRouter(connect(null, { closeContractorHourLog, editContractorHourLog })(reduxForm({
  form: 'editContractorHourLog',
  enableReinitialize: true,
  validate,
})(ContractorHourLogOneControls)));
