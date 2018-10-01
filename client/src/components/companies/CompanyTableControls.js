import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';

import { createCompany } from '../../actions/company';


class CompanyCreate extends Component {
  componentDidMount() {
    $('#companyCreateModal').on('hidden.bs.modal', () => {
      this.props.reset();
    });
  }

  onFormSubmit(formProps) {
    this.props.createCompany(formProps)
      .then($('#companyCreateModal').modal('hide'));
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
        <div className="pt-2">
          <button type="button" className="ml-3 mb-2 btn btn-primary" data-toggle="modal" data-target="#companyCreateModal">Add Company</button>
        </div>
        <div>
          <div className="modal fade" id="companyCreateModal" tabIndex={-1} role="dialog" aria-labelledby="companyCreateModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Company</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id="companyCreateForm" className="form" onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
                    <Field
                      label="Name"
                      name="name"
                      component={this.renderField}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form="companyCreateForm">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(null, { createCompany })(reduxForm({
  form: 'createCompany',
  validate,
})(CompanyCreate));
