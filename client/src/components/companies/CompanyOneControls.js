import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';

import CompanyOneControlsModal from './CompanyOneControlsModal';

import { editCompany, activateCompany, deactivateCompany } from '../../actions/company';

class CompanyOneControls extends Component {
  onCompanyEditFormSubmit = formProps => {
    this.props.editCompany(this.props.company._id, formProps);
    $('#companyEditModal').modal('hide');
    setTimeout(() => this.props.reset(), 500);
  };

  onCompanyActivateFormSubmit = () => {
    this.props.activateCompany(this.props.company._id);
    $('#companyActivateModal').modal('hide');
  };

  onCompanyDeactivateFormSubmit = () => {
    this.props.deactivateCompany(this.props.company._id);
    $('#companyDeactivateModal').modal('hide');
  };

  renderActivateOrDeactivateButton() {
    const { company } = this.props;
    if (company.status === 'active') {
      return <button type="button" className="ml-3 mb-2 btn btn-secondary" data-toggle="modal" data-target="#companyDeactivateModal">Deactivate</button>;
    }
    return <button type="button" className="ml-3 mb-2 btn btn-primary" data-toggle="modal" data-target="#companyActivateModal">Activate</button>;
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
    const { company, handleSubmit } = this.props;

    return (
      <div className="py-1 px-3 bg-white rounded box-shadow">
        <div className="pt-2">
          <button type="button" className="ml-3 mb-2 btn btn-primary" data-toggle="modal" data-target="#companyEditModal">Edit</button>
          {this.renderActivateOrDeactivateButton()}
        </div>
        <CompanyOneControlsModal
          modalId="companyEditModal"
          modalTitle={`Edit ${company.name}`}
          formId="companyEditForm"
          modalField={<Field label="Name" name="name" component={this.renderField} />}
          onSubmit={handleSubmit(this.onCompanyEditFormSubmit)}
        />
        <CompanyOneControlsModal
          modalId="companyActivateModal"
          modalTitle="Confirm Company Activation"
          formId="companyActivateForm"
          modalBody={`Are you sure you want to activate ${company.name}?`}
          onSubmit={handleSubmit(this.onCompanyActivateFormSubmit)}
        />
        <CompanyOneControlsModal
          modalId="companyDeactivateModal"
          modalTitle="Confirm Company Deactivation"
          formId="companyDeactivateForm"
          modalBody={`Are you sure you want to deactivate ${company.name}?`}
          onSubmit={handleSubmit(this.onCompanyDeactivateFormSubmit)}
        />
      </div>
    );
  }
}

function validate(values, props) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter a company name.';
  }

  let nameValue = '';
  const companyNames = props.companies.map(company => company.name.toLowerCase().trim());
  if (values.name) {
    nameValue = values.name.toLowerCase().trim();
  }
  if (companyNames.includes(nameValue)) {
    errors.name = 'Company name must be unique.';
  }

  return errors;
}

export default connect(null, { editCompany, activateCompany, deactivateCompany })(reduxForm({
  form: 'editCompany',
  enableReinitialize: true,
  validate,
})(CompanyOneControls));
