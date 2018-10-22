import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { getCurrentUser } from '../../actions/auth';
import { editUser } from '../../actions/user';

class UserOneEditForm extends Component {
  onFormSubmit(formProps) {
    this.props.editUser(formProps);
  }

  renderReadOnlySelectField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-10">
          <select {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} disabled>
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
          <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="text" maxLength="30" />
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

  renderReadOnlyNumberField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={field.name}>{field.label}</label>
        <div className="col-sm-10">
          <input {...field.input} className={`form-control ${field.meta.touched && field.meta.invalid ? 'is-invalid' : ''}`} type="number" step="0.25" placeholder={field.placeholder} disabled />
          <div className="invalid-feedback">{field.meta.error}</div>
        </div>
      </div>
    );
  }

  render() {
    const { user, handleSubmit, activeCompanies } = this.props;
    return (
      <div className="py-1 px-3 bg-white rounded box-shadow">
        <div className="row">
          <div className="col mt-3 mb-2">
            <h5>My Account</h5>
          </div>
        </div>
        <hr />
        <form id="user-one-edit-form" className="form" onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
          <Field
            label="Company"
            name="company"
            selectOptions={activeCompanies}
            component={this.renderReadOnlySelectField}
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
            component={this.renderReadOnlySelectField}
          />
          <Field
            label="Status"
            name="status"
            selectOptions={[
              { _id: 'active', name: 'Active' },
              { _id: 'inactive', name: 'Inactive' },
            ]}
            component={this.renderReadOnlySelectField}
          />
          <Field
            label="Hourly Rate (USD)"
            name="hourlyRate"
            placeholder={user.hourlyRate[0].USD}
            component={this.renderReadOnlyNumberField}
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
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
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

  return errors;
}

export default connect(null, { editUser, getCurrentUser })(reduxForm({
  form: 'userOneEditForm',
  enableReinitialize: true,
  validate,
})(UserOneEditForm));
