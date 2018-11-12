import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';

import { adminEditUsers } from '../../actions/user';
import { getCurrentUser } from '../../actions/auth';

class UserAllTableAdminEditFormModal extends Component {
  componentDidMount() {
    const { user } = this.props;
    this.props.initialize({
      userId: user._id,
      company: user.company._id,
      role: user.role,
      status: user.status,
      hourlyRate: user.hourlyRate[0].USD,
      firstName: user.name.first,
      lastName: user.name.last,
    });
  }

  onFormSubmit(formProps) {
    const { auth, user } = this.props;
    this.props.adminEditUsers(user._id, auth._id, formProps);
    $(`#user-admin-edit-modal-${user._id}`).modal('hide');
  }

  renderSelectField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-10">
          <select {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`}>
            {
              field.selectOptions
                ? field.selectOptions.map((options) => (<option key={options._id} value={options._id}>{options.name}</option>))
                : ''
            }
          </select>
        </div>
        <div className="invalid-feedback">{field.meta.error}</div>
      </div>
    );
  }

  renderTextField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-10">
          <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="text" maxLength="30" autoComplete="off" />
          <div className="invalid-feedback">{field.meta.error}</div>
        </div>
      </div>
    );
  }

  renderReadOnlyTextField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-10">
          <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="text" placeholder={field.placeholder} disabled />
          <div className="invalid-feedback">{field.meta.error}</div>
        </div>
      </div>
    );
  }

  renderNumberField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-9">
          <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="number" step="0.25" autoComplete="off" />
          <div className="invalid-feedback">{field.meta.error}</div>
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, user, activeCompanies } = this.props;
    return (
      <div>
        <button type="button" className="btn-link" data-toggle="modal" data-target={`#user-admin-edit-modal-${user._id}`}>
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        </button>
        <div>
          <div className="modal fade" id={`user-admin-edit-modal-${user._id}`} tabIndex={-1} role="dialog" aria-labelledby={`#user-admin-edit-modal-${user._id}`} aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit {`${user.name.full}`}</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-body">
                  <form id={`user-admin-edit-form-${user._id}`} className="form" onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
                    <Field
                      label="Company"
                      name="company"
                      selectOptions={activeCompanies}
                      component={this.renderSelectField}
                    />
                    <Field
                      label="Role"
                      name="role"
                      selectOptions={[
                        { _id: 'client', name: 'Client' },
                        { _id: 'contractor', name: 'Contractor' },
                        { _id: 'staff', name: 'Staff' },
                        { _id: 'admin', name: 'Admin' },
                      ]}
                      component={this.renderSelectField}
                    />
                    <Field
                      label="Status"
                      name="status"
                      selectOptions={[
                        { _id: 'active', name: 'Active' },
                        { _id: 'inactive', name: 'Inactive' },
                      ]}
                      component={this.renderSelectField}
                    />
                    <Field
                      label="Hourly Rate (USD)"
                      name="hourlyRate"
                      component={this.renderNumberField}
                    />
                    <Field
                      label="First name"
                      name="firstName"
                      component={this.renderTextField}
                    />
                    <Field
                      label="Last name"
                      name="lastName"
                      component={this.renderTextField}
                    />
                    <Field
                      label="Email"
                      name="email"
                      placeholder={user.email}
                      component={this.renderReadOnlyTextField}
                    />
                    <Field
                      label="Password"
                      name="password"
                      placeholder="password and email managed by GSuite"
                      component={this.renderReadOnlyTextField}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" type="submit" form={`user-admin-edit-form-${user._id}`}>Submit</button>
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

  if (!values.firstName) {
    errors.firstName = 'Enter a first name.';
  }

  if (!values.lastName) {
    errors.lastName = 'Enter a last name.';
  }

  if (!values.hours || values.hours < 0) {
    errors.hours = 'Enter a value greater than or equal to 0.';
  }

  if (values.hours > 100000) {
    errors.hours = 'Enter a value less than 100,000.';
  }

  return errors;
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { adminEditUsers, getCurrentUser })(reduxForm({
  enableReinitialize: true,
  validate,
})(UserAllTableAdminEditFormModal));
