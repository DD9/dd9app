import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';

import ContractorHourLogOneControlsModal from './ContractorHourLogOneControlsModal';

import { closeContractorHourLog, editContractorHourLog } from '../../actions/contractorHourLog';

class ContractorHourLogOneControls extends Component {
  onContractorHourLogCloseFormSubmit = formProps => {
    this.props.closeContractorHourLog(this.props.contractorHourLog._id, formProps, this.props.history);
    $('#closeContractorHourLogModal').modal('hide');
  };

  onContractorHourLogEditFormSubmit = formProps => {
    this.props.editContractorHourLog(this.props.contractorHourLog._id, formProps);
    $('#editContractorHourLogModal').modal('hide');
  };

  renderHourLogNotes() {
    const { contractorHourLog } = this.props;
    if (contractorHourLog.notes) {
      return <p className="mt-1 mb-0">Notes: {contractorHourLog.notes}</p>
    }
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
            {this.renderHourLogNotes()}
          </div>
        );
      }
      return (
        <div>
          <h3 className="d-inline"><span style={{textDecoration: 'underline'}}>{contractorHourLog.title}</span> Contractor Hour Log for </h3>
          <Link className="nav-link d-inline p-0" to={`/user/${contractorHourLog.user._id}/contractorHourLogs`} style={{fontSize: '24px'}}><i>{contractorHourLog.user.name.full}</i></Link>
          {this.renderHourLogNotes()}
        </div>
      );
    }
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label className="col-form-label" htmlFor={field.name}>{field.label}</label>
        <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="text" autoComplete="off" />
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
        <ContractorHourLogOneControlsModal
          modalId="closeContractorHourLogModal"
          modalTitle="Close Hour Log"
          formId="closeContractorHourLogForm"
          titleField={<Field label="Title" name="title" component={this.renderField} />}
          notesField={<Field label="Notes" name="notes" component={this.renderField} />}
          modalBody="Cannot close an hour log with created time entries.Closing an empty hour log will trigger its deletion. Closing an empty hour log will trigger its deletion."
          onSubmit={handleSubmit(this.onContractorHourLogCloseFormSubmit)}
        />
        <ContractorHourLogOneControlsModal
          modalId="editContractorHourLogModal"
          modalTitle="Edit Hour Log"
          formId="editContractorHourLogForm"
          titleField={<Field label="Title" name="title" component={this.renderField} />}
          notesField={<Field label="Notes" name="notes" component={this.renderField} />}
          onSubmit={handleSubmit(this.onContractorHourLogEditFormSubmit)}
        />
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
